"use client";
import { useEffect, useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { updateTestimonial, updateNavLink, upsertContent } from "./actions";
import type { Testimonial, NavLink, SiteContent } from "@/lib/supabase-server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SECTION_ORDER = ["Global", "Style", "Nav", "Hero", "Marquee", "About", "Services", "How It Works", "Topics", "CTA", "Footer"];
const LEGACY_SECTIONS = ["Testimonials", "Footer Nav Links"];

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady]               = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [navLinks, setNavLinks]         = useState<NavLink[]>([]);
  const [contentRows, setContentRows]   = useState<SiteContent[]>([]);
  const [local, setLocal]               = useState<Record<string, string>>({});
  const [saved, setSaved]               = useState<string | null>(null);
  const [isPending, startTransition]    = useTransition();
  const [activeSection, setActiveSection] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace("/admin/login"); return; }
      loadData();
      setReady(true);
    });
  }, []);

  async function loadData() {
    const [{ data: t }, { data: n }, { data: c }] = await Promise.all([
      supabase.from("testimonials").select("*").order("sort_order"),
      supabase.from("nav_links").select("*").order("sort_order"),
      supabase.from("site_content").select("*"),
    ]);
    if (t) setTestimonials(t as Testimonial[]);
    if (n) setNavLinks(n as NavLink[]);
    if (c) {
      setContentRows(c as SiteContent[]);
      const map: Record<string, string> = {};
      for (const row of c as SiteContent[]) map[row.key] = row.value;
      setLocal(map);
    }
  }

  function flash(id: string) { setSaved(id); setTimeout(() => setSaved(null), 2000); }
  function setField(key: string, value: string) { setLocal((p) => ({ ...p, [key]: value })); }

  function saveSection(section: string) {
    const items = contentRows.filter((r) => r.section === section).map((r) => ({ key: r.key, value: local[r.key] ?? r.value }));
    startTransition(async () => { await upsertContent(items); flash(`s:${section}`); });
  }

  function updateLocalTestimonial(id: string, field: keyof Testimonial, value: string) {
    setTestimonials((p) => p.map((t) => t.id === id ? { ...t, [field]: value } : t));
  }
  function updateLocalNavLink(id: string, value: string) {
    setNavLinks((p) => p.map((n) => n.id === id ? { ...n, url: value } : n));
  }
  function saveTestimonial(t: Testimonial) {
    startTransition(async () => { await updateTestimonial(t.id, { name: t.name, initials: t.initials, role: t.role, body: t.body }); flash(t.id); });
  }
  function saveNavLink(n: NavLink) {
    startTransition(async () => { await updateNavLink(n.id, n.url); flash(n.id); });
  }
  async function handleSignOut() { await supabase.auth.signOut(); router.push("/admin/login"); }

  function scrollTo(id: string) {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handler = () => {
      const allSections = [...SECTION_ORDER, ...LEGACY_SECTIONS];
      for (const s of [...allSections].reverse()) {
        const el2 = document.getElementById(`section-${s}`);
        if (el2 && el2.getBoundingClientRect().top <= 120) { setActiveSection(s); break; }
      }
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, [ready]);

  if (!ready) return <div className="min-h-screen bg-navy flex items-center justify-center"><p className="text-slate-400">Loading…</p></div>;

  const presentSections = SECTION_ORDER.filter((s) => contentRows.some((r) => r.section === s));
  const allNavItems = [...presentSections, ...LEGACY_SECTIONS];

  function renderInput(row: SiteContent) {
    const val = local[row.key] ?? row.value;
    const base = "w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors";
    if (row.type === "select" && row.options) {
      const opts: string[] = JSON.parse(row.options);
      return (
        <select value={val} onChange={(e) => setField(row.key, e.target.value)} className={base + " cursor-pointer"}>
          {opts.map((o) => <option key={o} value={o} className="bg-navy text-white">{o}{row.key === "font_scale" ? "px" : ""}</option>)}
        </select>
      );
    }
    if (row.type === "textarea") {
      return <textarea value={val} onChange={(e) => setField(row.key, e.target.value)} rows={3} className={base + " resize-y"} />;
    }
    return <input type={row.type === "url" ? "url" : "text"} value={val} onChange={(e) => setField(row.key, e.target.value)} placeholder={row.type === "url" ? "https://…" : ""} className={base} />;
  }

  return (
    <div className="min-h-screen bg-navy text-white flex flex-col">
      {/* Header */}
      <header className="bg-navy-mid border-b border-white/10 px-6 py-3 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-blue-gradient flex items-center justify-center font-poppins font-black text-white text-xs">AR</div>
          <div>
            <span className="font-poppins font-bold text-sm">Admin CMS</span>
            <span className="text-slate-500 text-xs ml-2">AI with Tito Ry</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <a href="/" target="_blank" className="text-xs text-brand-bright hover:underline">View Site ↗</a>
          <button onClick={handleSignOut} className="text-xs text-slate-400 hover:text-white border border-white/10 rounded-lg px-3 py-1.5 transition-colors">Sign Out</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 bg-navy-mid border-r border-white/10 overflow-y-auto">
          <nav className="py-4 px-3 space-y-0.5">
            {allNavItems.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeSection === s ? "bg-brand-blue/20 text-brand-bright" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
              >
                {s}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main scroll area */}
        <div ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

            {/* Dynamic site_content sections */}
            {presentSections.map((section) => {
              const rows = contentRows.filter((r) => r.section === section);
              const savedKey = `s:${section}`;
              return (
                <div key={section} id={`section-${section}`} className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden scroll-mt-4">
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h2 className="font-poppins font-bold text-sm">{section}</h2>
                      <p className="text-xs text-slate-500">{rows.length} field{rows.length !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {saved === savedKey && <span className="text-xs text-green-400">Saved!</span>}
                      <button onClick={() => saveSection(section)} disabled={isPending} className="bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity">
                        Save {section}
                      </button>
                    </div>
                  </div>
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {rows.map((row) => (
                      <div key={row.key} className={row.type === "textarea" ? "sm:col-span-2" : ""}>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{row.label}</label>
                        {renderInput(row)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Testimonials */}
            <div id="section-Testimonials" className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden scroll-mt-4">
              <div className="px-5 py-4 border-b border-white/10">
                <h2 className="font-poppins font-bold text-sm">Testimonials</h2>
                <p className="text-xs text-slate-500">Name, initials, role, and quote</p>
              </div>
              <div className="p-5 space-y-5">
                {testimonials.map((t) => (
                  <div key={t.id} className="border border-white/8 rounded-xl p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Name</label>
                        <input value={t.name} onChange={(e) => updateLocalTestimonial(t.id, "name", e.target.value)} className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Initials</label>
                        <input value={t.initials} onChange={(e) => updateLocalTestimonial(t.id, "initials", e.target.value)} maxLength={3} className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Role</label>
                        <input value={t.role} onChange={(e) => updateLocalTestimonial(t.id, "role", e.target.value)} className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Quote</label>
                      <textarea value={t.body} onChange={(e) => updateLocalTestimonial(t.id, "body", e.target.value)} rows={3} className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors resize-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => saveTestimonial(t)} disabled={isPending} className="bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity">Save</button>
                      {saved === t.id && <span className="text-xs text-green-400">Saved!</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Nav Links */}
            <div id="section-Footer Nav Links" className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden scroll-mt-4">
              <div className="px-5 py-4 border-b border-white/10">
                <h2 className="font-poppins font-bold text-sm">Footer Nav Links</h2>
                <p className="text-xs text-slate-500">Learn, Tools, Connect column URLs</p>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Learn","Tools","Connect"].map((col) => (
                  <div key={col}>
                    <h3 className="font-poppins font-bold text-xs text-brand-bright uppercase tracking-widest mb-4">{col}</h3>
                    <div className="space-y-3">
                      {navLinks.filter((n) => n.column_title === col).map((n) => (
                        <div key={n.id}>
                          <label className="block text-[11px] text-slate-400 mb-1">{n.label}</label>
                          <div className="flex gap-2">
                            <input value={n.url} onChange={(e) => updateLocalNavLink(n.id, e.target.value)} placeholder="https://…" className="flex-1 bg-navy border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue transition-colors min-w-0" />
                            <button onClick={() => saveNavLink(n)} disabled={isPending} className="bg-brand-blue text-white text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 disabled:opacity-60 shrink-0 transition-opacity">
                              {saved === n.id ? "✓" : "Save"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
