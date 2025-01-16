'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { NavMain } from '@/components/dashboard/nav/nav-main'
import { NavUser } from '@/components/dashboard/nav/nav-user'
import { NavAccount } from '@/components/dashboard/nav/nav-account'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import {
  CircleUserRound,
  CreditCard,
  CircleGauge,
  LifeBuoy,
  Rocket,
  UserCircle,
  Package,
  Twitter,
  BotMessageSquare,
  UserSquare2,
} from 'lucide-react'

export function AppSidebar() {
  const [user, setUser] = useState<{
    name: string
    email: string
    avatar: string
  } | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()
        if (authUser) {
          setUser({
            name:
              authUser.user_metadata?.name ||
              authUser.email?.split('@')[0] ||
              'User',
            email: authUser.email || '',
            avatar: authUser.user_metadata?.avatar_url || '',
          })
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const authUser = session.user
        setUser({
          name:
            authUser.user_metadata?.name ||
            authUser.email?.split('@')[0] ||
            'User',
          email: authUser.email || '',
          avatar: authUser.user_metadata?.avatar_url || '',
        })
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const navItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: CircleGauge,
      isActive: true,
    },
    {
      title: 'Persona',
      url: '/dashboard/persona',
      icon: UserSquare2,
    },
    {
      title: 'Products',
      url: '/dashboard/products',
      icon: Package,
    },
    {
      title: 'X Assistant',
      url: '/dashboard/x-assistant',
      icon: Twitter,
    },
    {
      title: 'Reddit Assistant',
      url: '/dashboard/reddit-assistant',
      icon: BotMessageSquare,
    },
    {
      title: 'Support',
      url: '/dashboard/support',
      icon: LifeBuoy,
    },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Rocket className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ShipOneDay</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavAccount
          accounts={[
            {
              name: 'Profile',
              url: '/dashboard/profile',
              icon: CircleUserRound,
            },
            {
              name: 'Billing',
              url: '/dashboard/billing',
              icon: CreditCard,
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  )
}
