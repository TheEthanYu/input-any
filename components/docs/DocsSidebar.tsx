'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { allDocs } from 'contentlayer/generated'
import { cn } from '@/lib/utils'

// Group documents by category
const groupedDocs = allDocs.reduce((acc, doc) => {
  if (!doc.published) return acc
  
  const category = doc.category
  if (!acc[category]) {
    acc[category] = []
  }
  acc[category].push(doc)
  return acc
}, {} as Record<string, typeof allDocs>)

// Sort documents within each group
Object.entries(groupedDocs).forEach(([, docs]) => {
  docs.sort((a, b) => {
    // Sort by order if available
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    // Otherwise sort alphabetically by title
    return a.title.localeCompare(b.title)
  })
})

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="space-y-8">
      {Object.entries(groupedDocs).map(([category, docs]) => (
        <div key={category}>
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            {category}
          </h3>
          <ul className="space-y-2">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/docs/${doc.slug}`}
                  title={doc.description}
                  className={cn(
                    'block py-1.5 px-3 text-sm rounded-md transition-colors',
                    pathname === `/docs/${doc.slug}`
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
} 