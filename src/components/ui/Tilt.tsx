"use client"
import { useEffect, useRef, ReactNode } from "react"

export function Tilt({ children, max = 6, className = "" }: {
  children: ReactNode
  max?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      tx = (py - 0.5) * -2 * max
      ty = (px - 0.5) * 2 * max
      el.style.setProperty("--tilt-x", `${px * 100}%`)
      el.style.setProperty("--tilt-y", `${py * 100}%`)
    }
    const onLeave = () => { tx = 0; ty = 0 }
    const tick = () => {
      cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15
      el.style.transform = `perspective(900px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`
      raf = requestAnimationFrame(tick)
    }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [max])
  return <div ref={ref} className={`tilt ${className}`}>{children}</div>
}
