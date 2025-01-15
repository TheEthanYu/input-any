import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from './MDXComponents'

interface MDXContentProps {
  source: any
}

const MDXContent = ({ source }: MDXContentProps) => {
  return <MDXRemote {...source} components={MDXComponents} />
}

export default MDXContent
