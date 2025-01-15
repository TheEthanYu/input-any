import { notFound } from 'next/navigation'
import { allDocs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '@/components/mdx/MDXComponents'
import { Metadata } from 'next'
import { getCanonicalUrl } from '@/lib/getCanonicalUrl'

interface PageProps {
  params: {
    slug: string[]
  }
}

export default function DocPage({ params }: PageProps) {
  const doc = allDocs.find((doc) => doc.slug === params.slug.join('/'))

  if (!doc) {
    notFound()
  }

  const MDXContent = useMDXComponent(doc.body.code)

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <div className="space-y-2 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </div>
      <div className="prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:scroll-m-20">
        <MDXContent components={MDXComponents} />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slug.split('/')
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = allDocs.find((doc) => doc.slug === params.slug.join('/'))
  
  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: getCanonicalUrl(`/docs/${doc.slug}`),
    },
    alternates: {
      canonical: getCanonicalUrl(`/docs/${doc.slug}`)
    }
  }
} 