import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.NUXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.NUXT_PUBLIC_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;