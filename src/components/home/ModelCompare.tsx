"use client"

import { useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Arrow } from "@/components/ui/Arrow"

const PRODUCTS = [
  {
    id: "vz-groot", size: "Grote vaste", size_mono: "VZ-G", h: "Vast · één hoogte",
    img: "/images/grote-vast.png", href: "/vast",
    desc: "De vaste basisversie. Slanke vierkante koker met aansluitingen aan één zijde.",
    bullets: ["Vaste, slanke koker", "Kabelafloop ingelaten", "Voet op grondplaat"],
  },
  {
    id: "vz-tele", size: "Uitschuifbare vaste", size_mono: "VZ-T", h: "Telescoop · in te stellen",
    img: "/images/grote-uitschuifbaar.png", href: "/vast",
    desc: "Telescopisch — schuif 'm hoger of lager waar de installatie dat vraagt.",
    bullets: ["Twee secties · in hoogte verstelbaar", "Geborgd met klemring", "Zelfde voet als de vaste"],
  },
  {
    id: "mz-medium", size: "Medium mobiele", size_mono: "MZ-M", h: "Mobiel · medium",
    img: "/images/medium-mobiel.png", href: "/mobiel",
    desc: "Compacte mobiele uitvoering op een rijdende voet.",
    bullets: ["Vier ingelaten contacten", "Wieltjes + voetjes", "Handgreep + kabelhaak"],
  },
  {
    id: "mz-groot", size: "Grote mobiele", size_mono: "MZ-G", h: "Mobiel · groot",
    img: "/images/grote-mobiel.png", href: "/mobiel",
    desc: "Hoge mobiele variant met opzetbeugel voor extra reikhoogte.",
    bullets: ["Opzetbeugel met haak", "Voor extra reikhoogte", "Dezelfde rijdende voet"],
  },
]

export default function ModelCompare() {
  const [active, setActive] = useState(0)
  const a = PRODUCTS[active]
  return (
    <section className="section model-compare">
      <div className="container">
        <Reveal>
          <div className="why-head" style={{ alignItems: "end", marginBottom: 48 }}>
            <div>
              <div className="eyebrow"><span style={{ color: "var(--copper)" }}>↳ 04</span>Welk model past bij jou?</div>
              <h2 style={{ marginTop: 20 }}>Vergelijk de <em style={{ color: "var(--copper-deep)", fontStyle: "italic", fontWeight: 400 }}>vier modellen</em> naast elkaar.</h2>
            </div>
            <p className="lede">Twee vaste, twee mobiele. Klik er één om 'm uit te lichten — of bekijk de specs van alle vier hieronder.</p>
          </div>
        </Reveal>
        <div className="mc-grid">
          {PRODUCTS.map((p, i) => (
            <button key={p.id} className={`mc-card ${active === i ? "on" : ""}`} onClick={() => setActive(i)}>
              <div className="mc-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.size} draggable={false}
                  style={{ objectFit: "contain", width: "100%", height: "100%", padding: "12%" }} />
              </div>
              <div className="mc-body">
                <div className="mc-tag">{p.size_mono}</div>
                <div className="mc-name">{p.size}</div>
                <div className="mc-h">{p.h}</div>
              </div>
            </button>
          ))}
        </div>
        <Reveal>
          <div className="mc-detail">
            <div className="mc-detail-head">
              <div className="mc-detail-mono">{a.size_mono}</div>
              <h3 className="mc-detail-title">{a.size}</h3>
              <p className="mc-detail-desc">{a.desc}</p>
            </div>
            <ul className="mc-bullets">
              {a.bullets.map((b, j) => (
                <li key={j}><span className="dot" />  {b}</li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <Link href={a.href} className="btn btn-dark btn-arrow">
                Bekijk deze lijn <Arrow size={14} />
              </Link>
              <Link href="/contact" className="btn btn-outline-dark">
                Offerte op {a.size_mono}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
