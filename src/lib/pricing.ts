export type ZuilType = "klein" | "medium" | "groot" | "mobiel_klein" | "mobiel_groot"

const BASE_PRICES: Record<ZuilType, number> = {
  klein: 285,
  medium: 425,
  groot: 685,
  mobiel_klein: 345,
  mobiel_groot: 745,
}

const MAX_CONNECTIONS: Record<ZuilType, number> = {
  klein: 2,
  medium: 5,
  groot: 8,
  mobiel_klein: 3,
  mobiel_groot: 6,
}

export function getMaxConnections(type: ZuilType): number {
  return MAX_CONNECTIONS[type]
}

export interface ConnectionConfig {
  stopcontacten: number
  utp: number
  hdmi: number
}

export interface ExtrasConfig {
  kabelOverlengte: boolean
  utpBoven: boolean
  afdekkappen: boolean
  ralAfdekkappen: boolean
  transport: boolean
}

export interface PriceBreakdown {
  basis: number
  tweedeZijde: number
  stopcontacten: number
  utp: number
  hdmi: number
  ralKleur: number
  extras: number
  transport: number
  subtotaal: number
  kortingPercentage: number
  korting: number
  totaal: number
  perStuk: number
}

export function berekenPrijs(
  type: ZuilType,
  zijdes: 1 | 2,
  zijde1: ConnectionConfig,
  zijde2: ConnectionConfig,
  ralKleur: boolean,
  schakelmateriaal: "wit" | "zwart",
  extras: ExtrasConfig,
  aantal: number
): PriceBreakdown {
  const basis = BASE_PRICES[type]
  const tweedeZijde = zijdes === 2 ? 85 : 0

  const totaalStopcontacten = zijde1.stopcontacten + (zijdes === 2 ? zijde2.stopcontacten : 0)
  const totaalUTP = zijde1.utp + (zijdes === 2 ? zijde2.utp : 0)
  const totaalHDMI = zijde1.hdmi + (zijdes === 2 ? zijde2.hdmi : 0)

  const stopcontactenPrijs = totaalStopcontacten * 22
  const utpPrijs = totaalUTP * 28
  const hdmiPrijs = totaalHDMI * 35
  const ralPrijs = ralKleur ? 45 : 0

  let extrasPrijs = 0
  if (extras.kabelOverlengte) extrasPrijs += 35
  if (extras.utpBoven) extrasPrijs += 45
  if (extras.afdekkappen) extrasPrijs += 55
  if (extras.ralAfdekkappen) extrasPrijs += 35
  const transport = extras.transport ? 89 : 0

  const subtotaalPerStuk = basis + tweedeZijde + stopcontactenPrijs + utpPrijs + hdmiPrijs + ralPrijs + extrasPrijs
  const subtotaal = subtotaalPerStuk * aantal

  let kortingPercentage = 0
  if (aantal >= 50) kortingPercentage = 20
  else if (aantal >= 25) kortingPercentage = 15
  else if (aantal >= 10) kortingPercentage = 10
  else if (aantal >= 5) kortingPercentage = 5

  const korting = Math.round((subtotaal * kortingPercentage) / 100)
  const totaalZonderTransport = subtotaal - korting
  const totaal = totaalZonderTransport + (totaalZonderTransport >= 2500 ? 0 : transport)

  return {
    basis,
    tweedeZijde,
    stopcontacten: stopcontactenPrijs,
    utp: utpPrijs,
    hdmi: hdmiPrijs,
    ralKleur: ralPrijs,
    extras: extrasPrijs,
    transport: totaalZonderTransport >= 2500 ? 0 : transport,
    subtotaal,
    kortingPercentage,
    korting,
    totaal,
    perStuk: Math.round(totaal / aantal),
  }
}

export function formatPrijs(bedrag: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(bedrag)
}

export const ZUIL_NAMEN: Record<ZuilType, string> = {
  klein: "Kleine Zuil",
  medium: "Medium Zuil",
  groot: "Grote Zuil",
  mobiel_klein: "Kleine Mobiele Zuil",
  mobiel_groot: "Grote Mobiele Zuil",
}

export const ZUIL_HOOGTES: Record<ZuilType, string> = {
  klein: "80 cm",
  medium: "110 cm",
  groot: "160 cm",
  mobiel_klein: "80 cm",
  mobiel_groot: "110 cm",
}
