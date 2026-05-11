"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"

function HeroColumns() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current; if (!host) return
    const cols = host.querySelectorAll<HTMLElement>(".hcol")
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect()
      const mx = e.clientX - r.left
      cols.forEach(c => {
        const cx = parseFloat(c.dataset.x || "0") / 100 * r.width
        const dist = Math.abs(mx - cx)
        const intensity = Math.max(0, 1 - dist / 280)
        c.style.setProperty("--i", intensity.toFixed(3))
      })
    }
    const onLeave = () => cols.forEach(c => c.style.setProperty("--i", "0"))
    host.addEventListener("mousemove", onMove)
    host.addEventListener("mouseleave", onLeave)
    return () => { host.removeEventListener("mousemove", onMove); host.removeEventListener("mouseleave", onLeave) }
  }, [])
  const positions = [10, 22, 38, 56, 70, 84, 92]
  return (
    <div ref={ref} className="hcols">
      {positions.map((x, i) => (
        <div key={i} className="hcol" data-x={x} style={{ left: `${x}%` }} />
      ))}
    </div>
  )
}

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)

  // Cursor spotlight
  useEffect(() => {
    const el = heroRef.current; if (!el) return
    let raf = 0, tx = 50, ty = 35, cx = 50, cy = 35
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 100
      ty = ((e.clientY - r.top) / r.height) * 100
      el.classList.add("spot-on")
    }
    const onLeave = () => el.classList.remove("spot-on")
    const tick = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12
      el.style.setProperty("--mx", cx.toFixed(2) + "%")
      el.style.setProperty("--my", cy.toFixed(2) + "%")
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
  }, [])

  // Scroll merge effect
  useEffect(() => {
    // hf-1: " op de " — fade then collapse (brings Stroom+plek together on line 1)
    // hf-2: "waar jij het nodig hebt." — fade + slide up (separate block line, no width collapse needed)
    const hf1 = document.querySelector<HTMLElement>(".hf-1")
    const hf2 = document.querySelector<HTMLElement>(".hf-2")
    if (!hf1 || !hf2) return
    let w1 = 0
    let raf = 0

    const measure = () => {
      hf1.style.width = ""; hf1.style.opacity = ""; hf1.style.letterSpacing = ""
      hf2.style.opacity = ""; hf2.style.transform = ""; hf2.style.maxHeight = ""
      w1 = hf1.getBoundingClientRect().width
      apply()
    }
    const apply = () => {
      const vh = window.innerHeight || 800
      const p = Math.max(0, Math.min(1, window.scrollY / (vh * 0.55)))
      const e = 1 - Math.pow(1 - p, 1.6)

      const eFade     = Math.min(1, e / 0.40)   // opacity goes to 0 first
      const eCollapse = Math.max(0, (e - 0.40) / 0.60) // then width collapses

      // Line 1 fill: fade then collapse
      hf1.style.opacity       = (1 - eFade).toFixed(3)
      hf1.style.width         = eCollapse > 0 ? (w1 * (1 - eCollapse)).toFixed(2) + "px" : ""
      hf1.style.letterSpacing = eFade < 1 ? (-0.04 * eFade) + "em" : ""

      // Line 2 (whole block): fade + slight upward lift — no width collapse
      hf2.style.opacity   = (1 - Math.min(1, e / 0.52)).toFixed(3)
      hf2.style.transform = `translateY(${-(eCollapse * 14).toFixed(1)}px)`
      hf2.style.maxHeight = eCollapse > 0.8 ? "0" : ""

      const stroom = document.querySelector<HTMLElement>(".hw-stroom")
      const plek   = document.querySelector<HTMLElement>(".hw-plek")
      if (stroom && plek) {
        const glow  = (e * 28).toFixed(1)
        const scale = (1 + e * 0.04).toFixed(3)
        stroom.style.transform = `scale(${scale})`
        plek.style.transform   = `scale(${scale})`
        stroom.style.filter = `drop-shadow(0 0 ${glow}px rgba(212,128,74,${0.25 + e * 0.45}))`
        plek.style.filter   = `drop-shadow(0 0 ${glow}px rgba(212,128,74,${0.25 + e * 0.45}))`
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; apply() }) }
    apply()
    setTimeout(measure, 50)
    setTimeout(measure, 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure) }
  }, [])

  const badges = ["Gemaakt in NL", "Vast & Mobiel", "UTP · USB · Schuko", "B2B & Particulier", "Maatwerk", "Op bestelling gebouwd"]

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-bg">
        <div className="floor" />
        <div className="grid" />
        <div className="beam" />
        <div className="glow" />
        <div className="glow-2" />
      </div>
      <HeroColumns />
      <div className="container hero-content">
        <Reveal>
          <span className="kicker">
            <span className="live" />
            {" "}Lancering · 11 mei 2026
          </span>
        </Reveal>

        <div className="hero-headline">
          <Reveal>
            <div className="hero-phrase" ref={h1Ref}>
              {/* Line 1 — merge animation: "Stroom op de plek" → "Stroomplek" */}
              <h1 className="three-d hero-merge">
                <span className="copper-word hw-stroom">Stroom</span>
                <span className="hero-fill hf-1"> op de </span>
                <span className="copper-word hw-plek">plek</span>
              </h1>
              {/* Line 2 — fades + lifts away on scroll */}
              <p className="hero-subline hf-2">
                waar jij het nodig hebt.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="meta-col">
              <p className="lede">Premium stroomzuilen voor evenementen, scholen en kantoren. Vast of mobiel — strak, stil en volledig configureerbaar.</p>
              <div className="hero-actions">
                <Magnetic strength={0.18}>
                  <Link href="/contact" className="btn btn-copper btn-arrow">
                    Offerte aanvragen <Arrow />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <Link href="/vast" className="btn btn-outline-light">
                    Bekijk producten
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div className="hero-badges marquee" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            <div className="marquee-track">
              {[...Array(2)].map((_, k) =>
                badges.map((b, i) => <span key={`${k}-${i}`} className="b">{b}</span>)
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
