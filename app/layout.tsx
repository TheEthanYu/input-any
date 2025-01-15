import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Viewport, Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import config from '@/config'
import './globals.css'
import { JsonLd } from '@/components/common/JsonLd'

const font = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: 'device-width',
  initialScale: 1,
}

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata: Metadata = {
  title: {
    default: config.seo.title,
    template: config.seo.titleTemplate,
  },
  description: config.seo.description,
  keywords: [
    'SaaS',
    'Starter Kit',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Authentication',
    'Dashboard',
    'Business',
    'Software',
  ],
  metadataBase: new URL(`https://${config.domainName}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...config.seo.openGraph,
    url: `https://${config.domainName}`,
    images: [
      {
        url: config.seo.openGraph.images?.[0]?.url || '/og-image.png',
        width: config.seo.openGraph.images?.[0]?.width || 1200,
        height: config.seo.openGraph.images?.[0]?.height || 630,
        alt: config.seo.title,
      },
    ],
  },
  twitter: {
    card: config.seo.twitter.cardType as 'summary_large_image',
    creator: config.seo.twitter.handle,
    site: config.seo.twitter.handle,
    images: '/og-image.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="ShipOneDay Blog RSS Feed"
          href="/feed.xml"
        />
        <GoogleAnalytics />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          forcedTheme={undefined}
          themes={['light', 'dark']}
        >
          {children}
        </ThemeProvider>
        <JsonLd type="website" data={{}} />
      </body>
    </html>
  )
}
