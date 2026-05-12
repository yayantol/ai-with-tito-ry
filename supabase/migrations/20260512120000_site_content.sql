create table site_content (
  key     text primary key,
  value   text not null default '',
  type    text not null default 'text',
  label   text not null,
  section text not null,
  options text
);

alter table site_content enable row level security;
create policy "public read" on site_content for select to anon        using (true);
create policy "auth write"  on site_content for all   to authenticated using (true) with check (true);

insert into site_content (key, value, type, label, section, options) values

-- Style
('font_heading', 'Poppins',    'select',   'Heading Font',    'Style', '["Poppins","Raleway","Oswald","Montserrat","Nunito"]'),
('font_body',    'Montserrat', 'select',   'Body Font',       'Style', '["Montserrat","Inter","Open Sans","Lato","Nunito"]'),
('font_scale',   '16',         'select',   'Base Font Size',  'Style', '["14","15","16","17","18","20"]'),

-- Nav
('nav_cta_text', 'Get Started', 'text', 'Nav CTA Button Text', 'Nav', null),
('nav_cta_url',  '#cta',        'url',  'Nav CTA Button URL',  'Nav', null),

-- Hero
('hero_badge',       'AI Automation Expert',  'text',     'Badge Text',                  'Hero', null),
('hero_line1',       'Think.',                'text',     'Headline Line 1',             'Hero', null),
('hero_line2',       'Automate.',             'text',     'Headline Line 2 (gradient)',  'Hero', null),
('hero_line3',       'Succeed.',              'text',     'Headline Line 3',             'Hero', null),
('hero_subtext',     'Learn how to harness the power of AI to automate your business, eliminate repetitive tasks, and scale what matters — with Tito Ry as your guide.', 'textarea', 'Sub-headline', 'Hero', null),
('hero_cta1_text',   'Start Automating →',    'text',     'Primary CTA Text',            'Hero', null),
('hero_cta1_url',    '#cta',                  'url',      'Primary CTA URL',             'Hero', null),
('hero_cta2_text',   '▶ See How It Works',    'text',     'Secondary CTA Text',          'Hero', null),
('hero_cta2_url',    '#services',             'url',      'Secondary CTA URL',           'Hero', null),
('hero_stat1_num',   '10K+',                  'text',     'Stat 1 Number',               'Hero', null),
('hero_stat1_label', 'Community Members',     'text',     'Stat 1 Label',                'Hero', null),
('hero_stat2_num',   '50+',                   'text',     'Stat 2 Number',               'Hero', null),
('hero_stat2_label', 'Automations Built',     'text',     'Stat 2 Label',                'Hero', null),
('hero_stat3_num',   '100%',                  'text',     'Stat 3 Number',               'Hero', null),
('hero_stat3_label', 'Practical & Real',      'text',     'Stat 3 Label',                'Hero', null),

-- Marquee
('marquee_items', 'AI Automation,ChatGPT & Claude,n8n Workflows,Make (Integromat),Zapier,AI Agents,Business Automation,Prompt Engineering', 'textarea', 'Items (comma-separated)', 'Marquee', null),

-- About
('about_label',         'About Tito Ry',         'text',     'Section Label',  'About', null),
('about_title',         'Building Intelligent Systems. Empowering Real People.', 'textarea', 'Section Title', 'About', null),
('about_para1',         'I''m Tito Ry — an AI automation educator and practitioner dedicated to helping entrepreneurs, business owners, and professionals use AI to work smarter, not harder.', 'textarea', 'Paragraph 1', 'About', null),
('about_para2',         'Whether you''re just getting started with AI tools or ready to build full-scale automation pipelines, I break it down into simple, actionable steps you can implement today.', 'textarea', 'Paragraph 2', 'About', null),
('about_quote',         'AI isn''t here to replace you — it''s here to multiply you. Let''s build that future together.', 'textarea', 'Pull Quote', 'About', null),
('about_pillar1_title', 'Clear & Simple',         'text',     'Pillar 1 Title', 'About', null),
('about_pillar1_desc',  'No fluff. Just what works.', 'text', 'Pillar 1 Desc',  'About', null),
('about_pillar2_title', 'Empowering',             'text',     'Pillar 2 Title', 'About', null),
('about_pillar2_desc',  'Tools you can use right now.', 'text', 'Pillar 2 Desc', 'About', null),
('about_pillar3_title', 'Trusted',                'text',     'Pillar 3 Title', 'About', null),
('about_pillar3_desc',  'Proven strategies, real results.', 'text', 'Pillar 3 Desc', 'About', null),
('about_pillar4_title', 'Innovative',             'text',     'Pillar 4 Title', 'About', null),
('about_pillar4_desc',  'Always on the cutting edge.', 'text', 'Pillar 4 Desc', 'About', null),

