"use client"

import { useState } from "react"
import CTABanner from "@/components/shared/CTABanner"

const FAQS = [
  { q: "Wat is het verschil tussen vast en mobiel?",
    a: "Vaste zuilen zijn aan vloer of muur gemonteerd en bedoeld voor permanente plekken (klaslokaal, kantoor, ontvangstruimte). Mobiele zuilen staan op een rijdend onderstel met gedempte wieltjes en zijn ideaal voor evenementen, foyers en flexibele werkplekken." },
  { q: "Kan ik de zuil in elke kleur bestellen?",
    a: "Ja. Standaard leveren we in geanodiseerd aluminium of zwart, maar elke RAL-kleur is mogelijk in poedercoat-afwerking. Geef gewoon je RAL-code door bij de offerte." },
  { q: "Wat zijn de aansluitopties?",
    a: "Standaard kies je uit Schuko-stopcontacten (NL), USB-C/A, UTP CAT6, HDMI en blindplaten. Heb je een specifieke aansluiting nodig, dan bouwen we 'm in." },
  { q: "Hoe vraag ik een offerte aan?",
    a: "Vul het formulier op de contactpagina in of stuur een mail naar info@stroomplek.nl. We reageren binnen één werkdag met een voorstel inclusief tekening en prijs." },
  { q: "Kan ik een zuil volledig op maat laten maken?",
    a: "Absoluut — dat is eigenlijk waarom Stroomplek bestaat. Maat, hoogte, kleur, aansluitingen, kabelafloop, montage: vertel ons wat je nodig hebt en we maken het." },
  { q: "Wat is de levertijd?",
    a: "Levertijd bepalen we per aanvraag — afhankelijk van afwerking en aansluitingen. Je krijgt 'm bij de offerte mee. Spoed? Vraag het — we doen ons best." },
  { q: "Wanneer gaan jullie live?",
    a: "11 mei 2026 — vanaf dan kun je bestellen. Tot die tijd kun je deze site gebruiken om je oriëntatie te doen en kun je ons alvast je vraag mailen." },
]

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export default function FaqPage() {
  const [open, setOpen] = useState<number>(0)
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ 06</span>FAQ</div>
              <h1 style={{ marginTop: 20 }}>Veelgestelde vragen.</h1>
            </div>
            <p className="lede">Niet gevonden wat je zoekt? Bel ons gewoon — we leggen het graag uit.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{f.q}</span>
                  <span className="plus"><PlusIcon /></span>
                </button>
                <div className="faq-a"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
