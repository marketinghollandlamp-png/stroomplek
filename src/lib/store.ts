"use client"

import { create } from "zustand"
import { ZuilType, ConnectionConfig, ExtrasConfig, berekenPrijs, PriceBreakdown } from "./pricing"

export interface CartItem {
  id: string
  type: ZuilType
  zijdes: 1 | 2
  zijde1: ConnectionConfig
  zijde2: ConnectionConfig
  ralKleur: string
  ralHex: string
  schakelmateriaal: "wit" | "zwart"
  extras: ExtrasConfig
  aantal: number
  prijsPerStuk: number
  totaalPrijs: number
}

interface ConfiguratorState {
  // Configurator
  stap: number
  type: ZuilType
  zijdes: 1 | 2
  zijde1: ConnectionConfig
  zijde2: ConnectionConfig
  ralKleur: string
  ralHex: string
  schakelmateriaal: "wit" | "zwart"
  extras: ExtrasConfig
  aantal: number
  prijs: PriceBreakdown | null

  // Cart
  cartItems: CartItem[]
  cartOpen: boolean

  // Actions
  setStap: (stap: number) => void
  setType: (type: ZuilType) => void
  setZijdes: (zijdes: 1 | 2) => void
  setZijde1: (config: Partial<ConnectionConfig>) => void
  setZijde2: (config: Partial<ConnectionConfig>) => void
  setRAL: (code: string, hex: string) => void
  setSchakelmateriaal: (mat: "wit" | "zwart") => void
  setExtras: (extras: Partial<ExtrasConfig>) => void
  setAantal: (aantal: number) => void
  updatePrijs: () => void
  addToCart: () => void
  removeFromCart: (id: string) => void
  updateCartAantal: (id: string, aantal: number) => void
  setCartOpen: (open: boolean) => void
  resetConfigurator: () => void
}

const defaultExtras: ExtrasConfig = {
  kabelOverlengte: false,
  utpBoven: false,
  afdekkappen: false,
  ralAfdekkappen: false,
  transport: true,
}

const defaultConnections: ConnectionConfig = {
  stopcontacten: 0,
  utp: 0,
  hdmi: 0,
}

export const useStore = create<ConfiguratorState>((set, get) => ({
  stap: 1,
  type: "medium",
  zijdes: 1,
  zijde1: { ...defaultConnections },
  zijde2: { ...defaultConnections },
  ralKleur: "9016",
  ralHex: "#F1F0EA",
  schakelmateriaal: "wit",
  extras: { ...defaultExtras },
  aantal: 1,
  prijs: null,
  cartItems: [],
  cartOpen: false,

  setStap: (stap) => set({ stap }),

  setType: (type) => {
    set({ type })
    get().updatePrijs()
  },

  setZijdes: (zijdes) => {
    set({ zijdes })
    get().updatePrijs()
  },

  setZijde1: (config) => {
    set((s) => ({ zijde1: { ...s.zijde1, ...config } }))
    get().updatePrijs()
  },

  setZijde2: (config) => {
    set((s) => ({ zijde2: { ...s.zijde2, ...config } }))
    get().updatePrijs()
  },

  setRAL: (ralKleur, ralHex) => {
    set({ ralKleur, ralHex })
    get().updatePrijs()
  },

  setSchakelmateriaal: (schakelmateriaal) => set({ schakelmateriaal }),

  setExtras: (extras) => {
    set((s) => ({ extras: { ...s.extras, ...extras } }))
    get().updatePrijs()
  },

  setAantal: (aantal) => {
    set({ aantal })
    get().updatePrijs()
  },

  updatePrijs: () => {
    const s = get()
    const prijs = berekenPrijs(
      s.type,
      s.zijdes,
      s.zijde1,
      s.zijde2,
      s.ralKleur !== "9016",
      s.schakelmateriaal,
      s.extras,
      s.aantal
    )
    set({ prijs })
  },

  addToCart: () => {
    const s = get()
    if (!s.prijs) return
    const item: CartItem = {
      id: Date.now().toString(),
      type: s.type,
      zijdes: s.zijdes,
      zijde1: { ...s.zijde1 },
      zijde2: { ...s.zijde2 },
      ralKleur: s.ralKleur,
      ralHex: s.ralHex,
      schakelmateriaal: s.schakelmateriaal,
      extras: { ...s.extras },
      aantal: s.aantal,
      prijsPerStuk: s.prijs.perStuk,
      totaalPrijs: s.prijs.totaal,
    }
    set((state) => ({ cartItems: [...state.cartItems, item], cartOpen: true }))
  },

  removeFromCart: (id) => {
    set((s) => ({ cartItems: s.cartItems.filter((i) => i.id !== id) }))
  },

  updateCartAantal: (id, aantal) => {
    set((s) => ({
      cartItems: s.cartItems.map((i) =>
        i.id === id ? { ...i, aantal, totaalPrijs: i.prijsPerStuk * aantal } : i
      ),
    }))
  },

  setCartOpen: (cartOpen) => set({ cartOpen }),

  resetConfigurator: () => {
    set({
      stap: 1,
      type: "medium",
      zijdes: 1,
      zijde1: { ...defaultConnections },
      zijde2: { ...defaultConnections },
      ralKleur: "9016",
      ralHex: "#F1F0EA",
      schakelmateriaal: "wit",
      extras: { ...defaultExtras },
      aantal: 1,
      prijs: null,
    })
  },
}))
