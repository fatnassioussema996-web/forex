// app/page.tsx - Home page

'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ShieldCheck, FileText, Cpu, SlidersHorizontal, Compass, CreditCard, Repeat, Coins, PlusCircle, ShoppingCart, BookOpenCheck, FolderKanban, AlertTriangle, Layers, UserCog } from 'lucide-react'
import { motion } from 'framer-motion'
import { HomeSection } from '@/components/HomeSection'
import { HeroSlideshow } from '@/components/HeroSlideshow'
import { TradingViewWidget } from '@/components/TradingViewWidget'
import { CourseCard } from '@/components/CourseCard'
import { PathCard } from '@/components/PathCard'
import FAQAccordion from '@/components/FAQAccordion'
import { TokenPacks } from '@/components/TokenPacks'

// Temporary course data - will be replaced with DB data
// Note: price_gbp is kept for backward compatibility but not used in calculations
// Prices are calculated from tokens: 1.00 GBP = 100 tokens
const featuredCourses = [
  {
    level: 'Beginner',
    market: 'Forex',
    title: 'Forex Foundations: From Zero to First Trade',
    desc: 'Build a base in Forex – from key terms and order types to risk per trade and journaling.',
    price_gbp: 79, // 7900 tokens / 100 = 79 GBP
    tokens: 7900,
    slug: 'forex-foundations',
  },
  {
    level: 'Intermediate',
    market: 'Crypto',
    title: 'Crypto Volatility Structures',
    desc: 'Understand volatility cycles, liquidity zones and structured approaches to managing crypto swings.',
    price_gbp: 99, // 9900 tokens / 100 = 99 GBP
    tokens: 9900,
    slug: 'crypto-volatility',
  },
  {
    level: 'Advanced',
    market: 'Binary',
    title: 'Binary Risk & Payout Geometry',
    desc: 'A deep dive into payout curves, risk stacking and how to structure binary exposure.',
    price_gbp: 119, // 11900 tokens / 100 = 119 GBP
    tokens: 11900,
    slug: 'binary-risk',
  },
]

