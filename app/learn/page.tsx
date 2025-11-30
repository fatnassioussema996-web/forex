// app/learn/page.tsx - Learn page with Custom Course and AI Strategy tabs

import { Metadata } from 'next'
import { Suspense } from 'react'
import { LearnPage } from '@/components/LearnPage'
import enLearn from '@/i18n/en/learn.json'

export const metadata: Metadata = {
  title: enLearn.title,
  description: enLearn.subtitle,
}

function LearnPageFallback() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      <main className="pt-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-800 rounded w-2/3" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function LearnPageRoute() {
  return (
    <Suspense fallback={<LearnPageFallback />}>
      <LearnPage />
    </Suspense>
  )
}

