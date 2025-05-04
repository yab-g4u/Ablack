"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Cart from "@/components/cart"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, showAuthModal, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Show user dropdown (handled by the dropdown component)
    } else {
      showAuthModal()
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="z-50">
          <Image src="/images/logo.png" alt="ABLACK" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/account")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/orders")}>Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/wishlist")}>Wishlist</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleAuthClick}>
              <User className="h-5 w-5" />
            </Button>
          )}
          <Cart />
        </div>

        <Button variant="ghost" size="icon" className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-black flex flex-col items-center justify-center transition-transform duration-500 ease-in-out md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-col items-center space-y-8 text-2xl">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/collections" onClick={() => setIsOpen(false)}>
              Collections
            </MobileNavLink>
            <MobileNavLink href="/shop" onClick={() => setIsOpen(false)}>
              Shop
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
          </nav>

          <div className="flex items-center space-x-6 mt-12">
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false)
                  router.push("/account")
                }}
              >
                My Account
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false)
                  showAuthModal()
                }}
              >
                Sign In
              </Button>
            )}
            <Cart />
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm uppercase tracking-wider hover:text-white/70 transition-colors relative group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-xl uppercase tracking-wider hover:text-white/70 transition-colors"
    >
      {children}
    </Link>
  )
}
