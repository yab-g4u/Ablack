"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface PaymentMethod {
  id: string
  user_id: string
  type: "telebirr" | "cbe" | "amole" | "card"
  details: any
  is_default: boolean
  created_at: string
  updated_at: string
}

export async function getPaymentMethods(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })

  if (error) {
    console.error("Error fetching payment methods:", error)
    throw new Error("Failed to fetch payment methods")
  }

  return data as PaymentMethod[]
}

export async function addPaymentMethod(userId: string, type: PaymentMethod["type"], details: any, isDefault = false) {
  const supabase = createServerSupabaseClient()

  // If this is the default payment method, unset any existing default
  if (isDefault) {
    await supabase.from("payment_methods").update({ is_default: false }).eq("user_id", userId).eq("is_default", true)
  }

  const { data, error } = await supabase
    .from("payment_methods")
    .insert({
      user_id: userId,
      type,
      details,
      is_default: isDefault,
    })
    .select()
    .single()

  if (error) {
    console.error("Error adding payment method:", error)
    throw new Error("Failed to add payment method")
  }

  revalidatePath("/account")
  return data as PaymentMethod
}

export async function updatePaymentMethod(
  id: string,
  userId: string,
  updates: Partial<Omit<PaymentMethod, "id" | "user_id" | "created_at" | "updated_at">>,
) {
  const supabase = createServerSupabaseClient()

  // If this is being set as default, unset any existing default
  if (updates.is_default) {
    await supabase
      .from("payment_methods")
      .update({ is_default: false })
      .eq("user_id", userId)
      .eq("is_default", true)
      .neq("id", id)
  }

  const { data, error } = await supabase
    .from("payment_methods")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating payment method:", error)
    throw new Error("Failed to update payment method")
  }

  revalidatePath("/account")
  return data as PaymentMethod
}

export async function deletePaymentMethod(id: string, userId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("payment_methods").delete().eq("id", id).eq("user_id", userId)

  if (error) {
    console.error("Error deleting payment method:", error)
    throw new Error("Failed to delete payment method")
  }

  revalidatePath("/account")
  return { success: true }
}
