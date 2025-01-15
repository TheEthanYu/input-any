'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import config from '@/config'

// A modern sign-in button that redirects to the sign-in page or shows user profile
// If user is logged in, shows their avatar and redirects to callback URL
// If not logged in, redirects to /signin
const ButtonSignin = ({
  className,
  variant = 'default',
  size = 'default',
}: {
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}) => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [supabase])

  const handleClick = () => {
    if (user) {
      router.push(config.auth.callbackUrl as Route)
    } else {
      router.push('/signin' as Route)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn('group gap-2 transition-colors duration-200', className)}
    >
      {user ? (
        <>
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.name || 'Account'}
            />
            <AvatarFallback>
              {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>Dashboard</span>
        </>
      ) : (
        'Get Started'
      )}
    </Button>
  )
}

export default ButtonSignin
