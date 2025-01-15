'use client'

import { useState, ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { DocsToc } from '@/components/docs/DocsToc'
import { Search } from '@/components/docs/Search'

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* 移动端导航按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* 移动端导航抽屉 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* 侧边抽屉 */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b">
                <span className="font-semibold">Documentation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-4rem)] py-8 px-6">
                <DocsSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 桌面端左侧导航 */}
      <aside className="w-72 border-r hidden md:block">
        <div className="sticky top-16 overflow-y-auto h-[calc(100vh-4rem)] py-8 px-6">
          <DocsSidebar />
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 min-w-0 border-x border-border/40">
        <div className="container max-w-4xl mx-auto px-8 py-10">{children}</div>
      </main>

      {/* 右侧栏 */}
      <aside className="w-72 border-l hidden lg:block">
        <div className="fixed w-72 top-16 bottom-0 overflow-hidden">
          <div className="py-8 px-6">
            <Search />
            <div className="mt-8">
              <DocsToc />
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
