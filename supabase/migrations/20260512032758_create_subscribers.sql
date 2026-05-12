create table subscribers (
  id         uuid        default gen_random_uuid() primary key,
  email      text        not null unique,
  created_at timestamptz default now()
);

alter table subscribers enable row level security;

-- anon can INSERT (newsletter signup), but cannot read other people's emails
create policy "anon can subscribe"
  on subscribers for insert
  to anon
  with check (true);
