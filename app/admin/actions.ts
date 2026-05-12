"use server";
import { createServerClient } from "@/lib/supabase-server";

export async function updateTestimonial(id: string, fields: { name?: string; initials?: string; role?: string; body?: string }) {
  const supabase = createServerClient();
  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateNavLink(id: string, url: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("nav_links").update({ url }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function upsertContent(items: { key: string; value: string }[]) {
  const supabase = createServerClient();
  await Promise.all(
    items.map(({ key, value }) =>
      supabase.from("site_content").update({ value }).eq("key", key)
    )
  );
}
