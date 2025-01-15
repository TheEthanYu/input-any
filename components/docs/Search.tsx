'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search as SearchIcon } from 'lucide-react'
import { allDocs } from 'contentlayer/generated'

// Search result highlight function
function highlightMatch(text: string, query: string) {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
      <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{part}</mark> : 
      part
  )
}

// Search relevance scoring
function getSearchScore(doc: typeof allDocs[0], query: string) {
  const searchTerms = query.toLowerCase().split(/\s+/)
  let score = 0

  searchTerms.forEach(term => {
    // Title match has highest weight
    if (doc.title.toLowerCase().includes(term)) score += 10
    // Description match has second priority
    if (doc.description.toLowerCase().includes(term)) score += 5
    // Category match
    if (doc.category.toLowerCase().includes(term)) score += 3
    // Full text match has lowest weight
    if (doc.plaintext.toLowerCase().includes(term)) score += 1

    // Exact match bonus points
    if (doc.title.toLowerCase() === term) score += 5
    if (doc.description.toLowerCase() === term) score += 3
  })

  return score
}

export function Search() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = useCallback((slug: string) => {
    setOpen(false)
    router.push(`/docs/${slug}`)
  }, [router])

  const filteredDocs = allDocs
    .filter(doc => {
      if (!doc.published) return false
      if (!query) return false

      const searchable = [
        doc.title,
        doc.description,
        doc.category,
        doc.plaintext
      ].join(' ').toLowerCase()

      return query.toLowerCase().split(/\s+/).every(term => 
        searchable.includes(term)
      )
    })
    .sort((a, b) => getSearchScore(b, query) - getSearchScore(a, query))

  // Extract match context
  const getMatchContext = (text: string, query: string, contextLength = 100) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text.slice(0, contextLength) + '...'
    
    const start = Math.max(0, index - contextLength / 2)
    const end = Math.min(text.length, index + query.length + contextLength / 2)
    
    return (start > 0 ? '...' : '') + 
           text.slice(start, end) + 
           (end < text.length ? '...' : '')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center w-full gap-2 px-3 py-2 text-sm text-muted-foreground rounded-lg border bg-background hover:bg-accent"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="fixed inset-x-0 top-[150px] mx-auto max-w-3xl p-4">
            <div 
              className="relative overflow-hidden rounded-lg border bg-background shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <Command 
                className="overflow-hidden"
                shouldFilter={false}
              >
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search docs..."
                  className="w-full border-0 bg-transparent px-4 py-3 outline-none placeholder:text-muted-foreground"
                />
                
                <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                  {query.length > 0 && filteredDocs.length === 0 && (
                    <p className="p-4 text-center text-sm text-muted-foreground">
                      No results found.
                    </p>
                  )}
                  
                  {query.length > 0 && 
                    Object.entries(
                      filteredDocs.reduce((acc, doc) => {
                        const category = doc.category
                        if (!acc[category]) {
                          acc[category] = []
                        }
                        acc[category].push(doc)
                        return acc
                      }, {} as Record<string, typeof filteredDocs>)
                    ).map(([category, docs]) => (
                      <Command.Group key={category} heading={category}>
                        {docs.map((doc) => {
                          const context = getMatchContext(doc.plaintext, query)
                          return (
                            <Command.Item
                              key={doc.slug}
                              value={doc.slug}
                              onSelect={handleSelect}
                              className="flex cursor-pointer flex-col gap-1 rounded-lg px-4 py-2 hover:bg-accent aria-selected:bg-accent"
                            >
                              <div className="font-medium">
                                {highlightMatch(doc.title, query)}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {highlightMatch(context, query)}
                              </div>
                            </Command.Item>
                          )
                        })}
                      </Command.Group>
                    ))
                  }

                  {query.length === 0 && (
                    <div className="p-4 text-sm text-muted-foreground">
                      <p>Search the docs or jump to a page.</p>
                      <p className="mt-1">Try searching for &quot;authentication&quot; or &quot;database&quot;.</p>
                    </div>
                  )}
                </Command.List>
              </Command>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 