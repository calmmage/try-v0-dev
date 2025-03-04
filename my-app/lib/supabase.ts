import { createClient } from "@supabase/supabase-js"

// Make sure URLs are properly formatted
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

// Ensure URL has proper format
const formattedUrl = isValidUrl(supabaseUrl) ? supabaseUrl : `https://${supabaseUrl.replace(/^https?:\/\//, "")}`

// Create client with error handling
export const supabase = createClient(formattedUrl, supabaseKey, {
  auth: {
    persistSession: false, // for server components
  },
})

export type Todo = {
  id: number
  text: string
  completed: boolean
  created_at?: string
}

