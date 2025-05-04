import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface CartItem {
  id: string
  name: string
  price: string
  quantity: number
  imageUrl: string
  size?: string
}

interface CheckoutReviewProps {
  formData: {
    shipping: {
      firstName: string
      lastName: string
      email: string
      phone: string
      address: string
      city: string
      region: string
      postalCode: string
    }
    payment: {
      method: string
      phoneNumber: string
      cardNumber: string
      cardName: string
      expiryDate: string
      cvv: string
    }
  }
  cartItems: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

export default function CheckoutReview({ formData, cartItems, subtotal, shipping, total }: CheckoutReviewProps) {
  const getPaymentMethodDisplay = () => {
    switch (formData.payment.method) {
      case "telebirr":
        return `TeleBirr (${formData.payment.phoneNumber})`
      case "cbe":
        return `CBE Birr (${formData.payment.phoneNumber})`
      case "amole":
        return `Amole (${formData.payment.phoneNumber})`
      case "card":
        return `Card ending in ${formData.payment.cardNumber.slice(-4)}`
      default:
        return "Cash on Delivery"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Order Review</h2>

        <div className="space-y-8">
          {/* Shipping Information */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <span className="w-6 h-6 rounded-full bg-white text-black text-xs flex items-center justify-center mr-2">
                1
              </span>
              Shipping Information
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="font-medium">
                {formData.shipping.firstName} {formData.shipping.lastName}
              </p>
              <p className="text-gray-400">{formData.shipping.email}</p>
              <p className="text-gray-400">{formData.shipping.phone}</p>
              <p className="text-gray-400 mt-2">{formData.shipping.address}</p>
              <p className="text-gray-400">
                {formData.shipping.city}, {formData.shipping.region}, {formData.shipping.postalCode}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <span className="w-6 h-6 rounded-full bg-white text-black text-xs flex items-center justify-center mr-2">
                2
              </span>
              Payment Method
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p>{getPaymentMethodDisplay()}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <span className="w-6 h-6 rounded-full bg-white text-black text-xs flex items-center justify-center mr-2">
                3
              </span>
              Order Items
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="space-y-4">
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
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-400">Size: {item.size}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            By placing your order, you agree to ABLACK's Terms of Service and Privacy Policy. Your payment information
            is securely processed.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
