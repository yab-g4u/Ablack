"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentFormData {
  method: string
  phoneNumber: string
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}

interface CheckoutPaymentProps {
  formData: PaymentFormData
  updateFormData: (data: Partial<PaymentFormData>) => void
}

export default function CheckoutPayment({ formData, updateFormData }: CheckoutPaymentProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({})

  const handleChange = (field: keyof PaymentFormData, value: string) => {
    updateFormData({ [field]: value })

    // Clear error when field is updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const validateField = (field: keyof PaymentFormData, value: string) => {
    switch (field) {
      case "phoneNumber":
        if (formData.method === "telebirr" || formData.method === "cbe") {
          const phoneRegex = /^\+?[0-9]{9,15}$/
          if (!phoneRegex.test(value)) {
            setErrors({ ...errors, [field]: "Please enter a valid phone number" })
          }
        }
        break
      case "cardNumber":
        if (formData.method === "card") {
          const cardRegex = /^[0-9]{16}$/
          if (!cardRegex.test(value)) {
            setErrors({ ...errors, [field]: "Please enter a valid 16-digit card number" })
          }
        }
        break
      case "expiryDate":
        if (formData.method === "card") {
          const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/
          if (!expiryRegex.test(value)) {
            setErrors({ ...errors, [field]: "Please enter a valid expiry date (MM/YY)" })
          }
        }
        break
      case "cvv":
        if (formData.method === "card") {
          const cvvRegex = /^[0-9]{3,4}$/
          if (!cvvRegex.test(value)) {
            setErrors({ ...errors, [field]: "Please enter a valid CVV" })
          }
        }
        break
      default:
        if (!value.trim() && field !== "method") {
          setErrors({ ...errors, [field]: "This field is required" })
        }
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Payment Method</h2>

        <Tabs defaultValue={formData.method} onValueChange={(value) => handleChange("method", value)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="telebirr" className="flex flex-col items-center gap-1 h-auto py-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">TB</span>
              </div>
              <span className="text-xs">TeleBirr</span>
            </TabsTrigger>
            <TabsTrigger value="cbe" className="flex flex-col items-center gap-1 h-auto py-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">CBE</span>
              </div>
              <span className="text-xs">CBE Birr</span>
            </TabsTrigger>
            <TabsTrigger value="amole" className="flex flex-col items-center gap-1 h-auto py-3">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">AM</span>
              </div>
              <span className="text-xs">Amole</span>
            </TabsTrigger>
            <TabsTrigger value="card" className="flex flex-col items-center gap-1 h-auto py-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">CC</span>
              </div>
              <span className="text-xs">Card</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="telebirr" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-950/30 rounded-lg border border-blue-900">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">TB</span>
                </div>
                <div>
                  <h3 className="font-medium">TeleBirr Mobile Money</h3>
                  <p className="text-sm text-gray-400">Pay using your TeleBirr mobile wallet</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telebirr-phone">TeleBirr Phone Number</Label>
                <Input
                  id="telebirr-phone"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  onBlur={(e) => validateField("phoneNumber", e.target.value)}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                  placeholder="+251..."
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>

              <div className="text-sm text-gray-400">
                <p>You will receive a payment confirmation prompt on your TeleBirr mobile app.</p>
                <p className="mt-2">Please ensure your phone is accessible to complete the payment.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cbe" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-green-950/30 rounded-lg border border-green-900">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">CBE</span>
                </div>
                <div>
                  <h3 className="font-medium">CBE Birr</h3>
                  <p className="text-sm text-gray-400">Pay using your CBE Birr mobile wallet</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cbe-phone">CBE Birr Phone Number</Label>
                <Input
                  id="cbe-phone"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  onBlur={(e) => validateField("phoneNumber", e.target.value)}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                  placeholder="+251..."
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>

              <div className="text-sm text-gray-400">
                <p>You will receive a payment confirmation prompt on your CBE Birr mobile app.</p>
                <p className="mt-2">Please ensure your phone is accessible to complete the payment.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amole" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-yellow-950/30 rounded-lg border border-yellow-900">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">AM</span>
                </div>
                <div>
                  <h3 className="font-medium">Amole</h3>
                  <p className="text-sm text-gray-400">Pay using your Amole digital wallet</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amole-phone">Amole Phone Number</Label>
                <Input
                  id="amole-phone"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  onBlur={(e) => validateField("phoneNumber", e.target.value)}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                  placeholder="+251..."
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>

              <div className="text-sm text-gray-400">
                <p>You will receive a payment confirmation prompt on your Amole mobile app.</p>
                <p className="mt-2">Please ensure your phone is accessible to complete the payment.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="card" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">CC</span>
                </div>
                <div>
                  <h3 className="font-medium">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-400">Pay using Visa, Mastercard or other cards</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  value={formData.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  onBlur={(e) => validateField("cardNumber", e.target.value)}
                  className={errors.cardNumber ? "border-red-500" : ""}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  value={formData.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value)}
                  onBlur={(e) => validateField("cardName", e.target.value)}
                  className={errors.cardName ? "border-red-500" : ""}
                />
                {errors.cardName && <p className="text-sm text-red-500">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    onBlur={(e) => validateField("expiryDate", e.target.value)}
                    className={errors.expiryDate ? "border-red-500" : ""}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    onBlur={(e) => validateField("cvv", e.target.value)}
                    className={errors.cvv ? "border-red-500" : ""}
                    placeholder="123"
                  />
                  {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="font-medium mb-4">Alternative Payment Options</h3>

          <RadioGroup defaultValue="cod">
            <div className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center gap-2">
                <span className="font-medium">Cash on Delivery</span>
                <span className="text-sm text-gray-400">(Pay when you receive your order)</span>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex items-center gap-2">
                <span className="font-medium">Bank Transfer</span>
                <span className="text-sm text-gray-400">(Details will be provided after order placement)</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
