import { Metadata } from 'next'
import { getCanonicalUrl } from '@/lib/getCanonicalUrl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Book } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found - ShipOneDay',
  description: 'Sorry, the page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: getCanonicalUrl('/404')
  }
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">
              <Book className="w-4 h-4 mr-2" />
              Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
