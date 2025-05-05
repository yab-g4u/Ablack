"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

interface MarqueeBannerProps {
  className?: string
}

export default function MarqueeBanner({ className }: MarqueeBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && textRef.current) {
      // Clone the text for seamless looping
      const textContent = textRef.current.innerHTML
      textRef.current.innerHTML = textContent + textContent

      // GSAP animation for smooth scrolling - slowed down from 40 to 80
      gsap.to(textRef.current, {
        x: "-50%",
        duration: 80, // Changed from 40 to 80 to slow down the animation even more
        ease: "none",
        repeat: -1,
      })
    }
  }, [])

  return (
    <div ref={bannerRef} className={cn("w-full py-6 bg-white text-black overflow-hidden", className)}>
      <div className="marquee-container">
        <div ref={textRef} className="inline-block whitespace-nowrap">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="mx-4 text-xl font-bold uppercase tracking-wider">
                Premium Quality • Timeless Design • Sustainable Fashion • Crafted With Care •
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}

MarqueeBanner.defaultProps = {
  className: "",
}
