'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  const techFeatures = [
    {
      name: 'LemonSqueezy',
      desc: 'Payments + Subscriptions',
      logo: '/logos/lemonsqueezy.svg',
    },
    {
      name: 'Resend',
      desc: 'Email System',
      logo: '/logos/resend.svg',
    },
    {
      name: 'Supabase',
      desc: 'Auth + Database',
      logo: '/logos/supabase.svg',
    },
    {
      name: 'Crisp',
      desc: 'Customer Support',
      logo: '/logos/crisp.svg',
    },
    {
      name: 'shadcn/ui',
      desc: 'UI Components',
      logo: '/logos/shadcn.svg',
    },
    {
      name: 'MDX',
      desc: 'Docs + Blog',
      logo: '/logos/mdx.svg',
    },
  ]

  return (
    <section className="relative pt-24 md:pt-36 pb-16 md:pb-24">
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="px-6 py-2 rounded-full border-primary/30 bg-primary/5 text-base"
              >
                Save 40+ Development Hours
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                  ShipOneDay
                </span>
              </h1>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                  Code Less,
                </span>{' '}
                <span className="relative inline-flex">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary/80 to-primary">
                    Ship More
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 blur-sm" />
                </span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Stop wasting time on tech choices. We&apos;ve curated the best
                tools and practices, so you can focus on shipping your next
                great idea.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-button text-lg h-12 px-8">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link
                href="https://demo.shipone.day"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg h-12 px-8"
                >
                  Live Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Tech Stack */}
          <div className="relative bg-[#18181B] backdrop-blur-sm rounded-3xl p-8 overflow-hidden shadow-2xl">
            {/* Command Line */}
            <div className="mb-6 bg-[#27272A] rounded-xl overflow-hidden">
              <div className="flex items-center px-4 py-2 bg-[#18181B]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-500">$</span>
                  <code className="text-yellow-300/90 font-mono flex-1">
                    git clone ship-one-day
                  </code>
                </div>
              </div>
            </div>

            {/* Save Time Label */}
            <div className="mb-6 flex items-center justify-center gap-2 text-zinc-400">
              <span className="h-px flex-1 bg-zinc-800" />
              <span className="text-sm whitespace-nowrap">
                Save 40+ Hours With
              </span>
              <span className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Tech Stack Grid */}
            <div className="relative grid grid-cols-2 gap-3">
              {techFeatures.map(tech => (
                <div
                  key={tech.name}
                  className="group relative p-4 rounded-2xl overflow-hidden bg-[#27272A] hover:bg-[#3F3F46] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="relative w-10 h-10 rounded-lg bg-black/20 p-2">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-white">{tech.name}</h3>
                      <p className="text-sm text-zinc-400">{tech.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-[0.15] dark:opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
