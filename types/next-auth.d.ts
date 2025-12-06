// types/next-auth.d.ts - NextAuth type extensions

import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      balance: number
    }
  }

  interface User {
    id: string
    email: string
    name: string
    balance: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
  }
}

