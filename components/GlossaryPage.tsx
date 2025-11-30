// components/GlossaryPage.tsx - Glossary page component

'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldCheck,
  BookOpenCheck,
  Search,
  Info,
  TrendingUp,
  Waves,
  Activity,
  AlertTriangle,
  Brain,
  Compass,
  Clock,
  Layers,
} from 'lucide-react'
import { HomeSection } from './HomeSection'

interface Term {
  id: string
  label: string
  category: string
  short: string
  explanation: string
  tag?: string
}

export function GlossaryPage() {
  const t = useTranslations('glossary')
  const tBreadcrumb = useTranslations('courses.breadcrumb')
  const tNav = useTranslations('common.nav')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(t('categories.all'))

  // Get terms from translations
  const allTerms = (t.raw('terms') as any)?.items as Term[]

  // Category mapping: translated label -> English key (memoized to avoid recreating on each render)
  const categoryMap = useMemo(() => {
    return {
      [t('categories.all')]: 'All',
      [t('categories.forex')]: 'Forex',
      [t('categories.crypto')]: 'Crypto',
      [t('categories.binary')]: 'Binary',
      [t('categories.risk')]: 'Risk',
      [t('categories.process')]: 'Process',
      [t('categories.psychology')]: 'Psychology',
    }
  }, [t])

  // Get categories from translations (for display)
  const categories = useMemo(
    () => [
      t('categories.all'),
      t('categories.forex'),
      t('categories.crypto'),
      t('categories.binary'),
      t('categories.risk'),
      t('categories.process'),
      t('categories.psychology'),
    ],
    [t]
  )

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return allTerms.filter((term) => {
      const matchesSearch =
        searchQuery === '' ||
        term.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.explanation.toLowerCase().includes(searchQuery.toLowerCase())

      const categoryKey = categoryMap[selectedCategory] || selectedCategory
      const matchesCategory = categoryKey === 'All' || term.category === categoryKey

      return matchesSearch && matchesCategory
    })
  }, [allTerms, searchQuery, selectedCategory, categoryMap])

  // Get category icon
  const getCategoryIcon = (category: string) => {
    if (category === 'Risk') {
      return <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
    }
    if (category === 'Forex') {
      return <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
    }
    if (category === 'Crypto') {
      return <Waves className="w-3.5 h-3.5 text-cyan-300" />
    }
    if (category === 'Binary') {
      return <Activity className="w-3.5 h-3.5 text-cyan-300" />
    }
    if (category === 'Process') {
      return <Layers className="w-3.5 h-3.5 text-cyan-300" />
    }
    if (category === 'Psychology') {
      return <Brain className="w-3.5 h-3.5 text-cyan-300" />
    }
    return null
  }

  // Get translated category name
  const getCategoryLabel = (categoryKey: string): string => {
    const reverseMap: { [key: string]: string } = {
      All: t('categories.all'),
      Forex: t('categories.forex'),
      Crypto: t('categories.crypto'),
      Binary: t('categories.binary'),
      Risk: t('categories.risk'),
      Process: t('categories.process'),
      Psychology: t('categories.psychology'),
    }
    return reverseMap[categoryKey] || categoryKey
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
                <span className="text-slate-300">{t('breadcrumb.glossary')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">{t('hero.subtitle')}</p>
              </div>

              {/* Search + filters */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <div className="flex-1 flex items-center gap-2 rounded-full bg-slate-950/80 border border-slate-800 px-3 py-1.5">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search.placeholder')}
                      className="bg-transparent border-0 outline-none text-xs text-slate-100 placeholder:text-slate-500 flex-1"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Info className="w-3 h-3" />
                    <span>{t('search.info')}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                  {categories.map((cat) => {
                    const isSelected = cat === selectedCategory
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-full border transition ${
                          isSelected
                            ? 'bg-slate-100 text-slate-950 border-slate-100'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
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
                    <BookOpenCheck className="w-4 h-4 text-cyan-300" />
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

        {/* Term grid */}
        <HomeSection className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('terms.title')}</h2>
              <p className="text-sm text-slate-300/90 max-w-xl">{t('terms.subtitle')}</p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>{t('terms.disclaimer')}</span>
              </span>
            </div>
          </div>

          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-slate-400">{t('search.noResults')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((term) => (
                <motion.div
                  key={term.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-sm flex flex-col gap-2"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                        {getCategoryIcon(term.category)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-50">{term.label}</div>
                        <div className="text-[11px] text-slate-400">{getCategoryLabel(term.category)}</div>
                      </div>
                    </div>
                    {term.tag && (
                      <div className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300">
                        {term.tag}
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-300/90">{term.short}</div>
                  <div className="text-[11px] text-slate-300/90 leading-relaxed">{term.explanation}</div>
                </motion.div>
              ))}
            </div>
          )}
        </HomeSection>

        {/* Education vs. advice section */}
        <HomeSection className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('infoCards.education.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('infoCards.education.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('infoCards.education.description')}</p>
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
                  <div className="text-xs font-semibold text-slate-50">{t('infoCards.linkFromCourses.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('infoCards.linkFromCourses.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('infoCards.linkFromCourses.description')}</p>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Clock className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('infoCards.updates.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('infoCards.updates.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('infoCards.updates.description')}</p>
            </motion.div>
          </div>
        </HomeSection>

        {/* Final CTA */}
        <HomeSection className="pb-12">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">{t('cta.title')}</h2>
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

