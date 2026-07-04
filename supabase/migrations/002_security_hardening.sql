-- StudyHuman backend security hardening
-- Run after 001_studyhuman_backend.sql

-- =========================================================
-- SECURITY HELPER FUNCTIONS
-- =========================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;


create or replace function public.is_request_owner(p_request_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.requests
    where id = p_request_id
      and user_id = auth.uid()
  );
$$;


create or replace function public.is_request_helper(p_request_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.requests r
    join public.helpers h
      on h.id = r.helper_id
    where r.id = p_request_id
      and h.profile_id = auth.uid()
  );
$$;


create or replace function public.is_conversation_participant(
  p_conversation_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.conversations c
    left join public.helpers h
      on h.id = c.helper_id
    where c.id = p_conversation_id
      and (
        c.student_id = auth.uid()
        or c.support_admin_id = auth.uid()
        or h.profile_id = auth.uid()
      )
  );
$$;


-- =========================================================
-- UPDATED_AT SUPPORT
-- =========================================================

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


drop trigger if exists touch_helpers_updated_at
on public.helpers;

create trigger touch_helpers_updated_at
before update on public.helpers
for each row
execute function public.touch_updated_at();


drop trigger if exists touch_survey_requests_updated_at
on public.survey_requests;

create trigger touch_survey_requests_updated_at
before update on public.survey_requests
for each row
execute function public.touch_updated_at();


drop trigger if exists touch_conversations_updated_at
on public.conversations;

create trigger touch_conversations_updated_at
before update on public.conversations
for each row
execute function public.touch_updated_at();


-- =========================================================
-- PROFILE PRIVILEGE PROTECTION
-- Prevent normal users from changing role/email directly
-- =========================================================

create or replace function public.guard_profile_sensitive_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and not public.is_admin()
  then
    new.role = old.role;
    new.email = old.email;
    new.created_at = old.created_at;
  end if;

  new.updated_at = now();

  return new;
end;
$$;


drop trigger if exists guard_profile_sensitive_fields_trigger
on public.profiles;

create trigger guard_profile_sensitive_fields_trigger
before update on public.profiles
for each row
execute function public.guard_profile_sensitive_fields();


drop policy if exists "Users can insert own profile"
on public.profiles;

create policy "Users can insert student profile"
on public.profiles
for insert
with check (
  id = auth.uid()
  and role = 'student'
);


drop policy if exists "Admins can manage profiles"
on public.profiles;

create policy "Admins can manage profiles"
on public.profiles
for all
using (public.is_admin())
with check (public.is_admin());


-- =========================================================
-- HELPER PROFILE ACCESS
-- =========================================================

drop policy if exists "Helpers can view own helper profile"
on public.helpers;

create policy "Helpers can view own helper profile"
on public.helpers
for select
using (
  profile_id = auth.uid()
);


-- =========================================================
-- REQUEST PROTECTION
-- Prevent students from changing status, final price,
-- assignment, ownership, or creation timestamp
-- =========================================================

create or replace function public.guard_request_control_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and not public.is_admin()
  then
    if old.user_id <> auth.uid() then
      raise exception 'Not permitted to update this request';
    end if;

    new.user_id = old.user_id;
    new.helper_id = old.helper_id;
    new.final_price = old.final_price;
    new.status = old.status;
    new.created_at = old.created_at;
  end if;

  new.updated_at = now();

  return new;
end;
$$;


drop trigger if exists guard_request_control_fields_trigger
on public.requests;

create trigger guard_request_control_fields_trigger
before update on public.requests
for each row
execute function public.guard_request_control_fields();


drop policy if exists "Students can create own requests"
on public.requests;

create policy "Students can create own requests"
on public.requests
for insert
with check (
  user_id = auth.uid()
  and status in ('draft', 'submitted')
  and final_price is null
);


drop policy if exists
  "Students can update own draft or submitted requests"
on public.requests;

