"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Minus, Plus } from "lucide-react"
import { useStore } from "@/lib/store"
import { ZuilType, getMaxConnections, ZUIL_NAMEN, ZUIL_HOOGTES } from "@/lib/pricing"
import { cn } from "@/lib/utils"
import RALColorPicker from "@/components/shared/RALColorPicker"

// ── Step 1: Type ───────────────────────────────────────────────────────────────

const TYPEN: { key: ZuilType; icon: string; desc: string }[] = [
  { key: "klein", icon: "▮", desc: "1–2 aansluitingen per kant" },
  { key: "medium", icon: "▮▮", desc: "Tot 5 aansluitingen per kant" },
  { key: "groot", icon: "▮▮▮", desc: "Tot 8 aansluitingen per kant" },
  { key: "mobiel_klein", icon: "⊡", desc: "Kleine verrijdbare zuil" },
  { key: "mobiel_groot", icon: "⊡⊡", desc: "Grote verrijdbare zuil" },
]

function Step1() {
  const { type, setType } = useStore()
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-1">Kies je zuil type</h2>
      <p className="text-sm text-zinc-500 mb-6">Selecteer het model dat past bij jouw project.</p>
      <div className="grid grid-cols-1 gap-3">
        {TYPEN.map((t) => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
              type === t.key
                ? "border-blue-600 bg-blue-50"
                : "border-zinc-200 hover:border-zinc-300 bg-white"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-xl font-mono",
                type === t.key ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600"
              )}
            >
              {t.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-zinc-900 text-sm">{ZUIL_NAMEN[t.key]}</div>
              <div className="text-xs text-zinc-500">{t.desc} · H: {ZUIL_HOOGTES[t.key]}</div>
            </div>
            {type === t.key && (
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 2: Structuur ──────────────────────────────────────────────────────────

function Step2() {
  const { zijdes, setZijdes } = useStore()
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-1">Aantal zijden</h2>
      <p className="text-sm text-zinc-500 mb-6">Kies of je aansluitingen aan één of twee kanten wil.</p>
      <div className="grid grid-cols-2 gap-4">
        {([1, 2] as const).map((n) => (
          <button
            key={n}
            onClick={() => setZijdes(n)}
            className={cn(
              "p-6 rounded-xl border-2 transition-all text-center",
              zijdes === n
                ? "border-blue-600 bg-blue-50"
                : "border-zinc-200 hover:border-zinc-300 bg-white"
            )}
          >
            {/* Visual */}
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-8 h-20 bg-zinc-300 rounded" />
              {n === 2 && <div className="w-8 h-20 bg-zinc-400 rounded" />}
            </div>
            <div className="font-semibold text-zinc-900">{n} zijde{n > 1 ? "s" : ""}</div>
            <div className="text-xs text-zinc-500 mt-1">
              {n === 1 ? "Aansluitingen aan 1 kant" : "Aansluitingen aan beide kanten"}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 3: Aansluitingen ──────────────────────────────────────────────────────

function ConnectionStepper({
  label,
  value,
  max,
  onChange,
}: {
  label: string
  value: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-sm font-medium text-zinc-800">{label}</div>
        <div className="text-xs text-zinc-400">Max {max}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-600 transition-colors disabled:opacity-40"
          disabled={value === 0}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center text-base font-semibold text-zinc-900">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-600 transition-colors disabled:opacity-40"
          disabled={value === max}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function Step3() {
  const { type, zijdes, zijde1, zijde2, setZijde1, setZijde2 } = useStore()
  const [actieveZijde, setActieveZijde] = useState<1 | 2>(1)
  const max = getMaxConnections(type)

  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-1">Aansluitingen</h2>
      <p className="text-sm text-zinc-500 mb-6">Stel het aantal aansluitingen per zijde in.</p>

      {zijdes === 2 && (
        <div className="flex gap-2 mb-5 bg-zinc-100 p-1 rounded-lg">
          {([1, 2] as const).map((z) => (
            <button
              key={z}
              onClick={() => setActieveZijde(z)}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
                actieveZijde === z ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              Zijde {z}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden bg-white px-4">
        {actieveZijde === 1 ? (
          <>
            <ConnectionStepper label="Stopcontacten" value={zijde1.stopcontacten} max={max} onChange={(v) => setZijde1({ stopcontacten: v })} />
            <ConnectionStepper label="UTP-aansluitingen" value={zijde1.utp} max={max} onChange={(v) => setZijde1({ utp: v })} />
            <ConnectionStepper label="HDMI-aansluitingen" value={zijde1.hdmi} max={max} onChange={(v) => setZijde1({ hdmi: v })} />
          </>
        ) : (
          <>
            <ConnectionStepper label="Stopcontacten" value={zijde2.stopcontacten} max={max} onChange={(v) => setZijde2({ stopcontacten: v })} />
            <ConnectionStepper label="UTP-aansluitingen" value={zijde2.utp} max={max} onChange={(v) => setZijde2({ utp: v })} />
            <ConnectionStepper label="HDMI-aansluitingen" value={zijde2.hdmi} max={max} onChange={(v) => setZijde2({ hdmi: v })} />
          </>
        )}
      </div>
    </div>
  )
}

// ── Step 4: Design ─────────────────────────────────────────────────────────────

function Step4() {
  const { ralKleur, schakelmateriaal, setRAL, setSchakelmateriaal } = useStore()

  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-1">Design</h2>
      <p className="text-sm text-zinc-500 mb-6">Kies de kleur en het schakelmateriaal.</p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-zinc-700 mb-3">RAL-kleur</label>
        <RALColorPicker
          value={ralKleur}
          onChange={(code, hex) => setRAL(code, hex)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-700 mb-3">Schakelmateriaal</label>
        <div className="grid grid-cols-2 gap-3">
          {(["wit", "zwart"] as const).map((mat) => (
            <button
              key={mat}
              onClick={() => setSchakelmateriaal(mat)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                schakelmateriaal === mat ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300 bg-white"
              )}
            >
              <div
                className="w-8 h-8 rounded-lg border border-zinc-300"
                style={{ backgroundColor: mat === "wit" ? "#F5F5F5" : "#1a1a1a" }}
              />
              <span className="text-sm font-medium text-zinc-800 capitalize">{mat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Step 5: Extra's ────────────────────────────────────────────────────────────

function Step5() {
  const { type, extras, setExtras } = useStore()
  const isGroot = type === "groot"

  const opties = [
    { key: "kabelOverlengte" as const, label: "3 meter kabeloverlengte", desc: "+ €35", always: true },
    { key: "utpBoven" as const, label: "UTP + GST18 aansluiting boven", desc: "+ €45", always: true },
    { key: "afdekkappen" as const, label: "Afdekkappen vloer & plafond", desc: "+ €55", always: isGroot },
    { key: "ralAfdekkappen" as const, label: "RAL-afwerking op afdekkappen", desc: "+ €35", always: isGroot },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-900 mb-1">Extra opties</h2>
      <p className="text-sm text-zinc-500 mb-6">Kies eventuele uitbreidingen voor jouw zuil.</p>

      <div className="space-y-3">
        {opties.filter(o => o.always).map((optie) => (
          <label
            key={optie.key}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
              extras[optie.key]
                ? "border-blue-600 bg-blue-50"
                : "border-zinc-200 hover:border-zinc-300 bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={extras[optie.key]}
              onChange={(e) => setExtras({ [optie.key]: e.target.checked })}
              className="w-4 h-4 accent-blue-600"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-zinc-800">{optie.label}</div>
            </div>
            <div className="text-sm font-semibold text-zinc-500">{optie.desc}</div>
          </label>
        ))}
      </div>

      {/* Transport */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-zinc-700 mb-3">Levering</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setExtras({ transport: true })}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              extras.transport ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300 bg-white"
            )}
          >
            <div className="text-sm font-semibold text-zinc-800">Verzending</div>
            <div className="text-xs text-zinc-400 mt-0.5">€89 (gratis v.a. €2500)</div>
          </button>
          <button
            onClick={() => setExtras({ transport: false })}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              !extras.transport ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300 bg-white"
            )}
          >
            <div className="text-sm font-semibold text-zinc-800">Afhalen</div>
            <div className="text-xs text-zinc-400 mt-0.5">Gratis</div>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ConfiguratorSteps() {
  const { stap, setStap } = useStore()

  const STEP_COMPONENTS = [null, <Step1 key={1} />, <Step2 key={2} />, <Step3 key={3} />, <Step4 key={4} />, <Step5 key={5} />]

  return (
    <div>
      {/* Current step */}
      <div className="min-h-[420px]">
        {STEP_COMPONENTS[stap]}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-zinc-100">
        {stap > 1 && (
          <button
            onClick={() => setStap(stap - 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 border border-zinc-200 hover:border-zinc-300 text-zinc-700 text-sm font-medium rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Vorige
          </button>
        )}
        {stap < 5 && (
          <button
            onClick={() => setStap(stap + 1)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Volgende stap
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
