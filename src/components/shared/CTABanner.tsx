import Link from "next/link"
import { Arrow } from "@/components/ui/Arrow"

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner-grid">
          <div>
            <h2>Klaar om jouw plek strak te maken?</h2>
            <p>Vertel ons wat je nodig hebt — binnen één werkdag hebben we een voorstel terug.</p>
          </div>
          <div className="row" style={{ justifySelf: "end" }}>
            <Link href="/contact" className="btn btn-dark btn-arrow">
              Offerte aanvragen <Arrow />
            </Link>
            <a href="tel:0722600000" className="btn" style={{ background: "transparent", color: "#14263C", border: "1px solid rgba(20,38,60,.3)" }}>
              Bel 072 26 000 00
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
