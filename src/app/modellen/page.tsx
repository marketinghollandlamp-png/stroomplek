import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ZUIL_NAMEN, ZUIL_HOOGTES, ZuilType } from "@/lib/pricing"

const MODELLEN: { type: ZuilType; prijs: number; desc: string; features: string[] }[] = [
  {
    type: "klein",
    prijs: 285,
    desc: "Compact model voor kleinere werkplekken.",
    features: ["Hoogte 80 cm", "Max 2 aansluitingen/kant", "1 of 2 zijdes", "RAL-kleur mogelijk"],
  },
  {
    type: "medium",
    prijs: 425,
    desc: "Het meest populaire model voor kantoorprojecten.",
    features: ["Hoogte 110 cm", "Max 5 aansluitingen/kant", "1 of 2 zijdes", "Volledig configureerbaar"],
  },
  {
    type: "groot",
    prijs: 685,
    desc: "Maximale capaciteit voor intensieve omgevingen.",
    features: ["Hoogte 160 cm", "Max 8 aansluitingen/kant", "Aansluitingen bovenin mogelijk", "Afdekkappen beschikbaar"],
  },
  {
    type: "mobiel_klein",
    prijs: 345,
    desc: "Flexibel te verplaatsen kleine zuil.",
    features: ["Hoogte 80 cm", "Wielen inclusief", "Max 3 aansluitingen/kant", "Ideaal voor evenementen"],
  },
  {
    type: "mobiel_groot",
    prijs: 745,
    desc: "Grote verrijdbare zuil voor professioneel gebruik.",
    features: ["Hoogte 110 cm", "Wielen inclusief", "Max 6 aansluitingen/kant", "Stabiele basis"],
  },
]

export const metadata = {
  title: "Modellen — Stroomplek",
}

export default function ModellenPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Alle modellen</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Kies jouw zuil
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed">
            Vijf modellen, elk volledig configureerbaar. Of kies een standaard uitvoering voor snelle levering.
          </p>
        </div>

        {/* Models grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELLEN.map((model) => (
            <div
              key={model.type}
              className="bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 hover:shadow-md transition-all group"
            >
              {/* Visual */}
              <div className="h-40 bg-zinc-50 rounded-xl mb-5 flex items-center justify-center">
                <ModelVisual type={model.type} />
              </div>

              {/* Info */}
              <h3 className="font-bold text-zinc-900 text-lg mb-1">{ZUIL_NAMEN[model.type]}</h3>
              <p className="text-zinc-500 text-sm mb-4">{model.desc}</p>

              <ul className="space-y-1.5 mb-5">
                {model.features.map((f) => (
                  <li key={f} className="text-xs text-zinc-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <div>
                  <p className="text-xs text-zinc-400">Vanaf</p>
                  <p className="text-lg font-bold text-zinc-900">€ {model.prijs}</p>
                </div>
                <Link
                  href="/configurator"
                  className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Configureer
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModelVisual({ type }: { type: ZuilType }) {
  const heights: Record<ZuilType, number> = {
    klein: 70, medium: 90, groot: 120,
    mobiel_klein: 70, mobiel_groot: 90,
  }
  const h = heights[type]

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 40, height: 6, background: "#d4d4d8", borderRadius: "3px 3px 0 0" }} />
      <div
        style={{
          width: 36, height: h,
          background: "linear-gradient(180deg, #e8e8e4 0%, #d4d4d0 100%)",
          borderRadius: 3,
          boxShadow: "inset 2px 0 6px rgba(255,255,255,0.4), 2px 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <div style={{ width: 48, height: 8, background: "#cacac6", borderRadius: "0 0 4px 4px" }} />
      {type.startsWith("mobiel") && (
        <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#555" }} />
          ))}
        </div>
      )}
    </div>
  )
}
