import { allPosts } from 'contentlayer/generated'
import RSS from 'rss'
import config from '@/config'

export async function GET() {
  const baseUrl = `https://${config.domainName}`

  const feed = new RSS({
    title: config.seo.title,
    description: config.seo.description,
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    language: 'en',
  })

  allPosts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      date: post.date,
      categories: [post.category],
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
