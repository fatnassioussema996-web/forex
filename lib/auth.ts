// lib/auth.ts - Server-side auth utilities

import { getServerSession } from 'next-auth'
import { authOptions } from './auth-config'
import { prisma } from './prisma'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        balance: true,
      },
    })

    return user
  } catch (error: any) {
    console.error('Database error in getCurrentUser:', error)
    // Return null on database errors to prevent crashes
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

