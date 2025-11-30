// lib/prisma.ts - Prisma Client singleton для Next.js

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Connection pooling configuration for serverless (Vercel/Neon)
const prismaClientOptions = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  // For Neon and other serverless databases, connection pooling is handled via connection string
  // The connection string should include ?pgbouncer=true or use a pooling proxy
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

