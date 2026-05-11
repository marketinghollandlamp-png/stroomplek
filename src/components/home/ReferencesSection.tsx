"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/ui/Reveal"

const REFS = [
  {
    quote: "We zochten iets wat kon meegroeien met onze evenementen. De zuilen van Stroomplek zijn de enige die er écht uitzien alsof ze erbij horen — niet alsof ze erin zijn geschoven.",
    name: "Bram Koopman",
    role: "Oprichter, Bureau Stek",
    location: "Amsterdam",
    type: "Evenementen",
    ral: "RAL 9005",
    ralHex: "#0A0A0A",
    model: "MZ-G",
    stat: "12×",
    statLabel: "mobiele zuilen",
  },
  {
    quote: "Eindelijk een leverancier die snapt dat detail ertoe doet. Van de RAL-kleur tot de kabelafloop — alles klopt. Onze klanten vragen er standaard naar.",
    name: "Lotte van der Berg",
    role: "Interior Designer, Atelier LvdB",
    location: "Rotterdam",
    type: "Interieur",
    ral: "RAL 7016",
    ralHex: "#293133",
    model: "VZ-G",
    stat: "1×",
    statLabel: "maatwerk vast",
  },
  {
    quote: "De uitschuifbare variant is perfect voor onze flexibele klasopstelling. Geen haspels, geen gedoe, en de kinderen vinden ze mooi — dat zegt genoeg.",
    name: "Marieke de Groot",
    role: "Locatiedirecteur, Vrije School Noord",
    location: "Alkmaar",
    type: "Onderwijs",
    ral: "RAL 9016",
    ralHex: "#F1F1F1",
    model: "VZ-T",
    stat: "8×",
    statLabel: "vaste zuilen",
  },
  {
    quote: "Wij werken uitsluitend met leveranciers die kwaliteit boven kwantiteit stellen. Stroomplek past daar perfect in — handwerk, transparant proces, nul compromis op afwerking.",
    name: "Jasper Veldkamp",
    role: "Projectleider, Veldkamp Architecten",
    location: "Utrecht",
    type: "Architectuur",
    ral: "Geanodiseerd",
    ralHex: "#B7B5AE",
    model: "VZ-G",
    stat: "3×",
    statLabel: "maatwerk",
  },
]

function RalSwatch({ hex, label }: { hex: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{
        display: "inline-block", width: 12, height: 12, borderRadius: 3,
        background: hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)",
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{label}</span>
    </span>
  )
}

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.2 6.8 6.4 12H12V24H0ZM20 24V14.4C20 6.4 24.8 1.6 34.4 0L36 2.4C30.4 3.6 27.2 6.8 26.4 12H32V24H20Z" fill="var(--copper)" fillOpacity=".18"/>
    </svg>
  )
}

export default function ReferencesSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef({ x: 0, scroll: 0 })

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % REFS.length)
    }, 5200)
    return () => clearInterval(id)
  }, [])

  // Scroll track to active card
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[active] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" })
  }, [active])

  return (
    <section className="dark section refs-section" style={{ overflow: "hidden", position: "relative" }}>
      {/* Background atmosphere */}
      <div className="refs-bg">
        <div className="refs-glow a" />
        <div className="refs-glow b" />
        <div className="refs-grid" />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div className="why-head" style={{ marginBottom: "clamp(40px,5vw,64px)" }}>
            <div>
              <div className="eyebrow dark">
                <span style={{ color: "var(--copper)" }}>↳ 07</span>Referenties
              </div>
              <h2 style={{ marginTop: 20, color: "#F5F5F5" }}>
                Wat anderen<br />
                <em style={{ color: "var(--copper)", fontStyle: "italic", fontWeight: 400 }}>zeggen.</em>
              </h2>
            </div>
            <p className="lede" style={{ color: "rgba(245,245,245,.65)" }}>
              Van interieurontwerpers tot evenementenbureaus — iedereen heeft een andere ruimte,
              maar hetzelfde probleem. En dezelfde oplossing.
            </p>
          </div>
        </Reveal>

        {/* Card track — horizontally scrollable */}
        <div
          ref={trackRef}
          className="refs-track"
          onMouseDown={e => { setDragging(true); dragStart.current = { x: e.clientX, scroll: trackRef.current!.scrollLeft } }}
          onMouseMove={e => { if (!dragging) return; trackRef.current!.scrollLeft = dragStart.current.scroll - (e.clientX - dragStart.current.x) }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          {REFS.map((r, i) => (
            <div
              key={i}
              className={`ref-card ${active === i ? "on" : ""}`}
              onClick={() => setActive(i)}
            >
              {/* Top accent bar */}
              <div className="ref-accent" style={{ background: `linear-gradient(90deg, ${r.ralHex}, transparent)` }} />

              <div className="ref-inner">
                <QuoteIcon />
                <blockquote className="ref-quote">
                  <p>"{r.quote}"</p>
                </blockquote>
                <div className="ref-author">
                  <div className="ref-avatar" style={{ background: `linear-gradient(135deg, ${r.ralHex}44, ${r.ralHex}22)`, border: `1px solid ${r.ralHex}55` }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "rgba(245,245,245,.8)" }}>
                      {r.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="ref-name">{r.name}</div>
                    <div className="ref-role">{r.role}</div>
                    <div className="ref-loc">{r.location}</div>
                  </div>
                </div>
              </div>

              <div className="ref-footer">
                <div className="ref-meta">
                  <span className="ref-type">{r.type}</span>
                  <RalSwatch hex={r.ralHex} label={r.ral} />
                </div>
                <div className="ref-stat">
                  <span className="rs-n">{r.stat}</span>
                  <span className="rs-l">{r.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="refs-dots">
          {REFS.map((_, i) => (
            <button
              key={i}
              className={`rd ${active === i ? "on" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Referentie ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <ProgressBar active={active} total={REFS.length} />
      </div>
    </section>
  )
}

function ProgressBar({ active, total }: { active: number; total: number }) {
  return (
    <div className="refs-progress">
      <div className="rp-track">
        <div className="rp-fill" style={{ width: `${((active + 1) / total) * 100}%` }} />
      </div>
      <span className="rp-label">
        <span style={{ color: "var(--copper)" }}>{String(active + 1).padStart(2, "0")}</span>
        {" / "}
        {String(total).padStart(2, "0")}
      </span>
    </div>
  )
}
