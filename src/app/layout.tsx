import type { Metadata } from "next"
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { PageTransitionWrapper } from "@/components/ui/PageTransitionWrapper"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Stroomplek — Stroom op de plek waar jij het nodig hebt",
  description:
    "Premium stroomzuilen voor evenementen, scholen en kantoren. Vast of mobiel — strak, stil en volledig configureerbaar. Lancering 11 mei 2026.",
  keywords: ["stroomzuil", "stroomkolom", "power column", "evenementen", "kantoor", "maatwerk", "Heerhugowaard"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
      style={{
        ["--font-display" as string]: `var(--font-inter-tight), "Inter Tight", "Inter", system-ui, sans-serif`,
        ["--font-body" as string]:    `var(--font-inter), "Inter", system-ui, sans-serif`,
        ["--font-mono" as string]:    `var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace`,
      }}
    >
      <body style={{ fontFamily: "var(--font-body)" }}>
        <Navigation />
        <main><PageTransitionWrapper>{children}</PageTransitionWrapper></main>
        <Footer />
      </body>
    </html>
  )
}