export default function HomePage() {
  const t = useTranslations('home')
  const tCommon = useTranslations('common')

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen relative">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pb-16 relative z-10 min-h-screen">
        {/* Hero */}
        <HomeSection className="pt-10 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 w-max">
              <span className="text-[11px] font-medium text-slate-200">{t('hero.badgeLeft')}</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{t('hero.badgeRight')}</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
                {t('hero.title')}
              </h1>
              <p className="text-sm sm:text-base text-slate-300/90 max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]"
              >
                {t('hero.ctaPrimaryLabel')}
              </Link>
              <Link
                href="/learn?tab=custom"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500"
              >
                {t('hero.ctaSecondaryLabel')}
              </Link>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
              {(t.raw('hero.bullets') as string[]).map((bullet: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  {i === 0 && <ShieldCheck className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />}
                  {i === 1 && <FileText className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />}
                  {i === 2 && <Cpu className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />}
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/15 via-slate-900/60 to-indigo-500/10 blur-2xl -z-10" />
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(15,23,42,0.95)]">
                <HeroSlideshow />
              </div>
            </div>
          </div>
        </HomeSection>

        {/* Market snapshot */}
        <HomeSection className="pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/70 border border-slate-900 rounded-2xl p-5">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">{t('marketSnapshot.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('marketSnapshot.subtitle')}</p>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t('marketSnapshot.disclaimer')}</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <TradingViewWidget />
            </div>
          </div>
        </HomeSection>

        {/* Featured courses */}
        <HomeSection className="pb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('featuredCourses.title')}</h2>
              <p className="text-sm text-slate-300/90 max-w-xl">{t('featuredCourses.subtitle')}</p>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-medium text-cyan-300 hover:text-cyan-200">
              <span>{t('featuredCourses.ctaViewAll')}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
              <SlidersHorizontal className="w-3 h-3" />
              <span>{t('featuredCourses.filtersLabel')}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(t.raw('featuredCourses.levelFilters') as string[]).map((filter: string) => (
                <button
                  key={filter}
                  className={`px-2.5 py-1 rounded-full border text-xs ${
                    filter === 'All'
                      ? 'bg-slate-100 text-slate-950 border-slate-100'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(t.raw('featuredCourses.marketFilters') as string[]).map((filter: string) => (
                <button
                  key={filter}
                  className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs text-slate-300 hover:border-slate-600"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </HomeSection>

        {/* Three ways to learn */}
        <HomeSection className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('paths.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('paths.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(t.raw('paths.items') as any[]).map((item: any, i: number) => (
                <PathCard
                  key={i}
                  icon={i === 0 ? Layers : i === 1 ? UserCog : Cpu}
                  title={item.title}
                  text={item.text}
                  badge={item.badge}
                  cta={item.cta}
                  href={i === 0 ? '/courses' : i === 1 ? '/learn?tab=custom' : '/learn?tab=ai'}
                />
              ))}
            </div>
          </div>
        </HomeSection>

        {/* How it works */}
        <HomeSection className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('howItWorks.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('howItWorks.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              {(t.raw('howItWorks.steps') as any[]).map((step: any, i: number) => (
                <motion.div
                  key={i}
                  className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                    {i === 0 && <Compass className="w-4 h-4 text-cyan-300" />}
                    {i === 1 && <CreditCard className="w-4 h-4 text-cyan-300" />}
                    {i === 2 && <FileText className="w-4 h-4 text-cyan-300" />}
                    {i === 3 && <Repeat className="w-4 h-4 text-cyan-300" />}
                  </div>
                  <div className="font-semibold text-slate-50">{step.title}</div>
                  <div className="text-xs text-slate-300/90">{step.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* Tokens & pricing teaser */}
        <HomeSection className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('tokensTeaser.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('tokensTeaser.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {(t.raw('tokensTeaser.items') as any[]).map((item: any, i: number) => (
                <motion.div
                  key={i}
                  className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                    {i === 0 && <Coins className="w-4 h-4 text-cyan-300" />}
                    {i === 1 && <PlusCircle className="w-4 h-4 text-cyan-300" />}
                    {i === 2 && <ShoppingCart className="w-4 h-4 text-cyan-300" />}
                  </div>
                  <div className="font-semibold text-slate-50">{item.title}</div>
                  <div className="text-xs text-slate-300/90">{item.text}</div>
                </motion.div>
              ))}
            </div>
                  <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-medium text-cyan-300 hover:text-cyan-200">
                    <span>{t('tokensTeaser.ctaPricing')}</span>
                    <span>→</span>
                  </Link>
                </div>
              </HomeSection>

              {/* Token packs */}
              <TokenPacks />

              {/* Glossary & resources */}
        <HomeSection className="pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <BookOpenCheck className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{t('glossaryResources.glossary.title')}</h3>
                  <p className="text-xs text-slate-300/90">{t('glossaryResources.glossary.subtitle')}</p>
                </div>
              </div>
              <ul className="text-xs text-slate-300/90 space-y-1.5 mt-1">
                {(t.raw('glossaryResources.glossary.items') as any[]).map((item: any, i: number) => (
                  <li key={i}>
                    <span className="font-medium text-slate-100">{item.term}</span> – {item.definition}
                  </li>
                ))}
              </ul>
              <Link href="/glossary" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
                <span>{t('glossaryResources.glossary.cta')}</span>
                <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <FolderKanban className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{t('glossaryResources.resources.title')}</h3>
                  <p className="text-xs text-slate-300/90">{t('glossaryResources.resources.subtitle')}</p>
                </div>
              </div>
              <ul className="text-xs text-slate-300/90 space-y-1.5 mt-1">
                {(t.raw('glossaryResources.resources.items') as any[]).map((item: any, i: number) => (
                  <li key={i}>
                    <span className="font-medium text-slate-100">{item.label}</span> – {item.definition}
                  </li>
                ))}
              </ul>
              <Link href="/resources" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
                <span>{t('glossaryResources.resources.cta')}</span>
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </HomeSection>

        {/* Risk notice */}
        <HomeSection className="pb-14">
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-50">{t('riskNotice.title')}</h3>
              <p className="text-xs text-slate-300/90">{t('riskNotice.body')}</p>
              <Link href="/risk-and-disclaimer" className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                <span>{t('riskNotice.cta')}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </HomeSection>

        {/* FAQ */}
        <HomeSection className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('faq.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('faq.subtitle')}</p>
            </div>
            <FAQAccordion searchQuery="" selectedCategory="all" />
          </div>
        </HomeSection>

        {/* Footer CTA */}
        <HomeSection className="pb-10">
          <div className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">{t('footerCta.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('footerCta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]"
              >
                {t('footerCta.ctaPrimary')}
              </Link>
              <Link
                href="/learn?tab=custom"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500"
              >
                {t('footerCta.ctaSecondary')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}
