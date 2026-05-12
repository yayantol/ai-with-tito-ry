"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { updateTestimonial, updateNavLink, upsertContent } from "./actions";
import type { Testimonial, NavLink, SiteContent } from "@/lib/supabase-server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SECTION_ORDER = ["Style", "Nav", "Hero", "Marquee", "About", "Services", "How It Works", "Topics", "CTA", "Footer"];

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady]             = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [navLinks, setNavLinks]       = useState<NavLink[]>([]);
  const [contentRows, setContentRows] = useState<SiteContent[]>([]);
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [saved, setSaved]             = useState<string | null>(null);
  const [isPending, startTransition]  = useTransition();

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
      supabase.from("site_content").select("*").order("section").order("key"),
    ]);
    if (t) setTestimonials(t as Testimonial[]);
    if (n) setNavLinks(n as NavLink[]);
    if (c) {
      setContentRows(c as SiteContent[]);
      const map: Record<string, string> = {};
      for (const row of c as SiteContent[]) map[row.key] = row.value;
      setLocalContent(map);
    }
  }

  function flash(id: string) {
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  }

  function setField(key: string, value: string) {
    setLocalContent((prev) => ({ ...prev, [key]: value }));
  }

  function saveSection(section: string) {
    const items = contentRows
      .filter((r) => r.section === section)
      .map((r) => ({ key: r.key, value: localContent[r.key] ?? r.value }));
    startTransition(async () => {
      await upsertContent(items);
      flash(`section-${section}`);
    });
  }

  function updateLocalTestimonial(id: string, field: keyof Testimonial, value: string) {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
  }

  function updateLocalNavLink(id: string, value: string) {
    setNavLinks((prev) => prev.map((n) => n.id === id ? { ...n, url: value } : n));
  }

  async function saveTestimonial(t: Testimonial) {
    startTransition(async () => {
      await updateTestimonial(t.id, { name: t.name, role: t.role, body: t.body });
      flash(t.id);
    });
  }

  async function saveNavLink(n: NavLink) {
    startTransition(async () => {
      await updateNavLink(n.id, n.url);
      flash(n.id);
    });
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (!ready) {
    return <div className="min-h-screen bg-navy flex items-center justify-center"><p className="text-slate-400">Loading…</p></div>;
  }

  const sections = SECTION_ORDER.filter((s) => contentRows.some((r) => r.section === s));

  function renderInput(row: SiteContent) {
    const val = localContent[row.key] ?? row.value;
    const base = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors";

    if (row.type === "select" && row.options) {
      const opts: string[] = JSON.parse(row.options);
      return (
        <select
          value={val}
          onChange={(e) => setField(row.key, e.target.value)}
          className={base + " cursor-pointer"}
        >
          {opts.map((o) => <option key={o} value={o} className="bg-navy text-white">{o}{row.section === "Style" && row.key === "font_scale" ? "px" : ""}</option>)}
        </select>
      );
    }
    if (row.type === "textarea") {
      return (
        <textarea
          value={val}
          onChange={(e) => setField(row.key, e.target.value)}
          rows={3}
          className={base + " resize-y"}
        />
      );
    }
    return (
      <input
        type={row.type === "url" ? "url" : "text"}
        value={val}
        onChange={(e) => setField(row.key, e.target.value)}
        placeholder={row.type === "url" ? "https://…" : ""}
        className={base}
      />
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="bg-navy-mid border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="font-poppins font-black text-xl">Tito Ry — Admin</h1>
          <p className="text-xs text-slate-400">Full Site CMS</p>
        </div>
        <div className="flex gap-3 items-center">
          <a href="/" target="_blank" className="text-xs text-brand-bright hover:underline">View Site ↗</a>
          <button onClick={handleSignOut} className="text-xs text-slate-400 hover:text-white border border-white/10 rounded-lg px-3 py-1.5 transition-colors">Sign Out</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        {/* Dynamic site_content sections */}
        {sections.map((section) => {
          const rows = contentRows.filter((r) => r.section === section);
          const savedKey = `section-${section}`;
          return (
            <section key={section} className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="font-poppins font-bold text-base">{section}</h2>
                  <p className="text-xs text-slate-400">{rows.length} field{rows.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  {saved === savedKey && <span className="text-xs text-green-400">Saved!</span>}
                  <button
                    onClick={() => saveSection(section)}
                    disabled={isPending}
                    className="bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    Save {section}
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rows.map((row) => (
                  <div key={row.key} className={row.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{row.label}</label>
                    {renderInput(row)}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Testimonials */}
        <section className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-poppins font-bold text-base">Testimonials</h2>
            <p className="text-xs text-slate-400">Edit name, role, and quote text</p>
          </div>
          <div className="p-6 space-y-6">
            {testimonials.map((t) => (
              <div key={t.id} className="border border-white/8 rounded-xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Name</label>
                    <input value={t.name} onChange={(e) => updateLocalTestimonial(t.id, "name", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Role</label>
                    <input value={t.role} onChange={(e) => updateLocalTestimonial(t.id, "role", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Quote</label>
                  <textarea value={t.body} onChange={(e) => updateLocalTestimonial(t.id, "body", e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => saveTestimonial(t)} disabled={isPending} className="bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60">Save</button>
                  {saved === t.id && <span className="text-xs text-green-400">Saved!</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Nav Links */}
        <section className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-poppins font-bold text-base">Footer Nav Links</h2>
            <p className="text-xs text-slate-400">Add URLs to the Learn, Tools, and Connect columns</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Learn","Tools","Connect"].map((col) => (
              <div key={col}>
                <h3 className="font-poppins font-bold text-sm text-brand-bright mb-4">{col}</h3>
                <div className="space-y-4">
                  {navLinks.filter((n) => n.column_title === col).map((n) => (
                    <div key={n.id}>
                      <label className="block text-xs text-slate-400 mb-1">{n.label}</label>
                      <div className="flex gap-2">
                        <input value={n.url} onChange={(e) => updateLocalNavLink(n.id, e.target.value)} placeholder="https://…" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue transition-colors min-w-0" />
                        <button onClick={() => saveNavLink(n)} disabled={isPending} className="bg-brand-blue text-white text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 shrink-0">
                          {saved === n.id ? "✓" : "Save"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
