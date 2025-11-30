// components/FAQPage.tsx - FAQ page component

'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Cpu,
  Wallet,
  CreditCard,
  HelpCircle,
  Info,
  Globe2,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { HomeSection } from './HomeSection'

export function FAQPage() {
  const t = useTranslations('faq')
  const tBreadcrumb = useTranslations('courses.breadcrumb')

  const faqItems = (t.raw('faq') as any)?.items as Array<{
    category: string
    question: string
    answer: string
  }>

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
                  {t('breadcrumb.home')}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t('breadcrumb.faq')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">{t('hero.subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>{t('hero.bullets.courses')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>{t('hero.bullets.ai')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>{t('hero.bullets.noSignals')}</span>
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
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{t('hero.sideCard.title')}</div>
                    <div className="text-[11px] text-slate-400">{t('hero.sideCard.subtitle')}</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300/90">{t('hero.sideCard.paragraph1')}</p>
                <p className="text-[11px] text-slate-300/90">{t('hero.sideCard.paragraph2')}</p>
                <Link
                  href="/risk-and-disclaimer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition"
                >
                  <span>{t('hero.sideCard.cta')}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        {/* FAQ grid */}
        <HomeSection className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('faq.title')}</h2>
              <p className="text-sm text-slate-300/90 max-w-xl">{t('faq.subtitle')}</p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>{t('faq.disclaimer')}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={`${item.category}-${index}`}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-sm"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-50 mb-1">{item.question}</div>
                    <p className="text-[11px] text-slate-300/90 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </HomeSection>

        {/* Tokens & payments mini-section */}
        <HomeSection className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Wallet className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('tokensCard.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('tokensCard.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('tokensCard.description')}</p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition"
              >
                <span>{t('tokensCard.cta')}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <CreditCard className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{t('paymentsCard.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('paymentsCard.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('paymentsCard.description')}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Globe2 className="w-3 h-3 text-cyan-300" />
                <span>{t('paymentsCard.regions')}</span>
              </div>
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
                  <div className="text-xs font-semibold text-slate-50">{t('deliveryCard.title')}</div>
                  <div className="text-[11px] text-slate-400">{t('deliveryCard.subtitle')}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">{t('deliveryCard.description')}</p>
            </motion.div>
          </div>
        </HomeSection>

        {/* Final contact / help CTA */}
        <HomeSection className="pb-12">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">{t('cta.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {t('cta.contact')}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
              >
                {t('cta.backToHome')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

