"use client"

import { useEffect } from "react"
import { Minus, Plus, ShoppingCart, FileText } from "lucide-react"
import { useStore } from "@/lib/store"
import { formatPrijs, ZUIL_NAMEN } from "@/lib/pricing"

export default function PricePanel() {
  const {
    type, prijs, aantal, setAantal, addToCart, updatePrijs, stap,
  } = useStore()

  useEffect(() => {
    updatePrijs()
  }, [updatePrijs])

  if (!prijs) return null

  const isOfferteMode = aantal >= 10

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      {/* Title */}
      <div className="mb-5">
        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Jouw configuratie</p>
        <h3 className="font-semibold text-zinc-900">{ZUIL_NAMEN[type]}</h3>
      </div>

      {/* Breakdown */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100 mb-5">
        <PrijsRegel label="Basis" value={formatPrijs(prijs.basis)} />
        {prijs.tweedeZijde > 0 && <PrijsRegel label="2e zijde" value={`+ ${formatPrijs(prijs.tweedeZijde)}`} />}
        {prijs.stopcontacten > 0 && <PrijsRegel label="Stopcontacten" value={`+ ${formatPrijs(prijs.stopcontacten)}`} />}
        {prijs.utp > 0 && <PrijsRegel label="UTP-aansluitingen" value={`+ ${formatPrijs(prijs.utp)}`} />}
        {prijs.hdmi > 0 && <PrijsRegel label="HDMI-aansluitingen" value={`+ ${formatPrijs(prijs.hdmi)}`} />}
        {prijs.ralKleur > 0 && <PrijsRegel label="RAL-kleur" value={`+ ${formatPrijs(prijs.ralKleur)}`} />}
        {prijs.extras > 0 && <PrijsRegel label="Extra opties" value={`+ ${formatPrijs(prijs.extras)}`} />}
        {prijs.transport > 0 && <PrijsRegel label="Transport" value={`+ ${formatPrijs(prijs.transport)}`} />}
        {prijs.transport === 0 && <PrijsRegel label="Transport" value="Gratis" muted />}
      </div>

      {/* Discount */}
      {prijs.kortingPercentage > 0 && (
        <div className="flex items-center justify-between py-2 mb-4 bg-green-50 rounded-lg px-3">
          <span className="text-green-700 text-sm font-medium">
            Staffelkorting {prijs.kortingPercentage}%
          </span>
          <span className="text-green-700 text-sm font-semibold">
            − {formatPrijs(prijs.korting)}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs text-zinc-400 mb-0.5">Totaal excl. btw</p>
          <p className="text-3xl font-bold text-zinc-900">{formatPrijs(prijs.totaal)}</p>
          {aantal > 1 && (
            <p className="text-xs text-zinc-400 mt-0.5">{formatPrijs(prijs.perStuk)} per stuk</p>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-medium text-zinc-700">Aantal</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAantal(Math.max(1, aantal - 1))}
            className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-base font-semibold text-zinc-900 w-6 text-center">{aantal}</span>
          <button
            onClick={() => setAantal(aantal + 1)}
            className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        {!isOfferteMode ? (
          <button
            onClick={addToCart}
            disabled={stap < 4}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.98]"
          >
            <ShoppingCart className="w-4 h-4" />
            Toevoegen aan winkelwagen
          </button>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-amber-800 text-xs font-medium">Bij 10+ stuks raden we een offerte aan</p>
          </div>
        )}

        <button
          className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold py-3 rounded-xl text-sm transition-colors"
        >
          <FileText className="w-4 h-4" />
          Offerte aanvragen
        </button>
      </div>

      {stap < 4 && (
        <p className="text-xs text-zinc-400 text-center mt-3">
          Voltooi de configuratie om toe te voegen aan winkelwagen
        </p>
      )}
    </div>
  )
}

function PrijsRegel({
  label,
  value,
  muted = false,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className={`text-sm font-medium ${muted ? "text-zinc-400" : "text-zinc-800"}`}>{value}</span>
    </div>
  )
}
