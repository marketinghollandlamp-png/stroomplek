"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { useStore } from "@/lib/store"
import { formatPrijs, ZUIL_NAMEN } from "@/lib/pricing"
import { cn } from "@/lib/utils"

const STAPPEN = ["Gegevens", "Levering", "Betaling", "Bevestiging"]

export default function CheckoutPage() {
  const [stap, setStap] = useState(0)
  const { cartItems } = useStore()
  const totaal = cartItems.reduce((s, i) => s + i.totaalPrijs, 0)

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {STAPPEN.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                "flex items-center gap-2",
                i === stap ? "text-zinc-900" : i < stap ? "text-blue-600" : "text-zinc-400"
              )}>
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  i < stap ? "bg-blue-600 text-white" : i === stap ? "bg-zinc-900 text-white" : "bg-zinc-200"
                )}>
                  {i < stap ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < STAPPEN.length - 1 && <div className={cn("w-12 h-px mx-3", i < stap ? "bg-blue-600" : "bg-zinc-200")} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Main */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-8">
            {stap === 0 && <GegevensStep onNext={() => setStap(1)} />}
            {stap === 1 && <LeveringStep onNext={() => setStap(2)} onBack={() => setStap(0)} />}
            {stap === 2 && <BetalingStep onNext={() => setStap(3)} onBack={() => setStap(1)} />}
            {stap === 3 && <BevestigingStep />}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 h-fit">
            <h3 className="font-bold text-zinc-900 mb-4">Overzicht</h3>
            <div className="space-y-3 pb-4 mb-4 border-b border-zinc-100">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-zinc-600">{item.aantal}× {ZUIL_NAMEN[item.type]}</span>
                  <span className="font-medium">{formatPrijs(item.totaalPrijs)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-zinc-900">
              <span>Totaal excl. btw</span>
              <span>{formatPrijs(totaal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  )
}

function GegevensStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-6">Uw gegevens</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Voornaam" />
        <FormField label="Achternaam" />
        <FormField label="Bedrijfsnaam" />
        <FormField label="KvK-nummer" />
        <FormField label="E-mailadres" type="email" />
        <FormField label="Telefoonnummer" type="tel" />
      </div>
      <button onClick={onNext} className="mt-6 flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
        Volgende <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function LeveringStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [methode, setMethode] = useState<"verzending" | "afhalen">("verzending")
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-6">Levering</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {(["verzending", "afhalen"] as const).map((m) => (
          <button key={m} onClick={() => setMethode(m)} className={cn("p-4 rounded-xl border-2 text-left transition-all", methode === m ? "border-blue-600 bg-blue-50" : "border-zinc-200")}>
            <div className="font-semibold text-zinc-900 capitalize">{m}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{m === "verzending" ? "€89 (gratis v.a. €2500)" : "Gratis afhalen op locatie"}</div>
          </button>
        ))}
      </div>
      {methode === "verzending" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <FormField label="Straat + huisnummer" />
          <FormField label="Postcode + stad" />
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-3 border border-zinc-200 hover:border-zinc-300 text-zinc-700 text-sm font-medium rounded-xl transition-colors">Vorige</button>
        <button onClick={onNext} className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Naar betaling <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function BetalingStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-6">Betaling</h2>
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 mb-6">
        <p className="text-sm text-zinc-600 font-medium mb-1">Factuur op rekening</p>
        <p className="text-xs text-zinc-400">Na bevestiging ontvangt u een factuur per e-mail met betalingstermijn van 14 dagen.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-3 border border-zinc-200 hover:border-zinc-300 text-zinc-700 text-sm font-medium rounded-xl transition-colors">Vorige</button>
        <button onClick={onNext} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Bestelling plaatsen <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function BevestigingStep() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 mb-2">Bestelling geplaatst!</h2>
      <p className="text-zinc-500 mb-8 max-w-md mx-auto">
        Bedankt voor uw bestelling. U ontvangt een bevestiging per e-mail. Wij nemen contact op om de details te bespreken.
      </p>
      <Link href="/" className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-block">
        Terug naar home
      </Link>
    </div>
  )
}
