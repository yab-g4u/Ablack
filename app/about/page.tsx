"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomCursor from "@/components/custom-cursor"
import MarqueeBanner from "@/components/marquee-banner"

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      )

      // Story section animation
      gsap.fromTo(
        storyRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Values section animation
      gsap.fromTo(
        valuesRef.current?.querySelectorAll(".value-item"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Team section animation
      gsap.fromTo(
        teamRef.current?.querySelectorAll(".team-member"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen">
      <CustomCursor />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/black-fabric.png"
            alt="ABLACK Background"
            fill
            className="object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Crafting premium clothing with passion, precision, and purpose.
            </p>
          </div>
        </div>
      </section>

      <MarqueeBanner />

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The ABLACK Journey</h2>
              <p className="text-lg text-gray-300">
                Founded in 2020, ABLACK emerged from a simple vision: to create clothing that stands the test of time,
                both in durability and style.
              </p>
              <p className="text-gray-400">
                Our journey began in a small studio in Addis Ababa, where our founder, inspired by the rich textile
                heritage of Ethiopia, set out to create a brand that would showcase the country's craftsmanship to the
                world.
              </p>
              <p className="text-gray-400">
                Each piece in our collection is meticulously crafted using the finest materials and techniques, ensuring
                that when you wear ABLACK, you're wearing a piece of art that tells a story.
              </p>
              <p className="text-gray-400">
                Today, we've grown into a global brand, but our commitment to quality, sustainability, and ethical
                production remains unchanged.
              </p>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/model-black.png"
                alt="ABLACK Brand Story"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={valuesRef} className="py-20 md:py-32 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              These principles guide everything we do, from design to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="value-item bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-400">
                We believe in creating pieces that last. Every stitch, every detail is executed with precision and care.
              </p>
            </div>

            <div className="value-item bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable Practices</h3>
              <p className="text-gray-400">
                We're committed to reducing our environmental footprint through responsible sourcing and production
                methods.
              </p>
            </div>

            <div className="value-item bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Ethical Production</h3>
              <p className="text-gray-400">
                We ensure fair wages and safe working conditions for everyone involved in creating our products.
              </p>
            </div>

            <div className="value-item bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Timeless Design</h3>
              <p className="text-gray-400">
                We create pieces that transcend trends, focusing on designs that remain relevant for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section ref={teamRef} className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              The passionate individuals behind ABLACK who bring our vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="team-member text-center">
              <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
                <Image src="/images/model.png" alt="Team Member" fill className="object-cover object-top" />
              </div>
              <h3 className="text-xl font-bold mb-1">Abebe Kebede</h3>
              <p className="text-gray-400 mb-3">Founder & Creative Director</p>
              <p className="text-sm text-gray-500">
                With over 15 years in fashion design, Abebe brings a wealth of experience and a unique vision to ABLACK.
              </p>
            </div>

            <div className="team-member text-center">
              <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
                <Image src="/images/model1.png" alt="Team Member" fill className="object-cover object-top" />
              </div>
              <h3 className="text-xl font-bold mb-1">Sara Haile</h3>
              <p className="text-gray-400 mb-3">Head of Production</p>
              <p className="text-sm text-gray-500">
                Sara ensures that every ABLACK piece meets our high standards of quality and craftsmanship.
              </p>
            </div>

            <div className="team-member text-center">
              <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
                <Image src="/images/model2.png" alt="Team Member" fill className="object-cover object-top" />
              </div>
              <h3 className="text-xl font-bold mb-1">Daniel Tesfaye</h3>
              <p className="text-gray-400 mb-3">Design Lead</p>
              <p className="text-sm text-gray-500">
                Daniel's innovative designs and attention to detail help create the distinctive ABLACK aesthetic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white text-black">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Experience ABLACK</h2>
            <p className="text-lg mb-8">
              Discover our premium collection and experience the perfect blend of style, quality, and sustainability.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