-- Services
('services_label',    'What I Offer',             'text',     'Section Label',    'Services', null),
('services_title',    'Everything You Need to Automate & Grow', 'text', 'Section Title', 'Services', null),
('services_subtitle', 'From beginner tutorials to advanced agent systems — covered at every level.', 'textarea', 'Section Subtitle', 'Services', null),
('service1_icon',  '🎓', 'text', 'Service 1 Icon',  'Services', null),
('service1_title', 'AI Education & Training',  'text', 'Service 1 Title', 'Services', null),
('service1_desc',  'Step-by-step courses on AI tools, prompt engineering, and automation fundamentals for all skill levels.', 'textarea', 'Service 1 Desc', 'Services', null),
('service2_icon',  '⚙️', 'text', 'Service 2 Icon',  'Services', null),
('service2_title', 'Business Automation',      'text', 'Service 2 Title', 'Services', null),
('service2_desc',  'Build powerful no-code and low-code workflows that save hours every week and eliminate manual tasks.', 'textarea', 'Service 2 Desc', 'Services', null),
('service3_icon',  '🤖', 'text', 'Service 3 Icon',  'Services', null),
('service3_title', 'AI Agent Building',        'text', 'Service 3 Title', 'Services', null),
('service3_desc',  'Design and deploy autonomous AI agents that research, write, decide, and act on your behalf — 24/7.', 'textarea', 'Service 3 Desc', 'Services', null),
('service4_icon',  '📢', 'text', 'Service 4 Icon',  'Services', null),
('service4_title', 'Content & YouTube',        'text', 'Service 4 Title', 'Services', null),
('service4_desc',  'Weekly videos breaking down the latest AI tools, automation walkthroughs, and business use cases.', 'textarea', 'Service 4 Desc', 'Services', null),
('service5_icon',  '💬', 'text', 'Service 5 Icon',  'Services', null),
('service5_title', 'Community & Coaching',     'text', 'Service 5 Title', 'Services', null),
('service5_desc',  'Join a thriving community of AI-forward thinkers. Get personalized guidance and peer support.', 'textarea', 'Service 5 Desc', 'Services', null),
('service6_icon',  '🛠️', 'text', 'Service 6 Icon',  'Services', null),
('service6_title', 'Done-For-You Systems',     'text', 'Service 6 Title', 'Services', null),
('service6_desc',  'Custom AI automation systems built for your business — from lead generation to content pipelines.', 'textarea', 'Service 6 Desc', 'Services', null),

-- How It Works
('hiw_label',    'The Process',          'text',     'Section Label',    'How It Works', null),
('hiw_title',    'From Zero to Fully Automated', 'text', 'Section Title', 'How It Works', null),
('hiw_subtitle', 'A proven 4-step system to transform how you work with AI.', 'textarea', 'Section Subtitle', 'How It Works', null),
('step1_title',  'Learn the Fundamentals',     'text',     'Step 1 Title', 'How It Works', null),
('step1_desc',   'Understand how AI tools work and where automation creates the most value in your business.', 'textarea', 'Step 1 Desc', 'How It Works', null),
('step2_title',  'Identify Your Bottlenecks',  'text',     'Step 2 Title', 'How It Works', null),
('step2_desc',   'Pinpoint the repetitive, time-draining tasks holding you back from scaling.', 'textarea', 'Step 2 Desc', 'How It Works', null),
('step3_title',  'Build Your Automations',     'text',     'Step 3 Title', 'How It Works', null),
('step3_desc',   'Follow step-by-step walkthroughs to connect your tools and create workflows that run themselves.', 'textarea', 'Step 3 Desc', 'How It Works', null),
('step4_title',  'Scale & Dominate',           'text',     'Step 4 Title', 'How It Works', null),
('step4_desc',   'Layer advanced AI agents on top to create systems that grow with your business automatically.', 'textarea', 'Step 4 Desc', 'How It Works', null),

