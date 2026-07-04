# StudyHuman Backend Setup

This project is prepared for Supabase.

## Local environment variables

Create `.env.local` with:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Use the Supabase project URL and anon public key from your Supabase project settings.

## Backend tables

The first migration is located at:

supabase/migrations/001_studyhuman_backend.sql

It includes:

- profiles
- helpers
- service_categories
- requests
- survey_requests
- request_files
- conversations
- messages
- reviews

## Security

Use Supabase Row Level Security. The frontend must only use the anon key. Never put a service role key in frontend code.

## Next steps

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Paste and run the SQL migration.
4. Add the Supabase URL and anon key to `.env.local`.
5. Restart the local dev server.
6. Connect request forms and messages to Supabase.
