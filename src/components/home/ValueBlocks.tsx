"use client"

import { Euro, Settings, Truck, ShieldCheck, LayoutGrid, FileText } from "lucide-react"

const features = [
  {
    icon: Euro,
    title: "Direct prijsinzicht",
    desc: "Zie de prijs live updaten bij elke keuze. Geen verborgen kosten.",
  },
  {
    icon: Settings,
    title: "Volledig configureerbaar",
    desc: "Kies type, aansluitingen, RAL-kleur en extra's precies naar wens.",
  },
  {
    icon: Truck,
    title: "Snelle levering",
    desc: "Productie en levering binnen 3–5 werkweken na bevestiging.",
  },
  {
    icon: ShieldCheck,
    title: "Professionele kwaliteit",
    desc: "ISO-gecertificeerd, 5 jaar garantie, gemaakt voor veeleisende omgevingen.",
  },
  {
    icon: LayoutGrid,
    title: "Efficiënt voor projecten",
    desc: "Staffelprijzen vanaf 5 stuks. Ideaal voor grotere kantoorprojecten.",
  },
  {
    icon: FileText,
    title: "Offerte op aanvraag",
    desc: "Bij meer dan 10 stuks of bijzondere wensen, direct een offerte aanvragen.",
  },
]

export default function ValueBlocks() {
  return (
    <section className="bg-zinc-950 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-wider mb-3">
            Waarom Stroomplek
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Gebouwd voor professionals die niet compromitteren.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="bg-zinc-950 p-8 group hover:bg-zinc-900 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center mb-5 group-hover:bg-blue-600/20 transition-colors">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
