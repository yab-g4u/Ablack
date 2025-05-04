"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface FeaturedProductsProps {
  className?: string
}

const products = [
  {
    id: "1",
    name: "Denim Jacket",
    description: "Premium denim jacket with custom back patch.",
    imageUrl: "/images/model2.png",
    price: "$249.00",
  },
  {
    id: "2",
    name: "Denim Trousers",
    description: "Wide-leg denim trousers with signature stitching.",
    imageUrl: "/images/model1.png",
    price: "$189.00",
  },
  {
    id: "3",
    name: "Full Denim Set",
    description: "Complete denim outfit for the ultimate statement.",
    imageUrl: "/images/model3.png",
    price: "$399.00",
  },
]

export default function FeaturedProducts({ className }: FeaturedProductsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards staggered animation
      gsap.fromTo(
        cardsRef.current?.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className={cn("w-full py-20 md:py-32", className)}>
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
        <div ref={headingRef} className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our curated selection of premium denim clothing.
          </p>
        </div>
        <div ref={cardsRef} className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <Card key={product.id} className="product-card bg-gray-900 border-gray-800 overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-[400px] w-full overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-gray-400">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-6 pt-0">
                <span className="text-xl font-semibold">{product.price}</span>
                <Link href={`/products/${product.id}`}>
                  <Button>View Product</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button size="lg" variant="outline" className="text-lg px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
