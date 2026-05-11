"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const prev = useRef(pathname)

  useEffect(() => {
    if (pathname === prev.current) return
    prev.current = pathname
    setPhase("out")
    const t = setTimeout(() => {
      setDisplayChildren(children)
      setPhase("in")
    }, 240)
    return () => clearTimeout(t)
  }, [pathname, children])

  return <div className={`page-trans ${phase}`}>{displayChildren}</div>
}
