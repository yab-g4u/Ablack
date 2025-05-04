"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShippingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  postalCode: string
}

interface CheckoutShippingProps {
  formData: ShippingFormData
  updateFormData: (data: Partial<ShippingFormData>) => void
}

const ethiopianRegions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "South West Ethiopia",
  "Southern Nations, Nationalities, and Peoples",
  "Tigray",
]

export default function CheckoutShipping({ formData, updateFormData }: CheckoutShippingProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingFormData, string>>>({})

  const handleChange = (field: keyof ShippingFormData, value: string) => {
    updateFormData({ [field]: value })

    // Clear error when field is updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const validateField = (field: keyof ShippingFormData, value: string) => {
    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          setErrors({ ...errors, [field]: "Please enter a valid email address" })
        }
        break
      case "phone":
        const phoneRegex = /^\+?[0-9]{9,15}$/
        if (!phoneRegex.test(value)) {
          setErrors({ ...errors, [field]: "Please enter a valid phone number" })
        }
        break
      default:
        if (!value.trim()) {
          setErrors({ ...errors, [field]: "This field is required" })
        }
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              onBlur={(e) => validateField("firstName", e.target.value)}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              onBlur={(e) => validateField("lastName", e.target.value)}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={(e) => validateField("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
              placeholder="+251..."
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              onBlur={(e) => validateField("address", e.target.value)}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={(e) => validateField("city", e.target.value)}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
              <SelectTrigger className={errors.region ? "border-red-500" : ""}>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {ethiopianRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              onBlur={(e) => validateField("postalCode", e.target.value)}
              className={errors.postalCode ? "border-red-500" : ""}
            />
            {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
