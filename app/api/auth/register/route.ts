// app/api/auth/register/route.ts - User registration API endpoint

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password } = body

    // Validation
    if (!firstName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'INVALID_EMAIL' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'EMAIL_EXISTS' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName || null,
        balance: 0,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Check if it's a database connection error
    const isDatabaseError =
      error?.code?.startsWith('P') || // Prisma error codes (P1001, P2025, etc.)
      error?.message?.includes('does not exist') ||
      error?.message?.includes('relation') ||
      error?.message?.includes('table') ||
      error?.message?.includes('database') ||
      error?.message?.includes('connection') ||
      error?.message?.includes('timeout') ||
      error?.message?.includes("Can't reach database") ||
      error?.name === 'PrismaClientInitializationError' ||
      error?.name === 'PrismaClientKnownRequestError' ||
      error?.name === 'PrismaClientUnknownRequestError'

    if (isDatabaseError) {
      return NextResponse.json(
        { error: 'DATABASE_UNAVAILABLE' },
        { status: 503 } // Service Unavailable
      )
    }

    // Check if it's a unique constraint violation (email already exists)
    if (error?.code === 'P2002' || error?.meta?.target?.includes('email')) {
      return NextResponse.json(
        { error: 'EMAIL_EXISTS' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

