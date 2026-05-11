"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener("scroll", fn, { passive: true })
    fn()
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${w}%` }} aria-hidden="true" />
}

export function CursorTrail() {
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return
    const dot = document.createElement("div")
    const ring = document.createElement("div")
    dot.className = "cursor-dot"
    ring.className = "cursor-ring"
    document.body.append(dot, ring)
    document.body.classList.add("has-trail")
    let mx = -100, my = -100, dx = -100, dy = -100, rx = -100, ry = -100
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      const big = t.closest && t.closest("a, button, .product-card, .why-item, .price-card, .tilt, [role=button]")
      ring.classList.toggle("active", !!big)
    }
    let raf = 0
    const tick = () => {
      dx += (mx - dx) * 0.45; dy += (my - dy) * 0.45
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14
      dot.style.transform  = `translate(${dx}px, ${dy}px)`
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(raf)
      dot.remove(); ring.remove()
      document.body.classList.remove("has-trail")
    }
  }, [])
  return null
}

export function LoadingSplash() {
  const [hide, setHide] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHide(true), 1600)
    return () => clearTimeout(t)
  }, [])
  if (hide) return null
  return (
    <div className="splash">
      <div className="splash-mark">
        <div className="splash-word">Stroomplek<span className="dot">.</span></div>
        <div className="splash-line" />
        <div className="splash-tag">stroom op de plek waar jij het nodig hebt</div>
      </div>
    </div>
  )
}

export function KonamiConfetti() {
  useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === seq[i].toLowerCase()) {
        i++
        if (i === seq.length) { burst(); i = 0 }
      } else {
        i = (e.key === seq[0]) ? 1 : 0
      }
    }
    const burst = () => {
      const layer = document.createElement("div")
      layer.className = "confetti-layer"
      document.body.append(layer)
      const colors = ["#C46A2D","#D4804A","#A85624","#F5F5F5","#14263C"]
      for (let n = 0; n < 140; n++) {
        const p = document.createElement("span")
        p.className = "confetti"
        p.style.left = Math.random() * 100 + "%"
        p.style.background = colors[Math.floor(Math.random() * colors.length)]
        p.style.animationDelay = (Math.random() * 0.6) + "s"
        p.style.animationDuration = (2 + Math.random() * 2) + "s"
        p.style.transform = `rotate(${Math.random() * 360}deg)`
        p.style.width  = (4 + Math.random() * 6) + "px"
        p.style.height = (8 + Math.random() * 10) + "px"
        layer.append(p)
      }
      const toast = document.createElement("div")
      toast.className = "konami-toast"
      toast.innerHTML = `<span class="ic">⚡</span><span>Stroom geactiveerd. <em>Je hebt 'm gevonden.</em></span>`
      document.body.append(toast)
      setTimeout(() => { layer.remove(); toast.remove() }, 4500)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return null
}

export function StickyConfig() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      setShow(p > 0.18 && p < 0.92)
    }
    window.addEventListener("scroll", fn, { passive: true })
    fn()
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <div className={`sticky-config ${show ? "show" : ""}`} onClick={() => window.location.href = "/config"}>
      <span className="pulse" />
      <div>
        <div className="pre">Configurator</div>
        <div className="lbl">Bouw je eigen zuil →</div>
      </div>
    </div>
  )
}

export function SpecMagnify() {
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const row = (e.target as Element).closest(".spec-row")
      if (!row) return
      row.parentElement?.querySelectorAll(".spec-row").forEach(r => r.classList.toggle("dim", r !== row))
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(".spec")) return
      document.querySelectorAll(".spec-row.dim").forEach(r => r.classList.remove("dim"))
    }
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseleave", onOut, true)
    return () => {
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onOut, true)
    }
  }, [])
  return null
}

export function ClickSounds({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return
    let ctx: AudioContext | null = null
    const click = () => {
      try {
        ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)()
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = "sine"; o.frequency.value = 880
        g.gain.setValueAtTime(0.0001, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.005)
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
        o.connect(g).connect(ctx.destination)
        o.start(); o.stop(ctx.currentTime + 0.09)
      } catch {}
    }
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("button, a, .product-card, [role=button]")) click()
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [enabled])
  return null
}

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const prev = useRef(pathname)

  useEffect(() => {
    if (pathname === prev.current) return
    prev.current = pathname
    setPhase("out")
    const t = setTimeout(() => {
      setDisplayChildren(children)
      setPhase("in")
    }, 240)
    return () => clearTimeout(t)
  }, [pathname, children])

  return <div className={`page-trans ${phase}`}>{displayChildren}</div>
}
