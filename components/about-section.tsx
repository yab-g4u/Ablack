"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface AboutSectionProps {
  className?: string
}

export default function AboutSection({ className }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      // Text animation
      gsap.fromTo(
        textRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className={cn("w-full py-20 md:py-32 fabric-bg", className)}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">The ABLACK Story</h2>
            <p className="text-lg text-gray-300">
              Founded on the principles of quality craftsmanship and timeless design, ABLACK represents a new era in
              premium denim and clothing.
            </p>
            <p className="text-gray-400">
              Our journey began with a simple vision: to create clothing that stands the test of time, both in
              durability and style. Each piece is meticulously crafted using the finest materials and techniques,
              ensuring that when you wear ABLACK, you're wearing a piece of art.
            </p>
            <p className="text-gray-400">
              We believe in sustainable fashion that respects both people and planet. Our production processes are
              ethical, and we're committed to reducing our environmental footprint with each collection.
            </p>
            <Button size="lg" className="mt-4">
              Learn More About Us
            </Button>
          </div>

          <div ref={imageRef} className="relative h-[600px] rounded-lg overflow-hidden">
            <Image src="/images/model-black.png" alt="ABLACK Brand Story" fill className="object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  )
}

AboutSection.defaultProps = {
  className: "",
}
