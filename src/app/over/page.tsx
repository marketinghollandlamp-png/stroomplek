import Link from "next/link"
import { Arrow } from "@/components/ui/Arrow"
import CTABanner from "@/components/shared/CTABanner"

export default function OverPage() {
  return (
    <>
      <section className="story-hero">
        <div className="story-bg">
          <div className="grid" />
          <div className="glow" />
          <div className="line" />
        </div>
        <div className="container">
          <div className="eyebrow dark"><span style={{ color: "var(--copper)" }}>↳ Hoofdstuk 00</span>Ons verhaal</div>
          <h1 className="story-h1">We zochten zelf <em>een mooie plek</em><br />voor stroom. Hij was er niet.</h1>
          <p className="lede" style={{ maxWidth: "62ch", color: "rgba(245,245,245,.72)", marginTop: 24 }}>
            Dit is hoe Stroomplek begon — uit een verbouwing, een prototype, en de stille overtuiging dat het écht beter kon.
          </p>
        </div>
      </section>

      <section className="section story-section">
        <div className="container story-wrap">
          <article className="chapter">
            <aside className="ch-num"><span>01</span><div className="ch-line" /></aside>
            <div className="ch-body">
              <h2>Het stopcontact zat <em className="cu">net te ver.</em></h2>
              <p>Het begon in een verbouwing. Een mooie ruimte, een plek waar we stroom wilden — en geen stopcontact in de buurt. We gingen op zoek naar een nette oplossing: een stroomzuil die paste bij hoe we de ruimte wilden hebben.</p>
              <p>Wat we vonden viel tegen. Functioneel maar lelijk, of strak maar nauwelijks te configureren. Geen kleurkeuze, geen vrijheid in aansluitingen, geen aandacht voor afwerking.</p>
            </div>
          </article>

          <blockquote className="pull">
            <p>&ldquo;Als we dit zelf niet kunnen vinden — terwijl we er <em>echt</em> naar zoeken — dan is het probleem groter dan onszelf.&rdquo;</p>
            <cite>— de oprichters</cite>
          </blockquote>

          <article className="chapter">
            <aside className="ch-num"><span>02</span><div className="ch-line" /></aside>
            <div className="ch-body">
              <h2>Dan maken we 'm zelf wel.</h2>
              <p>Eerst voor onszelf. Daarna doordachter, in vier varianten, zodat anderen met datzelfde probleem ook geholpen zouden zijn. Een zuil die paste bij hoe je de ruimte wilde hebben — niet andersom.</p>
              <p>De rode draad: het mocht geen compromis worden tussen mooi en praktisch. Allebei, of niet.</p>
            </div>
          </article>

          <article className="chapter">
            <aside className="ch-num"><span>03</span><div className="ch-line" /></aside>
            <div className="ch-body">
              <h2>Stroomplek werd een ding.</h2>
              <p>De naam kwam vanzelf. Stroomplek. Niet een zuil, niet een product, maar een plék — een goed gekozen plek waar de stroom zit, klopt met de ruimte, en mooi is om naar te kijken.</p>
              <p>We hebben vier modellen uitontwikkeld: twee vaste en twee mobiele uitvoeringen. Geen voorraad, alles op bestelling. Maatwerk is geen extra; het is wat we doen.</p>
              <div className="stat-row">
                <div className="stat"><div className="n">11.05.26</div><div className="l">We gaan live</div></div>
                <div className="stat"><div className="n">04</div><div className="l">Modellen klaar</div></div>
                <div className="stat"><div className="n">100%</div><div className="l">Op maat gemaakt</div></div>
                <div className="stat"><div className="n">NL</div><div className="l">Ontworpen &amp; gebouwd</div></div>
              </div>
            </div>
          </article>

          <article className="chapter">
            <aside className="ch-num"><span>04</span><div className="ch-line" /></aside>
            <div className="ch-body">
              <h2>11 mei 2026 — we gaan live.</h2>
              <p>Op 11 mei 2026 opent Stroomplek officieel. Vanaf dan kun je je eerste zuil bij ons bestellen — vast of mobiel, in jouw RAL, met de aansluitingen die je nodig hebt.</p>
              <p>De volgende stap is een online configurator: een tool waar je je zuil van begin tot eind samenstelt en direct een prijs ziet. Tot die tijd doen we het samen — via een mail of telefoontje.</p>
              <div className="signoff">
                <div className="sig-line" />
                <p className="sig-text">— Het Stroomplek-team, Heerhugowaard</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container story-wrap">
          <div className="story-end-cta">
            <h3>Klaar om jouw plek strak te maken?</h3>
            <p>Vertel ons wat je nodig hebt — meestal binnen één werkdag een voorstel.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18, justifyContent: "center" }}>
              <Link href="/contact" className="btn btn-dark btn-arrow">Stuur ons een bericht <Arrow /></Link>
              <a href="tel:0722600000" className="btn btn-outline-dark">Of bel 072 26 000 00</a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
