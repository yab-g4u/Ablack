"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import gsap from "gsap"
import CheckoutShipping from "@/components/checkout-shipping"
import CheckoutPayment from "@/components/checkout-payment"
import CheckoutReview from "@/components/checkout-review"
import CheckoutSuccess from "@/components/checkout-success"

// Sample cart items for demonstration
const cartItems = [
  {
    id: "1",
    name: "Denim Jacket",
    price: "$249.00",
    quantity: 1,
    imageUrl: "/images/model2.png",
    size: "M",
  },
  {
    id: "2",
    name: "Denim Trousers",
    price: "$189.00",
    quantity: 1,
    imageUrl: "/images/model1.png",
    size: "32",
  },
]

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
  { id: "success", label: "Complete" },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
    },
    payment: {
      method: "telebirr",
      phoneNumber: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  })

  const router = useRouter()
  const pageRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Page entrance animation
      const tl = gsap.timeline()

      tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(
          stepsRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          summaryRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
    }
  }, [])

  // Animation for step transitions
  useEffect(() => {
    if (typeof window !== "undefined" && contentRef.current) {
      gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (step: string, data: any) => {
    setFormData({
      ...formData,
      [step]: { ...formData[step as keyof typeof formData], ...data },
    })
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", ""))
      return total + price * item.quantity
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = 15
  const total = subtotal + shipping

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <Link href="/shop" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

            {/* Steps Indicator */}
            <div ref={stepsRef} className="mb-8">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        index <= currentStep ? "border-white bg-black text-white" : "border-gray-600 text-gray-600"
                      }`}
                    >
                      {index < currentStep ? <Check size={16} /> : index + 1}
                    </div>
                    <div
                      className={`ml-2 text-sm font-medium ${index <= currentStep ? "text-white" : "text-gray-600"}`}
                    >
                      {step.label}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-1 mx-2 ${index < currentStep ? "bg-white" : "bg-gray-600"}`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div ref={contentRef} className="mb-8">
              {currentStep === 0 && (
                <CheckoutShipping
                  formData={formData.shipping}
                  updateFormData={(data) => updateFormData("shipping", data)}
                />
              )}
              {currentStep === 1 && (
                <CheckoutPayment
                  formData={formData.payment}
                  updateFormData={(data) => updateFormData("payment", data)}
                />
              )}
              {currentStep === 2 && (
                <CheckoutReview
                  formData={formData}
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                />
              )}
              {currentStep === 3 && <CheckoutSuccess orderNumber="AB-12345" email={formData.shipping.email} />}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 0 && currentStep < 3 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              )}
              {currentStep === 0 && (
                <Button variant="outline" onClick={() => router.push("/shop")}>
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Shop
                </Button>
              )}
              {currentStep < 2 && (
                <Button className="ml-auto" onClick={handleNext}>
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
              {currentStep === 2 && (
                <Button className="ml-auto" onClick={handleNext}>
                  Place Order
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
              {currentStep === 3 && (
                <Button onClick={() => router.push("/")}>
                  Continue Shopping
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {currentStep < 3 && (
            <div className="lg:col-span-1">
              <Card ref={summaryRef} className="bg-gray-900 border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">Size: {item.size}</p>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          <p>{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-800 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800 mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
