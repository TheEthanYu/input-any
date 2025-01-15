'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ButtonCheckoutProps {
  variantId: string
  email?: string
}

export default function ButtonCheckout({
  variantId,
  email,
}: ButtonCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ variantId, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      router.push(data.url)
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error during checkout, please try again later')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Buy Now'}
    </Button>
  )
}
