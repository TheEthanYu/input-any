import { Hero } from '@/components/marketing/Hero'
import FeaturesListicle from '@/components/marketing/FeaturesListicle'
import Pricing from '@/components/marketing/Pricing'
import FAQ from '@/components/marketing/FAQ'
import CTA from '@/components/marketing/CTA'
import Testimonials from '@/components/marketing/Testimonials'

export default function Home() {
  return (
    <>
      <main className="space-y-40 mb-40">
        {/* Main Content Blocks */}
        <div>
          <Hero />
          <FeaturesListicle />
          <Pricing />
          <FAQ />
          <CTA />
          <Testimonials />
        </div>
      </main>
    </>
  )
}
