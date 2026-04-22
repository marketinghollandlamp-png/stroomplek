import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import CartPanel from "@/components/cart/CartPanel"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Stroomplek — Premium stroomzuilen voor moderne kantoren",
  description:
    "Configureerbare stroomzuilen van hoge kwaliteit voor architecten, installateurs en zakelijke projecten. Direct prijs inzicht en volledig op maat.",
  keywords: ["stroomzuil", "stroomkolom", "kantoorverlichting", "installateur", "architect", "configurator"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartPanel />
      </body>
    </html>
  )
}
