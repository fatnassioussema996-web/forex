import { NextRequest, NextResponse } from 'next/server'
import { processArmenotechCallback } from '@/lib/topup-payment-flow'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

// Armenotech H2H signs the callback with X-Signature = hex(HMAC-SHA256(secret, raw_body_bytes)).
// We must verify against the *raw, unparsed* body — JSON.parse/serialize roundtrip changes the bytes.
async function processRawCallback(request: NextRequest, rawBody: string) {
  const signatureHeader =
    request.headers.get('x-signature') ||
    request.headers.get('X-Signature') ||
    request.headers.get('x-armenotech-signature') ||
    null

  const contentType = request.headers.get('content-type')

  return processArmenotechCallback({
    rawBody,
    signatureHeader,
    contentType,
  })
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const result = await processRawCallback(request, rawBody)

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error,
          referenceId: result.referenceId,
        },
        { status: result.error === 'Invalid callback signature' ? 401 : 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[Top-up Callback API] Error:', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to process callback',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}
