import { JsonLdProps } from '@/types/jsonld'

export function JsonLd({ type, data }: JsonLdProps) {
  const schemas = {
    website: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ShipOneDay',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      description:
        'Production-ready Next.js Dev Kit that helps you build and launch your SaaS faster',
      offers: {
        '@type': 'Offer',
        price: '99.00',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
      },
    },
    article: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      publisher: {
        '@type': 'Organization',
        name: 'ShipOneDay',
        logo: {
          '@type': 'ImageObject',
          url: 'https://demo.shipone.day/icon.png',
        },
      },
      author: {
        '@type': 'Person',
        name: 'Ethan Yu',
      },
    },
    product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          ...schemas[type],
          ...data,
        }),
      }}
    />
  )
}
