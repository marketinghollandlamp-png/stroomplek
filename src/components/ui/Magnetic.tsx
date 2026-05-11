"use client"
import { useEffect, useRef, ReactNode } from "react"

export function Magnetic({ children, strength = 0.25, className = "" }: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => { el.style.transform = "translate(0,0)" }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [strength])
  return <span ref={ref} className={`magnetic ${className}`}>{children}</span>
}
