"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Items", href: "/status" },
    { label: "Chat", href: "/chat" },
    { label: "Report", href: "/report" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-md border-b border-secondary/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Lost & Found Logo"
              width={60}
              height={60}
              className="hover:scale-110 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary font-medium transition-all duration-300 hover:scale-110"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {/* ✅ FIXED SIGN IN (DESKTOP) */}
            <Link href="/auth">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-accent text-accent 
                           hover:bg-accent hover:text-white 
                           shadow-md hover:shadow-accent/40 
                           transition-all bg-transparent font-semibold"
              >
                Sign In or Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors font-semibold"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-secondary/30 pt-4 bg-gradient-to-r from-primary/5 to-secondary/5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-secondary/20 rounded font-medium transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2 space-y-2">
              <div className="flex justify-center pb-2">
                <ThemeToggle />
              </div>

              {/* ✅ FIXED SIGN IN (MOBILE) */}
              <Link href="/auth" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-2 border-accent text-accent 
                             hover:bg-accent hover:text-white 
                             shadow-md hover:shadow-accent/40 
                             transition-all bg-transparent font-semibold"
                >
                  Sign In
                </Button>
              </Link>

              {/* Sign Up stays same */}
              <Link href="/auth" className="block">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground shadow-lg font-semibold"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
