"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import gsap from "gsap"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    login: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Page entrance animation
      const tl = gsap.timeline()

      tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(
          imageRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          formRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".form-element",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await signIn(formData.login.email, formData.login.password)

      if (error) {
        setError(error.message)
      } else {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      login: {
        ...formData.login,
        [e.target.id]: e.target.value,
      },
    })
  }

  return (
    <div ref={pageRef} className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Image */}
      <div ref={imageRef} className="w-full md:w-1/2 relative hidden md:block">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/black-fabric.png" alt="ABLACK Fabric" fill className="object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12">
          <Image src="/images/logo.png" alt="ABLACK" width={200} height={80} className="mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-center">Welcome Back</h1>
          <p className="text-xl text-gray-300 max-w-md text-center">
            Sign in to access your account and continue your premium shopping experience.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-black">
        <div ref={formRef} className="w-full max-w-md">
          <div className="mb-8 flex justify-between items-center">
            <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            <Image src="/images/logo.png" alt="ABLACK" width={100} height={40} className="md:hidden" />
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="form-element">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin}>
                {error && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md flex items-center gap-2 text-red-400">
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                <div className="space-y-2 form-element">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2 form-element">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between form-element">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Button className="w-full py-6 form-element" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 form-element">
              <div className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-white hover:underline">
                  Sign up
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="bg-gray-800 border-gray-700">
                  Google
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700">
                  Apple
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
