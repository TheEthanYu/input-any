'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

interface FAQItemProps {
  question: string
  answer: React.ReactNode
  isNew?: boolean
}

const faqList: FAQItemProps[] = [
  {
    question: 'What makes ShipOneDay different?',
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>ShipOneDay is designed to help developers launch faster with:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>
            Modern tech stack with Next.js 14, Typescript, and Tailwind CSS
          </li>
          <li>Production-ready email system with Resend</li>
          <li>Secure authentication with Supabase</li>
          <li>Simple payment integration with LemonSqueezy</li>
          <li>SEO optimized and fully responsive components</li>
        </ul>
      </div>
    ),
    isNew: true,
  },
  {
    question: 'What is included in the package?',
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Your purchase includes:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Complete source code access</li>
          <li>All core features and integrations</li>
          <li>Detailed documentation and guides</li>
          <li>Free updates within your plan period</li>
          <li>Community support access</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Do you offer refunds?',
    answer: (
      <p className="leading-relaxed">
        Yes! If you&apos;re not satisfied with ShipOneDay, we offer a
        no-questions-asked refund within 14 days of purchase. Simply reach out
        to us with your purchase details.
      </p>
    ),
  },
  {
    question: 'Can I use this for client projects?',
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Yes! Our licensing options are designed to be flexible:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Basic: Personal projects only</li>
          <li>Pro: Single commercial project</li>
          <li>Team: Multiple commercial projects</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'What kind of support do you provide?',
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>We offer several support channels:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Comprehensive documentation</li>
          <li>GitHub Discussions for community support</li>
          <li>Email support for technical issues</li>
          <li>Regular updates and bug fixes</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How are updates handled?',
    answer: (
      <p className="leading-relaxed">
        We regularly update ShipOneDay with new features, security patches, and
        dependency updates. You&apos;ll have access to updates based on your
        plan duration (3, 6, or 12 months).
      </p>
    ),
  },
  {
    question: 'Do you offer custom development?',
    answer: (
      <p className="leading-relaxed">
        While we don&apos;t currently offer custom development services, our
        Team plan includes deployment guidance and codebase walkthroughs to help
        you customize the platform for your needs.
      </p>
    ),
  },
]

export default function FAQ() {
  return (
    <section className="relative overflow-hidden py-24" id="faq">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f610,transparent)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            FAQ
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Common Questions
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Everything you need to know about ShipOneDay. Can&apos;t find what
            you&apos;re looking for?{' '}
            <a
              href="mailto:your@email.com"
              className="font-medium text-primary hover:text-primary/80"
            >
              Email us
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-2">
                    {item.question}
                    {item.isNew && (
                      <Badge
                        variant="secondary"
                        className="ml-2 rounded-sm bg-emerald-500/10 px-1.5 font-medium text-emerald-500"
                      >
                        NEW
                      </Badge>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
