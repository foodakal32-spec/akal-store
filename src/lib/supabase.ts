import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once the two NEXT_PUBLIC_SUPABASE_* variables are set in .env.local. */
export const supabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

/** Browser Supabase client (null until configured). The anon key is public by design; Row Level Security protects writes. */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!client) client = createClient(url!, key!);
  return client;
}

export type ProductRow = {
  slug: string;
  name_fr: string;
  name_ar: string;
  category_fr: string;
  category_ar: string;
  badge_fr: string | null;
  badge_ar: string | null;
  short_fr: string;
  short_ar: string;
  description_fr: string;
  description_ar: string;
  image: string;
  sizes: { label: string; price: number }[];
  in_stock: boolean;
  position: number;
};
