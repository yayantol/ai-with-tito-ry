-- ── TESTIMONIALS ──────────────────────────────────────────────────────────
create table testimonials (
  id         uuid        default gen_random_uuid() primary key,
  initials   text        not null,
  name       text        not null,
  role       text        not null,
  body       text        not null,
  sort_order int         not null default 0
);

alter table testimonials enable row level security;
create policy "public read" on testimonials for select to anon        using (true);
create policy "auth write"  on testimonials for all   to authenticated using (true) with check (true);

insert into testimonials (initials, name, role, body, sort_order) values
  ('JM', 'James M.',  'Online Business Owner',    'Tito Ry''s tutorials are the clearest AI content I''ve found. I built my first automation in a weekend and saved 8 hours a week immediately.', 0),
  ('SA', 'Sofia A.',  'Marketing Agency Founder', 'I went from AI-curious to AI-confident. The way he breaks down complex tools into simple steps is unmatched. My team now runs on automation.', 1),
  ('RK', 'Ryan K.',   'Consultant & Coach',       'The n8n automation walkthrough alone was worth it. I automated our entire client intake process — what took 3 hours now takes 5 minutes.',   2);

-- ── NAV LINKS ──────────────────────────────────────────────────────────────
create table nav_links (
  id           uuid        default gen_random_uuid() primary key,
  column_title text        not null,
  label        text        not null,
  url          text        not null default '#',
  sort_order   int         not null default 0
);

alter table nav_links enable row level security;
create policy "public read" on nav_links for select to anon        using (true);
create policy "auth write"  on nav_links for all   to authenticated using (true) with check (true);

insert into nav_links (column_title, label, url, sort_order) values
  ('Learn',   'Free Tutorials',   '#', 0),
  ('Learn',   'YouTube Channel',  '#', 1),
  ('Learn',   'Courses',          '#', 2),
  ('Learn',   'Blog',             '#', 3),
  ('Tools',   'n8n Workflows',    '#', 0),
  ('Tools',   'Make Templates',   '#', 1),
  ('Tools',   'Prompt Library',   '#', 2),
  ('Tools',   'AI Agent Kits',    '#', 3),
  ('Connect', 'Community',        '#', 0),
  ('Connect', '1-on-1 Coaching',  '#', 1),
  ('Connect', 'Contact',          '#', 2),
  ('Connect', 'Partner with Me',  '#', 3);
