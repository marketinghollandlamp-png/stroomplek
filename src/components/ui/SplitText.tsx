"use client"
import { useEffect, useRef, useState, ElementType } from "react"

export function SplitText({ text, className = "", as: As = "span", stagger = 22 }: {
  text: string
  className?: string
  as?: ElementType
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setShown(true); io.disconnect() } })
    }, { threshold: 0.25 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const words = text.split(" ")
  let i = 0
  const Tag = As as any
  return (
    <Tag ref={ref} className={`split ${shown ? "in" : ""} ${className}`}>
      {words.map((w, wi) => (
        <span key={wi} className="split-word">
          {[...w].map(c => {
            const idx = i++
            return <span key={idx} className="split-char" style={{ transitionDelay: `${idx * stagger}ms` }}>{c}</span>
          })}
          {wi < words.length - 1 && <span className="split-char" style={{ transitionDelay: `${i++ * stagger}ms` }}>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
