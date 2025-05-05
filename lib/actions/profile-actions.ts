"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface Profile {
  id: string
  full_name: string
  phone?: string
  address?: string
  city?: string
  region?: string
  postal_code?: string
  created_at: string
  updated_at: string
}

export async function getProfile(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    throw new Error("Failed to fetch profile")
  }

  return data as Profile
}

export async function updateProfile(
  userId: string,
  profile: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>,
) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }

  revalidatePath("/account")
  return data as Profile
}
