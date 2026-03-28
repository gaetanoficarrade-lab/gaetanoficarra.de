import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY müssen gesetzt sein.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}
