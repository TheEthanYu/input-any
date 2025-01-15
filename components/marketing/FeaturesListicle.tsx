'use client'

import React, { useState, JSX } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Feature {
  name: string
  description: JSX.Element
  icon: JSX.Element
  color?: string
}

const features: Feature[] = [
  {
    name: 'Emails',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    description: (
      <ul className="space-y-2">
        {[
          'Production-ready email system',
          'Customizable email templates',
          'Reliable delivery with Resend',
          'Automated workflows',
        ].map(item => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'Payments',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    description: (
      <ul className="space-y-2">
        {[
          'Stripe integration',
          'Secure payment processing',
          'Multiple payment methods',
          'Subscription management',
        ].map(item => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'Login',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    description: (
      <ul className="space-y-2">
        {[
          'Social authentication',
          'Password recovery',
          'JWT tokens & sessions',
          'Role-based access control',
        ].map(item => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'Database',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    description: (
      <ul className="space-y-2">
        {[
          'PostgreSQL setup',
          'Database migrations',
          'Data validation',
          'Backup & recovery',
        ].map(item => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'SEO',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    description: (
      <ul className="space-y-2">
        {[
          'All meta tags to rank on Google',
          'OpenGraph tags to share on social media',
          'Automated sitemap generation',
          'SEO-optimized UI components',
        ].map(item => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'Style',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    description: (
      <ul className="space-y-2">
        {[
          'Modern design system',
          'Responsive components',
          'Dark mode support',
          'Customizable themes',
        ].map(item => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
] as const

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-primary shrink-0"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const getTimeSaved = (featureName?: string) => {
  const timeMap: Record<string, string> = {
    Emails: '6 hours',
    Payments: '8 hours',
    Login: '6 hours',
    Database: '5 hours',
    SEO: '5 hours',
    Style: '4 hours',
  }
  return timeMap[featureName || ''] || '4-6 hours'
}

export default function FeaturesListicle() {
  const [selectedFeature, setSelectedFeature] = useState(features[0])

  return (
    <section className="relative py-12 md:py-24 overflow-hidden mt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Primary Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rotate-12 bg-gradient-to-r from-primary/30 via-purple-500/20 to-violet-500/30 rounded-full blur-[120px] opacity-50" />

        {/* Secondary Glow */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Save{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 font-extrabold">
              34h
            </span>{' '}
            dev time
          </h2>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-fit mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {features.map(feature => (
              <button
                key={feature.name}
                onClick={() => setSelectedFeature(feature)}
                className={cn(
                  'w-[30%] md:w-auto px-2 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300',
                  'hover:bg-white/10',
                  'border border-transparent backdrop-blur-sm',
                  selectedFeature?.name === feature.name
                    ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                    : 'hover:border-white/10'
                )}
              >
                <div className="flex flex-col md:flex-row items-center md:gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 mb-1 md:mb-0',
                      'bg-gradient-to-br shadow-sm border',
                      selectedFeature?.name === feature.name
                        ? 'from-primary/20 to-violet-500/20 border-primary/30 text-primary'
                        : 'from-white/5 to-white/10 border-white/10 text-muted-foreground'
                    )}
                  >
                    {feature.icon}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] md:text-base font-medium transition-colors duration-300 truncate',
                      selectedFeature?.name === feature.name
                        ? 'text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {feature.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Feature Details Card */}
          <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 w-full shadow-lg hover:shadow-white/5 transition-all duration-300">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                    {selectedFeature?.name}
                  </h3>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Time saved:{' '}
                    <span className="text-primary font-medium">
                      {getTimeSaved(selectedFeature?.name)}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center text-primary ring-1 ring-white/20">
                  {selectedFeature?.icon}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {selectedFeature?.description}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Get time saved for each feature
