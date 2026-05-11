"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

function WattMeter() {
  const [w, setW] = useState(2148)
  useEffect(() => {
    const id = setInterval(() => {
      setW(v => Math.max(1800, Math.min(2600, Math.round(v + (Math.random() - 0.5) * 80))))
    }, 1400)
    return () => clearInterval(id)
  }, [])
  const pct = ((w - 1800) / 800) * 100
  return (
    <div className="watt-meter">
      <div className="wm-head">
        <span className="wm-dot" />
        <span className="wm-label">Studio · Live verbruik</span>
      </div>
      <div className="wm-bar"><div className="wm-fill" style={{ width: pct + "%" }} /></div>
      <div className="wm-val">{w.toLocaleString("nl-NL")} W</div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="brand-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-stroomplek-nav.png" alt="Stroomplek" style={{ height: 52, width: "auto", display: "block", marginBottom: 14 }} />
            <p className="tag">Stroom op de plek waar jij het nodig hebt. Premium stroomzuilen — op maat gemaakt in Heerhugowaard.</p>
          </div>
          <div>
            <h4>Producten</h4>
            <ul>
              <li><Link href="/vast">Vaste zuilen</Link></li>
              <li><Link href="/mobiel">Mobiele zuilen</Link></li>
              <li><Link href="/config">Configurator</Link></li>
            </ul>
          </div>
          <div>
            <h4>Bedrijf</h4>
            <ul>
              <li><Link href="/over">Over ons</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Offerte aanvragen</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:0722600000">072 26 000 00</a></li>
              <li><a href="mailto:info@stroomplek.nl">info@stroomplek.nl</a></li>
              <li>Heerhugowaard</li>
            </ul>
            <WattMeter />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Stroomplek</span>
          <span>info@stroomplek.nl · Heerhugowaard</span>
          <span>Ontworpen &amp; geassembleerd in NL</span>
        </div>
      </div>
    </footer>
  )
}
