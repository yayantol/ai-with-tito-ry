insert into site_content (key, value, type, label, section, options) values

-- Nav (main nav links)
('nav_link1_label', 'About',        'text', 'Nav Link 1 Label', 'Nav', null),
('nav_link1_url',   '#about',       'url',  'Nav Link 1 URL',   'Nav', null),
('nav_link2_label', 'Services',     'text', 'Nav Link 2 Label', 'Nav', null),
('nav_link2_url',   '#services',    'url',  'Nav Link 2 URL',   'Nav', null),
('nav_link3_label', 'How It Works', 'text', 'Nav Link 3 Label', 'Nav', null),
('nav_link3_url',   '#how-it-works','url',  'Nav Link 3 URL',   'Nav', null),
('nav_link4_label', 'Topics',       'text', 'Nav Link 4 Label', 'Nav', null),
('nav_link4_url',   '#topics',      'url',  'Nav Link 4 URL',   'Nav', null),

-- Hero
('hero_photo_badge', '⚡ Automate · Elevate · Dominate', 'text', 'Photo Badge Text', 'Hero', null),

-- Services (URLs + tags)
('service1_url',  '#', 'url',  'Service 1 URL',  'Services', null),
('service1_tags', 'ChatGPT,Claude,Gemini', 'text', 'Service 1 Tags (comma-sep)', 'Services', null),
('service2_url',  '#', 'url',  'Service 2 URL',  'Services', null),
('service2_tags', 'n8n,Make,Zapier', 'text', 'Service 2 Tags (comma-sep)', 'Services', null),
('service3_url',  '#', 'url',  'Service 3 URL',  'Services', null),
('service3_tags', 'Agents,Agentic Flows', 'text', 'Service 3 Tags (comma-sep)', 'Services', null),
('service4_url',  '#', 'url',  'Service 4 URL',  'Services', null),
('service4_tags', 'YouTube,Tutorials', 'text', 'Service 4 Tags (comma-sep)', 'Services', null),
('service5_url',  '#', 'url',  'Service 5 URL',  'Services', null),
('service5_tags', 'Community,1-on-1', 'text', 'Service 5 Tags (comma-sep)', 'Services', null),
('service6_url',  '#', 'url',  'Service 6 URL',  'Services', null),
('service6_tags', 'Custom Builds,DFY', 'text', 'Service 6 Tags (comma-sep)', 'Services', null),
('service_featured', '2', 'select', 'Featured (Popular) Service #', 'Services', '["1","2","3","4","5","6","none"]'),

-- Topics (URLs)
('topic1_url', '#', 'url', 'Topic 1 URL', 'Topics', null),
('topic2_url', '#', 'url', 'Topic 2 URL', 'Topics', null),
('topic3_url', '#', 'url', 'Topic 3 URL', 'Topics', null),
('topic4_url', '#', 'url', 'Topic 4 URL', 'Topics', null),
('topic5_url', '#', 'url', 'Topic 5 URL', 'Topics', null),
('topic6_url', '#', 'url', 'Topic 6 URL', 'Topics', null),
('topic7_url', '#', 'url', 'Topic 7 URL', 'Topics', null),
('topic8_url', '#', 'url', 'Topic 8 URL', 'Topics', null),

-- About (CTA button)
('about_cta_text', '',  'text', 'CTA Button Text (leave blank to hide)', 'About', null),
('about_cta_url',  '#', 'url',  'CTA Button URL', 'About', null),

-- Footer
('footer_privacy_url', '#', 'url', 'Privacy Page URL', 'Footer', null),
('footer_terms_url',   '#', 'url', 'Terms Page URL',   'Footer', null),

-- Global
('site_name',    'AI Automation with Tito Ry', 'text', 'Site Name',     'Global', null),
('site_tagline', 'Think. Automate. Succeed.',  'text', 'Site Tagline',  'Global', null),
('site_email',   '',                           'text', 'Contact Email', 'Global', null);
