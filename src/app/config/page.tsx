import Link from "next/link"
import CTABanner from "@/components/shared/CTABanner"

export default function ConfigPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ 04</span>Online configurator</div>
              <h1 style={{ marginTop: 20 }}>Bouw je eigen zuil. <em className="cu">Bijna klaar.</em></h1>
            </div>
            <p className="lede">We zetten de laatste puntjes op de i. In de tussentijd: bel of mail ons en we configureren 'm samen.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="config-stage">
            <div className="config-preview">
              <div className="stage-grid" />
              <div className="stage-tag">Live preview · binnenkort</div>
              <div className="stage-zuil" />
              <div className="stage-floor" />
            </div>
            <div className="config-panel">
              <div className="eyebrow"><span style={{ color: "var(--copper)" }}>↳ Demo</span>Configurator</div>
              <h3 style={{ marginTop: 6 }}>Stel jouw zuil samen</h3>
              <div style={{ marginTop: 12 }}>
                {[
                  ["Type", "Vaste · grote"],
                  ["Uitvoering", "Standaard, niet uitschuifbaar"],
                  ["Kleur", "RAL 9005 — zwart"],
                  ["Stopcontacten", "2× Schuko"],
                  ["Data", "1× UTP CAT6"],
                ].map(([l, v]) => (
                  <div key={l} className="config-row">
                    <span className="label">{l}</span>
                    <span className="pill">{v}</span>
                  </div>
                ))}
              </div>
              <div className="config-disabled-overlay">
                <div style={{ maxWidth: 340, textAlign: "center" }}>
                  <span className="coming-badge"><span className="live" />In ontwikkeling</span>
                  <h3 style={{ marginTop: 16 }}>Komt binnenkort live.</h3>
                  <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>Vraag tot die tijd je configuratie aan via het contactformulier — meestal binnen 1 werkdag terug.</p>
                  <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/contact" className="btn btn-dark">Offerte aanvragen</Link>
                    <Link href="/vast" className="btn btn-outline-dark">Bekijk producten</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
