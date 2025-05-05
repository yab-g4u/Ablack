"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  stock_quantity: number
  created_at: string
  updated_at: string
}

export async function getProducts(category?: string) {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("products").select("*")

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }

  return data as Product[]
}

export async function getProductById(id: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
  }

  return data as Product
}

export async function searchProducts(query: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)

  if (error) {
    console.error("Error searching products:", error)
    throw new Error("Failed to search products")
  }

  return data as Product[]
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").insert(product).select().single()

  if (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }

  revalidatePath("/shop")
  return data as Product
}

export async function updateProduct(id: string, product: Partial<Omit<Product, "id" | "created_at" | "updated_at">>) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("products")
    .update({
      ...product,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
  }

  revalidatePath(`/products/${id}`)
  revalidatePath("/shop")
  return data as Product
}

export async function deleteProduct(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    throw new Error("Failed to delete product")
  }

  revalidatePath("/shop")
  return { success: true }
}
