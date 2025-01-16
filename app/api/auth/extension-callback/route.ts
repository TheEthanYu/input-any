import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })

    try {
      // 使用code交换session
      const {
        data: { session },
        error,
      } = await supabase.auth.exchangeCodeForSession(code)

      if (error) throw error

      // 生成扩展使用的token
      const {
        data: { user },
      } = await supabase.auth.getUser(session?.access_token)

      // 重定向到扩展可以捕获的URL，带上token
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/callback?token=${
          session?.access_token
        }&user=${JSON.stringify(user)}`
      )
    } catch (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(
        `${requestUrl.origin}/signin?error=Authentication failed`
      )
    }
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/signin?error=No code provided`
  )
}
