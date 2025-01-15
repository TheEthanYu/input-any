import { redirect } from 'next/navigation'

export default function DocsPage() {
  // 重定向到介绍页面
  redirect('/docs/introduction')
} 