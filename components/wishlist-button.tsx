"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface WishlistButtonProps {
  productId: string
  productName: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function WishlistButton({
  productId,
  productName,
  className,
  variant = "secondary",
  size = "icon",
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { toast } = useToast()

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.some((item: { id: string }) => item.id === productId))
  }, [productId])

  const toggleWishlist = () => {
    // Get current wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: { id: string }) => item.id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(false)

      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      })
    } else {
      // Add to wishlist
      const updatedWishlist = [
        ...wishlist,
        {
          id: productId,
          name: productName,
          dateAdded: new Date().toISOString(),
        },
      ]
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(true)

      toast({
        title: "Added to wishlist",
        description: `${productName} has been added to your wishlist.`,
      })
    }

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("wishlistUpdated"))
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("transition-all duration-300", isInWishlist && "text-red-500 hover:text-red-600", className)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist()
      }}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
    </Button>
  )
}
