// components/TopUpSuccessContent.tsx - Top-up success content

'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TopUpSuccessContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Small delay to ensure params are available
    setTimeout(() => setIsLoading(false), 100)
  }, [])

  const state = searchParams.get('state')
  const isSuccess = state === 'COMPLETED'

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg p-8 text-center">
      {isSuccess ? (
        <>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40">
            <svg
              className="h-6 w-6 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-50">Payment Successful!</h2>
          <p className="mt-2 text-slate-300">
            Your tokens have been added to your account balance.
          </p>
          <div className="mt-6">
            <Link
              href="/cabinet"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-[0_14px_32px_rgba(8,145,178,0.65)] text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition"
            >
              View My Account
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/20 border border-amber-500/40">
            <svg
              className="h-6 w-6 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-50">Payment Pending</h2>
          <p className="mt-2 text-slate-300">
            Your payment is being processed. Please check your account in a few minutes.
          </p>
          <div className="mt-6">
            <Link
              href="/cabinet"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-[0_14px_32px_rgba(8,145,178,0.65)] text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition"
            >
              View My Account
            </Link>
          </div>
        </>
      )}
    </div>
  )
}


