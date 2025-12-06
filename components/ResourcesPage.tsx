// components/ResourcesPage.tsx - Resources page component

'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ClipboardList,
  Target,
  Brain,
  FolderKanban,
  Info,
  Download,
  Layers,
  Activity,
  BookOpen,
  Compass,
} from 'lucide-react'
import { HomeSection } from './HomeSection'

interface ResourceItem {
  type: 'checklist' | 'template' | 'worksheet'
  title: string
  subtitle?: string
  description: string
  format: string
  focus: string
  tag?: string
  cta?: string
}

export function ResourcesPage() {
  const t = useTranslations('resources')
  const tBreadcrumb = useTranslations('courses.breadcrumb')

  // Get resources from translations
  const resources = (t.raw('resources') as any)?.items as ResourceItem[]

  // Get resource type icon
  const getResourceIcon = (type: string) => {
    if (type === 'checklist') {
      return <ClipboardList className="w-4 h-4 text-cyan-300" />
    }
    if (type === 'template') {
      return <Layers className="w-4 h-4 text-cyan-300" />
    }
    if (type === 'worksheet') {
      return <Activity className="w-4 h-4 text-cyan-300" />
    }
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        {/* Hero */}
        <HomeSection className="pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Link href="/" className="hover:text-slate-300 transition">
                  {tBreadcrumb('home')}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t('breadcrumb.resources')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">{t('hero.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="flex items-start gap-2">
                  <ClipboardList className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>{t('hero.features.checklists')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>{t('hero.features.templates')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>{t('hero.features.behaviour')}</span>
                </div>
              </div>
            </div>

            {/* Hero side card */}
            <div className="lg:col-span-5">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <FolderKanban className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{t('hero.sideCard.title')}</div>
                    <div className="text-[11px] text-slate-400">{t('hero.sideCard.subtitle')}</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300/90">{t('hero.sideCard.paragraph1')}</p>
                <p className="text-[11px] text-slate-300/90">{t('hero.sideCard.paragraph2')}</p>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        {/* Resource list */}
        <HomeSection className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('resources.title')}</h2>
              <p className="text-sm text-slate-300/90 max-w-xl">{t('resources.subtitle')}</p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>{t('resources.disclaimer')}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((item) => (
              <motion.div
                key={item.title}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2 text-sm"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      {getResourceIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-50">{item.title}</div>
                      {item.subtitle ? (
                        <div className="text-[11px] text-slate-400">{item.subtitle}</div>
                      ) : (
                        <div className="text-[11px] text-slate-400">{item.format}</div>
                      )}
                    </div>
                  </div>
                  {item.tag && (
                    <div className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300">
                      {item.tag}
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-slate-300/90">{item.description}</div>
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 mt-1">
                  <span>{item.focus}</span>
                  {item.cta ? (
                    item.title === 'Risk Management Foundations' ? (
                      <Link
                        href="/learn/risk-management"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium"
                      >
                        <span>{item.cta}</span>
                        <span>→</span>
                      </Link>
                    ) : item.title === 'Daily Trade Journal Principles' ? (
                      <Link
                        href="/learn/trade-journal"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium"
                      >
                        <span>{item.cta}</span>
                        <span>→</span>
                      </Link>
                    ) : item.title === 'Weekly Review Playbook' ? (
                      <Link
                        href="/learn/weekly-review"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium"
                      >
                        <span>{item.cta}</span>
                        <span>→</span>
                      </Link>
                    ) : item.title === 'Pre-Session Preparation' ? (
                      <Link
                        href="/learn/pre-session"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium"
                      >
                        <span>{item.cta}</span>
                        <span>→</span>
                      </Link>
                    ) : item.title === 'Position Sizing Made Simple' ? (
                      <Link
                        href="/learn/position-sizing"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium"
                      >
                        <span>{item.cta}</span>
                        <span>→</span>
                      </Link>
                    ) : item.title === 'Strategy Snapshot Overview' ? (
                      <Link
                        href="/learn/strategy-snapshot"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium"
                      >
                        <span>{item.cta}</span>
                        <span>→</span>
                      </Link>
                    ) : (
                      <button className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition font-medium">
                        <span>{item.cta}</span>
                        <span>→</span>
                      </button>
                    )
                  ) : (
                    <button className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition">
                      <Download className="w-3 h-3" />
                      <span>{t('resources.downloadPreview')}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </HomeSection>

        {/* How to integrate resources */}
        <HomeSection className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <BookOpen className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('infoCards.useWithCourses.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('infoCards.useWithCourses.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('infoCards.useWithCourses.description')}</p>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Compass className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('infoCards.buildRoutines.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('infoCards.buildRoutines.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('infoCards.buildRoutines.description')}</p>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Brain className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('infoCards.focusBehaviour.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('infoCards.focusBehaviour.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('infoCards.focusBehaviour.description')}</p>
            </motion.div>
          </div>
        </HomeSection>

        {/* Risk note / positioning */}
        <HomeSection className="pb-12">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-50">{t('cta.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {t('cta.browseCourses')}
              </Link>
              <Link
                href="/learn?tab=ai"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
              >
                {t('cta.generateAI')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

