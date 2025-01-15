import type { Metadata } from 'next'
import config from '@/config'

// These are all the SEO tags you can add to your pages.
// It prefills data with default title/description/OG, etc.. and you can cusotmize it for each page.
// It's already added in the root layout.js so you don't have to add it to every pages
// But I recommend to set the canonical URL for each page (export const metadata = getSEOTags({canonicalUrlRelative: "/"});)
// See https://www.shipone.day/docs/features/seo
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string
  extraTags?: Record<string, any>
} = {}) => {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${config.domainName}`

  return {
    // up to 50 characters (what does your app do for the user?) > your main should be here
    title: title || config.appName,
    // up to 160 characters (how does your app help the user?)
    description: description || config.appDescription,
    // some keywords separated by commas. by default it will be your app name
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    // set a base URL prefix for other fields that require a fully qualified URL (.e.g og:image: og:image: 'https://yourdomain.com/share.png' => '/share.png')
    metadataBase: new URL(baseUrl),

    openGraph: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      url: openGraph?.url || baseUrl,
      siteName: openGraph?.title || config.appName,
      locale: config.seo.openGraph.locale,
      type: config.seo.openGraph.type,
    },

    twitter: {
      cardType: config.seo.twitter.cardType,
      site: config.seo.twitter.site,
      creator: config.seo.twitter.creator,
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
    },

    // If a canonical URL is given, we add it. The metadataBase will turn the relative URL into a fully qualified URL
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),

    // If you want to add extra tags, you can pass them here
    ...extraTags,
  }
}

// SEO Enhancement: Structured Data Implementation
// Purpose: Improve search visibility and rich snippet chances
//
// Documentation: developers.google.com/search/docs/appearance/structured-data
// Validation Tool: search.google.com/test/rich-results
export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'SoftwareApplication',
          name: config.appName,
          description: config.appDescription,
          image: `https://${config.domainName}/icon.png`,
          url: `https://${config.domainName}/`,
          author: {
            '@type': 'Person',
            name: 'Ethan Yu',
          },
          applicationCategory: 'DeveloperApplication',
        }),
      }}
    />
  )
}
