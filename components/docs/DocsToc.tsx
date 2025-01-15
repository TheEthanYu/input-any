'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

export function DocsToc() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // 等待内容渲染完成
    const getHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll('article h2, article h3')
      )

      const headingElements = elements.map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1))
      }))

      setHeadings(headingElements)
    }

    getHeadings()

    const observer = new MutationObserver(getHeadings)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // 监听滚动以高亮当前标题
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('article h2, article h3')
      const headerHeight = 64 // header 的高度

      for (const element of Array.from(headingElements)) {
        const rect = element.getBoundingClientRect()
        if (rect.top >= headerHeight && rect.top <= window.innerHeight * 0.5) {
          setActiveId(element.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="space-y-2">
      <p className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">
        On this page
      </p>
      <div className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'block text-sm py-1 transition-colors',
              heading.level === 3 && 'pl-4',
              activeId === heading.id
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector(`#${heading.id}`)
              const headerHeight = 64
              const elementPosition = element?.getBoundingClientRect().top ?? 0
              const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 24

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  )
} 