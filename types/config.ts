export interface ConfigProps {
  // Core Application Settings
  appName: string
  appDescription: string
  domainName: string
  environment: {
    isProd: boolean
    isStaging: boolean
    isDev: boolean
  }

  // Analytics Configuration
  analytics?: {
    googleAnalytics?: {
      measurementId: string // GA4 measurement ID (G-XXXXXXXXXX)
    }
  }

  // Third-party Service Configuration
  crisp: {
    id: string
    onlyShowOnRoutes: string[]
  }

  // Product Plan Configuration
  plans: {
    name: string
    description: string
    price: number
    priceId: string
    priceAnchor?: number
    features: {
      name: string
      isNew?: boolean
      isBeta?: boolean
    }[]
    highlightFeature: string
    isFeatured?: boolean
    isEnterprise?: boolean
    popularBadgeText?: string
    cta: string
  }[]
  resend: {
    subdomain: string
    fromNoReply: string
    fromAdmin: string
    supportEmail: string
  }
  colors: {
    main: string
  }
  auth: {
    loginUrl: string
    callbackUrl: string
  }
  blog: {
    defaultCover: string
  }
  seo: {
    title: string
    titleTemplate: string
    description: string
    openGraph: {
      type: string
      locale: string
      url: string
      siteName: string
      images: Array<{
        url: string
        width: number
        height: number
      }>
    }
    twitter: {
      handle: string
      cardType: 'summary' | 'summary_large_image' | 'app' | 'player'
      site: string
      creator: string
      imageWidth: number
      imageHeight: number
    }
  }
}
