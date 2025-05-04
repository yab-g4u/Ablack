"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import gsap from "gsap"

interface CheckoutSuccessProps {
  orderNumber: string
  email: string
}

export default function CheckoutSuccess({ orderNumber, email }: CheckoutSuccessProps) {
  const checkmarkRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Animate checkmark
      const tl = gsap.timeline()

      tl.fromTo(
        checkmarkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      ).fromTo(
        contentRef.current?.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" },
        "-=0.3",
      )
    }
  }, [])

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-6">
          <div ref={checkmarkRef} className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
            <Check size={40} />
          </div>
        </div>

        <div ref={contentRef} className="space-y-4">
          <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
          <p className="text-gray-400">
            Thank you for your purchase. We've received your order and are processing it now.
          </p>

          <div className="bg-gray-800 p-4 rounded-lg inline-block mx-auto">
            <p className="text-sm text-gray-400">Order Number</p>
            <p className="text-xl font-bold">{orderNumber}</p>
          </div>

          <p className="text-gray-400">
            We've sent a confirmation email to <span className="font-medium text-white">{email}</span> with your order
            details.
          </p>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="text-left text-gray-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>Your order will be processed and prepared for shipping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>You'll receive shipping updates via email and SMS.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>Your premium ABLACK items will be delivered to your doorstep.</span>
              </li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
