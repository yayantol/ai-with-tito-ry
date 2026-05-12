import { createClient } from "@supabase/supabase-js";

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export type Testimonial = {
  id: string;
  initials: string;
  name: string;
  role: string;
  body: string;
  sort_order: number;
};

export type NavLink = {
  id: string;
  column_title: string;
  label: string;
  url: string;
  sort_order: number;
};
