"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Eye, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock order data - in a real app, this would come from Supabase
const orders = [
  {
    id: "AB-12345",
    date: "May 2, 2023",
    status: "Delivered",
    total: "$438.00",
    items: [
      {
        id: "1",
        name: "Denim Jacket",
        price: "$249.00",
        quantity: 1,
        imageUrl: "/images/model2.png",
      },
      {
        id: "2",
        name: "Denim Trousers",
        price: "$189.00",
        quantity: 1,
        imageUrl: "/images/model1.png",
      },
    ],
  },
  {
    id: "AB-12346",
    date: "April 15, 2023",
    status: "Processing",
    total: "$399.00",
    items: [
      {
        id: "3",
        name: "Full Denim Set",
        price: "$399.00",
        quantity: 1,
        imageUrl: "/images/model3.png",
      },
    ],
  },
  {
    id: "AB-12347",
    date: "March 28, 2023",
    status: "Cancelled",
    total: "$279.00",
    items: [
      {
        id: "4",
        name: "Signature Jacket",
        price: "$279.00",
        quantity: 1,
        imageUrl: "/images/model-back.png",
      },
    ],
  },
]

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500/20 text-green-500 border-green-500/50"
      case "processing":
        return "bg-blue-500/20 text-blue-500 border-blue-500/50"
      case "cancelled":
        return "bg-red-500/20 text-red-500 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/50"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Package size={16} />
                        <span className="font-medium">Order #{order.id}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Placed on {order.date}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <span className="font-semibold">{order.total}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <Eye size={14} />
                        {selectedOrder === order.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </div>

                  {selectedOrder === order.id && (
                    <div className="p-4 border-t border-gray-800">
                      <h4 className="font-medium mb-3">Order Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
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
                              <h5 className="font-medium">{item.name}</h5>
                              <div className="flex justify-between mt-1">
                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                <p>{item.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <p className="text-sm text-gray-400">John Doe</p>
                          <p className="text-sm text-gray-400">Bole Road, Friendship Building</p>
                          <p className="text-sm text-gray-400">Addis Ababa, Ethiopia</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            Download Invoice
                          </Button>
                          {order.status === "Delivered" && <Button size="sm">Buy Again</Button>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
                <Link href="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Other tabs would filter the orders by status */}
          <TabsContent value="processing" className="space-y-4">
            {orders.filter((order) => order.status === "Processing").length > 0 ? (
              orders
                .filter((order) => order.status === "Processing")
                .map((order) => (
                  <div key={order.id} className="border border-gray-800 rounded-lg overflow-hidden">
                    {/* Same content as above, but filtered */}
                    <div className="p-4 bg-gray-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Package size={16} />
                          <span className="font-medium">Order #{order.id}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Placed on {order.date}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <span className="font-semibold">{order.total}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          <Eye size={14} />
                          {selectedOrder === order.id ? "Hide Details" : "View Details"}
                        </Button>
                      </div>
                    </div>

                    {selectedOrder === order.id && (
                      <div className="p-4 border-t border-gray-800">{/* Order details content */}</div>
                    )}
                  </div>
                ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No processing orders found.</p>
              </div>
            )}
          </TabsContent>

          {/* Similar content for other tabs */}
          <TabsContent value="delivered" className="space-y-4">
            {/* Filtered orders for delivered status */}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {/* Filtered orders for cancelled status */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
