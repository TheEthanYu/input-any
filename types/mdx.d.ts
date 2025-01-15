declare module '*.mdx' {
  import { ReactNode } from 'react'

  export const frontMatter: {
    title: string
    description: string
    date: string
  }

  export default function MDXContent(): ReactNode
}
