"use client"

import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Arrow } from "@/components/ui/Arrow"
import RALPicker from "@/components/shared/RALPicker"
import CTABanner from "@/components/shared/CTABanner"
import Zuil3D from "@/components/product/Zuil3D"

const VASTE_LIJN = [
  {
    id: "vz-groot", size: "Grote vaste", size_mono: "VZ-G",
    desc: "De vaste basisversie. Slanke vierkante koker met aansluitingen aan één zijde, vast op de vloer of in de grond.",
    h: "Vast · één hoogte",
    img: "/images/grote-vast.png",
    bullets: ["Vaste, slanke koker", "Kabelafloop ingelaten", "Voet op grondplaat"],
  },
  {
    id: "vz-tele", size: "Uitschuifbare vaste", size_mono: "VZ-T",
    desc: "Telescopisch — schuif 'm hoger of lager waar de installatie dat vraagt. Zelfde behuizing, twee secties.",
    h: "Telescoop · in te stellen",
    img: "/images/grote-uitschuifbaar.png",
    bullets: ["Twee secties · in hoogte verstelbaar", "Geborgd met klemring", "Zelfde voet als de vaste"],
  },
]

const MOBIELE_LIJN = [
  {
    id: "mz-medium", size: "Medium mobiele", size_mono: "MZ-M",
    desc: "Compacte mobiele uitvoering op een rijdende voet, met vier ingelaten contacten en een handgreep voor verplaatsen.",
    h: "Mobiel · medium",
    img: "/images/medium-mobiel.png",
    bullets: ["Vier ingelaten contacten", "Wieltjes + voetjes", "Handgreep + kabelhaak"],
  },
  {
    id: "mz-groot", size: "Grote mobiele", size_mono: "MZ-G",
    desc: "Hoge mobiele variant met opzetbeugel — dezelfde voet als de medium, maar met extra reikhoogte.",
    h: "Mobiel · groot",
    img: "/images/grote-mobiel.png",
    bullets: ["Opzetbeugel met haak", "Voor extra reikhoogte", "Dezelfde rijdende voet"],
  },
]

const SPECS = [
  ["Stopcontacten", "Schuko (NL), penaarde, USB-C/A"],
  ["Data", "UTP CAT6, HDMI, optionele patch"],
  ["Blindplaten", "Aluminium of poedercoat in iedere RAL"],
  ["Behuizing", "Geanodiseerd aluminium of poedercoat in elke RAL-kleur"],
  ["Levertijd", "In overleg — we bouwen op bestelling"],
  ["Maatwerk", "Specials op aanvraag"],
]

export default function ProductPage({ kind }: { kind: "vast" | "mobiel" }) {
  const isMobiel = kind === "mobiel"
  const lineSet = isMobiel ? MOBIELE_LIJN : VASTE_LIJN
  const lineTitle = isMobiel ? "Mobiele stroomzuilen" : "Vaste stroomzuilen"
  const lineLede = isMobiel
    ? "Op een rijdende voet — schuif 'm waar je 'm nodig hebt. Twee uitvoeringen: medium en hoog."
    : "Vast op de vloer of in de grond. Twee uitvoeringen: een vaste en een telescopische."

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div className="eyebrow dark">
                <span style={{ color: "var(--copper)" }}>↳ {isMobiel ? "M" : "V"}</span>
                {isMobiel ? "Productlijn · Mobiel" : "Productlijn · Vast"}
              </div>
              <h1 style={{ marginTop: 20 }}>{lineTitle}.</h1>
            </div>
            <p className="lede">{lineLede}</p>
          </div>
        </div>
      </section>

      <section className="dark section" style={{ paddingTop: "clamp(48px,6vw,80px)", paddingBottom: "clamp(48px,6vw,80px)" }}>
        <div className="container">
          <div className="why-head" style={{ marginBottom: 32 }}>
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ 3D</span>Live preview</div>
              <h2 style={{ marginTop: 20 }}>Draai 'm rond. <em style={{ color: "var(--copper)", fontStyle: "italic", fontWeight: 400 }}>Bekijk 'm van alle kanten.</em></h2>
            </div>
            <p className="lede" style={{ color: "rgba(245,245,245,.7)" }}>Sleep om handmatig te draaien of laat 'm automatisch ronddraaien.</p>
          </div>
          <Zuil3D kind={kind} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid two">
            {lineSet.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <div className="product-card">
                  <div className={`thumb ${i === 1 ? "copper" : "dark"}`} style={{ position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.size} className="thumb-img" draggable={false} />
                    <div className="thumb-tag">{isMobiel ? "Mobiel" : "Vast"} · {item.size}</div>
                    <div className="thumb-sku">{item.size_mono}</div>
                  </div>
                  <div className="body">
                    <div className="row">
                      <h3>{item.size}</h3>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", color: "var(--ink-mute)", textTransform: "uppercase" }}>{item.size_mono}</span>
                    </div>
                    <p className="desc">{item.desc}</p>
                    <ul className="bullet-list">
                      {item.bullets.map((b, j) => <li key={j}><span className="dot" />{b}</li>)}
                    </ul>
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line-soft)", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-mute)", letterSpacing: ".08em", textTransform: "uppercase" }}>{item.h}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--paper-edge)", borderBottom: "1px solid var(--paper-edge)" }}>
        <div className="container">
          <div className="products-head">
            <div className="section-head">
              <div className="eyebrow"><span style={{ color: "var(--copper)" }}>↳ 04</span>Configuratie</div>
              <h2 style={{ marginTop: 8 }}>Stel 'm samen zoals jij wilt.</h2>
            </div>
            <p className="lede">Standaard kies je uit deze opties. Heb je iets specifieks nodig? Vertel het ons — we maken het.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(32px,5vw,80px)", marginTop: 8 }}>
            <div className={`thumb ${isMobiel ? "copper" : "dark"}`} style={{ position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lineSet[0].img} alt={lineSet[0].size} className="thumb-img" draggable={false} />
              <div className="thumb-tag">Configureerbaar</div>
              <div className="thumb-sku">op maat</div>
            </div>
            <dl className="spec">
              {[...SPECS,
                ["Uitvoering", isMobiel ? "Medium of grote mobiele — op rijdende voet" : "Vast of uitschuifbaar — vast op vloer of in de grond"],
                ["Aansluiting", isMobiel ? "Geaarde aansluitkabel + stekker" : "Vast aangesloten of stekker"],
              ].map(([k, v]) => (
                <div className="spec-row" key={k}>
                  <dt>{k}</dt><dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="products-head">
            <div className="section-head">
              <div className="eyebrow"><span style={{ color: "var(--copper)" }}>↳ 05</span>Aanvragen</div>
              <h2 style={{ marginTop: 8 }}>Prijs op aanvraag — we maken op bestelling.</h2>
            </div>
            <p className="lede">Geen voorraad, geen catalogusprijs. Vertel ons wat je nodig hebt en je krijgt een voorstel inclusief tekening en prijs.</p>
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-dark btn-arrow">
              Offerte op deze configuratie <Arrow />
            </Link>
            <Link href={isMobiel ? "/vast" : "/mobiel"} className="btn btn-outline-dark">
              Bekijk de {isMobiel ? "vaste" : "mobiele"} lijn
            </Link>
          </div>
        </div>
      </section>

      <RALPicker num="↳ 06" />
      <CTABanner />
    </>
  )
}
