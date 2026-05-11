"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export default function Zuil3D({ kind = "vast", color = "#14263C", accent = "rgba(212,128,74,.55)" }: {
  kind?: "vast" | "mobiel"
  color?: string
  accent?: string
}) {
  const [rot, setRot] = useState({ x: -8, y: 30 })
  const [auto, setAuto] = useState(true)
  const drag = useRef({ on: false, sx: 0, sy: 0, rx: -8, ry: 30 })
  const isMobile = kind === "mobiel"

  useEffect(() => {
    if (!auto) return
    let raf: number, last = performance.now()
    const tick = (t: number) => {
      const dt = (t - last) / 1000; last = t
      setRot(r => ({ x: r.x, y: r.y + dt * 12 }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [auto])

  const down = useCallback((e: React.MouseEvent) => {
    drag.current = { on: true, sx: e.clientX, sy: e.clientY, rx: rot.x, ry: rot.y }
    setAuto(false)
  }, [rot])

  const move = useCallback((e: React.MouseEvent) => {
    if (!drag.current.on) return
    const dx = e.clientX - drag.current.sx
    const dy = e.clientY - drag.current.sy
    setRot({ x: Math.max(-30, Math.min(20, drag.current.rx - dy * 0.3)), y: drag.current.ry + dx * 0.5 })
  }, [])

  const up = useCallback(() => { drag.current.on = false }, [])

  return (
    <div className="z3d-stage" onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}>
      <div className="z3d-bg">
        <div className="z3d-grid" />
        <div className="z3d-glow" style={{ background: `radial-gradient(closest-side, ${accent}, transparent 70%)` }} />
      </div>
      <div className="z3d-scene" style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transformStyle: "preserve-3d" }}>
        <div className="z3d-face front" style={{ background: `linear-gradient(180deg, ${color}, ${color}cc)` }}>
          <div className="z3d-strip">
            <span className="z3d-socket" /><span className="z3d-socket" />
            <span className="z3d-port utp" /><span className="z3d-port usb" />
          </div>
          <span className="z3d-label">Stroomplek · {isMobile ? "MZ" : "VZ"}-M</span>
        </div>
        <div className="z3d-face back" style={{ background: `linear-gradient(180deg, ${color}aa, ${color}66)` }}>
          <span className="z3d-back-tag">Made in NL · 230V · 16A</span>
        </div>
        <div className="z3d-face left"  style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }} />
        <div className="z3d-face right" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />
        <div className="z3d-face top"   style={{ background: color }}><div className="z3d-cap" /></div>
        <div className="z3d-face bottom" style={{ background: "#000" }} />
        {isMobile && (
          <div className="z3d-base">
            <span className="z3d-wheel a" /><span className="z3d-wheel b" />
          </div>
        )}
      </div>
      <div className="z3d-floor" />
      <div className="z3d-controls">
        <button className={auto ? "on" : ""} onClick={() => setAuto(!auto)}>
          <span className="dot" />{auto ? "Auto-rotatie" : "Stilstaand"}
        </button>
        <span className="z3d-hint">Sleep om te roteren</span>
      </div>
      <span className="z3d-tag">3D PREVIEW · {isMobile ? "MOBIEL" : "VAST"}</span>
    </div>
  )
}
