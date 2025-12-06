// app/api/auth/reset-password/route.ts - Reset password API endpoint

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = resetPasswordSchema.parse(body)
    const { token, password, confirmPassword, consent } = validatedData

    // Check passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Check consent
    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'You must agree to the terms' },
        { status: 400 }
      )
    }

    // Find token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired reset link' },
        { status: 400 }
      )
    }

    // Check if token is used
    if (resetToken.used) {
      return NextResponse.json(
        { success: false, error: 'This reset link has already been used' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      return NextResponse.json(
        { success: false, error: 'This reset link has expired' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update password and mark token as used in a transaction
    await prisma.$transaction([
      // Update user password
      prisma.user.update({
        where: { id: resetToken.user_id },
        data: { password: hashedPassword },
      }),
      // Mark token as used
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
      // Invalidate all other active sessions for this user (optional - can be done via NextAuth)
      // For now, we'll just update the password
    ])

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset successfully. You can now sign in with your new password.',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Reset password error:', error)

    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

