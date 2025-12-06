// app/learn/pre-session/page.tsx - Pre-Session Preparation Checklist page

import { Metadata } from 'next'
import { Suspense } from 'react'
import { PreSessionPage } from '@/components/PreSessionPage'
import enLearn from '@/i18n/en/learn.json'

export const metadata: Metadata = {
  title: (enLearn as any).preSession?.hero?.title || 'Pre-Session Preparation Checklist',
  description: (enLearn as any).preSession?.hero?.subtitle || 'A short, repeatable pre-session routine can reduce rushed decisions. This page offers a practical checklist for getting your environment, platform and risk plan ready before you place a single trade.',
}

function PreSessionPageFallback() {
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

export default function PreSessionPageRoute() {
  return (
    <Suspense fallback={<PreSessionPageFallback />}>
      <PreSessionPage />
    </Suspense>
  )
}

