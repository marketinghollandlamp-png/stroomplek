// Blog posts — add new entries to this array to publish
// Every fact here must be verifiable from the site content.

export interface BlogBlock {
  type: "p" | "h2" | "h3" | "quote" | "list" | "divider"
  text?: string
  items?: string[]
  cite?: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string           // ISO date
  category: string
  excerpt: string
  readTime: string
  author: string
  blocks: BlogBlock[]
}

export const POSTS: BlogPost[] = [
  {
    slug: "waarom-we-stroomplek-zijn-begonnen",
    title: "Waarom we Stroomplek zijn begonnen",
    date: "2026-05-11",
    category: "Ons verhaal",
    excerpt:
      "Het begon in een verbouwing. Een mooie ruimte, een plek waar we stroom wilden — en geen stopcontact in de buurt. Wat we daarna vonden, viel tegen.",
    readTime: "4 min",
    author: "Het Stroomplek-team",
    blocks: [
      {
        type: "p",
        text: "Het begon in een verbouwing. Een mooie ruimte, een plek waar we stroom wilden — en geen stopcontact in de buurt. We gingen op zoek naar een nette oplossing: een stroomzuil die paste bij hoe we de ruimte wilden hebben.",
      },
      {
        type: "h2",
        text: "Wat we vonden, viel tegen.",
      },
      {
        type: "p",
        text: "Wat we vonden was óf functioneel maar lelijk, óf strak maar nauwelijks te configureren. Geen kleurkeuze, geen vrijheid in aansluitingen, geen aandacht voor afwerking. De markt bood producten die ofwel bedoeld waren voor een technische ruimte, ofwel zo generiek waren dat ze nergens echt bij pasten.",
      },
      {
        type: "quote",
        text: "Als we dit zelf niet kunnen vinden — terwijl we er écht naar zoeken — dan is het probleem groter dan onszelf.",
        cite: "— de oprichters",
      },
      {
        type: "h2",
        text: "Dan maken we 'm zelf wel.",
      },
      {
        type: "p",
        text: "Eerst voor onszelf. Daarna doordachter, zodat anderen met datzelfde probleem ook geholpen zouden zijn. De rode draad: het mocht geen compromis worden tussen mooi en praktisch. Allebei, of niet.",
      },
      {
        type: "p",
        text: "Dat resulteerde in vier modellen: twee vaste uitvoeringen en twee mobiele. Elk model heeft een duidelijke taak.",
      },
      {
        type: "h3",
        text: "De vier modellen",
      },
      {
        type: "list",
        items: [
          "VZ-G — Grote vaste zuil. Slanke koker, vast op de vloer of in de grond.",
          "VZ-T — Uitschuifbare vaste zuil. Telescopisch, in hoogte verstelbaar.",
          "MZ-M — Medium mobiele zuil. Op een rijdende voet, met handgreep.",
          "MZ-G — Grote mobiele zuil. Zelfde rijdende voet, met opzetbeugel voor extra hoogte.",
        ],
      },
      {
        type: "h2",
        text: "Volledig op maat — dat is geen extra.",
      },
      {
        type: "p",
        text: "Elke zuil wordt op bestelling gemaakt. Geen voorraad. Dat betekent dat kleur, aansluitingen, kabelafloop en montage worden afgestemd op wat jij nodig hebt — niet andersom. Standaard zijn Schuko-stopcontacten (NL), USB-C/A, UTP CAT6 en HDMI beschikbaar. Heb je een specifieke aansluiting nodig? Dan bouwen we 'm in.",
      },
      {
        type: "p",
        text: "Voor de kleur geldt hetzelfde: standaard leveren we in geanodiseerd aluminium of zwart, maar elke RAL-kleur is mogelijk in poedercoat-afwerking.",
      },
      {
        type: "h2",
        text: "11 mei 2026 — we zijn live.",
      },
      {
        type: "p",
        text: "Vandaag, 11 mei 2026, opent Stroomplek officieel. Vanaf nu kun je een offerte aanvragen via de contactpagina of via info@stroomplek.nl. We reageren binnen één werkdag met een voorstel inclusief tekening en prijs. Levertijd bespreken we per aanvraag — die hangt af van de afwerking en aansluitingen.",
      },
      {
        type: "p",
        text: "We werken volledig op aanvraag vanuit Heerhugowaard. Geen showroom, geen wachttijden aan de balie — gewoon een directe lijn naar de mensen die je zuil bouwen.",
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find(p => p.slug === slug)
}
