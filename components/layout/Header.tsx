'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ButtonSignin from '@/components/buttons/ButtonSignin'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import logo from '@/app/icon.svg'
import config from '@/config'

const links = [
  {
    href: '/#pricing',
    label: 'Pricing'
  },
  {
    href: '/blog',
    label: 'Blog'
  },
  {
    href: '/docs',
    label: 'Documentation'
  }
] as const

const Header = () => {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [searchParams])

  // 当菜单打开时禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <header className='fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='container flex h-16 items-center justify-between px-4' aria-label='Global'>
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <Link href='/' className='flex items-center gap-2 transition-opacity hover:opacity-90' title={`${config.appName} homepage`}>
            <Image src={logo} alt={`${config.appName} logo`} className='h-8 w-8' width={32} height={32} priority />
            <p className='font-medium'>{config.appName}</p>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex lg:gap-x-8'>
          {links.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className='text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className='hidden md:flex items-center gap-2 lg:flex-1 lg:justify-end'>
          <ThemeToggle />
          <ButtonSignin />
        </div>

        {/* Mobile Menu Button */}
        <div className='flex md:hidden'>
          <button 
            type='button' 
            className='p-2 text-muted-foreground hover:text-foreground' 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className='h-6 w-6' aria-hidden='true' />
            ) : (
              <Menu className='h-6 w-6' aria-hidden='true' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed left-0 right-0 top-16 z-50 border-t bg-background md:hidden'
          >
            <div className='container divide-y divide-border'>
              {/* Navigation Links */}
              <nav className='space-y-1 px-4 py-6'>
                {links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted'
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className='flex items-center gap-4 px-7 py-6'>
                <ThemeToggle />
                <div className='flex-1'>
                  <ButtonSignin className='w-full justify-center' />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
