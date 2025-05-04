"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, CreditCard, Trash2, Edit } from "lucide-react"

// Mock payment methods - in a real app, this would come from Supabase
const paymentMethods = [
  {
    id: "1",
    type: "telebirr",
    name: "TeleBirr",
    details: "+251 911 234 567",
    isDefault: true,
  },
  {
    id: "2",
    type: "card",
    name: "Visa ending in 4242",
    details: "Expires 12/25",
    isDefault: false,
  },
]

export default function PaymentMethods() {
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [activeTab, setActiveTab] = useState<"telebirr" | "cbe" | "amole" | "card">("telebirr")

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const handleCancel = () => {
    setIsAddingNew(false)
  }

  const handleSave = () => {
    // Here you would save the new payment method to Supabase
    setIsAddingNew(false)
  }

  const handleRemove = (id: string) => {
    // Here you would remove the payment method from Supabase
    console.log("Remove payment method:", id)
  }

  const handleSetDefault = (id: string) => {
    // Here you would set the payment method as default in Supabase
    console.log("Set as default:", id)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        {paymentMethods.length > 0 && !isAddingNew ? (
          <div className="space-y-4 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="p-4 border border-gray-800 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800">
                    {method.type === "telebirr" ? (
                      <span className="text-xs font-bold">TB</span>
                    ) : method.type === "cbe" ? (
                      <span className="text-xs font-bold">CBE</span>
                    ) : method.type === "amole" ? (
                      <span className="text-xs font-bold">AM</span>
                    ) : (
                      <CreditCard size={20} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.name}</span>
                      {method.isDefault && (
                        <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{method.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => handleSetDefault(method.id)}>
                      Set as Default
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleRemove(method.id)}>
                    <Trash2 size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {isAddingNew ? (
          <div className="border border-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-4">Add New Payment Method</h3>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
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

              <TabsContent value="telebirr">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="telebirr-phone">TeleBirr Phone Number</Label>
                    <Input id="telebirr-phone" placeholder="+251..." />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="telebirr-default"
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                    />
                    <Label htmlFor="telebirr-default">Set as default payment method</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cbe">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cbe-phone">CBE Birr Phone Number</Label>
                    <Input id="cbe-phone" placeholder="+251..." />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="cbe-default" className="h-4 w-4 rounded border-gray-700 bg-gray-800" />
                    <Label htmlFor="cbe-default">Set as default payment method</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amole">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amole-phone">Amole Phone Number</Label>
                    <Input id="amole-phone" placeholder="+251..." />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="amole-default" className="h-4 w-4 rounded border-gray-700 bg-gray-800" />
                    <Label htmlFor="amole-default">Set as default payment method</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="card">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input id="card-name" placeholder="John Doe" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input id="card-expiry" placeholder="MM/YY" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input id="card-cvv" placeholder="123" type="password" maxLength={4} />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="card-default" className="h-4 w-4 rounded border-gray-700 bg-gray-800" />
                    <Label htmlFor="card-default">Set as default payment method</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Payment Method</Button>
            </div>
          </div>
        ) : (
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <PlusCircle size={16} />
            Add Payment Method
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
