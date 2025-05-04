"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, CreditCard, Heart, LogOut, Settings, Edit } from "lucide-react"
import gsap from "gsap"
import OrderHistory from "@/components/order-history"
import PaymentMethods from "@/components/payment-methods"

export default function AccountPage() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data - in a real app, this would come from Supabase
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+251 911 234 567",
    address: "Bole Road, Addis Ababa",
    avatar: "",
  }

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (typeof window !== "undefined" && pageRef.current) {
      // Page entrance animation
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }
  }, [])

  // Animation for tab transitions
  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeContent = document.querySelector(`[data-state="active"]`)
      if (activeContent) {
        gsap.fromTo(activeContent, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      }
    }
  }, [activeTab])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="bg-gray-800 text-xl">{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-400 text-sm">{userData.email}</p>
                </div>

                <nav className="space-y-1">
                  <NavItem
                    icon={<User size={18} />}
                    label="Profile"
                    active={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                  />
                  <NavItem
                    icon={<Package size={18} />}
                    label="Orders"
                    active={activeTab === "orders"}
                    onClick={() => setActiveTab("orders")}
                  />
                  <NavItem
                    icon={<CreditCard size={18} />}
                    label="Payment Methods"
                    active={activeTab === "payment"}
                    onClick={() => setActiveTab("payment")}
                  />
                  <NavItem
                    icon={<Heart size={18} />}
                    label="Wishlist"
                    active={activeTab === "wishlist"}
                    onClick={() => router.push("/wishlist")}
                  />
                  <NavItem
                    icon={<Settings size={18} />}
                    label="Settings"
                    active={activeTab === "settings"}
                    onClick={() => setActiveTab("settings")}
                  />
                  <NavItem
                    icon={<LogOut size={18} />}
                    label="Logout"
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-400"
                  />
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit size={14} />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={userData.name} readOnly className="bg-gray-800" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={userData.email} readOnly className="bg-gray-800" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={userData.phone} readOnly className="bg-gray-800" />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input value={userData.address} readOnly className="bg-gray-800" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <OrderHistory />
              </TabsContent>

              <TabsContent value="payment">
                <PaymentMethods />
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value="en">English</option>
                        <option value="am">Amharic</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Email Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-updates" className="cursor-pointer">
                            Order Updates
                          </Label>
                          <input
                            type="checkbox"
                            id="order-updates"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="promotions" className="cursor-pointer">
                            Promotions and Offers
                          </Label>
                          <input
                            type="checkbox"
                            id="promotions"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newsletter" className="cursor-pointer">
                            Newsletter
                          </Label>
                          <input
                            type="checkbox"
                            id="newsletter"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                          />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Save Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
  className?: string
}

function NavItem({ icon, label, active, onClick, className }: NavItemProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-md transition-colors",
        active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
