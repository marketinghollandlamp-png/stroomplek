const trustItems = [
  { label: "Ontworpen in Nederland", desc: "Elk detail is doordacht en afgestemd op de Nederlandse markt." },
  { label: "ISO-gecertificeerde productie", desc: "Geproduceerd onder strenge kwaliteitscontrole en CE-certificering." },
  { label: "5 jaar garantie", desc: "Vol vertrouwen in onze producten. Wij staan achter elke zuil." },
  { label: "Voor professionals", desc: "Gebouwd voor architecten, installateurs en projectinrichters." },
]

export default function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Gebouwd op vertrouwen
          </h2>
          <p className="text-zinc-500 leading-relaxed">
            Stroomplek levert premium kwaliteit aan de meest veeleisende opdrachtgevers in Nederland.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-0.5 bg-blue-600 mx-auto mb-5" />
              <h3 className="text-white font-semibold text-base mb-2">{item.label}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Numbers */}
        <div className="mt-20 pt-10 border-t border-zinc-800 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { num: "500+", label: "Zuilen geleverd" },
            { num: "98%", label: "Klanttevredenheid" },
            { num: "3–5 wkn", label: "Gemiddelde levertijd" },
            { num: "24/7", label: "Online configureren" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.num}</div>
              <div className="text-zinc-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
