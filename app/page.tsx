import React from "react";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { CTASection } from "@/app/_components/CTASection";
import { createClient } from "@supabase/supabase-js";
import type { Testimonial, NavLink } from "@/lib/supabase-server";

async function getPageData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [{ data: testimonials }, { data: navLinks }] = await Promise.all([
    supabase.from("testimonials").select("*").order("sort_order"),
    supabase.from("nav_links").select("*").order("sort_order"),
  ]);
  return {
    testimonials: (testimonials ?? []) as Testimonial[],
    navLinks: (navLinks ?? []) as NavLink[],
  };
}

// ── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-navy/90 backdrop-blur-md border-b border-brand-blue/15">
      <a href="#" className="flex items-center gap-3 no-underline">
        <div className="w-10 h-10 rounded-[10px] bg-blue-gradient flex items-center justify-center font-poppins font-black text-white text-sm tracking-tight">
          AR
        </div>
        <div className="font-poppins font-bold text-sm leading-tight text-white">
          AI Automation
          <br />
          <span className="text-brand-blue">with Tito Ry</span>
        </div>
      </a>
      <ul className="hidden md:flex gap-8 list-none">
        {["About", "Services", "How It Works", "Topics"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-slate-300 text-sm font-medium hover:text-brand-bright transition-colors no-underline"
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#cta"
            className="bg-brand-blue text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-brand-bright hover:text-navy transition-colors no-underline"
          >
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          particleColor="#1A7FFF"
          particleDensity={90}
          minSize={0.5}
          maxSize={1.6}
          speed={1.2}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 z-[1] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,black_100%)] bg-navy" />
      <div className="absolute inset-0 z-[1] bg-grid-overlay pointer-events-none" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/35 rounded-full px-4 py-1.5 text-brand-bright text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-bright animate-pulse" />
            AI Automation Expert
          </div>
          <h1 className="font-poppins font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5">
            Think.<br />
            <span className="text-gradient-blue">Automate.</span><br />
            Succeed.
          </h1>
          <p className="font-montserrat text-slate-300 text-lg leading-relaxed max-w-lg mb-8">
            Learn how to harness the power of AI to automate your business,
            eliminate repetitive tasks, and scale what matters — with Tito Ry as your guide.
          </p>
          <div className="flex flex-wrap gap-4 items-center mb-10">
            <a href="#cta" className="bg-blue-gradient text-white px-8 py-3.5 rounded-lg font-poppins font-bold text-base no-underline shadow-[0_4px_20px_rgba(26,127,255,0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(26,127,255,0.55)] transition-all">
              Start Automating →
            </a>
            <a href="#services" className="text-white px-8 py-3.5 rounded-lg font-poppins font-semibold text-base border border-white/20 no-underline hover:border-brand-blue hover:bg-brand-blue/8 transition-all">
              ▶ See How It Works
            </a>
          </div>
          <div className="flex gap-10 pt-6 border-t border-white/8">
            {[
              { num: "10K+", label: "Community Members" },
              { num: "50+",  label: "Automations Built" },
              { num: "100%", label: "Practical & Real" },
            ].map((s) => (
              <div key={s.label}>
                <span className="block font-poppins font-black text-3xl text-brand-bright">{s.num}</span>
                <span className="text-slate-400 text-xs font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[460px]">
            <div className="absolute -inset-[2px] bg-gradient-to-br from-brand-blue via-transparent to-brand-bright rounded-[20px] z-[-1]" />
            <div className="absolute top-5 -right-5 w-full h-full bg-brand-blue/10 rounded-[20px] z-[-2]" />
            <Image src="/hero-photo.png" alt="Tito Ry — AI Automation Expert" width={460} height={520} className="w-full h-[480px] object-cover object-top rounded-[18px] block" priority />
            <div className="absolute -bottom-5 -left-5 bg-gradient-to-br from-navy-mid to-navy-light border border-brand-blue/30 rounded-xl px-5 py-3 shadow-xl">
              <p className="font-poppins font-bold text-xs text-brand-bright uppercase tracking-[2px] m-0">⚡ Automate · Elevate · Dominate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center">
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent" />
      </div>
    </section>
  );
}

// ── MARQUEE ────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = ["AI Automation", "ChatGPT & Claude", "n8n Workflows", "Make (Integromat)", "Zapier", "AI Agents", "Business Automation", "Prompt Engineering"];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-brand-blue/8 border-y border-brand-blue/15 py-3 overflow-hidden">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 font-poppins font-semibold text-sm text-brand-bright uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── SECTION HELPERS ────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-brand-bright text-xs font-bold uppercase tracking-[3px] mb-3">{children}</p>;
}
function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-poppins font-black text-4xl md:text-5xl leading-[1.15] mb-4 ${className}`}>{children}</h2>;
}

// ── ABOUT ──────────────────────────────────────────────────────────────────
const PILLARS = [
  { icon: "🧠", title: "Clear & Simple",  desc: "No fluff. Just what works." },
  { icon: "⚡", title: "Empowering",       desc: "Tools you can use right now." },
  { icon: "🤝", title: "Trusted",          desc: "Proven strategies, real results." },
  { icon: "🚀", title: "Innovative",       desc: "Always on the cutting edge." },
];

function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionLabel>About Tito Ry</SectionLabel>
          <SectionTitle>Building Intelligent Systems.<br />Empowering Real People.</SectionTitle>
          <p className="text-slate-300 leading-relaxed mb-4">I&apos;m Tito Ry — an AI automation educator and practitioner dedicated to helping entrepreneurs, business owners, and professionals use AI to work smarter, not harder.</p>
          <p className="text-slate-300 leading-relaxed mb-6">Whether you&apos;re just getting started with AI tools or ready to build full-scale automation pipelines, I break it down into simple, actionable steps you can implement today.</p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:border-brand-blue/40 hover:bg-brand-blue/6 transition-all">
                <span className="text-2xl block mb-2">{p.icon}</span>
                <h4 className="font-poppins font-bold text-sm mb-1">{p.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-navy-mid to-navy-light rounded-[20px] p-10 border border-brand-blue/20 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl" />
          <span className="block font-poppins font-black text-7xl text-gradient-blue mb-2">AR</span>
          <p className="font-poppins font-semibold text-sm tracking-widest text-white uppercase">AI Automation with Tito Ry</p>
          <p className="text-xs text-slate-400 mt-1">Building intelligent systems. Automating success. Empowering growth.</p>
          <div className="w-16 h-1 rounded bg-blue-gradient my-6" />
          <p className="text-base italic text-slate-300 leading-relaxed">&ldquo;AI isn&apos;t here to replace you — it&apos;s here to <strong className="text-brand-bright not-italic">multiply you</strong>. Let&apos;s build that future together.&rdquo;</p>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ───────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "🎓", title: "AI Education & Training",  desc: "Step-by-step courses on AI tools, prompt engineering, and automation fundamentals for all skill levels.", tags: ["ChatGPT", "Claude", "Gemini"], featured: false },
  { icon: "⚙️", title: "Business Automation",       desc: "Build powerful no-code and low-code workflows that save hours every week and eliminate manual tasks.",        tags: ["n8n", "Make", "Zapier"],      featured: true  },
  { icon: "🤖", title: "AI Agent Building",         desc: "Design and deploy autonomous AI agents that research, write, decide, and act on your behalf — 24/7.",        tags: ["Agents", "Agentic Flows"],    featured: false },
  { icon: "📢", title: "Content & YouTube",         desc: "Weekly videos breaking down the latest AI tools, automation walkthroughs, and business use cases.",           tags: ["YouTube", "Tutorials"],       featured: false },
  { icon: "💬", title: "Community & Coaching",      desc: "Join a thriving community of AI-forward thinkers. Get personalized guidance and peer support.",               tags: ["Community", "1-on-1"],        featured: false },
  { icon: "🛠️", title: "Done-For-You Systems",      desc: "Custom AI automation systems built for your business — from lead generation to content pipelines.",           tags: ["Custom Builds", "DFY"],       featured: false },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-10 bg-gradient-to-b from-navy to-navy-mid">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>What I Offer</SectionLabel>
          <SectionTitle className="mx-auto">Everything You Need to<br />Automate &amp; Grow</SectionTitle>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">From beginner tutorials to advanced agent systems — covered at every level.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1.5 ${s.featured ? "border-brand-blue bg-brand-blue/8" : "border-white/7 bg-white/[0.03] hover:border-brand-blue/40 hover:bg-brand-blue/5"}`}>
              {s.featured && <span className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">Popular</span>}
              <div className="w-12 h-12 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-2xl mb-5">{s.icon}</div>
              <h3 className="font-poppins font-bold text-lg mb-2.5">{s.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (<span key={t} className="bg-brand-blue/12 border border-brand-blue/25 text-brand-bright text-[11px] font-semibold px-2.5 py-0.5 rounded-full">{t}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ───────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Learn the Fundamentals",    desc: "Understand how AI tools work and where automation creates the most value in your business." },
  { n: "02", title: "Identify Your Bottlenecks", desc: "Pinpoint the repetitive, time-draining tasks holding you back from scaling." },
  { n: "03", title: "Build Your Automations",    desc: "Follow step-by-step walkthroughs to connect your tools and create workflows that run themselves." },
  { n: "04", title: "Scale & Dominate",          desc: "Layer advanced AI agents on top to create systems that grow with your business automatically." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>The Process</SectionLabel>
          <SectionTitle className="mx-auto">From Zero to<br />Fully Automated</SectionTitle>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">A proven 4-step system to transform how you work with AI.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent z-0" />
          {STEPS.map((s) => (
            <div key={s.n} className="text-center px-4 relative z-10">
              <div className="w-[72px] h-[72px] mx-auto mb-5 rounded-full border-2 border-brand-blue/30 bg-gradient-to-br from-navy-light to-navy-mid flex items-center justify-center">
                <span className="font-poppins font-black text-2xl text-gradient-blue">{s.n}</span>
              </div>
              <h4 className="font-poppins font-bold text-base mb-2">{s.title}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TOPICS ─────────────────────────────────────────────────────────────────
const TOPICS = [
  { icon: "✍️", title: "Prompt Engineering",  desc: "Get precise, powerful outputs from any AI model with proven prompting frameworks." },
  { icon: "🔗", title: "Workflow Automation",  desc: "n8n, Make, and Zapier walkthroughs for real business automation scenarios." },
  { icon: "🤖", title: "AI Agents",            desc: "Build multi-step autonomous agents that research, draft, and take action for you." },
  { icon: "📊", title: "Business Systems",      desc: "CRM automation, lead gen pipelines, client onboarding — all on autopilot." },
  { icon: "🎨", title: "AI Content Creation",  desc: "Images, videos, scripts, and social posts generated with minimal effort." },
  { icon: "📬", title: "Email & Outreach",      desc: "Personalized AI-driven email sequences that nurture leads and close deals." },
  { icon: "🧩", title: "API & Integrations",   desc: "Connect any tool to any other tool — no limits on what you can automate." },
  { icon: "💡", title: "AI Strategy",           desc: "Redesign your entire business around AI-first principles for maximum leverage." },
];

function Topics() {
  return (
    <section id="topics" className="py-24 px-6 md:px-10 bg-navy-mid">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Content Topics</SectionLabel>
          <SectionTitle className="mx-auto">What You&apos;ll Master</SectionTitle>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Deep dives into the tools and strategies powering the AI automation revolution.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS.map((t) => (
            <div key={t.title} className="bg-navy border border-white/6 rounded-2xl p-5 hover:border-brand-blue/35 hover:-translate-y-1 transition-all">
              <span className="text-3xl block mb-3">{t.icon}</span>
              <h4 className="font-poppins font-bold text-sm mb-1.5">{t.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS (server-rendered from DB) ─────────────────────────────────
function Testimonials({ data }: { data: Testimonial[] }) {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Community Love</SectionLabel>
          <SectionTitle className="mx-auto">Real People.<br />Real Results.</SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.map((t) => (
            <div key={t.id} className="bg-white/[0.03] border border-white/7 rounded-2xl p-7 hover:border-brand-blue/30 transition-all">
              <p className="text-brand-gold text-sm tracking-[3px] mb-4">★★★★★</p>
              <blockquote className="text-sm text-slate-300 leading-relaxed italic mb-6">&ldquo;{t.body}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-gradient flex items-center justify-center font-poppins font-bold text-sm text-white flex-shrink-0">{t.initials}</div>
                <div>
                  <strong className="font-poppins font-semibold text-sm block">{t.name}</strong>
                  <span className="text-xs text-slate-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER (server-rendered from DB) ──────────────────────────────────────
function Footer({ navLinks }: { navLinks: NavLink[] }) {
  const columns = ["Learn", "Tools", "Connect"];
  return (
    <footer className="bg-[#090F1A] pt-14 pb-8 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[10px] bg-blue-gradient flex items-center justify-center font-poppins font-black text-white text-sm">AR</div>
            <div className="font-poppins font-bold text-sm text-white leading-tight">AI Automation<br /><span className="text-brand-blue">with Tito Ry</span></div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-[240px] mb-5">Building intelligent systems. Automating success. Empowering growth — one automation at a time.</p>
          <div className="flex gap-2">
            {["▶", "in", "𝕏", "f"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-sm text-white hover:bg-brand-blue/15 hover:border-brand-blue/40 transition-all no-underline">{s}</a>
            ))}
          </div>
        </div>
        {columns.map((col) => {
          const links = navLinks.filter((l) => l.column_title === col);
          return (
            <div key={col}>
              <h5 className="font-poppins font-bold text-sm text-white mb-4 tracking-wide">{col}</h5>
              <ul className="list-none space-y-2.5">
                {links.map((l) => (
                  <li key={l.id}>
                    <a href={l.url} className="text-slate-400 text-sm hover:text-brand-bright transition-colors no-underline">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
        <span>© 2026 AI Automation with Tito Ry. All rights reserved.</span>
        <span>Built with ⚡ and AI · <a href="#" className="text-brand-bright no-underline">Privacy</a> · <a href="#" className="text-brand-bright no-underline">Terms</a></span>
      </div>
    </footer>
  );
}

// ── PAGE ───────────────────────────────────────────────────────────────────
export default async function Page() {
  const { testimonials, navLinks } = await getPageData();
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <HowItWorks />
      <Topics />
      <Testimonials data={testimonials} />
      <CTASection />
      <Footer navLinks={navLinks} />
    </>
  );
}
