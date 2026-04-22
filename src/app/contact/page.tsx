export const metadata = { title: "Contact — Stroomplek" }

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-4">Contact</p>
            <h1 className="text-4xl font-bold text-zinc-900 mb-5 tracking-tight">
              Hoe kunnen we helpen?
            </h1>
            <p className="text-zinc-500 leading-relaxed mb-10">
              Vragen over een configuratie, levering of samenwerking? Ons team staat klaar om u te helpen.
            </p>

            <div className="space-y-6">
              {[
                { label: "E-mail", value: "info@stroomplek.nl" },
                { label: "Telefoon", value: "+31 (0)20 123 45 67" },
                { label: "Openingstijden", value: "Ma–Vr: 08:00–17:30" },
                { label: "Adres", value: "Innovatieweg 42, 1234 AB Amsterdam" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-zinc-800 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Naam</label>
                <input type="text" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">E-mail</label>
                <input type="email" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Onderwerp</label>
              <input type="text" className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Bericht</label>
              <textarea rows={5} className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors">
              Verstuur bericht
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
