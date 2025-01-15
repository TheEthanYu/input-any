import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()

  // 清除认证相关的 cookie，设置完整的选项以确保清除
  const options = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  }

  cookieStore.delete('session')
  cookieStore.delete('token')

  // 设置响应
  const response = NextResponse.json({ success: true })

  // 在响应中设置清除 cookie 的 header
  response.cookies.set('session', '', { ...options, maxAge: 0 })
  response.cookies.set('token', '', { ...options, maxAge: 0 })

  return response
}
