"use client"

import { Reveal } from "@/components/ui/Reveal"

const ITEMS = [
  { num: "01", h: "Design zonder compromis", p: "Strak, premium en doordacht. Elk detail klopt — van afwerking tot kabelafloop." },
  { num: "02", h: "Volledig configureerbaar", p: "Kleur, aansluitingen en montage afgestemd op jouw ruimte. Specials zijn welkom." },
  { num: "03", h: "Vier doordachte modellen", p: "Twee vaste en twee mobiele uitvoeringen — elk met een duidelijke taak." },
  { num: "04", h: "Configurator komt eraan", p: "Bouw straks zelf je zuil online. Tot die tijd: één bericht en we maken 'm samen." },
]

export default function WhySection() {
  return (
    <section className="dark section">
      <div className="container">
        <Reveal>
          <div className="why-head">
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ 03</span>Waarom Stroomplek</div>
              <h2 style={{ marginTop: 20 }}>Vakmanschap uit <em>Heerhugowaard.</em></h2>
            </div>
            <p className="lede" style={{ color: "rgba(245,245,245,.7)" }}>
              Premium, op maat en volledig in eigen huis ontworpen — we lanceren{" "}
              <span style={{ color: "var(--copper)" }}>11 mei 2026</span>.
            </p>
          </div>
        </Reveal>
        <div className="why-grid">
          {ITEMS.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="why-item">
                <div className="num">{it.num}</div>
                <h4>{it.h}</h4>
                <p>{it.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
