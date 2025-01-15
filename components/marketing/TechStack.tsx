'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const techStack = [
  {
    name: 'LemonSqueezy',
    purpose: 'Payment',
    reasons: [
      'All-in-one digital product sales',
      'Built-in tax & compliance handling',
      'Simple no-code integration',
    ],
  },
  {
    name: 'Resend',
    purpose: 'Email',
    reasons: [
      'Modern API with 99% delivery rate',
      'React-based email templates',
      'Generous free tier for startups',
    ],
  },
  {
    name: 'Supabase',
    purpose: 'Auth & DB',
    reasons: [
      'PostgreSQL with real-time data',
      'Built-in auth with multiple providers',
      'Free tier with 500MB database',
    ],
  },
  {
    name: 'Crisp',
    purpose: 'Support',
    reasons: [
      'Easy integration with Next.js',
      'Team inbox and chatbot',
      'Affordable pricing for teams',
    ],
  },
  {
    name: 'MDX',
    purpose: 'Content',
    reasons: [
      'Write in Markdown and JSX',
      'SEO-friendly documentation',
      'Interactive code examples',
    ],
  },
  {
    name: 'shadcn/ui',
    purpose: 'UI',
    reasons: [
      'Production-ready components',
      'Zero vendor lock-in',
      'Perfect for Next.js',
    ],
  },
]

export default function TechStack() {
  return (
    <section className="relative py-24">
      {/* Background - Light/Dark Mode Adaptive */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-zinc-950 dark:to-zinc-900" />

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]"
        style={{
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, white, transparent)',
        }}
      />

      {/* Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 border-primary/30 bg-primary/5"
          >
            Curated Tech Stack
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-6 bg-gradient-to-b from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Stop Wasting Time on Tech Choices
          </h2>
          <p className="text-lg text-gray-600 dark:text-zinc-400">
            We&apos;ve carefully selected and integrated the best tools, so you
            can focus on building your product.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {techStack.map(tech => (
            <Card
              key={tech.name}
              className="relative group overflow-hidden bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm border-gray-200/50 dark:border-white/10 hover:border-primary/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-transparent dark:from-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {tech.name}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md border border-gray-200/50 dark:border-white/10">
                      {tech.purpose}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-gray-200/50 dark:border-white/10">
                    {tech.reasons.map(reason => (
                      <li
                        key={reason}
                        className="text-sm text-gray-600 dark:text-zinc-400 flex items-center group-hover:text-gray-900 dark:group-hover:text-zinc-300 transition-colors"
                      >
                        <span className="text-primary mr-2 text-xs">■</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
