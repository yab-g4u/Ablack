import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Image src="/images/logo.png" alt="ABLACK" width={150} height={50} className="h-12 w-auto" />
            <p className="text-gray-400 max-w-xs">
              Premium clothing brand focused on quality craftsmanship and timeless design.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="/collections">Collections</FooterLink>
              <FooterLink href="/shop">Shop All</FooterLink>
              <FooterLink href="/about">Our Story</FooterLink>
              <FooterLink href="/sustainability">Sustainability</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Help</h3>
            <ul className="space-y-4">
              <FooterLink href="/shipping">Shipping & Returns</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/size-guide">Size Guide</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-800 focus:border-white"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
            <div className="mt-8 space-y-3 text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Bole Road, Friendship Building, 4th Floor, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>info@ablack.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>+251 911 234 567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ABLACK. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</span>
            <span className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</span>
            <span className="text-gray-500 text-sm hover:text-white transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  )
}
