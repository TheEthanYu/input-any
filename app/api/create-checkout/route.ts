import { NextResponse } from 'next/server'
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { STORE_ID } from '@/config/lemonsqueezy'

export async function POST(request: Request) {
  try {
    const { variantId } = await request.json()

    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 })
    }

    const checkout = await createCheckout(parseInt(STORE_ID), parseInt(variantId), {
      checkoutOptions: {
        dark: true,
        media: false,
        logo: false,
        desc: false,
        discount: false
      }
    })

    const checkoutUrl = checkout?.data?.data?.attributes?.url
    if (!checkoutUrl) {
      throw new Error('Invalid checkout URL')
    }

    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    console.error('Failed to create checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
