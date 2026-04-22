"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

function ZuilVisual({ color = "#E0DEDA" }: { color?: string }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Shadow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 blur-xl opacity-30"
        style={{ background: "#000", borderRadius: "50%" }}
      />
      {/* Cap top */}
      <div
        style={{
          width: 76,
          height: 10,
          background: `linear-gradient(180deg, ${color} 0%, ${darken(color, 15)} 100%)`,
          borderRadius: "4px 4px 0 0",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.12)",
        }}
      />
      {/* Main body */}
      <div
        style={{
          width: 68,
          height: 380,
          background: `linear-gradient(180deg, ${lighten(color, 5)} 0%, ${color} 30%, ${darken(color, 8)} 100%)`,
          borderRadius: 4,
          boxShadow: `
            inset 3px 0 10px rgba(255,255,255,0.15),
            inset -3px 0 6px rgba(0,0,0,0.15),
            4px 12px 40px rgba(0,0,0,0.2)
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            bottom: 0,
            width: 2,
            background: "linear-gradient(180deg, transparent 10%, rgba(255,255,255,0.25) 40%, transparent 90%)",
          }}
        />
        {/* Modules */}
        {[70, 130, 190, 250, 310].map((top) => (
          <div key={top} style={{ position: "absolute", top, left: "50%", transform: "translateX(-50%)" }}>
            <div
              style={{
                width: 48,
                height: 30,
                background: "rgba(0,0,0,0.2)",
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              {/* Outlet slots */}
              <div style={{ width: 14, height: 10, background: "rgba(0,0,0,0.4)", borderRadius: 2 }} />
              <div style={{ width: 14, height: 10, background: "rgba(0,0,0,0.4)", borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
      {/* Base */}
      <div
        style={{
          width: 88,
          height: 14,
          background: `linear-gradient(180deg, ${darken(color, 10)} 0%, ${darken(color, 20)} 100%)`,
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  )
}

function lighten(hex: string, pct: number) {
  return adjustColor(hex, pct)
}
function darken(hex: string, pct: number) {
  return adjustColor(hex, -pct)
}
function adjustColor(hex: string, pct: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const adj = (v: number) => Math.max(0, Math.min(255, v + Math.round((pct / 100) * 255)))
  return `#${adj(r).toString(16).padStart(2, "0")}${adj(g).toString(16).padStart(2, "0")}${adj(b).toString(16).padStart(2, "0")}`
}

const highlights = [
  "Geëxtrudeerd aluminium profiel",
  "Poedercoating in elke RAL-kleur",
  "Modulaire aansluitmontage",
  "5 jaar productgarantie",
  "CE- en NEN-gecertificeerd",
]

export default function ProductShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-4">
              Productkwaliteit
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">
              Industrieel ontwerp. Premium afwerking.
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
              Onze stroomzuilen zijn gebouwd voor de meest veeleisende omgevingen. Van open kantoorlandschappen tot architecturale showrooms en hospitality-projecten.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-zinc-700 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Configureer jouw zuil
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Product visual */}
          <div className="flex items-center justify-center gap-12 py-8">
            <div className="opacity-60 scale-90">
              <ZuilVisual color="#CBCDC9" />
              <p className="text-center text-xs text-zinc-400 mt-4 font-medium">RAL 7035</p>
            </div>
            <div className="relative">
              <div
                className="absolute inset-0 -m-8 rounded-3xl"
                style={{ background: "radial-gradient(ellipse, rgba(0,85,255,0.06) 0%, transparent 70%)" }}
              />
              <ZuilVisual color="#F1F0EA" />
              <p className="text-center text-xs text-zinc-500 mt-4 font-medium">RAL 9016 — Standaard</p>
            </div>
            <div className="opacity-60 scale-90">
              <ZuilVisual color="#2F3234" />
              <p className="text-center text-xs text-zinc-400 mt-4 font-medium">RAL 7021</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
