import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-white">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #f8f9ff 0%, #eef2ff 50%, #f0f7ff 100%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">
          Klaar om jouw zuil samen te stellen?
        </h2>
        <p className="text-lg text-zinc-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Start de configurator, zie direct de prijs en bestel in een paar klikken. Of vraag een offerte aan voor grotere aantallen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/configurator"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
          >
            Start met samenstellen
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/zakelijk"
            className="inline-flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-sm"
          >
            Offerte aanvragen
          </Link>
        </div>
      </div>
    </section>
  )
}
