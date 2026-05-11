"use client"

import { useState } from "react"
import { Reveal } from "@/components/ui/Reveal"

const RAL_COLORS = [
  { code: "9005", name: "Gitzwart",        hex: "#0A0A0A" },
  { code: "9016", name: "Verkeerswit",     hex: "#F1F1F1" },
  { code: "7016", name: "Antracietgrijs",  hex: "#293133" },
  { code: "7035", name: "Lichtgrijs",      hex: "#CBD0CC" },
  { code: "7022", name: "Ombragrijs",      hex: "#332F2C" },
  { code: "8019", name: "Grijsbruin",      hex: "#3B3131" },
  { code: "8017", name: "Chocoladebruin",  hex: "#45302E" },
  { code: "3005", name: "Wijnrood",        hex: "#5E2129" },
  { code: "3009", name: "Oxyderood",       hex: "#6E2925" },
  { code: "5008", name: "Grijsblauw",      hex: "#23282B" },
  { code: "5011", name: "Staalblauw",      hex: "#1A2B3C" },
  { code: "6005", name: "Mosgroen",        hex: "#114232" },
  { code: "6009", name: "Dennegroen",      hex: "#27352A" },
  { code: "1019", name: "Grijsbeige",      hex: "#9E8B6E" },
  { code: "1015", name: "Licht ivoor",     hex: "#E1CC9A" },
  { code: "ANO",  name: "Geanodiseerd alu",hex: "#B7B5AE" },
]

function shade(hex: string, pct: number) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + pct))
  const g = Math.max(0, Math.min(255, ((n >> 8)  & 0xff) + pct))
  const b = Math.max(0, Math.min(255, (n & 0xff)         + pct))
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")
}

export default function RALPicker({ num = "↳ 06" }) {
  const [sel, setSel] = useState(2)
  const [scheme, setScheme] = useState<"dark"|"warm"|"cool">("dark")
  const c = RAL_COLORS[sel]
  const bg = scheme === "dark" ? "#14263C" : scheme === "warm" ? "#F1ECE3" : "#F5F5F5"

  return (
    <section className="section ral-section" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--paper-edge)", borderBottom: "1px solid var(--paper-edge)" }}>
      <div className="container">
        <Reveal>
          <div className="products-head">
            <div className="section-head">
              <div className="eyebrow"><span style={{ color: "var(--copper)" }}>{num}</span>RAL kleurkiezer</div>
              <h2 style={{ marginTop: 8 }}>Klik een kleur. Zie 'm meteen.</h2>
            </div>
            <p className="lede">Elke RAL is mogelijk in poedercoat. Selecteer een paar populaire kleuren of geef je eigen RAL-code op in de offerte.</p>
          </div>
        </Reveal>

        <div className="ral-stage">
          <div className="ral-preview" style={{ background: bg }}>
            <div className="ral-pv-grid" />
            <div className="ral-pv-spot" />
            <div className="ral-pv-zuil" style={{
              background: `linear-gradient(180deg, ${shade(c.hex, 12)}, ${c.hex} 35%, ${shade(c.hex, -16)})`,
              transition: "background .4s ease",
            }}>
              <div className="ral-pv-face">
                <span className="rpv-socket" /><span className="rpv-socket" /><span className="rpv-port" />
              </div>
              <div className="ral-pv-shadow" style={{ background: `radial-gradient(closest-side, ${shade(c.hex, -50)}66, transparent 80%)` }} />
            </div>
            <div className="ral-pv-floor" style={{
              background: scheme === "dark"
                ? "linear-gradient(180deg, transparent, rgba(0,0,0,.6))"
                : "linear-gradient(180deg, transparent, rgba(0,0,0,.18))",
            }} />
            <div className="ral-pv-meta">
              <div className="rpm-code">RAL {c.code}</div>
              <div className="rpm-name">{c.name}</div>
              <div className="rpm-hex">{c.hex.toUpperCase()}</div>
            </div>
            <div className="ral-pv-scheme">
              {([["dark","Donker"],["warm","Warm wit"],["cool","Koel wit"]] as const).map(([k, l]) => (
                <button key={k} className={scheme === k ? "on" : ""} onClick={() => setScheme(k)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="ral-grid">
            {RAL_COLORS.map((r, i) => (
              <button key={r.code} className={`ral-chip ${sel === i ? "on" : ""}`} onClick={() => setSel(i)}>
                <span className="rc-sw" style={{ background: r.hex }} />
                <span className="rc-meta">
                  <span className="rc-code">{r.code === "ANO" ? "Anodised" : "RAL " + r.code}</span>
                  <span className="rc-name">{r.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
