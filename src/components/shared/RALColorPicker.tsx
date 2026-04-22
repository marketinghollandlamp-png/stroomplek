"use client"

import { useState } from "react"
import { RAL_COLORS, findRALByCode } from "@/lib/ral-colors"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface RALColorPickerProps {
  value: string
  onChange: (code: string, hex: string) => void
}

export default function RALColorPicker({ value, onChange }: RALColorPickerProps) {
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState("")

  const selected = findRALByCode(value)

  function handleSwatchClick(code: string, hex: string) {
    onChange(code, hex)
    setInputValue("")
    setInputError("")
  }

  function handleInputSubmit() {
    const code = inputValue.trim().replace(/^RAL\s*/i, "")
    const found = findRALByCode(code)
    if (found) {
      onChange(found.code, found.hex)
      setInputError("")
    } else {
      setInputError(`RAL ${code} niet gevonden`)
    }
  }

  return (
    <div className="space-y-5">
      {/* Selected preview */}
      {selected && (
        <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
          <div
            className="w-12 h-12 rounded-lg shadow-inner border border-black/10 flex-shrink-0"
            style={{ backgroundColor: selected.hex }}
          />
          <div>
            <div className="font-semibold text-zinc-900 text-sm">RAL {selected.code}</div>
            <div className="text-zinc-500 text-xs">{selected.name}</div>
          </div>
        </div>
      )}

      {/* Swatches grid */}
      <div className="grid grid-cols-6 gap-2">
        {RAL_COLORS.map((color) => (
          <button
            key={color.code}
            onClick={() => handleSwatchClick(color.code, color.hex)}
            title={`RAL ${color.code} — ${color.name}`}
            className={cn(
              "relative w-full aspect-square rounded-lg border-2 transition-transform hover:scale-110 active:scale-95",
              value === color.code ? "border-blue-600 shadow-md shadow-blue-600/20" : "border-transparent hover:border-zinc-300"
            )}
            style={{ backgroundColor: color.hex }}
          >
            {value === color.code && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check
                  className="w-3 h-3"
                  style={{ color: isLight(color.hex) ? "#000" : "#fff" }}
                  strokeWidth={3}
                />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Manual input */}
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-2">
          Of voer een RAL-code in
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
            placeholder="bijv. 7016"
            className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleInputSubmit}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Toepassen
          </button>
        </div>
        {inputError && (
          <p className="text-red-500 text-xs mt-1">{inputError}</p>
        )}
      </div>
    </div>
  )
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}
