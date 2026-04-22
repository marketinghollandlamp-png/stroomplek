import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

export default function MaatwerkVsStandaard() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Kies jouw route
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Op maat of standaard?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Op maat card */}
          <div className="relative bg-zinc-950 rounded-2xl p-8 lg:p-10 overflow-hidden group hover:shadow-2xl hover:shadow-zinc-900/30 transition-all duration-300">
            {/* Accent glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl"
              style={{ background: "radial-gradient(circle, #0055ff, transparent)" }}
            />
            <div className="relative">
              <div className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
                Aanbevolen
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Op Maat</h3>
              <p className="text-zinc-400 mb-2">Volledige controle over elk detail</p>
              <div className="text-2xl font-bold text-white mb-8">
                Vanaf <span className="text-blue-400">€ 285</span>
              </div>

              <ul className="space-y-3 mb-10">
                {[
                  "Kies type en afmeting",
                  "Configureer aansluitingen per zijde",
                  "Elke RAL-kleur mogelijk",
                  "Extra opties naar wens",
                  "Staffelprijzen bij meerdere stuks",
                  "Direct prijs of offerte aanvragen",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/configurator"
                className="group/btn inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors w-full justify-center"
              >
                Start configurator
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Standaard card */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 lg:p-10 group hover:shadow-xl hover:border-zinc-300 transition-all duration-300">
            <div className="inline-block bg-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
              Snel &amp; eenvoudig
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 mb-2">Standaard</h3>
            <p className="text-zinc-500 mb-2">Vaste configuraties, direct leverbaar</p>
            <div className="text-2xl font-bold text-zinc-900 mb-8">
              Vanaf <span className="text-zinc-700">€ 245</span>
            </div>

            <ul className="space-y-3 mb-10">
              {[
                "Klein, medium of groot model",
                "RAL 9016 standaardkleur",
                "Vaste aansluitmontage",
                "Snelle levering",
                "Bekende prijs vooraf",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/standaard"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors w-full justify-center"
            >
              Bekijk standaard modellen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
