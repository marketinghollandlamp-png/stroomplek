"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const STAPPEN = [
  { num: 1, label: "Type" },
  { num: 2, label: "Structuur" },
  { num: 3, label: "Aansluitingen" },
  { num: 4, label: "Design" },
  { num: 5, label: "Extra's" },
]

interface StepIndicatorProps {
  huidig: number
  onStap: (stap: number) => void
}

export default function StepIndicator({ huidig, onStap }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {STAPPEN.map((stap, i) => {
        const isDone = huidig > stap.num
        const isActive = huidig === stap.num
        return (
          <div key={stap.num} className="flex items-center">
            <button
              onClick={() => isDone && onStap(stap.num)}
              className={cn(
                "flex items-center gap-2 py-1 transition-colors",
                isDone ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                  isDone
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "bg-zinc-900 text-white ring-4 ring-zinc-900/10"
                    : "bg-zinc-200 text-zinc-500"
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : stap.num}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  isActive ? "text-zinc-900" : "text-zinc-400"
                )}
              >
                {stap.label}
              </span>
            </button>
            {i < STAPPEN.length - 1 && (
              <div
                className={cn(
                  "w-8 h-px mx-2",
                  huidig > stap.num ? "bg-blue-600" : "bg-zinc-200"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
