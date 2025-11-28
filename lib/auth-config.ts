// lib/auth-config.ts - NextAuth configuration (extracted to avoid circular dependencies)

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: `${user.first_name} ${user.last_name || ''}`.trim(),
          balance: user.balance,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Проверяем, существует ли пользователь
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || '' },
        })

        if (!existingUser) {
          // Создаем нового пользователя для Google OAuth
          const nameParts = (user.name || '').split(' ')
          await prisma.user.create({
            data: {
              email: user.email || '',
              first_name: nameParts[0] || 'User',
              last_name: nameParts.slice(1).join(' ') || null,
              password: null, // Google OAuth users don't need password
              balance: 0,
            },
          })
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(token.sub) },
          select: { id: true, email: true, first_name: true, last_name: true, balance: true },
        })

        if (user) {
          session.user = {
            id: user.id,
            email: user.email,
            name: `${user.first_name} ${user.last_name || ''}`.trim(),
            balance: Number(user.balance),
          }
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id?.toString()
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

