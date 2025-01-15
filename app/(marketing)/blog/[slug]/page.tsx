import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MDXComponents } from '@/components/mdx/MDXComponents'
import { JsonLd } from '@/components/common/JsonLd'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Route, Metadata } from 'next'
import config from '@/config'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = allPosts.find(post => post.slug === params.slug)

  if (!post) {
    return {}
  }

  const ogImage = new URL(post.cover, `https://${config.domainName}`).toString()

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: config.seo.twitter.creator }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [config.seo.twitter.creator],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
      creator: config.seo.twitter.creator,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default function Page({ params }: PageProps) {
  const post = allPosts.find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <article className="pb-20">
      <div className="relative h-[40vh] min-h-[300px] w-full bg-muted">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
      </div>

      <div className="container max-w-4xl relative z-10 -mt-32">
        <div className="rounded-xl border bg-card p-6 md:p-8 shadow-lg mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Breadcrumbs
                items={[
                  { label: 'Blog', href: '/blog' },
                  {
                    label: post.category,
                    href: `/blog/category/${encodeURIComponent(
                      post.category
                    )}` as Route,
                  },
                  { label: post.title, href: `/blog/${post.slug}` as Route },
                ]}
              />
              <Link href="/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            <div className="space-y-2 py-4">
              <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
              <p className="text-muted-foreground">{post.description}</p>
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <div className="border-t my-6" />

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <MDXContent components={MDXComponents} />
            </div>
          </div>
        </div>
      </div>

      <JsonLd
        type="article"
        data={{
          headline: post.title,
          description: post.description,
          image: post.cover,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: config.seo.twitter.creator,
          },
        }}
      />
    </article>
  )
}
