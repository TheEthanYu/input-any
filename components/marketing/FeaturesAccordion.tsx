'use client'

import { useState, useRef, ReactNode } from 'react'
import Image from 'next/image'

const features = [
  {
    title: 'Email',
    description:
      'Production-ready email system with Resend. Includes transactional templates and DNS configuration (DKIM, SPF, DMARC) to avoid spam folder.',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
        />
      </svg>
    ),
  },
  {
    title: 'Payment',
    description:
      'Handle subscriptions and one-time payments with LemonSqueezy. Automatic invoice generation and tax handling.',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    ),
  },
  {
    title: 'Auth',
    description:
      'Complete authentication system with Supabase. Includes social login, magic links, role-based access control, and protected API routes & pages.',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: 'UI',
    description:
      'Beautiful and accessible components built with shadcn/ui. Dark mode and animations included.',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
]

const Item = ({
  feature,
  isOpen,
  setFeatureSelected,
}: {
  feature: Feature
  isOpen: boolean
  setFeatureSelected: () => void
}) => {
  const accordion = useRef<HTMLDivElement>(null)
  const { title, description, svg } = feature

  return (
    <div className="border-b last:border-none">
      <button
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors"
        onClick={setFeatureSelected}
        aria-expanded={isOpen}
      >
        <span
          className={`p-2 rounded-lg bg-primary/5 ${
            isOpen ? 'text-primary' : ''
          }`}
        >
          {svg}
        </span>
        <h3 className={`font-medium ${isOpen ? 'text-primary' : ''}`}>
          {title}
        </h3>
      </button>

      <div
        ref={accordion}
        className="overflow-hidden transition-all duration-200"
        style={
          isOpen
            ? { maxHeight: accordion.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  )
}

export default function FeaturesAccordion() {
  const [featureSelected, setFeatureSelected] = useState(0)

  return (
    <section className="py-24 overflow-hidden">
      {/* Primary Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]..." />

      {/* Secondary Glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px]..." />

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-bold">Ship your product faster</h2>
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-card rounded-xl border shadow-sm h-fit">
          {/* Feature Details Card */}
          {features.map((feature, i) => (
            <Item
              key={feature.title}
              feature={feature}
              isOpen={featureSelected === i}
              setFeatureSelected={() => setFeatureSelected(i)}
            />
          ))}
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-24 rounded-xl overflow-hidden h-[356px]">
            <Image
              src="/images/default-cover.jpg"
              alt="Feature preview"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

interface Feature {
  title: string
  description: string
  svg: ReactNode
}
