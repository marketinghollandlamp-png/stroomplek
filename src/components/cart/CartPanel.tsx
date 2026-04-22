"use client"

import Link from "next/link"
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { useStore } from "@/lib/store"
import { formatPrijs, ZUIL_NAMEN } from "@/lib/pricing"

export default function CartPanel() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateCartAantal } = useStore()

  const totaal = cartItems.reduce((sum, item) => sum + item.totaalPrijs, 0)
  const aantalItems = cartItems.reduce((sum, item) => sum + item.aantal, 0)

  if (!cartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
        onClick={() => setCartOpen(false)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-zinc-700" />
            <span className="font-bold text-zinc-900">Winkelwagen</span>
            {aantalItems > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {aantalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-zinc-400" />
              </div>
              <p className="text-zinc-500 font-medium mb-1">Winkelwagen is leeg</p>
              <p className="text-zinc-400 text-sm mb-6">Configureer een zuil om te beginnen</p>
              <Link
                href="/configurator"
                onClick={() => setCartOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Start configurator
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-zinc-900 text-sm">{ZUIL_NAMEN[item.type]}</h4>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-zinc-500">{item.zijdes} zijde{item.zijdes > 1 ? "s" : ""}</p>
                        <p className="text-xs text-zinc-500">
                          {item.zijde1.stopcontacten > 0 && `${item.zijde1.stopcontacten}× stopcontact `}
                          {item.zijde1.utp > 0 && `${item.zijde1.utp}× UTP `}
                          {item.zijde1.hdmi > 0 && `${item.zijde1.hdmi}× HDMI`}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-3 h-3 rounded-full border border-black/10"
                            style={{ backgroundColor: item.ralHex }}
                          />
                          <p className="text-xs text-zinc-500">RAL {item.ralKleur}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 hover:bg-zinc-200 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => item.aantal > 1 && updateCartAantal(item.id, item.aantal - 1)}
                        className="w-7 h-7 border border-zinc-200 hover:border-zinc-300 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40"
                        disabled={item.aantal <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-zinc-900 w-5 text-center">{item.aantal}</span>
                      <button
                        onClick={() => updateCartAantal(item.id, item.aantal + 1)}
                        className="w-7 h-7 border border-zinc-200 hover:border-zinc-300 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-zinc-900">{formatPrijs(item.totaalPrijs)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-600 font-medium">Totaal excl. btw</span>
              <span className="text-xl font-bold text-zinc-900">{formatPrijs(totaal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Afrekenen
            </Link>
            <button
              className="w-full text-center text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
              onClick={() => setCartOpen(false)}
            >
              Verder winkelen
            </button>
          </div>
        )}
      </div>
    </>
  )
}
