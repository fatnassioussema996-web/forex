// app/api/auth/forgot-password/route.ts - Forgot password API endpoint

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = forgotPasswordSchema.parse(body)
    const { email } = validatedData

    // Check if user exists (don't reveal if email exists for security)
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, email: true, first_name: true },
    })

    // Always return success to prevent email enumeration
    // Only send email if user exists
    if (user) {
      // Generate secure token
      const token = crypto.randomBytes(32).toString('hex')
      const expires = new Date()
      expires.setHours(expires.getHours() + 1) // Token valid for 1 hour

      // Invalidate any existing unused tokens for this user
      await prisma.passwordResetToken.updateMany({
        where: {
          user_id: user.id,
          used: false,
          expires: { gt: new Date() },
        },
        data: {
          used: true,
        },
      })

      // Create new token
      await prisma.passwordResetToken.create({
        data: {
          token,
          user_id: user.id,
          expires,
        },
      })

      // Send email
      try {
        await sendPasswordResetEmail({
          email: user.email,
          resetToken: token,
          userName: user.first_name,
        })
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError)
        // Don't fail the request if email fails, but log it
      }
    }

    // Always return success (security best practice)
    return NextResponse.json(
      {
        success: true,
        message: 'If an account with this email exists, we have sent a password reset link.',
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

    console.error('Forgot password error:', error)

    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

