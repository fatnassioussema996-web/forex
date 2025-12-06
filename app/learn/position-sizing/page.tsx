// app/learn/position-sizing/page.tsx - Position Sizing Made Simple page

import { Metadata } from 'next'
import { Suspense } from 'react'
import { PositionSizingPage } from '@/components/PositionSizingPage'
import enLearn from '@/i18n/en/learn.json'

export const metadata: Metadata = {
  title: (enLearn as any).positionSizing?.hero?.title || 'Position Sizing Made Simple',
  description: (enLearn as any).positionSizing?.hero?.subtitle || 'Position sizing connects your risk plan to the actual size of each trade. This page walks through the core ideas behind translating account risk, stop distance and contract value into a position size for Forex, Crypto and Binary markets.',
}

function PositionSizingPageFallback() {
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

export default function PositionSizingPageRoute() {
  return (
    <Suspense fallback={<PositionSizingPageFallback />}>
      <PositionSizingPage />
    </Suspense>
  )
}

