export const metadata = { title: "Zakelijk — Stroomplek" }

export default function ZakelijkPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <div className="bg-zinc-950 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-wider mb-4">Zakelijke klanten</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Gebouwd voor professionals
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Architecten, interieurbouwers, installateurs en projectinrichters vertrouwen op Stroomplek voor grootschalige projecten.
          </p>
        </div>
      </div>

      {/* Staffelprijzen */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-zinc-900 mb-2 text-center">Staffelprijzen</h2>
        <p className="text-zinc-500 text-center mb-10">Grotere aantallen, lagere prijs per stuk.</p>
        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700">Aantal stuks</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700">Korting</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700">Levering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                { van: "1–4", korting: "—", levering: "€ 89" },
                { van: "5–9", korting: "5%", levering: "€ 89" },
                { van: "10–24", korting: "10%", levering: "Gratis" },
                { van: "25–49", korting: "15%", levering: "Gratis" },
                { van: "50+", korting: "20%", levering: "Gratis + montage overleg" },
              ].map((row) => (
                <tr key={row.van} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">{row.van} stuks</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{row.korting}</td>
                  <td className="px-6 py-4 text-zinc-600">{row.levering}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offerte formualier */}
      <div className="bg-zinc-50 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 mb-2 text-center">Offerte aanvragen</h2>
          <p className="text-zinc-500 text-center mb-10">Vul het formulier in en we nemen binnen 1 werkdag contact op.</p>

          <form className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Naam</label>
                <input type="text" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Jan de Vries" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Bedrijf</label>
                <input type="text" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Architectenbureau BV" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">E-mailadres</label>
                <input type="email" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="jan@bedrijf.nl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Telefoonnummer</label>
                <input type="tel" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+31 6 12345678" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Gewenst aantal zuilen</label>
              <input type="number" min="1" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Bijv. 25" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Uw bericht</label>
              <textarea rows={4} className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Beschrijf uw project, wensen en gewenste configuratie..." />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors">
              Offerte aanvragen
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
