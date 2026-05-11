import Hero from "@/components/home/Hero"
import ProblemSection from "@/components/home/ProblemSection"
import ProductsSection from "@/components/home/ProductsSection"
import WhySection from "@/components/home/WhySection"
import ModelCompare from "@/components/home/ModelCompare"
import ProcessTimeline from "@/components/home/ProcessTimeline"
import RALPicker from "@/components/shared/RALPicker"
import ReferencesSection from "@/components/home/ReferencesSection"
import CTABanner from "@/components/shared/CTABanner"
import { ScrollProgress, CursorTrail, LoadingSplash, KonamiConfetti, StickyConfig, SpecMagnify, ClickSounds } from "@/components/ui/ClientEffects"

export default function HomePage() {
  return (
    <>
      <LoadingSplash />
      <KonamiConfetti />
      <ScrollProgress />
      <CursorTrail />
      <SpecMagnify />
      <ClickSounds enabled={false} />
      <Hero />
      <ProblemSection />
      <div className="copper-rule" />
      <ProductsSection />
      <WhySection />
      <ModelCompare />
      <ProcessTimeline />
      <RALPicker />
      <ReferencesSection />
      <CTABanner />
      <StickyConfig />
    </>
  )
}
