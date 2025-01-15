import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const codeOptions: Partial<Options> = {
  theme: 'github-dark',
  keepBackground: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    published: { type: 'boolean', default: true },
    cover: {
      type: 'string',
      required: true,
      description: 'Cover image for the blog post',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: post => post._raw.flattenedPath.replace(/blog\/?/, ''),
    },
  },
}))

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    published: { type: 'boolean', default: true },
    order: {
      type: 'number',
      required: false,
      description: 'Order in the documentation sidebar',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace(/docs\/?/, ''),
    },
    plaintext: {
      type: 'string',
      resolve: doc => {
        return doc.body.raw
          .replace(/```[\s\S]*?```/g, '')
          .replace(/`.*?`/g, '')
          .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
          .replace(/[#*_\[\]]/g, '')
          .replace(/\s+/g, ' ')
          .trim()
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, codeOptions],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
