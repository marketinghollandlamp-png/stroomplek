import Link from "next/link"
import { Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Stroomplek</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500">
              Premium stroomzuilen voor moderne kantoren, projectinrichting en architecturale interieurs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/configurator", label: "Op maat configureren" },
                { href: "/standaard", label: "Standaard modellen" },
                { href: "/modellen", label: "Alle modellen" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Bedrijf</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/zakelijk", label: "Zakelijke klanten" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>info@stroomplek.nl</li>
              <li>+31 (0)20 123 45 67</li>
              <li className="text-zinc-600">Ma–Vr: 08:00–17:30</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Stroomplek. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Privacybeleid</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Algemene voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
