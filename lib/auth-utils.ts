import { getSupabaseBrowserClient } from "@/lib/supabase"

export async function resetPassword(email: string) {
  const supabase = getSupabaseBrowserClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  return { error }
}

export async function updatePassword(password: string) {
  const supabase = getSupabaseBrowserClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  return { error }
}

export async function signInWithProvider(provider: "google" | "apple") {
  const supabase = getSupabaseBrowserClient()

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { error }
}
