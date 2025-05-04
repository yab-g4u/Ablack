"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import WishlistButton from "@/components/wishlist-button"
import { useToast } from "@/hooks/use-toast"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface WishlistItem {
  id: string
  name: string
  dateAdded: string
}

// Sample product data - in a real app, this would come from an API
const productData = {
  "1": {
    name: "Denim Jacket",
    price: "$249.00",
    imageUrl: "/images/model2.png",
  },
  "2": {
    name: "Denim Trousers",
    price: "$189.00",
    imageUrl: "/images/model1.png",
  },
  "3": {
    name: "Full Denim Set",
    price: "$399.00",
    imageUrl: "/images/model3.png",
  },
  "4": {
    name: "Signature Jacket",
    price: "$279.00",
    imageUrl: "/images/model-back.png",
  },
  "5": {
    name: "Classic Denim Set",
    price: "$429.00",
    imageUrl: "/images/model.png",
  },
  "6": {
    name: "Designer Pants",
    price: "$219.00",
    imageUrl: "/images/model3.png",
  },
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load wishlist from localStorage
    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistItems(wishlist)
      setIsLoading(false)
    }

    loadWishlist()

    // Listen for wishlist updates
    const handleWishlistUpdate = () => loadWishlist()
    window.addEventListener("wishlistUpdated", handleWishlistUpdate)

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      gsap.registerPlugin(ScrollTrigger)

      // Page entrance animation
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })

      // Title animation
      gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

      // Items staggered animation
      if (itemsRef.current && itemsRef.current.children.length > 0) {
        gsap.fromTo(
          itemsRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
        )
      }
    }
  }, [isLoading])

  const clearWishlist = () => {
    localStorage.setItem("wishlist", "[]")
    setWishlistItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const addAllToCart = () => {
    // In a real app, this would add all items to the cart
    // For now, we'll just show a toast
    toast({
      title: "Added to cart",
      description: `${wishlistItems.length} items have been added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading your wishlist...</div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="mb-8">
          <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
            <div className="flex gap-4">
              {wishlistItems.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={clearWishlist}>
                    Clear Wishlist
                  </Button>
                  <Button size="sm" className="flex items-center gap-2" onClick={addAllToCart}>
                    <ShoppingBag size={16} />
                    Add All to Cart
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <div className="text-gray-400 text-6xl mb-4">♡</div>
            <h2 className="text-2xl font-medium">Your wishlist is empty</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Items added to your wishlist will be saved here. Start exploring our collections to find pieces you love.
            </p>
            <Link href="/shop">
              <Button size="lg" className="mt-4">
                Explore Collections
              </Button>
            </Link>
          </div>
        ) : (
          <div ref={itemsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => {
              const product = productData[item.id as keyof typeof productData]
              if (!product) return null

              return (
                <Card key={item.id} className="bg-gray-900 border-gray-800 overflow-hidden group">
                  <div className="relative h-[300px] w-full overflow-hidden">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <WishlistButton productId={item.id} productName={product.name} />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-xl font-semibold">{product.price}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Link href={`/products/${item.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button className="flex-1 flex items-center gap-2">
                      <ShoppingBag size={16} />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
