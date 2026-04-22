import Hero from "@/components/home/Hero"
import ValueBlocks from "@/components/home/ValueBlocks"
import ProductShowcase from "@/components/home/ProductShowcase"
import MaatwerkVsStandaard from "@/components/home/MaatwerkVsStandaard"
import TrustSection from "@/components/home/TrustSection"
import FinalCTA from "@/components/home/FinalCTA"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueBlocks />
      <ProductShowcase />
      <MaatwerkVsStandaard />
      <TrustSection />
      <FinalCTA />
    </>
  )
}
