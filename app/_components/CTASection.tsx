"use client";
import React, { useState } from "react";
import type { ContentMap } from "@/lib/supabase-server";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-brand-bright text-xs font-bold uppercase tracking-[3px] mb-3">{children}</p>;
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-poppins font-black text-4xl md:text-5xl leading-[1.15] mb-4 mx-auto">
      {children}
    </h2>
  );
}

export function CTASection({ content = {} }: { content?: ContentMap }) {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "dupe">("idle");
  const [msg, setMsg]       = useState("");

  const label      = content["cta_label"]       ?? "Join the Movement";
  const title      = content["cta_title"]        ?? "Ready to Automate, Elevate & Dominate?";
  const desc       = content["cta_desc"]         ?? "Join thousands learning how to use AI to reclaim their time, scale their business, and stay ahead of the curve. Free tips, tutorials, and tools.";
  const buttonText = content["cta_button_text"]  ?? "Join Free →";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus(res.status === 409 ? "dupe" : "error");
        setMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Try again.");
    }
  }

  return (
    <section id="cta" className="relative py-24 px-6 md:px-10 text-center bg-gradient-to-br from-navy-mid via-navy to-[#0A2040] border-y border-brand-blue/20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        <SectionLabel>{label}</SectionLabel>
        <SectionTitle>{title}</SectionTitle>
        <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">{desc}</p>

        {status === "success" ? (
          <div className="bg-brand-blue/15 border border-brand-blue/40 rounded-xl px-6 py-4 max-w-md mx-auto mb-4">
            <p className="font-poppins font-bold text-brand-bright">🎉 You&apos;re in! Welcome to the movement.</p>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-blue text-sm font-montserrat transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-blue-gradient text-white px-7 py-3.5 rounded-lg font-poppins font-bold text-sm whitespace-nowrap hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Joining…" : buttonText}
            </button>
          </form>
        )}

        {(status === "error" || status === "dupe") && (
          <p className="text-xs text-red-400 mb-2">{msg}</p>
        )}
        <p className="text-xs text-slate-500">No spam. Unsubscribe anytime. 100% free.</p>
      </div>
    </section>
  );
}
