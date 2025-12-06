// app/api/contact/route.ts - API route for contact form submissions

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address').max(200),
  region: z.string().min(1, 'Region is required'),
  topic: z.string().min(1, 'Topic is required'),
  accountId: z.string().max(100).optional(),
  language: z.string().min(1, 'Language is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Send email
    await sendContactEmail({
      name: validatedData.name,
      email: validatedData.email,
      region: validatedData.region,
      topic: validatedData.topic,
      accountId: validatedData.accountId,
      language: validatedData.language,
      message: validatedData.message,
    })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)

    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

