"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "linear-gradient(135deg, #080808 0%, #0d0d1a 35%, #0a0f1e 60%, #060c18 100%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blue accent glow */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0055ff 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #0033cc 0%, transparent 70%)" }}
      />

      {/* Decorative column shape (right side) */}
      <div className="absolute right-16 lg:right-32 top-1/2 -translate-y-1/2 hidden lg:block">
        <ColumnSilhouette />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
              Premium stroomzuilen
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.0] tracking-tight mb-6">
            De nieuwe standaard in{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #4d8bff 0%, #0055ff 100%)" }}>
              stroomvoorziening
            </span>
            .
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Volledig configureerbare stroomzuilen voor moderne kantoren en projectinrichting.
            Ontworpen voor architecten, installateurs en zakelijke eindklanten.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/configurator"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98]"
            >
              Stel je zuil samen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/modellen"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all duration-200 backdrop-blur-sm"
            >
              Bekijk standaard modellen
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: "5 jaar", label: "garantie" },
              { value: "NL", label: "ontworpen" },
              { value: "ISO", label: "gecertificeerd" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/30" />
      </div>
    </section>
  )
}

function ColumnSilhouette() {
  return (
    <div className="relative opacity-20 select-none pointer-events-none">
      {/* Main column body */}
      <div
        className="relative mx-auto"
        style={{
          width: "72px",
          height: "420px",
          background: "linear-gradient(180deg, #4a4a5a 0%, #2a2a3a 40%, #1a1a28 100%)",
          borderRadius: "6px",
          boxShadow: "inset 2px 0 8px rgba(255,255,255,0.05), inset -2px 0 4px rgba(0,0,0,0.3), 4px 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Highlight stripe */}
        <div
          className="absolute top-0 left-3 bottom-0 w-px opacity-30"
          style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.6), transparent)" }}
        />
        {/* Connection modules */}
        {[80, 140, 200, 260, 320].map((top) => (
          <div
            key={top}
            className="absolute left-1/2 -translate-x-1/2 w-12 h-8 rounded-sm"
            style={{
              top,
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
            }}
          />
        ))}
      </div>
      {/* Base */}
      <div
        className="mx-auto"
        style={{
          width: "96px",
          height: "12px",
          background: "linear-gradient(180deg, #2a2a3a, #1a1a28)",
          borderRadius: "3px",
          marginTop: "2px",
        }}
      />
    </div>
  )
}
