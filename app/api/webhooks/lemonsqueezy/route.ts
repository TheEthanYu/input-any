import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('x-signature')

    // Verify webhook signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
    if (!secret) {
      throw new Error('Missing webhook secret')
    }

    const hmac = createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')

    if (signature !== digest) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventName = event.meta.event_name

    // Handle different webhook events
    switch (eventName) {
      case 'order_created':
        // Handle new order
        await handleOrderCreated(event.data)
        break
      case 'subscription_created':
        // Handle new subscription
        await handleSubscriptionCreated(event.data)
        break
      case 'subscription_updated':
        // Handle subscription update
        await handleSubscriptionUpdated(event.data)
        break
      case 'subscription_cancelled':
        // Handle subscription cancellation
        await handleSubscriptionCancelled(event.data)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Webhook Event Handlers
// Implement these functions to:
// - Process order events
// - Handle subscription changes
// - Manage user access
async function handleOrderCreated(data: any) {
  try {
    const { email } = data.data.attributes.user_email

    await resend.emails.send({
      from: 'ShipOneDay <no-reply@shiponeday.com>',
      to: email,
      subject: 'Thank you for your purchase!',
      html: `
        <h1>Welcome to ShipOneDay!</h1>
        <p>Thank you for purchasing our product.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

async function handleSubscriptionCreated(data: any) {
  // TODO: Implement subscription creation logic
  console.error('New subscription created:', data)
}

async function handleSubscriptionUpdated(data: any) {
  // TODO: Implement subscription update logic
  console.error('Subscription updated:', data)
}

async function handleSubscriptionCancelled(data: any) {
  // TODO: Implement subscription cancellation logic
  console.error('Subscription cancelled:', data)
}
