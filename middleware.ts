import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Simple auth check for portal routes
  if (pathname.startsWith('/portal')) {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // TODO: Add token validation here when needed
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Only match portal routes to avoid interfering with home page
     */
    '/portal/:path*',
  ],
}
