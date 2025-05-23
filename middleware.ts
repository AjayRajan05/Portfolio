import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected paths that require authentication
  const isProtectedPath = path.startsWith('/admin') || path.startsWith('/api/admin')

  // Get the session token
  const token = await getToken({ req: request })

  // Only check authentication for protected paths
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Add security headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.resend.com https://www.google-analytics.com; frame-src 'self' https://www.google.com;"
  )

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
} 