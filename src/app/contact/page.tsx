"use client"

import { useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Arrow } from "@/components/ui/Arrow"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: "Vaste zuil", message: "" })
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  function update(k: string, v: string) { setForm({ ...form, [k]: v }); setErrs({ ...errs, [k]: "" }) }
  function submit(e: React.FormEvent) {
    e.preventDefault()
    const e2: Record<string, string> = {}
    if (!form.name.trim()) e2.name = "Vul je naam in"
    if (!form.email.trim()) e2.email = "Vul je e-mail in"
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e2.email = "Klopt dit e-mailadres?"
    if (!form.message.trim()) e2.message = "Vertel ons kort wat je nodig hebt"
    setErrs(e2)
    if (Object.keys(e2).length === 0) setSent(true)
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ 07</span>Contact &amp; offerte</div>
              <h1 style={{ marginTop: 20 }}>Vertel ons wat je nodig hebt.</h1>
            </div>
            <p className="lede">Meestal hebben we binnen één werkdag een voorstel terug — inclusief tekening en prijs.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="block">
              <div className="label">Telefoon</div>
              <div className="val"><a href="tel:0722600000">072 26 000 00</a></div>
            </div>
            <div className="block">
              <div className="label">E-mail</div>
              <div className="val"><a href="mailto:info@stroomplek.nl">info@stroomplek.nl</a></div>
            </div>
            <div className="block">
              <div className="label">Vestiging</div>
              <div className="val">Heerhugowaard, NL</div>
              <p style={{ color: "var(--ink-mute)", fontSize: 14, marginTop: 8 }}>Geen showroom — we werken volledig op aanvraag, per mail of telefoon.</p>
            </div>
            <div className="block">
              <div className="label">Levertijd</div>
              <div className="val" style={{ fontSize: 18 }}>In overleg — we bouwen op bestelling</div>
            </div>
          </div>

          <Reveal>
            {sent ? (
              <div className="form-success">
                <div className="check">✓</div>
                <h3>Bedankt — we hebben 'm binnen.</h3>
                <p style={{ color: "var(--ink-soft)" }}>We nemen meestal binnen één werkdag contact op. Voor spoed: bel direct op <a href="tel:0722600000" style={{ color: "var(--copper-deep)" }}>072 26 000 00</a>.</p>
                <div style={{ marginTop: 8 }}>
                  <button className="btn btn-outline-dark" onClick={() => { setSent(false); setForm({ name: "", company: "", email: "", phone: "", interest: "Vaste zuil", message: "" }) }}>
                    Nog een aanvraag doen
                  </button>
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="field-row">
                  <div className="field">
                    <label>Naam *</label>
                    <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Je volledige naam" />
                    {errs.name && <span className="err">{errs.name}</span>}
                  </div>
                  <div className="field">
                    <label>Bedrijf / organisatie</label>
                    <input value={form.company} onChange={e => update("company", e.target.value)} placeholder="Optioneel" />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>E-mail *</label>
                    <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="naam@bedrijf.nl" />
                    {errs.email && <span className="err">{errs.email}</span>}
                  </div>
                  <div className="field">
                    <label>Telefoon</label>
                    <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="06 ..." />
                  </div>
                </div>
                <div className="field">
                  <label>Waar heb je interesse in?</label>
                  <select value={form.interest} onChange={e => update("interest", e.target.value)}>
                    <option>Vaste zuil</option>
                    <option>Mobiele zuil</option>
                    <option>Vast + mobiel combinatie</option>
                    <option>Volledig maatwerk</option>
                    <option>Weet ik nog niet — denk graag mee</option>
                  </select>
                </div>
                <div className="field">
                  <label>Bericht *</label>
                  <textarea value={form.message} onChange={e => update("message", e.target.value)} placeholder="Vertel kort wat je nodig hebt — locatie, aantal, gewenste aansluitingen…" />
                  {errs.message && <span className="err">{errs.message}</span>}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                  <button type="submit" className="btn btn-copper btn-arrow">Verstuur aanvraag <Arrow /></button>
                  <a href="tel:0722600000" className="btn btn-outline-dark">Of bel direct</a>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
