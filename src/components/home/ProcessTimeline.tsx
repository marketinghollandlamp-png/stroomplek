"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/ui/Reveal"

const STEPS = [
  { n: "01", t: "Gesprek", d: "Bel of mail. We luisteren naar wat je nodig hebt — ruimte, gebruik, esthetiek.", dur: "1 dag" },
  { n: "02", t: "Voorstel", d: "Schets, configuratie en prijs. Inclusief tekening, RAL-keuze en aansluitingen.", dur: "1 werkdag" },
  { n: "03", t: "Goedkeuring", d: "Eén iteratie zit standaard inbegrepen. Pas aan tot het écht klopt.", dur: "1–3 dagen" },
  { n: "04", t: "Productie", d: "We bouwen 'm in onze werkplaats in Heerhugowaard. Eén stuk tegelijk, geen voorraad.", dur: "3–5 weken" },
  { n: "05", t: "Levering", d: "Bezorgd of door ons gemonteerd. We controleren ter plekke en sluiten aan.", dur: "1 dag" },
]

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const fn = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = r.height + vh * 0.4
      const seen = Math.max(0, Math.min(total, vh - r.top))
      setProgress(Math.max(0, Math.min(1, seen / total)))
    }
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    window.addEventListener("resize", fn)
    return () => { window.removeEventListener("scroll", fn); window.removeEventListener("resize", fn) }
  }, [])

  return (
    <section className="dark section process-section">
      <div className="process-bg">
        <div className="pb-glow" />
        <div className="pb-glow b" />
        <div className="pb-grid" />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div className="why-head">
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ 05</span>Proces</div>
              <h2 style={{ marginTop: 20 }}>
                Van eerste belletje<br />
                tot <em style={{ color: "var(--copper)", fontStyle: "italic", fontWeight: 400 }}>plug-and-go.</em>
              </h2>
            </div>
            <p className="lede" style={{ color: "rgba(245,245,245,.7)" }}>
              Een transparant, voorspelbaar proces. Geen verrassingen — gewoon één werkdag tot voorstel en 3–5 weken tot levering.
            </p>
          </div>
        </Reveal>

        <div className="timeline" ref={ref}>
          {/* Spine runs through the center of the 80px dots (left: 39px = center of 80px dot) */}
          <div className="tl-spine">
            <div className="tl-fill" style={{ height: `${progress * 100}%` }} />
          </div>

          {STEPS.map((s, i) => {
            const t = i / (STEPS.length - 1)
            const reached = progress > t - 0.05
            return (
              <div key={s.n} className={`tl-step ${reached ? "on" : ""}`}>
                {/* Dot is now an in-flow grid item — no absolute positioning */}
                <div className="tl-dot">
                  <span className="tl-num">{s.n}</span>
                </div>
                <div className="tl-card">
                  <div className="tl-head">
                    <h4>{s.t}</h4>
                    <span className="tl-dur">{s.dur}</span>
                  </div>
                  <p>{s.d}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
