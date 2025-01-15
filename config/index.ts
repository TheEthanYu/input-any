import type { ConfigProps } from '@/types/config'

export const config: ConfigProps = {
  appName: 'ShipOneDay',
  appDescription: 'Code Less, Ship More',
  domainName: 'demo.shipone.day',
  environment: {
    isProd: process.env.NODE_ENV === 'production',
    isStaging: process.env.VERCEL_ENV === 'preview',
    isDev: process.env.NODE_ENV === 'development',
  },
  analytics: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
  },
  seo: {
    title: 'ShipOneDay - Code Less, Ship More',
    titleTemplate: '%s | ShipOneDay',
    description:
      'Next.js starter kit with Supabase, LemonSqueezy, and Resend integration. Launch your SaaS product faster and save 40+ development hours.',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://demo.shipone.day',
      siteName: 'ShipOneDay',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      handle: '@EthanYu',
      cardType: 'summary_large_image',
      site: '@ShipOneDay',
      creator: '@EthanYu',
      imageWidth: 1200,
      imageHeight: 630,
    },
  },
  crisp: {
    id: '',
    onlyShowOnRoutes: [],
  },
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for side projects and small startups',
      price: 99,
      priceAnchor: 199,
      priceId: 'price_starter',
      features: [
        { name: 'All core features' },
        { name: 'Up to 5 team members' },
        { name: '1,000 monthly active users' },
        { name: 'Basic analytics' },
        { name: 'Community support' },
      ],
      highlightFeature: 'Best for individuals and small teams',
      cta: 'Start Building',
    },
    {
      name: 'Pro',
      description: 'For growing businesses and teams',
      price: 199,
      priceAnchor: 299,
      priceId: 'price_pro',
      isFeatured: true,
      popularBadgeText: 'Most Popular',
      features: [
        { name: 'Everything in Starter' },
        { name: 'Up to 20 team members' },
        { name: '50,000 monthly active users' },
        { name: 'Advanced analytics', isNew: true },
        { name: 'Priority support' },
        { name: 'Custom integrations' },
        { name: 'AI-powered insights', isBeta: true },
      ],
      highlightFeature: 'Perfect for growing businesses',
      cta: 'Go Pro',
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: 0,
      priceId: 'price_enterprise',
      isEnterprise: true,
      features: [
        { name: 'Everything in Pro' },
        { name: 'Unlimited team members' },
        { name: 'Unlimited monthly active users' },
        { name: 'Custom analytics' },
        { name: '24/7 priority support' },
        { name: 'Dedicated account manager' },
        { name: 'Custom development', isNew: true },
        { name: 'SLA guarantee' },
      ],
      highlightFeature: 'Tailored for enterprise needs',
      cta: 'Contact Sales',
    },
  ],
  resend: {
    subdomain: 'YOUR_RESEND_SUBDOMAIN',
    fromNoReply: 'ShipOneDay <no-reply@shiponeday.com>',
    fromAdmin: 'ShipOneDay <admin@shiponeday.com>',
    supportEmail: 'support@shipone.day',
  },
  colors: {
    main: '#3B82F6',
  },
  auth: {
    loginUrl: '/api/auth/signin',
    callbackUrl: '/dashboard',
  },
  blog: {
    defaultCover: '/images/default-cover.jpg',
  },
}

// 类型检查函数
const validateConfig = (config: ConfigProps): ConfigProps => {
  // 添加验证逻辑
  return config
}

export default validateConfig(config)
