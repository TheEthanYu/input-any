'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import apiClient from '@/lib/api'
import { Loader2, CreditCard, LogOut } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ButtonAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBilling = async () => {
    setIsLoading(true)
    try {
      const { url }: { url: string } = await apiClient.post(
        '/stripe/create-portal',
        {
          returnUrl: window.location.href,
        }
      )
      window.location.href = url
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [supabase])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="relative h-9 w-full justify-start px-3 md:w-[256px]"
          disabled={isLoading}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.name || 'User'}
            />
            <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
              {user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">
            {user?.user_metadata?.name ||
              user?.email?.split('@')[0] ||
              'Account'}
          </span>
          {isLoading && (
            <Loader2 className="ml-auto h-4 w-4 shrink-0 animate-spin opacity-70" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[256px]" align="end">
        <DropdownMenuItem
          onClick={handleBilling}
          className="cursor-pointer"
          disabled={isLoading}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 dark:text-red-400"
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
