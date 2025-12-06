// app/learn/strategy-snapshot/page.tsx - Strategy Snapshot Overview page

import { Metadata } from 'next'
import { Suspense } from 'react'
import { StrategySnapshotPage } from '@/components/StrategySnapshotPage'
import enLearn from '@/i18n/en/learn.json'

export const metadata: Metadata = {
  title: (enLearn as any).strategySnapshot?.hero?.title || 'One-Page Strategy Snapshot',
  description: (enLearn as any).strategySnapshot?.hero?.subtitle || 'A strategy snapshot is a single page that captures the core of one approach – markets, timeframes, setup, risk and execution rules – so you can see it clearly while you trade.',
}

function StrategySnapshotPageFallback() {
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

export default function StrategySnapshotPageRoute() {
  return (
    <Suspense fallback={<StrategySnapshotPageFallback />}>
      <StrategySnapshotPage />
    </Suspense>
  )
}

