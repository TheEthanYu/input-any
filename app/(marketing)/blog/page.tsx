import Link from 'next/link'
import Image from 'next/image'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Get all categories
const categories = [...new Set(allPosts.map(post => post.category))]

// Ensure posts are sorted by date and published
function getFilteredPosts(category?: string) {
  return allPosts
    .filter(post => post.published !== false)
    .filter(post => !category || post.category === category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}

interface PageProps {
  params: {}
  searchParams: { category?: string }
}

export default function BlogPage({ searchParams }: PageProps) {
  const filteredPosts = getFilteredPosts(searchParams.category)

  return (
    <div className="container py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">
          Insights and guides about development and SaaS
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2">
        <Link href="/blog" className="shrink-0">
          <Button 
            variant={!searchParams.category ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
          >
            All Posts
          </Button>
        </Link>
        {categories.map(cat => (
          <Link 
            key={cat} 
            href={`/blog/category/${encodeURIComponent(cat)}`}
            className="shrink-0"
          >
            <Button
              variant={searchParams.category === cat ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
            >
              {cat}
            </Button>
          </Link>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.slug} className="group overflow-hidden border-border/50 hover:border-border/100 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {/* Cover image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              
              <CardContent className="space-y-3 pt-5">
                {/* Category */}
                <div className="inline-block text-sm text-primary px-3 py-1 rounded-full bg-primary/10">
                  {post.category}
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {/* Description */}
                <p className="text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                
                {/* Date */}
                <time className="block text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* No Results View */}
      {filteredPosts.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No articles found in this category
        </div>
      )}
    </div>
  )
}
