// components/PositionSizingPage.tsx - Position Sizing Made Simple page component

'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  PieChart,
  Ruler,
  Activity,
  Calculator,
  AlertTriangle,
  Info,
  ListChecks,
  ArrowRightLeft,
  HelpCircle,
} from 'lucide-react'
import { HomeSection } from './HomeSection'

export function PositionSizingPage() {
  const t = useTranslations('learn.positionSizing')
  const tBreadcrumb = useTranslations('learn.breadcrumb')

  // Get data from translations
  const hero = t.raw('hero') as any
  const sections = t.raw('sections') as any
  const sidebar = t.raw('sidebar') as any

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-14">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-8">
        {/* Header */}
        <HomeSection className="pb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <Link href="/" className="hover:text-slate-300 transition">
                {tBreadcrumb('home')}
              </Link>
              <span className="text-slate-600">/</span>
              <Link href="/learn" className="hover:text-slate-300 transition">
                {tBreadcrumb('learn')}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{t('breadcrumb.positionSizing')}</span>
            </div>
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-300" />
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
                {hero?.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300/90 max-w-2xl">
              {hero?.subtitle}
            </p>
            <div className="inline-flex flex-wrap items-center gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
                {hero?.badges?.educationOnly}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400">
                {hero?.badges?.worksTogether}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-950/90 border border-slate-800 px-3 py-2">
              <div className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                <Calculator className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-200 font-medium">
                  {hero?.conceptCard?.title}
                </span>
                <span className="text-slate-500">
                  {hero?.conceptCard?.subtitle}
                </span>
              </div>
            </div>
            <span>{hero?.readingTime}</span>
          </div>
        </HomeSection>

        {/* Main content grid */}
        <HomeSection className="pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-6 text-[13px] leading-relaxed">
            {/* Intro */}
            <motion.article
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <h2 className="text-sm font-semibold text-slate-50 flex items-center gap-2">
                {sections?.whySizeMatters?.title}
              </h2>
              <p className="text-slate-300/95">
                {sections?.whySizeMatters?.description1}
              </p>
              <p className="text-slate-300/95">
                {sections?.whySizeMatters?.question}{' '}
                <span className="text-slate-100">
                  {sections?.whySizeMatters?.questionHighlight}
                </span>
              </p>
              <ul className="list-disc list-inside text-slate-300/95 space-y-1.5">
                {sections?.whySizeMatters?.points?.map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <p className="text-slate-400 text-[12px]">
                {sections?.whySizeMatters?.note}
              </p>
            </motion.article>

            {/* Core formula */}
            <motion.section
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Ruler className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-semibold text-slate-50">
                  {sections?.coreFormula?.title}
                </h3>
              </div>
              <p className="text-slate-300/95">
                {sections?.coreFormula?.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.coreFormula?.riskAmount?.title}
                  </div>
                  <p className="text-slate-300/90">
                    {sections?.coreFormula?.riskAmount?.description}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.coreFormula?.distanceToStop?.title}
                  </div>
                  <p className="text-slate-300/90">
                    {sections?.coreFormula?.distanceToStop?.description}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.coreFormula?.valuePerUnit?.title}
                  </div>
                  <p className="text-slate-300/90">
                    {sections?.coreFormula?.valuePerUnit?.description}
                  </p>
                </div>
              </div>
              <p className="text-slate-300/95">
                {sections?.coreFormula?.conclusion}
              </p>
            </motion.section>

            {/* Forex example */}
            <motion.section
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-semibold text-slate-50">
                  {sections?.forexExample?.title}
                </h3>
              </div>
              <p className="text-slate-300/95">
                {sections?.forexExample?.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px]">
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.forexExample?.conceptFlow?.title}
                  </div>
                  <ol className="list-decimal list-inside text-slate-300/90 space-y-1">
                    {sections?.forexExample?.conceptFlow?.steps?.map((step: string, idx: number) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                  <p className="text-slate-500">
                    {sections?.forexExample?.conceptFlow?.note}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.forexExample?.whyExamples?.title}
                  </div>
                  <p className="text-slate-300/90">
                    {sections?.forexExample?.whyExamples?.description}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Crypto & Binary notes */}
            <motion.section
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <ArrowRightLeft className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-semibold text-slate-50">
                  {sections?.cryptoBinaryNotes?.title}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px]">
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.cryptoBinaryNotes?.cryptoMargin?.title}
                  </div>
                  <p className="text-slate-300/90">
                    {sections?.cryptoBinaryNotes?.cryptoMargin?.description}
                  </p>
                  <p className="text-slate-500">
                    {sections?.cryptoBinaryNotes?.cryptoMargin?.note}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-100">
                    {sections?.cryptoBinaryNotes?.binaryPayoffs?.title}
                  </div>
                  <p className="text-slate-300/90">
                    {sections?.cryptoBinaryNotes?.binaryPayoffs?.description}
                  </p>
                  <p className="text-slate-500">
                    {sections?.cryptoBinaryNotes?.binaryPayoffs?.note}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Behaviour & consistency */}
            <motion.section
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.16 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <ListChecks className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-semibold text-slate-50">
                  {sections?.behaviourConsistency?.title}
                </h3>
              </div>
              <p className="text-slate-300/95">
                {sections?.behaviourConsistency?.description}
              </p>
              <ol className="list-decimal list-inside text-slate-300/95 space-y-1.5 text-[12px]">
                {sections?.behaviourConsistency?.steps?.map((step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              <p className="text-slate-400 text-[12px]">
                {sections?.behaviourConsistency?.note}
              </p>
            </motion.section>
          </div>

          {/* Right column – formulas, pitfalls, disclaimer */}
          <div className="lg:col-span-4 space-y-5 text-[12px]">
            {/* Simplified formula card */}
            <motion.aside
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 space-y-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-3.5 h-3.5 text-cyan-300" />
                <div className="text-xs font-semibold text-slate-50">
                  {sidebar?.simplifiedFormula?.title}
                </div>
              </div>
              <p className="text-slate-300/95">
                {sidebar?.simplifiedFormula?.description}
              </p>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-[11px] text-slate-100">
                <div>{sidebar?.simplifiedFormula?.formula}</div>
              </div>
              <p className="text-slate-400">
                {sidebar?.simplifiedFormula?.note}
              </p>
            </motion.aside>

            {/* Pitfalls */}
            <motion.aside
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 space-y-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.14 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <div className="text-xs font-semibold text-slate-50">
                  {sidebar?.pitfalls?.title}
                </div>
              </div>
              <ul className="list-disc list-inside text-slate-300/95 space-y-1">
                {sidebar?.pitfalls?.items?.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-400">
                {sidebar?.pitfalls?.note}
              </p>
            </motion.aside>

            {/* Platform & professional note */}
            <motion.aside
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 space-y-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.18 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-3.5 h-3.5 text-cyan-300" />
                <div className="text-xs font-semibold text-slate-50">
                  {sidebar?.platformNote?.title}
                </div>
              </div>
              <p className="text-slate-300/95">
                {sidebar?.platformNote?.description}
              </p>
              <p className="text-slate-400">
                {sidebar?.platformNote?.note}
              </p>
            </motion.aside>

            {/* Continue learning */}
            <motion.aside
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 space-y-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.22 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
                <div className="text-xs font-semibold text-slate-50">
                  {sidebar?.continueLearning?.title}
                </div>
              </div>
              <p className="text-slate-300/95">
                {sidebar?.continueLearning?.description}
              </p>
              <ul className="list-disc list-inside text-slate-300/95 space-y-1">
                {sidebar?.continueLearning?.topics?.map((topic: string, idx: number) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
              <p className="text-slate-400">
                {sidebar?.continueLearning?.note}
              </p>
            </motion.aside>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

