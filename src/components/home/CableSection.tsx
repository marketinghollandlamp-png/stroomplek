"use client"

import { useEffect, useRef, useState } from "react"

// Cable path data — organic bezier curves lying "on the floor"
// Each path is drawn from outside inward toward the pillar base (center-bottom of SVG)
const CABLES = [
  // From far left, sweeping across
  { d: "M -40 8 C 60 10, 110 6, 160 4 S 240 2, 300 4", delay: 0,    len: 360 },
  { d: "M -20 12 C 80 14, 140 10, 210 12 S 290 14, 340 10", delay: 80,   len: 380 },
  { d: "M 20 16 C 90 18, 150 14, 220 14",                    delay: 40,   len: 220 },
  // From far right
  { d: "M 660 6 C 560 8, 500 6, 440 4 S 380 4, 340 6", delay: 20,  len: 330 },
  { d: "M 640 12 C 540 14, 470 12, 410 12 S 370 12, 345 10", delay: 100, len: 310 },
  { d: "M 600 16 C 520 18, 460 16, 390 16",                  delay: 60,  len: 220 },
  // Shorter cross-cables
  { d: "M 80 20 C 140 18, 200 18, 260 16 S 310 15, 335 14", delay: 120, len: 270 },
  { d: "M 560 20 C 500 18, 450 18, 400 16 S 360 15, 345 14",delay: 140, len: 230 },
]

export default function CableSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="cable-section dark" ref={ref}>
      {/* Atmosphere */}
      <div className="cable-bg">
        <div className="cb-grid" />
        <div className="cb-glow" />
      </div>

      <div className="container cable-inner">
        {/* Left copy */}
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

        {/* Right — cable scene */}
        <div className="cable-scene" aria-hidden="true">
          {/* Perspective floor */}
          <div className="cable-floor" />

          {/* SVG cables */}
          <svg
            className="cable-svg"
            viewBox="0 0 680 120"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <filter id="cable-glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {CABLES.map((c, i) => (
              <CablePath
                key={i}
                d={c.d}
                len={c.len}
                delay={c.delay}
                triggered={triggered}
                index={i}
              />
            ))}
          </svg>

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

          {/* Floor label */}
          <div className={`cable-label ${triggered ? "on" : ""}`}>
            <span>Stroomplek · VZ-G</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CablePath({
  d, len, delay, triggered, index,
}: {
  d: string; len: number; delay: number; triggered: boolean; index: number
}) {
  const isRight = index >= 3 && index < 6
  // Right-side cables retract to the right; left-side retract to the left
  // We animate dashoffset: 0 = fully drawn, len = fully hidden
  const offset = triggered ? len : 0

  return (
    <path
      d={d}
      fill="none"
      stroke="rgba(160,168,180,0.7)"
      strokeWidth="3.5"
      strokeLinecap="round"
      filter="url(#cable-glow)"
      style={{
        strokeDasharray: len,
        strokeDashoffset: offset,
        transition: triggered
          ? `stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1) ${delay}ms, opacity 0.6s ease ${delay + 400}ms`
          : "none",
        opacity: triggered ? 0 : 1,
      }}
    />
  )
}
