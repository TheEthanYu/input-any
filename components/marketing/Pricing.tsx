'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PricingPlan {
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  buttonText?: string
  buttonVariant?: 'default' | 'outline'
  variantId?: string // LemonSqueezy variant ID
}

const plans: PricingPlan[] = [
  {
    name: 'Basic',
    price: 79,
    description: 'Perfect for side projects',
    features: [
      'Full source code access',
      'Core features included',
      'Basic documentation',
      'Community support',
      'Email setup',
      'Basic auth setup',
      '3 months of updates',
      'Personal use license'
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'outline'
  },
  {
    name: 'Pro',
    price: 129,
    description: 'Best for indie hackers',
    features: [
      'Everything in Basic, plus:',
      'Premium documentation',
      'Priority email support',
      'Advanced auth features',
      'Payment system setup',
      'API integration guides',
      '6 months of updates',
      'Commercial use license'
    ],
    popular: true,
    buttonText: 'Get Started',
    variantId: 'your-variant-id'
  },
  {
    name: 'Team',
    price: 299,
    description: 'For professional teams',
    features: [
      'Everything in Pro, plus:',
      'Team license (up to 5 devs)',
      'Premium support',
      'Custom integration help',
      'Deployment guides',
      'Codebase walkthrough',
      '12 months of updates',
      'Multiple projects license'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline'
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className='relative py-24 overflow-hidden'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background to-background' />
      <div className='absolute inset-0'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rotate-12 bg-gradient-to-r from-primary/30 via-purple-500/20 to-violet-500/30 rounded-full blur-[120px] opacity-50' />
      </div>

      <div className='container relative'>
        {/* 标题部分 */}
        <div className='max-w-xl mx-auto text-center mb-20'>
          <h2 className='text-4xl font-bold tracking-tight mb-4'>
            Simple, transparent pricing
          </h2>
          <p className='text-muted-foreground'>
            Everything you need to ship your next product
          </p>
        </div>

        {/* 定价卡片 - 自动布局 */}
        <div className={cn(
          'grid gap-8 mx-auto max-w-6xl',
          plans.length === 1 && 'max-w-md',
          plans.length === 2 && 'md:grid-cols-2',
          plans.length === 3 && 'md:grid-cols-3',
          plans.length > 3 && 'md:grid-cols-2 lg:grid-cols-3'
        )}>
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={cn(
                'relative flex flex-col p-8 bg-background/60 backdrop-blur-sm',
                plan.popular && 'border-primary shadow-lg'
              )}
            >
              {plan.popular && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                  <span className='bg-primary px-3 py-1 text-xs font-medium text-primary-foreground rounded-full'>
                    Most Popular
                  </span>
                </div>
              )}

              <div className='flex-1'>
                <h3 className='text-2xl font-bold'>{plan.name}</h3>
                <div className='mt-4 flex items-baseline'>
                  <span className='text-4xl font-bold tracking-tight'>${plan.price}</span>
                  <span className='ml-1 text-sm font-medium text-muted-foreground'>one-time</span>
                </div>
                <p className='mt-4 text-muted-foreground'>{plan.description}</p>

                <ul className='mt-8 space-y-3'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-center gap-3'>
                      <svg className='h-4 w-4 shrink-0 text-primary' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z' clipRule='evenodd' />
                      </svg>
                      <span className='text-muted-foreground'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className='mt-8 w-full'
                variant={plan.buttonVariant || 'default'}
                size='lg'
              >
                {plan.buttonText || 'Get Started'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
