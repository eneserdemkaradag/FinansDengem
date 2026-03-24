import { createBrowserClient } from "@supabase/ssr"

export const createSupabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://example.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "missing-anon-key"

  createBrowserClient(supabaseUrl, supabaseAnonKey)
}
