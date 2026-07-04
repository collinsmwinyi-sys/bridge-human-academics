create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('student', 'helper', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'request_status') then
    create type request_status as enum (
      'draft',
      'submitted',
      'under_review',
      'quoted',
      'accepted',
      'in_progress',
      'completed',
      'cancelled'
    );
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role user_role not null default 'student',
  avatar_url text,
  country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.helpers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  display_name text not null,
  title text,
  bio text,
  specialties text[] not null default '{}',
  expertise_tags text[] not null default '{}',
  rating numeric(2,1) not null default 5.0,
  sessions_completed integer not null default 0,
  response_time text,
  is_verified boolean not null default false,
  is_online boolean not null default false,
  accepts_urgent_requests boolean not null default true,
  hourly_rate numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  base_price numeric(10,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  helper_id uuid references public.helpers(id) on delete set null,
  service_category_id uuid references public.service_categories(id) on delete set null,
  subject text,
  academic_level text not null,
  deadline text not null,
  quantity_type text not null default 'pages',
  quantity integer not null default 1 check (quantity > 0),
  description text,
  estimated_min_price numeric(10,2),
  estimated_max_price numeric(10,2),
  final_price numeric(10,2),
  status request_status not null default 'submitted',
  ethical_support_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.survey_requests (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  participant_count integer not null check (participant_count > 0),
  target_country text,
  participant_type text,
  survey_link text,
  screening_requirements text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.request_files (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  file_size bigint,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.requests(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  helper_id uuid references public.helpers(id) on delete set null,
  support_admin_id uuid references public.profiles(id) on delete set null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  message_body text not null,
  attachment_url text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  helper_id uuid not null references public.helpers(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  review_text text,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.service_categories (name, description, base_price)
values
  ('Tutoring support', 'One-on-one academic tutoring and concept review.', 10),
  ('Editing and Proofreading', 'Human editing feedback, proofreading, clarity, and structure support.', 6),
  ('Research Guidance', 'Research planning, literature review guidance, and source strategy.', 12),
  ('Data Analysis Guidance', 'Guidance for statistics, spreadsheets, SPSS, R, regression, and interpretation.', 15),
  ('Formatting and Citations', 'APA, MLA, Chicago, Harvard, references, and formatting support.', 5),
  ('Presentation Support', 'Slide structure, presentation flow, and speaking notes feedback.', 8),
  ('Survey Participant Recruitment', 'Ethical recruitment of survey participants for research.', 0.75),
  ('Writing Check', 'Originality risk review, clarity feedback, and improvement guidance.', 6)
on conflict (name) do nothing;

alter table public.profiles enable row level security;
alter table public.helpers enable row level security;
alter table public.service_categories enable row level security;
alter table public.requests enable row level security;
alter table public.survey_requests enable row level security;
alter table public.request_files enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and role = 'admin'
  );
$$;

create policy "Users can view own profile"
on public.profiles
for select
using (id = auth.uid() or public.is_admin());

create policy "Users can update own profile"
on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can insert own profile"
on public.profiles
for insert
with check (id = auth.uid());

create policy "Public can view verified helpers"
on public.helpers
for select
using (is_verified = true or public.is_admin());

create policy "Admins can manage helpers"
on public.helpers
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active service categories"
on public.service_categories
for select
using (is_active = true);

create policy "Admins can manage service categories"
on public.service_categories
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Students can create own requests"
on public.requests
for insert
with check (user_id = auth.uid());

create policy "Students can view own requests"
on public.requests
for select
using (
  user_id = auth.uid()
  or public.is_admin()
  or helper_id in (select id from public.helpers where profile_id = auth.uid())
);

create policy "Students can update own draft or submitted requests"
on public.requests
for update
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can manage survey details for own requests"
on public.survey_requests
for all
using (
  request_id in (select id from public.requests where user_id = auth.uid())
  or public.is_admin()
)
with check (
  request_id in (select id from public.requests where user_id = auth.uid())
  or public.is_admin()
);

create policy "Users can manage files for own requests"
on public.request_files
for all
using (
  user_id = auth.uid()
  or request_id in (select id from public.requests where user_id = auth.uid())
  or public.is_admin()
)
with check (
  user_id = auth.uid()
  or public.is_admin()
);

create policy "Users can view own conversations"
on public.conversations
for select
using (
  student_id = auth.uid()
  or support_admin_id = auth.uid()
  or public.is_admin()
  or helper_id in (select id from public.helpers where profile_id = auth.uid())
);

create policy "Students can create conversations"
on public.conversations
for insert
with check (student_id = auth.uid());

create policy "Users can view messages in their conversations"
on public.messages
for select
using (
  conversation_id in (
    select id
    from public.conversations
    where student_id = auth.uid()
       or support_admin_id = auth.uid()
       or public.is_admin()
       or helper_id in (select id from public.helpers where profile_id = auth.uid())
  )
);

create policy "Users can send messages in their conversations"
on public.messages
for insert
with check (
  sender_id = auth.uid()
  and conversation_id in (
    select id
    from public.conversations
    where student_id = auth.uid()
       or support_admin_id = auth.uid()
       or public.is_admin()
       or helper_id in (select id from public.helpers where profile_id = auth.uid())
  )
);

create policy "Public can view public reviews"
on public.reviews
for select
using (is_public = true or public.is_admin());

create policy "Students can create reviews for own requests"
on public.reviews
for insert
with check (student_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'student'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
