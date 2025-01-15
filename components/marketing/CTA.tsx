import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
          style={{ backgroundSize: '32px 32px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-violet-500/10" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to launch your next project?
          </h2>

          {/* Value Proposition */}
          <p className="text-lg text-muted-foreground mb-8">
            Get started today with our starter template and save 34+ hours of
            development time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="min-w-[200px] rounded-full bg-primary hover:bg-primary/90 group"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Price Tag */}
            <span className="text-sm text-muted-foreground">
              Starting at{' '}
              <span className="font-semibold text-foreground">$129</span>
              <span className="mx-2">·</span>
              <span className="text-emerald-500">
                14-day money-back guarantee
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
