"use client"

import { useEffect, useRef, useState } from "react"

// Cable path data — organic bezier curves lying "on the floor"
// Each path is drawn from outside inward toward the pillar base (center-bottom of SVG)
const CABLES = [
  // From far left, sweeping across
  { d: "M -40 88 C 60 90, 110 86, 160 84 S 240 82, 300 84", delay: 0,    len: 360 },
  { d: "M -20 92 C 80 94, 140 90, 210 92 S 290 94, 340 90", delay: 80,   len: 380 },
  { d: "M 20 96 C 90 98, 150 94, 220 94",                    delay: 40,   len: 220 },
  // From far right
  { d: "M 660 86 C 560 88, 500 86, 440 84 S 380 84, 340 86", delay: 20,  len: 330 },
  { d: "M 640 92 C 540 94, 470 92, 410 92 S 370 92, 345 90", delay: 100, len: 310 },
  { d: "M 600 96 C 520 98, 460 96, 390 96",                  delay: 60,  len: 220 },
  // Shorter cross-cables
  { d: "M 80 100 C 140 98, 200 98, 260 96 S 310 95, 335 94", delay: 120, len: 270 },
  { d: "M 560 100 C 500 98, 450 98, 400 96 S 360 95, 345 94",delay: 140, len: 230 },
]

export default function CableSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); io.disconnect() } },
      { threshold: 0.45 }
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
            viewBox="0 80 680 110"
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
      stroke="rgba(140,148,160,0.55)"
      strokeWidth="2.5"
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
