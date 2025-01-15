'use client'

import React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

interface ComparisonItem {
  without: string
  with: string
}

const comparisonData: ComparisonItem[] = [
  {
    without: "Manual invoice generation taking hours per week",
    with: "One-click automated invoice generation in seconds"
  },
  {
    without: "Pay $2 per invoice, costs increase with growth",
    with: "Unlimited invoices included - scale worry-free"
  },
  {
    without: "Endless back-and-forth with customer support",
    with: "Self-serve portal - customers handle everything"
  },
  {
    without: "Rigid invoices causing compliance headaches",
    with: "Flexible editing with full audit trail"
  },
  {
    without: "No historical invoice generation possible",
    with: "Generate & customize invoices for any past payment"
  }
]

export default function WithWithout() {
  return (
    <section className="relative py-16">
      <div className="container relative">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            The Modern Way to Handle Invoices
          </h2>
          <p className="text-muted-foreground">
            See why companies are switching to ShipOneDay
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-[1fr,1fr] gap-6">
            {/* Headers */}
            <div className="flex items-center gap-2 pb-4 border-b">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-red-500">Traditional Process</h3>
            </div>
            <div className="flex items-center gap-2 pb-4 border-b">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-medium text-emerald-500">With ShipOneDay</h3>
            </div>

            {/* Comparison Items */}
            {comparisonData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex items-start gap-3 py-4 pr-6 group border-b border-dashed">
                  <XCircle className="w-4 h-4 shrink-0 text-red-500/70 mt-1" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.without}
                  </span>
                </div>
                <div className="flex items-start gap-3 py-4 pl-6 group border-b border-dashed">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500/70 mt-1" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.with}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-200 dark:to-zinc-400 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity">
            Transform Your Workflow
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
