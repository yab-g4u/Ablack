"use client"

import { useEffect } from "react"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import CollectionShowcase from "@/components/collection-showcase"
import MarqueeBanner from "@/components/marquee-banner"
import BrandValues from "@/components/brand-values"
import CustomCursor from "@/components/custom-cursor"

export default function Page() {
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
          "/images/black-fabric.png",
          "/images/background.png",
          "/images/model-black.png",
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
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <AboutSection />
      <CollectionShowcase />
      <BrandValues />
    </>
  )
}
