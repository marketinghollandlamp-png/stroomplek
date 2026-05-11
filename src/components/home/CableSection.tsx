"use client"

import { useEffect, useRef, useState } from "react"

const CABLE_LINES = [
  // { x1, y (%), width (%), rotate (deg), delay (ms), fromRight }
  { x: 2,  y: 62, w: 38, rot: -3,  delay: 0,   right: false },
  { x: 4,  y: 70, w: 34, rot: 2,   delay: 80,  right: false },
  { x: 0,  y: 78, w: 28, rot: -1,  delay: 40,  right: false },
  { x: 60, y: 62, w: 38, rot: 3,   delay: 20,  right: true  },
  { x: 62, y: 70, w: 34, rot: -2,  delay: 100, right: true  },
  { x: 64, y: 78, w: 28, rot: 1,   delay: 60,  right: true  },
  { x: 10, y: 86, w: 30, rot: -4,  delay: 120, right: false },
  { x: 58, y: 86, w: 30, rot: 4,   delay: 140, right: true  },
]

export default function CableSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); io.disconnect() } },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="cable-section dark" ref={ref}>
      <div className="cable-bg">
        <div className="cb-grid" />
        <div className="cb-glow" />
      </div>

      <div className="container cable-inner">
        <div className="cable-copy">
          <div className="eyebrow dark">
            <span style={{ color: "var(--copper)" }}>↳</span>Het probleem
          </div>
          <h2 style={{ marginTop: 20, color: "#F5F5F5" }}>
            Geen haspels.<br />
            Geen kabels<br />
            <em style={{ color: "var(--copper)", fontStyle: "italic", fontWeight: 400 }}>
              in de weg.
            </em>
          </h2>
          <p className="lede" style={{ color: "rgba(245,245,245,.65)", marginTop: 20 }}>
            Eén zuil op de plek waar jij stroom nodig hebt.
            Precies de aansluitingen die je gebruikt.
            In de kleur die bij jouw ruimte past.
          </p>
        </div>

        {/* Scene */}
        <div className="cable-scene" aria-hidden="true">
          <div className="cable-floor" />

          {/* Cables — simple absolutely-positioned lines */}
          {CABLE_LINES.map((c, i) => (
            <div
              key={i}
              className="cable-line"
              style={{
                left:   c.right ? "auto" : `${c.x}%`,
                right:  c.right ? `${c.x}%` : "auto",
                top:    `${c.y}%`,
                width:  `${c.w}%`,
                transform: `rotate(${c.rot}deg)`,
                opacity:    triggered ? 0 : 1,
                transition: triggered
                  ? `opacity 0.5s ease ${c.delay}ms, transform 0.5s ease ${c.delay}ms`
                  : "none",
              }}
            />
          ))}

          {/* Pillar */}
          <div className={`cable-pillar ${triggered ? "risen" : ""}`}>
            <div className="cp-body">
              <div className="cp-face">
                <span className="cp-socket" />
                <span className="cp-socket" />
                <span className="cp-port" />
              </div>
              <div className={`cp-glow ${triggered ? "on" : ""}`} />
            </div>
            <div className="cp-base" />
            <div className={`cp-shadow ${triggered ? "on" : ""}`} />
          </div>

          <div className={`cable-label ${triggered ? "on" : ""}`}>
            <span>Stroomplek · VZ-G</span>
          </div>
        </div>
      </div>
    </section>
  )
}
