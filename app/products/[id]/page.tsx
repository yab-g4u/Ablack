"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ShoppingBag, Star, Truck, RefreshCw, Shield } from "lucide-react"
import WishlistButton from "@/components/wishlist-button"
import { getProductById } from "@/lib/actions/product-actions"
import { useToast } from "@/hooks/use-toast"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const pageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (params.id) {
          const productData = await getProductById(params.id as string)
          setProduct(productData)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        // Use placeholder data if product fetch fails
        setProduct({
          id: params.id,
          name: "Denim Jacket",
          description: "Premium denim jacket with custom back patch.",
          price: 249.0,
          category: "jackets",
          image_url: "/images/model2.png",
          stock_quantity: 10,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      gsap.registerPlugin(ScrollTrigger)

      // Page entrance animation
      const tl = gsap.timeline()

      tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(
          imageRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          contentRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
    }
  }, [isLoading])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would add the item to the cart in state or localStorage
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedSize}) added to your cart.`,
    })
  }

  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    if (product && value > product.stock_quantity) {
      toast({
        title: "Maximum quantity reached",
        description: `Only ${product.stock_quantity} items available in stock.`,
        variant: "destructive",
      })
      return
    }
    setQuantity(value)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
      </div>
    )
  }

  const sizes =
    product.category === "jackets" || product.category === "sets"
      ? ["XS", "S", "M", "L", "XL", "XXL"]
      : ["28", "30", "32", "34", "36", "38"]

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/shop" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div ref={imageRef} className="relative">
            <div className="sticky top-24">
              <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4">
                <WishlistButton productId={product.id} productName={product.name} />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= 4 ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">(24 reviews)</span>
              </div>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-10 min-w-[2.5rem] px-3 rounded-md border ${
                      selectedSize === size
                        ? "border-white bg-white text-black"
                        : "border-gray-700 bg-gray-800 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 rounded-l-md bg-gray-800 border border-gray-700 flex items-center justify-center"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <div className="w-14 h-10 bg-gray-800 border-t border-b border-gray-700 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  className="w-10 h-10 rounded-r-md bg-gray-800 border border-gray-700 flex items-center justify-center"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
                <span className="ml-4 text-sm text-gray-400">{product.stock_quantity} items available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 py-6" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 py-6">
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Truck size={18} />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-gray-400">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <RefreshCw size={18} />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-gray-400">30 day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Shield size={18} />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Secure Checkout</p>
                  <p className="text-gray-400">100% protected payments</p>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <p className="text-gray-300">{product.description}</p>
                <p className="text-gray-400">
                  Our premium denim is sourced from the finest mills and crafted with precision. Each piece is designed
                  to provide both comfort and style, ensuring you look your best for any occasion.
                </p>
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Materials</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>98% Cotton</li>
                      <li>2% Elastane</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Care Instructions</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>Machine wash cold</li>
                      <li>Do not bleach</li>
                      <li>Tumble dry low</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Customer Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-6">
                  <div className="border-b border-gray-800 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">John D.</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={star <= 5 ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Verified Purchase - April 15, 2023</p>
                    <p className="text-gray-300">
                      Excellent quality and perfect fit. The material is durable yet comfortable. Highly recommend!
                    </p>
                  </div>
                  <div className="border-b border-gray-800 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Sarah M.</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={star <= 4 ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Verified Purchase - March 22, 2023</p>
                    <p className="text-gray-300">
                      Love the design and style. The only reason for 4 stars is that it runs slightly large.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={`/images/model${item}.png`}
                    alt={`Related product ${item}`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <WishlistButton productId={`related-${item}`} productName={`Related Product ${item}`} />
                  </div>
                </div>
                <h3 className="font-medium mb-1">Related Product {item}</h3>
                <p className="text-gray-400 mb-2">Premium quality</p>
                <p className="font-semibold">${(199 + item * 10).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
