// app/learn/weekly-review/page.tsx - Weekly Review Playbook page

import { Metadata } from 'next'
import { Suspense } from 'react'
import { WeeklyReviewPage } from '@/components/WeeklyReviewPage'
import enLearn from '@/i18n/en/learn.json'

export const metadata: Metadata = {
  title: (enLearn as any).weeklyReview?.hero?.title || 'Weekly Review Playbook',
  description: (enLearn as any).weeklyReview?.hero?.subtitle || 'A weekly review is where single trades become a learning curve. This page walks through a simple structure for looking at your decisions, risk and behaviour across several sessions.',
}

function WeeklyReviewPageFallback() {
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

export default function WeeklyReviewPageRoute() {
  return (
    <Suspense fallback={<WeeklyReviewPageFallback />}>
      <WeeklyReviewPage />
    </Suspense>
  )
}

