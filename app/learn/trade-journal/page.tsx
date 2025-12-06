// app/learn/trade-journal/page.tsx - Daily Trade Journal Principles page

import { Metadata } from 'next'
import { Suspense } from 'react'
import { TradeJournalPage } from '@/components/TradeJournalPage'
import enLearn from '@/i18n/en/learn.json'

export const metadata: Metadata = {
  title: (enLearn as any).tradeJournal?.hero?.title || 'Daily Trade Journal Principles',
  description: (enLearn as any).tradeJournal?.hero?.subtitle || 'A journal is not about writing a novel after every trade. It is a compact way to track what you planned, what actually happened and how you behaved.',
}

function TradeJournalPageFallback() {
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

export default function TradeJournalPageRoute() {
  return (
    <Suspense fallback={<TradeJournalPageFallback />}>
      <TradeJournalPage />
    </Suspense>
  )
}

