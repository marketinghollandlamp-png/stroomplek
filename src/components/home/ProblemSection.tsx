"use client"

import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { Arrow } from "@/components/ui/Arrow"

export default function ProblemSection() {
  return (
    <section className="dark section">
      <div className="container">
        <div className="problem-grid">
          <Reveal>
            <div>
              <div className="eyebrow dark">
                <span style={{ color: "var(--copper)" }}>↳ 01</span>Het probleem
              </div>
              <p className="quote" style={{ marginTop: 24 }}>
                Stroom die <em>niet opvalt.</em><br />Maar er altijd is.
              </p>
              <p className="lede" style={{ color: "rgba(245,245,245,.7)", marginTop: 28, maxWidth: "52ch" }}>
                Het stopcontact zit net te ver. De haspel ligt in beeld op de foto. Stroomplek lost dat op — met zuilen die passen bij jouw ruimte, in jouw kleur, met precies de aansluitingen die jij nodig hebt.
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href="/over" className="btn-story">
                  <span className="bs-num">↳ 00</span>
                  <span className="bs-label">Ons verhaal</span>
                  <span className="bs-arrow"><Arrow size={14} /></span>
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="problem-figure photo">
              <span className="tag">Stroomplek · Grote vaste</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/grote-vast.png"
                alt="Grote vaste stroomzuil"
                className="photo-img"
                draggable={false}
              />
              <div className="photo-glow" />
              <div className="floor" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
