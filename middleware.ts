import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect private routes
  const privatePaths = ['/dashboard', '/account']
  if (privatePaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    if (!session) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }

  // Redirect authenticated users to dashboard when accessing signin page
  if (session && req.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

// Configure middleware matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
