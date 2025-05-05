"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react"
import WishlistButton from "@/components/wishlist-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ShopSectionProps {
  className?: string
}

const categories = [
  { id: "all", name: "All Products" },
  { id: "jackets", name: "Jackets" },
  { id: "pants", name: "Pants" },
  { id: "sets", name: "Full Sets" },
  { id: "accessories", name: "Accessories" },
]

const products = [
  {
    id: "1",
    name: "Denim Jacket",
    category: "jackets",
    description: "Premium denim jacket with custom back patch.",
    imageUrl: "/images/model2.png",
    price: "$249.00",
  },
  {
    id: "2",
    name: "Denim Trousers",
    category: "pants",
    description: "Wide-leg denim trousers with signature stitching.",
    imageUrl: "/images/model1.png",
    price: "$189.00",
  },
  {
    id: "3",
    name: "Full Denim Set",
    category: "sets",
    description: "Complete denim outfit for the ultimate statement.",
    imageUrl: "/images/model3.png",
    price: "$399.00",
  },
  {
    id: "4",
    name: "Signature Jacket",
    category: "jackets",
    description: "Our iconic jacket with embroidered details.",
    imageUrl: "/images/model-back.png",
    price: "$279.00",
  },
  {
    id: "5",
    name: "Classic Denim Set",
    category: "sets",
    description: "Timeless denim combination for everyday style.",
    imageUrl: "/images/model.png",
    price: "$429.00",
  },
  {
    id: "6",
    name: "Designer Pants",
    category: "pants",
    description: "Premium denim pants with distinctive stitching.",
    imageUrl: "/images/model3.png",
    price: "$219.00",
  },
]

export default function ShopSection({ className }: ShopSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([100, 500])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would fetch from the server
        // For now, we'll use the static products array
        setFilteredProducts(
          products.filter((product) => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory
            const price = Number.parseInt(product.price.replace("$", ""))
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
            const matchesSearch =
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(searchQuery.toLowerCase())

            return matchesCategory && matchesPrice && matchesSearch
          }),
        )
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [activeCategory, priceRange, searchQuery])

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

      // Filter animation
      gsap.fromTo(
        filterRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Products staggered animation
      gsap.fromTo(
        productsRef.current?.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [filteredProducts])

  return (
    <section ref={sectionRef} className={cn("w-full py-20 md:py-32", className)}>
      <div className="container px-4 md:px-6">
        <div ref={headingRef} className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Shop Collection</h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
            Explore our premium denim pieces crafted with precision and care.
          </p>
        </div>

        <div ref={filterRef} className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 md:self-end"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </Button>
          </div>

          <div
            className={cn(
              "grid grid-cols-1 gap-6 transition-all duration-300",
              isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
            )}
          >
            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Price Range</h3>
                <p className="text-sm text-gray-400">
                  ${priceRange[0]} - ${priceRange[1]}
                </p>
              </div>
              <Slider
                defaultValue={[100, 500]}
                min={50}
                max={600}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>
          </div>
        </div>

        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} className="product-card bg-gray-900 border-gray-800 overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-[400px] w-full overflow-hidden group">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <WishlistButton productId={product.id} productName={product.name} />
                      <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
                        <ShoppingBag size={18} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-gray-400">{product.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-6 pt-0">
                  <span className="text-xl font-semibold">{product.price}</span>
                  <Link href={`/products/${product.id}`}>
                    <Button>View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-400">No products found matching your criteria.</p>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View All Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

ShopSection.defaultProps = {
  className: "",
}
