"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, Zap } from "lucide-react"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems, setCartOpen } = useStore()

  const isHome = pathname === "/"
  const cartCount = cartItems.reduce((sum, item) => sum + item.aantal, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/modellen", label: "Modellen" },
    { href: "/configurator", label: "Configurator" },
    { href: "/zakelijk", label: "Zakelijk" },
    { href: "/contact", label: "Contact" },
  ]

  const isTransparent = isHome && !scrolled && !mobileOpen

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                isTransparent ? "bg-white/20" : "bg-blue-600"
              )}
            >
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span
              className={cn(
                "text-lg font-bold tracking-tight transition-colors",
                isTransparent ? "text-white" : "text-zinc-900"
              )}
            >
              Stroomplek
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-zinc-600 hover:text-zinc-900",
                  pathname === link.href && !isTransparent && "text-zinc-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className={cn(
                "relative p-2 rounded-full transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-zinc-600 hover:bg-zinc-100"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/configurator"
              className="hidden lg:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Stel samen
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-zinc-600 hover:bg-zinc-100"
              )}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/configurator"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                Stel je zuil samen
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
