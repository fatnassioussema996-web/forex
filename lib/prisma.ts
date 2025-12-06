// lib/prisma.ts - Prisma Client singleton для Next.js

import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Validate DATABASE_URL before creating Prisma Client
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not set. Please set it in your .env.local file.'
  )
}

// Check if DATABASE_URL points to localhost (common mistake)
if (process.env.DATABASE_URL.includes('localhost:5432')) {
  console.warn(
    '⚠️  WARNING: DATABASE_URL points to localhost:5432. ' +
    'If you are using Neon, make sure to use the Neon connection string. ' +
    'Run "npx prisma generate" after updating DATABASE_URL.'
  )
}

// Connection pooling configuration for serverless (Vercel/Neon)
const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === 'development' 
    ? (['query', 'error', 'warn'] as Prisma.LogLevel[])
    : (['error'] as Prisma.LogLevel[]),
  // For Neon and other serverless databases, connection pooling is handled via connection string
  // The connection string should include ?pgbouncer=true or use a pooling proxy
  errorFormat: 'minimal',
}

// Create Prisma Client instance
function createPrismaClient(): PrismaClient {
  const client = new PrismaClient(prismaClientOptions)

  // Handle connection errors gracefully
  client.$on('error' as never, (e: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Prisma] Connection error:', e.message)
    }
  })

  // Handle connection lifecycle
  if (process.env.NODE_ENV === 'development') {
    // Log connection events in development
    process.on('beforeExit', async () => {
      await client.$disconnect()
    })
  }

  return client
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper function to handle connection errors with retry
export async function withPrismaRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: any

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error: any) {
      lastError = error

      // Check if it's a connection error
      const isConnectionError =
        error?.code === 'P1001' || // Can't reach database server
        error?.code === 'P1008' || // Operations timed out
        error?.message?.includes('Closed') ||
        error?.message?.includes('connection') ||
        error?.kind === 'Closed'

      if (isConnectionError && attempt < maxRetries - 1) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)))
        continue
      }

      // If not a connection error or max retries reached, throw
      throw error
    }
  }

  throw lastError
}

