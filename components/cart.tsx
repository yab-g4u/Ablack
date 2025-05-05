"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import gsap from "gsap"

interface CartItem {
  id: string
  name: string
  price: string
  quantity: number
  imageUrl: string
  size?: string
}

interface CartProps {
  className?: string
}

// Sample cart items for demonstration
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Denim Jacket",
    price: "$249.00",
    quantity: 1,
    imageUrl: "/images/model2.png",
    size: "M",
  },
  {
    id: "2",
    name: "Denim Trousers",
    price: "$189.00",
    quantity: 1,
    imageUrl: "/images/model1.png",
    size: "32",
  },
]

export default function Cart({ className }: CartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const cartRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    // Animate the item before removing
    const itemElement = document.getElementById(`cart-item-${id}`)
    if (itemElement) {
      gsap.to(itemElement, {
        x: 300,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCartItems(cartItems.filter((item) => item.id !== id))
        },
      })
    } else {
      setCartItems(cartItems.filter((item) => item.id !== id))
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", ""))
      return total + price * item.quantity
    }, 0)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Handle cart animations
      if (isOpen) {
        // Animate overlay
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })

        // Animate cart panel
        gsap.fromTo(cartRef.current, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" })

        // Prevent body scroll
        document.body.style.overflow = "hidden"
      } else {
        // Animate overlay
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })

        // Animate cart panel
        gsap.to(cartRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power3.in",
        })

        // Restore body scroll
        document.body.style.overflow = "auto"
      }
    }
  }, [isOpen])

  // Animate cart items when they change
  useEffect(() => {
    if (isOpen && cartItems.length > 0) {
      gsap.fromTo(
        ".cart-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" },
      )
    }
  }, [isOpen, cartItems.length])

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    // Save cart items to localStorage for checkout page
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems))

    // Close cart and navigate to checkout
    toggleCart()
    window.location.href = "/checkout"
  }

  return (
    <>
      <Button onClick={toggleCart} variant="ghost" size="icon" className="relative" aria-label="Open shopping cart">
        <ShoppingBag className="h-5 w-5" />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </Button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 bg-black/70 z-50 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleCart}
      />

      {/* Cart Panel */}
      <div
        ref={cartRef}
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-950 border-l border-gray-800 z-50 transform transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag size={20} />
              Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </h2>
            <Button variant="ghost" size="icon" onClick={toggleCart} aria-label="Close cart">
              <X size={20} />
            </Button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="cart-item flex gap-4 p-3 bg-gray-900 rounded-lg border border-gray-800"
                  >
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      {item.size && <p className="text-sm text-gray-400">Size: {item.size}</p>}
                      <p className="font-semibold mt-1">{item.price}</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
              <ShoppingBag size={48} className="text-gray-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button onClick={toggleCart}>Continue Shopping</Button>
            </div>
          )}

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-400">Shipping</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <Button className="w-full py-6 text-lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <Button variant="link" className="w-full mt-2" onClick={toggleCart}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Cart.defaultProps = {
  className: "",
}
