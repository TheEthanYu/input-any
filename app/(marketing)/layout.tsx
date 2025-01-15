import { ReactNode, Suspense } from 'react'
import Header from '@/components/layout/Header'
import LayoutClient from '@/components/layout/LayoutClient'
import Footer from '@/components/layout/Footer'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <LayoutClient>
        <div className="min-h-screen pt-16">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </LayoutClient>
    </Suspense>
  )
}
