"use client"

import { useStore } from "@/lib/store"
import { ZUIL_NAMEN, ZUIL_HOOGTES } from "@/lib/pricing"

function adjustColor(hex: string, pct: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const adj = (v: number) => Math.max(0, Math.min(255, v + Math.round((pct / 100) * 255)))
  return `#${adj(r).toString(16).padStart(2, "0")}${adj(g).toString(16).padStart(2, "0")}${adj(b).toString(16).padStart(2, "0")}`
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

interface OutletModuleProps {
  type: "stopcontact" | "utp" | "hdmi"
  switchColor: "wit" | "zwart"
  color: string
}

function OutletModule({ type, switchColor, color }: OutletModuleProps) {
  const bg = adjustColor(color, -15)
  const sw = switchColor === "wit" ? "#F5F5F5" : "#1a1a1a"
  const swBorder = switchColor === "wit" ? "#ddd" : "#333"

  return (
    <div
      style={{
        width: 50,
        height: 34,
        background: bg,
        border: `1px solid ${adjustColor(color, -25)}`,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      {type === "stopcontact" && (
        <div
          style={{
            width: 28,
            height: 22,
            background: sw,
            border: `1px solid ${swBorder}`,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: 4, height: 8, background: adjustColor(sw, -30), borderRadius: 1 }} />
          <div style={{ width: 4, height: 8, background: adjustColor(sw, -30), borderRadius: 1 }} />
          <div style={{ width: 6, height: 6, background: adjustColor(sw, -20), borderRadius: "50%" }} />
        </div>
      )}
      {type === "utp" && (
        <div
          style={{
            width: 26,
            height: 18,
            background: "#e8c840",
            border: "1px solid #c8a820",
            borderRadius: 2,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 2,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 2, height: 6, background: "#8a7010", marginRight: i < 3 ? 1 : 0 }} />
          ))}
        </div>
      )}
      {type === "hdmi" && (
        <div
          style={{
            width: 24,
            height: 12,
            background: "#222",
            borderRadius: 2,
            border: "1px solid #444",
          }}
        />
      )}
    </div>
  )
}

export default function ZuilPreview() {
  const { type, zijdes, zijde1, zijde2, ralHex, schakelmateriaal } = useStore()

  const heights: Record<string, number> = {
    klein: 280, medium: 360, groot: 480,
    mobiel_klein: 280, mobiel_groot: 360,
  }
  const widths: Record<string, number> = {
    klein: 64, medium: 72, groot: 84,
    mobiel_klein: 64, mobiel_groot: 72,
  }

  const bodyHeight = heights[type] ?? 360
  const bodyWidth = widths[type] ?? 72
  const color = ralHex || "#F1F0EA"

  const modules1: React.ReactNode[] = []
  for (let i = 0; i < zijde1.stopcontacten; i++)
    modules1.push(<OutletModule key={`s1-${i}`} type="stopcontact" switchColor={schakelmateriaal} color={color} />)
  for (let i = 0; i < zijde1.utp; i++)
    modules1.push(<OutletModule key={`u1-${i}`} type="utp" switchColor={schakelmateriaal} color={color} />)
  for (let i = 0; i < zijde1.hdmi; i++)
    modules1.push(<OutletModule key={`h1-${i}`} type="hdmi" switchColor={schakelmateriaal} color={color} />)

  const isMobiel = type.startsWith("mobiel")

  return (
    <div className="flex flex-col items-center">
      {/* Label */}
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold text-zinc-900">{ZUIL_NAMEN[type]}</p>
        <p className="text-xs text-zinc-400 mt-0.5">Hoogte {ZUIL_HOOGTES[type]}</p>
      </div>

      {/* Column visual */}
      <div className="relative flex items-center gap-6">
        {/* Zijde 2 label */}
        {zijdes === 2 && (
          <div className="text-xs text-zinc-400 font-medium writing-mode-vertical transform -rotate-90 whitespace-nowrap">
            Zijde 2
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Cap top */}
          <div
            style={{
              width: bodyWidth + 8,
              height: 10,
              background: `linear-gradient(180deg, ${adjustColor(color, 8)} 0%, ${color} 100%)`,
              borderRadius: "4px 4px 0 0",
              boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
            }}
          />

          {/* Main body */}
          <div
            style={{
              width: bodyWidth,
              height: bodyHeight,
              background: `linear-gradient(180deg, ${adjustColor(color, 5)} 0%, ${color} 25%, ${adjustColor(color, -5)} 100%)`,
              borderRadius: 4,
              position: "relative",
              boxShadow: `
                inset 3px 0 10px rgba(255,255,255,${isLight(color) ? "0.2" : "0.08"}),
                inset -2px 0 6px rgba(0,0,0,${isLight(color) ? "0.08" : "0.2"}),
                6px 16px 48px rgba(0,0,0,0.18)
              `,
              overflow: "hidden",
            }}
          >
            {/* Edge highlight */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 8, bottom: 0, width: 1.5,
                background: `linear-gradient(180deg, transparent 5%, rgba(255,255,255,${isLight(color) ? "0.3" : "0.15"}) 40%, transparent 95%)`,
              }}
            />

            {/* Outlet modules zijde 1 */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 4px",
              }}
            >
              {modules1.length === 0 ? (
                <div style={{ color: "rgba(0,0,0,0.2)", fontSize: 11 }}>Geen aansluitingen</div>
              ) : (
                modules1.map((m) => m)
              )}
            </div>
          </div>

          {/* Base */}
          <div
            style={{
              width: bodyWidth + 16,
              height: 14,
              background: `linear-gradient(180deg, ${adjustColor(color, -8)} 0%, ${adjustColor(color, -18)} 100%)`,
              borderRadius: "0 0 6px 6px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          />

          {/* Wheels for mobile */}
          {isMobiel && (
            <div style={{ display: "flex", gap: 24, marginTop: 4 }}>
              {[0, 1].map((i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: "#333", border: "2px solid #555",
                }} />
              ))}
            </div>
          )}

          {/* Shadow */}
          <div
            style={{
              marginTop: isMobiel ? 4 : 8,
              width: bodyWidth + 24,
              height: 8,
              background: "radial-gradient(ellipse, rgba(0,0,0,0.2), transparent)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Zijde 1 label */}
        <div className="text-xs text-zinc-400 font-medium writing-mode-vertical transform rotate-90 whitespace-nowrap">
          Zijde 1
        </div>
      </div>

      {/* Color chip */}
      <div className="mt-8 flex items-center gap-3">
        <div
          className="w-5 h-5 rounded-full border border-black/10"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-zinc-500">RAL {useStore.getState().ralKleur}</span>
        <span className="text-xs text-zinc-400">·</span>
        <span className="text-xs text-zinc-500">Schakelaar {schakelmateriaal}</span>
      </div>
    </div>
  )
}
