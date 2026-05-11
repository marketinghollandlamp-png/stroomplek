"use client"

import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Arrow } from "@/components/ui/Arrow"
import { Tilt } from "@/components/ui/Tilt"

const ALL_PRODUCTS = [
  {
    id: "vz-groot", size: "Grote vaste", size_mono: "VZ-G",
    desc: "De vaste basisversie. Slanke vierkante koker met aansluitingen aan één zijde, vast op de vloer of in de grond.",
    img: "/images/grote-vast.png", variant: "dark", href: "/vast",
    tag: "Vast · Standaard",
  },
  {
    id: "vz-tele", size: "Uitschuifbare vaste", size_mono: "VZ-T",
    desc: "Telescopisch — schuif 'm hoger of lager waar de installatie dat vraagt. Zelfde behuizing, twee secties.",
    img: "/images/grote-uitschuifbaar.png", variant: "dark", href: "/vast",
    tag: "Vast · Uitschuifbaar",
  },
  {
    id: "mz-medium", size: "Medium mobiele", size_mono: "MZ-M",
    desc: "Compacte mobiele uitvoering op een rijdende voet, met vier ingelaten contacten en een handgreep.",
    img: "/images/medium-mobiel.png", variant: "copper", href: "/mobiel",
    tag: "Mobiel · Medium",
  },
  {
    id: "mz-groot", size: "Grote mobiele", size_mono: "MZ-G",
    desc: "Hoge mobiele variant met opzetbeugel — dezelfde voet als de medium, maar met extra reikhoogte.",
    img: "/images/grote-mobiel.png", variant: "copper", href: "/mobiel",
    tag: "Mobiel · Groot",
  },
]

export default function ProductsSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="products-head">
            <div className="section-head">
              <div className="eyebrow"><span style={{ color: "var(--copper)" }}>↳ 02</span>Producten</div>
              <h2 style={{ marginTop: 8 }}>Vier modellen. Eén obsessie voor afwerking.</h2>
            </div>
            <p className="lede">Twee vaste en twee mobiele uitvoeringen — allemaal volledig configureerbaar in kleur en aansluitingen.</p>
          </div>
        </Reveal>
        <div className="cards-grid four">
          {ALL_PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <Tilt max={4}>
                <Link href={p.href} className="product-card" style={{ display: "block", textDecoration: "none" }}>
                  <div className={`thumb ${p.variant}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.size} className="thumb-img" draggable={false} />
                    <div className="thumb-floor" />
                    <div className="thumb-tag">{p.tag}</div>
                    <div className="thumb-sku">{p.size_mono}</div>
                  </div>
                  <div className="body">
                    <div className="row">
                      <h3>{p.size}</h3>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", color: "var(--ink-mute)", textTransform: "uppercase" }}>{p.size_mono}</span>
                    </div>
                    <p className="desc">{p.desc}</p>
                    <div className="cta-row">
                      <span className="more">Bekijk de lijn <Arrow size={12} /></span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
