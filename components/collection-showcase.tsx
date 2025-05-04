"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface CollectionShowcaseProps {
  className?: string
}

const collections = [
  {
    id: "1",
    name: "Denim Essentials",
    description: "Core pieces for your everyday wardrobe",
    imageUrl: "/images/model3.png",
  },
  {
    id: "2",
    name: "Statement Jackets",
    description: "Bold designs that make an impact",
    imageUrl: "/images/model-back.png",
  },
  {
    id: "3",
    name: "Urban Classics",
    description: "Timeless styles for the modern city",
    imageUrl: "/images/model1.png",
  },
]

export default function CollectionShowcase({ className }: CollectionShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

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

      // Collection items staggered animation
      gsap.fromTo(
        itemsRef.current?.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className={cn("w-full py-20 md:py-32 bg-black", className)}>
      <div className="container px-4 md:px-6">
        <div ref={headingRef} className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Our Collections</h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
            Explore our carefully curated collections, each telling its own unique story.
          </p>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-item rounded-lg overflow-hidden">
              <div className="relative h-[500px]">
                <Image
                  src={collection.imageUrl || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="overlay">
                  <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-gray-300 mb-4">{collection.description}</p>
                  <Button variant="outline" size="sm">
                    Explore Collection
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="px-8">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  )
}

CollectionShowcase.defaultProps = {
  className: "",
}
