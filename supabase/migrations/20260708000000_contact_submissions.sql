create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  city text not null,
  interest text,
  message text,
  monthly_bill text,
  source_page text,
  status text not null default 'new'
);

alter table public.contact_submissions enable row level security;

drop policy if exists "Anyone can create contact submissions" on public.contact_submissions;
create policy "Anyone can create contact submissions"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

create index if not exists contact_submissions_created_at_idx
on public.contact_submissions (created_at desc);
