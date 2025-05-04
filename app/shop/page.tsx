"use client"

import { useEffect } from "react"
import ShopSection from "@/components/shop-section"
import MarqueeBanner from "@/components/marquee-banner"
import CustomCursor from "@/components/custom-cursor"

export default function ShopPage() {
  useEffect(() => {
    // Smooth scroll initialization
    if (typeof window !== "undefined") {
      // Add smooth scrolling to the document
      document.documentElement.style.scrollBehavior = "smooth"

      // Preload images for smoother transitions
      const preloadImages = () => {
        const images = [
          "/images/model.png",
          "/images/model1.png",
          "/images/model2.png",
          "/images/model3.png",
          "/images/model-back.png",
        ]

        images.forEach((src) => {
          const img = new Image()
          img.src = src
        })
      }

      preloadImages()
    }

    return () => {
      // Cleanup
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <div className="pt-20">
        <ShopSection />
      </div>
      <MarqueeBanner />
    </>
  )
}
