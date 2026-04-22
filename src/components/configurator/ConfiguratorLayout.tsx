"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"
import StepIndicator from "./StepIndicator"
import ConfiguratorSteps from "./ConfiguratorSteps"
import ZuilPreview from "./ZuilPreview"
import PricePanel from "./PricePanel"

export default function ConfiguratorLayout() {
  const { stap, setStap, updatePrijs } = useStore()

  useEffect(() => {
    updatePrijs()
  }, [updatePrijs])

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Op Maat Configureren</h1>
              <p className="text-sm text-zinc-500 mt-0.5">Stel jouw stroomzuil volledig naar wens samen</p>
            </div>
            <StepIndicator huidig={stap} onStap={setStap} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          {/* Left: Steps */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 lg:p-8 shadow-sm">
            <ConfiguratorSteps />
          </div>

          {/* Right: Preview + Price */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* 3D Preview */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-8 text-center">
                Live preview
              </p>
              <div className="flex justify-center py-4">
                <ZuilPreview />
              </div>
            </div>

            {/* Price panel */}
            <PricePanel />
          </div>
        </div>
      </div>
    </div>
  )
}
