"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

interface HeroProps {
  className?: string
}

export default function Hero({ className }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline()

      // Initial animation
      tl.fromTo(textRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
        .fromTo(
          imageRef.current,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.8",
        )
        .fromTo(
          buttonRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <section ref={heroRef} className={cn("w-full h-screen relative overflow-hidden bg-black", className)}>
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/model.png"
          alt="ABLACK Model"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
      </div>

      <div className="container relative h-full flex flex-col justify-center items-start px-4 pt-20">
        <div ref={textRef} className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            REDEFINE <br />
            <span className="text-stroke">YOUR STYLE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
            Premium denim crafted with precision for the modern individual. Timeless pieces designed for everyday
            elegance.
          </p>
        </div>

        <div ref={buttonRef} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/shop">
            <Button size="lg" className="text-lg px-8 py-6">
              Shop Collection
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Explore Brand
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

Hero.defaultProps = {
  className: "",
}
