"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PAGES = [
  { href: "/vast",   label: "Vaste zuilen" },
  { href: "/mobiel", label: "Mobiele zuilen" },
  { href: "/config", label: "Configurator" },
  { href: "/over",   label: "Over ons" },
  { href: "/blog",   label: "Blog" },
  { href: "/faq",    label: "FAQ" },
]

export default function Navigation() {
  const [menu, setMenu] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (menu) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [menu])

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-stroomplek-nav.png" alt="Stroomplek" style={{ height: 42, width: "auto", display: "block" }} />
        </Link>
        <nav className="nav">
          {PAGES.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className={`nav-link ${pathname === p.href ? "active" : ""}`}
            >
              {p.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta">Offerte aanvragen</Link>
          <button className="menu-btn" onClick={() => setMenu(v => !v)}>Menu</button>
        </nav>
      </div>

      {menu && (
        <div className="mobile-sheet">
          {[{ href: "/", label: "Home" }, ...PAGES, { href: "/contact", label: "Contact" }].map(p => (
            <Link key={p.href} href={p.href} onClick={() => setMenu(false)}
              className={pathname === p.href ? "active" : ""} style={{ color: pathname === p.href ? "var(--copper)" : undefined }}>
              {p.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
