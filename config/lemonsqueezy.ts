import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

// Ensure environment variables exist and configure LemonSqueezy SDK
function configureLemonSqueezy() {
  const requiredVars = ['LEMONSQUEEZY_API_KEY', 'LEMONSQUEEZY_STORE_ID', 'LEMONSQUEEZY_WEBHOOK_SECRET']

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(`Missing required LEMONSQUEEZY environment variables: ${missingVars.join(', ')}`)
  }

  lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY })
}

// Initialize configuration
configureLemonSqueezy()

// Export store configuration
export const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID || ''

// Export product variant IDs
export const VARIANTS = {
  BASIC: process.env.LEMON_SQUEEZY_BASIC_VARIANT_ID || '',
  PRO: process.env.LEMON_SQUEEZY_PRO_VARIANT_ID || ''
} as const
