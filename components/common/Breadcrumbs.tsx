import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Route } from 'next'

interface BreadcrumbItem {
  label: string
  href: Route
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="hidden md:flex items-center">
      <ol className="flex items-center text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
            <Link
              href={item.href}
              className={cn(
                'hover:text-foreground',
                index === items.length - 1 &&
                  'text-foreground pointer-events-none'
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