create policy "Students can update editable requests"
on public.requests
for update
using (
  user_id = auth.uid()
  and status in ('draft', 'submitted')
)
with check (
  user_id = auth.uid()
);


drop policy if exists "Admins can manage requests"
on public.requests;

create policy "Admins can manage requests"
on public.requests
for all
using (public.is_admin())
with check (public.is_admin());


-- =========================================================
-- SURVEY REQUEST POLICIES
-- =========================================================

drop policy if exists
  "Users can manage survey details for own requests"
on public.survey_requests;


create policy "Users can view related survey requests"
on public.survey_requests
for select
using (
  public.is_request_owner(request_id)
  or public.is_request_helper(request_id)
  or public.is_admin()
);


create policy "Users can create survey details for own requests"
on public.survey_requests
for insert
with check (
  public.is_request_owner(request_id)
  or public.is_admin()
);


create policy "Users can update survey details for own requests"
on public.survey_requests
for update
using (
  public.is_request_owner(request_id)
  or public.is_admin()
)
with check (
  public.is_request_owner(request_id)
  or public.is_admin()
);


create policy "Users can delete survey details for own requests"
on public.survey_requests
for delete
using (
  public.is_request_owner(request_id)
  or public.is_admin()
);


-- =========================================================
-- REQUEST FILE SECURITY
-- =========================================================

drop policy if exists
  "Users can manage files for own requests"
on public.request_files;


create policy "Request participants can view files"
on public.request_files
for select
using (
  public.is_request_owner(request_id)
  or public.is_request_helper(request_id)
  or public.is_admin()
);


create policy "Request owners can add files"
on public.request_files
for insert
with check (
  (
    user_id = auth.uid()
    and public.is_request_owner(request_id)
  )
  or public.is_admin()
);


create policy "Request owners can delete files"
on public.request_files
for delete
using (
  public.is_request_owner(request_id)
  or public.is_admin()
);


-- =========================================================
-- CONVERSATION SECURITY
-- =========================================================

drop policy if exists
  "Users can view own conversations"
on public.conversations;

drop policy if exists
  "Students can create conversations"
on public.conversations;


create policy "Participants can view conversations"
on public.conversations
for select
using (
  public.is_conversation_participant(id)
  or public.is_admin()
);


create policy "Students can create conversations"
on public.conversations
for insert
with check (
  student_id = auth.uid()
  and support_admin_id is null
  and (
    request_id is null
    or public.is_request_owner(request_id)
  )
);


drop policy if exists "Admins can manage conversations"
on public.conversations;

create policy "Admins can manage conversations"
on public.conversations
for all
using (public.is_admin())
with check (public.is_admin());


-- =========================================================
-- MESSAGE SECURITY
-- =========================================================

drop policy if exists
  "Users can view messages in their conversations"
on public.messages;

drop policy if exists
  "Users can send messages in their conversations"
on public.messages;


create policy "Participants can view messages"
on public.messages
for select
using (
  public.is_conversation_participant(conversation_id)
  or public.is_admin()
);


create policy "Participants can send messages"
on public.messages
for insert
with check (
  sender_id = auth.uid()
  and (
    public.is_conversation_participant(conversation_id)
    or public.is_admin()
  )
);


-- =========================================================
-- REVIEW SECURITY
-- =========================================================

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reviews_unique_request_student'
  ) then
    alter table public.reviews
    add constraint reviews_unique_request_student
    unique (request_id, student_id);
  end if;
end $$;


drop policy if exists
  "Students can create reviews for own requests"
on public.reviews;


create policy "Students can review completed own requests"
on public.reviews
for insert
with check (
  student_id = auth.uid()
  and exists (
    select 1
    from public.requests r
    where r.id = request_id
      and r.user_id = auth.uid()
      and r.helper_id = helper_id
      and r.status = 'completed'
  )
);


drop policy if exists "Admins can manage reviews"
on public.reviews;

create policy "Admins can manage reviews"
on public.reviews
for all
using (public.is_admin())
with check (public.is_admin());
