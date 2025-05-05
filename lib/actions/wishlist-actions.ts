"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: any
}

export async function getWishlistItems(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("wishlist_items").select("*, product:products(*)").eq("user_id", userId)

  if (error) {
    console.error("Error fetching wishlist:", error)
    throw new Error("Failed to fetch wishlist")
  }

  return data as WishlistItem[]
}

export async function addToWishlist(userId: string, productId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("wishlist_items")
    .insert({
      user_id: userId,
      product_id: productId,
    })
    .select()
    .single()

  if (error) {
    if (error.code === "23505") {
      // Unique violation
      console.log("Item already in wishlist")
      return { success: true }
    }
    console.error("Error adding to wishlist:", error)
    throw new Error("Failed to add to wishlist")
  }

  revalidatePath("/wishlist")
  return data as WishlistItem
}

export async function removeFromWishlist(userId: string, productId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("wishlist_items").delete().eq("user_id", userId).eq("product_id", productId)

  if (error) {
    console.error("Error removing from wishlist:", error)
    throw new Error("Failed to remove from wishlist")
  }

  revalidatePath("/wishlist")
  return { success: true }
}
