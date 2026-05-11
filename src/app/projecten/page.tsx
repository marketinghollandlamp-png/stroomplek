"use client"

import { useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Arrow } from "@/components/ui/Arrow"
import CTABanner from "@/components/shared/CTABanner"

const PROJECTS = [
  {
    id: "vrije-school-noord",
    title: "Acht klaslokalen, één esthetiek.",
    client: "Vrije School Noord",
    location: "Alkmaar",
    type: "Onderwijs",
    model: "VZ-T",
    modelLabel: "Uitschuifbare vaste",
    qty: "8×",
    ral: "RAL 7016",
    ralHex: "#293133",
    tagline: "Geen haspels meer op de vloer. Acht identieke zuilen, precies ingepast tussen kast en raam.",
    palette: ["#293133", "#3d4446", "#6b7274"],
  },
  {
    id: "studio-kopper",
    title: "Twaalf mobiele zuilen op tour.",
    client: "Studio Kopper",
    location: "Amsterdam",
    type: "Evenementen",
    model: "MZ-G",
    modelLabel: "Grote mobiele",
    qty: "12×",
    ral: "Koper-finish",
    ralHex: "#C46A2D",
    tagline: "Een evenementenbureau dat door heel NL beurzen levert. Zuilen die meereizen en er altijd goed uitzien.",
    palette: ["#C46A2D", "#A85624", "#7E3E19"],
  },
  {
    id: "atelier-veld",
    title: "Eén zuil, exact ingepast.",
    client: "Atelier Veld & Co",
    location: "Utrecht",
    type: "Interieur",
    model: "VZ-G",
    modelLabel: "Grote vaste",
    qty: "1×",
    ral: "RAL 9005",
    ralHex: "#0A0A0A",
    tagline: "Architectenbureau in een monumentaal pand. Kleur en hoogte tot op de millimeter afgestemd.",
    palette: ["#0A0A0A", "#1a1a1a", "#3a3a3a"],
  },
  {
    id: "design-studio-lotte",
    title: "Drie zuilen voor drie werkplekken.",
    client: "Design Studio Lotte",
    location: "Rotterdam",
    type: "Kantoor",
    model: "VZ-G",
    modelLabel: "Grote vaste",
    qty: "3×",
    ral: "Geanodiseerd",
    ralHex: "#B7B5AE",
    tagline: "Een interieurstudio met hoge eisen aan detail. Geanodiseerd aluminium, passend bij de bestaande inrichting.",
    palette: ["#B7B5AE", "#8a8880", "#5c5a55"],
  },
  {
    id: "foyer-concertzaal",
    title: "Foyer met karakter.",
    client: "Op aanvraag",
    location: "Den Haag",
    type: "Cultuur",
    model: "MZ-M",
    modelLabel: "Medium mobiele",
    qty: "6×",
    ral: "RAL 9016",
    ralHex: "#F1F1F1",
    tagline: "Zes mobiele zuilen voor de pauzefoyer. Strak wit, discreet, makkelijk weggereden voor grote events.",
    palette: ["#F1F1F1", "#d4d4d4", "#a8a8a8"],
  },
  {
    id: "kantoor-maatwerk",
    title: "Open kantoor zonder kabelchaos.",
    client: "Op aanvraag",
    location: "Heerhugowaard",
    type: "Kantoor",
    model: "VZ-T",
    modelLabel: "Uitschuifbare vaste",
    qty: "4×",
    ral: "RAL 7016",
    ralHex: "#293133",
    tagline: "Verstelbare vaste zuilen voor een flexibel kantoor. Iedere werkplek heeft stroom precies waar nodig.",
    palette: ["#293133", "#3d4446", "#6b7274"],
  },
]

const TYPES = ["Alle", "Onderwijs", "Evenementen", "Interieur", "Kantoor", "Cultuur"]

function ProjectCard({ p, index }: { p: typeof PROJECTS[0]; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <div className="proj-card">
        {/* Visual */}
        <div className="proj-visual" style={{ background: `linear-gradient(155deg, ${p.palette[0]}, ${p.palette[2]})` }}>
          <div className="proj-grid" />
          <div className="proj-glow" style={{ background: `radial-gradient(closest-side, ${p.palette[1]}88, transparent 70%)` }} />
          {/* Pillar silhouette */}
          <div className="proj-pillar" style={{ background: `linear-gradient(180deg, ${lighten(p.ralHex, 18)}, ${p.ralHex})` }}>
            <span className="proj-socket" /><span className="proj-socket" /><span className="proj-port" />
          </div>
          <div className="proj-floor" />
          <div className="proj-badges">
            <span className="proj-type">{p.type}</span>
            <span className="proj-qty">{p.qty} {p.modelLabel}</span>
          </div>
          <div className="proj-ral">
            <span className="proj-ral-sw" style={{ background: p.ralHex, border: "1px solid rgba(255,255,255,.15)" }} />
            <span className="proj-ral-label">{p.ral}</span>
          </div>
        </div>

        {/* Body */}
        <div className="proj-body">
          <div className="proj-loc">
            <span className="proj-dot" />
            {p.client} · {p.location}
          </div>
          <h3 className="proj-title">{p.title}</h3>
          <p className="proj-text">{p.tagline}</p>
          <div className="proj-spec">
            <span className="ps-label">Model</span>
            <span className="ps-val">{p.model} — {p.modelLabel}</span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function lighten(hex: string, amt: number) {
  const n = parseInt(hex.replace("#", "").padEnd(6, "0"), 16)
  const r = Math.min(255, ((n >> 16) & 0xff) + amt)
  const g = Math.min(255, ((n >> 8) & 0xff) + amt)
  const b = Math.min(255, (n & 0xff) + amt)
  return `#${[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("")}`
}

export default function ProjectenPage() {
  const [filter, setFilter] = useState("Alle")
  const filtered = filter === "Alle" ? PROJECTS : PROJECTS.filter(p => p.type === filter)

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳</span>Projecten</div>
              <h1 style={{ marginTop: 20 }}>Waar Stroomplek staat.</h1>
            </div>
            <p className="lede" style={{ color: "rgba(245,245,245,.7)" }}>
              Scholen, evenementen, kantoren, foyers — elk project zijn eigen kleur, model en configuratie.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter bar */}
          <div className="proj-filters">
            {TYPES.map(t => (
              <button
                key={t}
                className={`pf-btn ${filter === t ? "on" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="proj-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} />
            ))}
          </div>

          {/* Coming-soon note */}
          <Reveal>
            <div className="proj-coming">
              <div className="pc-line" />
              <p>
                <span style={{ color: "var(--copper)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>In uitvoering</span>
                <br />
                Echte projectfoto's worden toegevoegd zodra installaties zijn afgerond. Heb jij Stroomplek al in je ruimte? Stuur ons een foto via{" "}
                <a href="mailto:info@stroomplek.nl" style={{ color: "var(--copper-deep)" }}>info@stroomplek.nl</a>.
              </p>
              <div style={{ marginTop: 24 }}>
                <Link href="/contact" className="btn btn-dark btn-arrow">
                  Offerte aanvragen <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
