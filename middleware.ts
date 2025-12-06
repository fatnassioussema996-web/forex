// middleware.ts - Next.js middleware for route protection

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect routes that require authentication
        const protectedPaths = ['/dashboard', '/top-up', '/top-up-success', '/top-up-decline']
        const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))
        
        if (isProtectedPath) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/top-up:path*'],
}

