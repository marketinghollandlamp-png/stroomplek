"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Check } from "lucide-react"
import { useStore } from "@/lib/store"
import { ZuilType, formatPrijs, ZUIL_NAMEN } from "@/lib/pricing"
import { cn } from "@/lib/utils"

const STANDAARD_MODELLEN: { type: ZuilType; prijs: number; stopcontacten: number; utp: number }[] = [
  { type: "klein", prijs: 245, stopcontacten: 2, utp: 1 },
  { type: "medium", prijs: 365, stopcontacten: 4, utp: 2 },
  { type: "groot", prijs: 595, stopcontacten: 6, utp: 3 },
]

export default function StandaardPage() {
  const [gekozen, setGekozen] = useState<ZuilType>("medium")
  const [aantal, setAantal] = useState(1)
  const { addToCart, setType, setZijde1, setAantal: setStoreAantal, setRAL } = useStore()

  function handleBestel() {
    const model = STANDAARD_MODELLEN.find(m => m.type === gekozen)!
    setType(gekozen)
    setZijde1({ stopcontacten: model.stopcontacten, utp: model.utp, hdmi: 0 })
    setRAL("9016", "#F1F0EA")
    setStoreAantal(aantal)
    addToCart()
  }

  const model = STANDAARD_MODELLEN.find(m => m.type === gekozen)!

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Snel bestellen</p>
          <h1 className="text-4xl font-bold text-zinc-900 mb-3">Standaard modellen</h1>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Vaste configuraties in RAL 9016. Direct leverbaar, geen wachttijden voor configuratie.
          </p>
        </div>

        {/* Model selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STANDAARD_MODELLEN.map((m) => (
            <button
              key={m.type}
              onClick={() => setGekozen(m.type)}
              className={cn(
                "p-5 rounded-2xl border-2 text-left transition-all",
                gekozen === m.type ? "border-blue-600 bg-blue-50" : "border-zinc-200 bg-white hover:border-zinc-300"
              )}
            >
              <div className="font-bold text-zinc-900 mb-1">{ZUIL_NAMEN[m.type]}</div>
              <div className="text-xs text-zinc-500 space-y-0.5">
                <p>{m.stopcontacten}× stopcontact</p>
                <p>{m.utp}× UTP</p>
                <p>RAL 9016 wit</p>
              </div>
              <div className="text-lg font-bold text-zinc-900 mt-3">€ {m.prijs}</div>
            </button>
          ))}
        </div>

        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
          <h3 className="font-bold text-zinc-900 mb-4">Bestelling samenvatting</h3>
          <div className="space-y-2 pb-4 mb-4 border-b border-zinc-100">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">{ZUIL_NAMEN[gekozen]}</span>
              <span className="font-medium">€ {model.prijs}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">{model.stopcontacten}× stopcontact + {model.utp}× UTP</span>
              <span className="text-green-600 text-xs font-medium">Inbegrepen</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">RAL 9016 — Standaard wit</span>
              <span className="text-green-600 text-xs font-medium">Gratis</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold">Totaal</span>
            <span className="text-2xl font-bold">{formatPrijs(model.prijs * aantal)}</span>
          </div>

          {/* Aantal */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm text-zinc-500">Aantal:</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setAantal(Math.max(1, aantal - 1))} className="w-8 h-8 border border-zinc-200 rounded-lg text-sm hover:border-zinc-300 transition-colors">−</button>
              <span className="font-bold w-6 text-center">{aantal}</span>
              <button onClick={() => setAantal(aantal + 1)} className="w-8 h-8 border border-zinc-200 rounded-lg text-sm hover:border-zinc-300 transition-colors">+</button>
            </div>
          </div>

          <button
            onClick={handleBestel}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Toevoegen aan winkelwagen
          </button>
        </div>

        {/* More options */}
        <div className="text-center">
          <p className="text-zinc-500 text-sm mb-3">Meer keuze nodig?</p>
          <Link href="/configurator" className="text-blue-600 font-semibold text-sm hover:underline">
            Bekijk de volledige configurator →
          </Link>
        </div>
      </div>
    </div>
  )
}