-- Topics
('topics_label',    'Content Topics',   'text',     'Section Label',    'Topics', null),
('topics_title',    'What You''ll Master', 'text',  'Section Title',    'Topics', null),
('topics_subtitle', 'Deep dives into the tools and strategies powering the AI automation revolution.', 'textarea', 'Section Subtitle', 'Topics', null),
('topic1_icon',  '✍️', 'text', 'Topic 1 Icon',  'Topics', null),
('topic1_title', 'Prompt Engineering',   'text', 'Topic 1 Title', 'Topics', null),
('topic1_desc',  'Get precise, powerful outputs from any AI model with proven prompting frameworks.', 'textarea', 'Topic 1 Desc', 'Topics', null),
('topic2_icon',  '🔗', 'text', 'Topic 2 Icon',  'Topics', null),
('topic2_title', 'Workflow Automation',  'text', 'Topic 2 Title', 'Topics', null),
('topic2_desc',  'n8n, Make, and Zapier walkthroughs for real business automation scenarios.', 'textarea', 'Topic 2 Desc', 'Topics', null),
('topic3_icon',  '🤖', 'text', 'Topic 3 Icon',  'Topics', null),
('topic3_title', 'AI Agents',            'text', 'Topic 3 Title', 'Topics', null),
('topic3_desc',  'Build multi-step autonomous agents that research, draft, and take action for you.', 'textarea', 'Topic 3 Desc', 'Topics', null),
('topic4_icon',  '📊', 'text', 'Topic 4 Icon',  'Topics', null),
('topic4_title', 'Business Systems',     'text', 'Topic 4 Title', 'Topics', null),
('topic4_desc',  'CRM automation, lead gen pipelines, client onboarding — all on autopilot.', 'textarea', 'Topic 4 Desc', 'Topics', null),
('topic5_icon',  '🎨', 'text', 'Topic 5 Icon',  'Topics', null),
('topic5_title', 'AI Content Creation',  'text', 'Topic 5 Title', 'Topics', null),
('topic5_desc',  'Images, videos, scripts, and social posts generated with minimal effort.', 'textarea', 'Topic 5 Desc', 'Topics', null),
('topic6_icon',  '📬', 'text', 'Topic 6 Icon',  'Topics', null),
('topic6_title', 'Email & Outreach',     'text', 'Topic 6 Title', 'Topics', null),
('topic6_desc',  'Personalized AI-driven email sequences that nurture leads and close deals.', 'textarea', 'Topic 6 Desc', 'Topics', null),
('topic7_icon',  '🧩', 'text', 'Topic 7 Icon',  'Topics', null),
('topic7_title', 'API & Integrations',   'text', 'Topic 7 Title', 'Topics', null),
('topic7_desc',  'Connect any tool to any other tool — no limits on what you can automate.', 'textarea', 'Topic 7 Desc', 'Topics', null),
('topic8_icon',  '💡', 'text', 'Topic 8 Icon',  'Topics', null),
('topic8_title', 'AI Strategy',          'text', 'Topic 8 Title', 'Topics', null),
('topic8_desc',  'Redesign your entire business around AI-first principles for maximum leverage.', 'textarea', 'Topic 8 Desc', 'Topics', null),

-- CTA Section
('cta_label',       'Join the Movement',  'text',     'Label',       'CTA', null),
('cta_title',       'Ready to Automate, Elevate & Dominate?', 'text', 'Title', 'CTA', null),
('cta_desc',        'Join thousands learning how to use AI to reclaim their time, scale their business, and stay ahead of the curve. Free tips, tutorials, and tools.', 'textarea', 'Description', 'CTA', null),
('cta_button_text', 'Join Free →',        'text',     'Button Text', 'CTA', null),

-- Footer
('footer_tagline',      'Building intelligent systems. Automating success. Empowering growth — one automation at a time.', 'textarea', 'Tagline', 'Footer', null),
('footer_copyright',    '© 2026 AI Automation with Tito Ry. All rights reserved.', 'text', 'Copyright Text', 'Footer', null),
('footer_youtube_url',  '#', 'url', 'YouTube URL',   'Footer', null),
('footer_linkedin_url', '#', 'url', 'LinkedIn URL',  'Footer', null),
('footer_twitter_url',  '#', 'url', 'Twitter/X URL', 'Footer', null),
('footer_facebook_url', '#', 'url', 'Facebook URL',  'Footer', null);
