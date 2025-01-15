'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import React from 'react'

interface Testimonial {
  content: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

const testimonials: Testimonial[] = [
  {
    content:
      'The authentication system and API integrations saved our team weeks of development time. The documentation is comprehensive and the support is highly responsive.',
    author: {
      name: 'Sarah Anderson',
      role: 'Engineering Lead @ Scale AI',
      avatar: '/images/avatar1.avif',
    },
  },
  {
    content:
      'The clean architecture and pre-built components helped us launch our MVP in record time. The code quality is exceptional and the developer experience is outstanding.',
    author: {
      name: 'David Miller',
      role: 'Senior Developer @ Vercel',
      avatar: '/images/avatar2.avif',
    },
  },
  {
    content:
      'Perfect for startups that need to move fast. We implemented authentication, payments, and API integrations in days instead of weeks. Highly recommended.',
    author: {
      name: 'James Wilson',
      role: 'CTO @ Startup Studio',
      avatar: '/images/avatar3.avif',
    },
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="relative h-full p-8 transition-colors hover:bg-muted/50">
      {/* Quote Mark */}
      <div className="absolute top-8 right-8 text-4xl font-serif text-muted-foreground/20">
        &ldquo;
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-between h-full">
        <blockquote>
          <p className="text-base leading-relaxed text-foreground/75 min-h-[120px]">
            {testimonial.content}
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4 pt-6 mt-6 border-t">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
            <Image
              src={testimonial.author.avatar}
              alt={testimonial.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-foreground">
              {testimonial.author.name}
            </div>
            <div className="text-sm text-foreground/75">
              {testimonial.author.role}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Trusted by Developers
          </h2>
          <p className="mt-4 text-lg text-foreground/75">
            See what developers are saying about our solution
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="mx-auto mt-16 grid max-w-lg gap-6 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>

        {/* Metrics */}
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <dl className="grid gap-0.5 overflow-hidden rounded-2xl text-center grid-cols-3 [&>*]:bg-muted">
            <div className="px-4 py-6">
              <dt className="text-sm font-medium text-foreground/75">
                Active Users
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight">
                1,000+
              </dd>
            </div>
            <div className="px-4 py-6">
              <dt className="text-sm font-medium text-foreground/75">
                Time Saved
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight">
                34h
              </dd>
            </div>
            <div className="px-4 py-6">
              <dt className="text-sm font-medium text-foreground/75">
                Satisfaction
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight">
                98%
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
