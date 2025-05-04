"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Award, Leaf, Sparkles } from "lucide-react"

interface BrandValuesProps {
  className?: string
}

export default function BrandValues({ className }: BrandValuesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Values staggered animation
      gsap.fromTo(
        valuesRef.current?.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className={cn("w-full py-16 md:py-24 bg-gray-950", className)}>
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-12">
        <div ref={headingRef} className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Our Core Values</h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
            ABLACK is built on principles that guide everything we do, from design to delivery.
          </p>
        </div>
        <div
          ref={valuesRef}
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 lg:gap-12"
        >
          <div className="bg-gray-900 p-6 rounded-md flex flex-col items-center text-center h-full">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Craftsmanship</h3>
            <p className="text-gray-400">
              Every piece is meticulously crafted with attention to detail and durability.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-md flex flex-col items-center text-center h-full">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sustainable Practices</h3>
            <p className="text-gray-400">
              We're committed to ethical production and reducing our environmental impact.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-md flex flex-col items-center text-center h-full">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Timeless Design</h3>
            <p className="text-gray-400">
              Our designs transcend trends, focusing on pieces that remain relevant for years.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-md flex flex-col items-center text-center h-full">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Experience</h3>
            <p className="text-gray-400">We prioritize exceptional service and a seamless shopping experience.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

BrandValues.defaultProps = {
  className: "",
}
