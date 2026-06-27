import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  cover_image: string | null
  category: string | null
  tags: string[] | null
  live_demo_url: string | null
  github_url: string | null
  case_study_url: string | null
  is_published: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}
