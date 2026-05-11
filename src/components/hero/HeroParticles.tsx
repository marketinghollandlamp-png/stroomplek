"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  alpha: number
  life: number; maxLife: number
  color: string
}

const COLORS = [
  "196,106,45",   // copper
  "212,128,74",   // copper-bright
  "168,86,36",    // copper-deep
  "230,160,100",  // warm highlight
]

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    // Column x-positions matching HeroColumns (10,22,38,56,70,84,92 % of width)
    const COL_POS = [0.10, 0.22, 0.38, 0.56, 0.70, 0.84, 0.92]

    let W = 0, H = 0, raf = 0
    const particles: Particle[] = []

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const spawn = () => {
      // Spawn near one of the vertical column positions
      const col = COL_POS[Math.floor(Math.random() * COL_POS.length)]
      const jitter = (Math.random() - 0.5) * 0.06
      const x = (col + jitter) * W
      const y = H * (0.55 + Math.random() * 0.4)  // bottom 45% of hero
      const maxLife = 90 + Math.random() * 120
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.4 + Math.random() * 0.9),
        size: 0.8 + Math.random() * 1.6,
        alpha: 0,
        life: 0, maxLife,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    let frame = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, W, H)

      // Spawn rate — ~1-2 per frame
      if (frame % 3 === 0) spawn()
      if (frame % 5 === 0) spawn()
      frame++

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx + Math.sin(p.life * 0.04 + p.x) * 0.15  // gentle drift
        p.y += p.vy

        const t = p.life / p.maxLife
        // Fade in quickly, hold, fade out
        p.alpha = t < 0.15
          ? t / 0.15
          : t > 0.7
          ? (1 - t) / 0.3
          : 1

        if (p.life >= p.maxLife) { particles.splice(i, 1); continue }

        const a = (p.alpha * 0.72).toFixed(3)
        const glowA = (p.alpha * 0.35).toFixed(3)

        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${p.color},${glowA})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${a})`
        ctx.fill()
        ctx.restore()
      }

      // Cap particle count
      if (particles.length > 80) particles.splice(0, particles.length - 80)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  )
}
