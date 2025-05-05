"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface OrderItem {
  id?: string
  product_id: string
  quantity: number
  price: number
  size?: string
}

export interface Order {
  id: string
  user_id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  shipping_address: string
  payment_method: string
  payment_details: any
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export async function getUserOrders(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    throw new Error("Failed to fetch orders")
  }

  // Get order items for each order
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*, products(*)")
        .eq("order_id", order.id)

      if (itemsError) {
        console.error("Error fetching order items:", itemsError)
        return order
      }

      return { ...order, items }
    }),
  )

  return ordersWithItems as Order[]
}

export async function getOrderById(id: string, userId: string) {
  const supabase = createServerSupabaseClient()

  const { data: order, error } = await supabase.from("orders").select("*").eq("id", id).eq("user_id", userId).single()

  if (error) {
    console.error("Error fetching order:", error)
    throw new Error("Failed to fetch order")
  }

  // Get order items
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*, products(*)")
    .eq("order_id", id)

  if (itemsError) {
    console.error("Error fetching order items:", itemsError)
    throw new Error("Failed to fetch order items")
  }

  return { ...order, items } as Order
}

export async function createOrder(
  userId: string,
  items: OrderItem[],
  shippingAddress: string,
  paymentMethod: string,
  paymentDetails: any,
) {
  const supabase = createServerSupabaseClient()

  // Calculate total amount
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Create order
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      status: "pending",
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      payment_details: paymentDetails,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating order:", error)
    throw new Error("Failed to create order")
  }

  // Create order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    size: item.size,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    console.error("Error creating order items:", itemsError)
    throw new Error("Failed to create order items")
  }

  // Update product stock
  for (const item of items) {
    const { error: stockError } = await supabase.rpc("decrement_stock", {
      p_id: item.product_id,
      quantity: item.quantity,
    })

    if (stockError) {
      console.error("Error updating stock:", stockError)
      // Continue with other items even if one fails
    }
  }

  revalidatePath("/orders")
  revalidatePath("/account")
  return order as Order
}

export async function updateOrderStatus(id: string, status: Order["status"], userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating order status:", error)
    throw new Error("Failed to update order status")
  }

  revalidatePath("/orders")
  revalidatePath("/account")
  return data as Order
}

export async function cancelOrder(id: string, userId: string) {
  return updateOrderStatus(id, "cancelled", userId)
}
