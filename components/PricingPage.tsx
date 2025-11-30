// components/PricingPage.tsx - Pricing & Tokens page component

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Coins,
  CreditCard,
  Repeat,
  ShieldCheck,
  Info,
  ArrowRight,
  AlertTriangle,
  Gauge,
  Wallet,
} from 'lucide-react'
import { HomeSection } from './HomeSection'
import { calculatePriceForTokens, formatPrice, getCurrencySymbol } from '@/lib/currency-utils'
import { getUserCurrency } from '@/lib/currency-client'

export function PricingPage() {
  const t = useTranslations('pricing')
  const tHome = useTranslations('home.tokenPacks')
  const tCommon = useTranslations('common.buttons')
  const [currency, setCurrency] = useState('GBP')
  const [customAmount, setCustomAmount] = useState('0.01')

  useEffect(() => {
    setCurrency(getUserCurrency())
  }, [])

  const sanitizeAmount = (value: string): string => {
    let sanitized = String(value).replace(',', '.')
    sanitized = sanitized.replace(/[^\d.]/g, '')
    const parts = sanitized.split('.')
    if (parts.length > 1) {
      sanitized = parts[0] + '.' + parts[1].slice(0, 2)
    }
    return sanitized
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeAmount(e.target.value)
    setCustomAmount(sanitized)
  }

  // Get packs from home.tokenPacks (existing packs with 4000, 7000, 10000 tokens)
  const packs = (tHome.raw('packs') as any[]).map((pack: any, index: number) => ({
    ...pack,
    price: calculatePriceForTokens(pack.tokens, currency),
    formattedPrice: formatPrice(calculatePriceForTokens(pack.tokens, currency), currency),
    highlighted: index === 1, // Structured Growth is highlighted
    label: index === 1 ? t('tokenPacks.mostPopular') : undefined,
  }))

  const customTopUp = tHome.raw('customTopUp') as any

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        {/* Hero section */}
        <HomeSection className="pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Link href="/" className="hover:text-slate-300 transition">
                  {t('breadcrumb.home')}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t('breadcrumb.pricing')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">{t('hero.subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="flex items-start gap-2">
                  <Coins className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>{t('hero.bullets.oneBalance')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>{t('hero.bullets.payWithTokens')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Repeat className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <span>{t('hero.bullets.topUpAnytime')}</span>
                </div>
              </div>
            </div>

            {/* Example rate card */}
            <div className="lg:col-span-5">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-900 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      <Gauge className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-50">{t('hero.exampleRate.title')}</div>
                      <div className="text-[11px] text-slate-400">{t('hero.exampleRate.subtitle')}</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300">
                    {t('hero.exampleRate.badge')}
                  </div>
                </div>
                <p className="text-[11px] text-slate-300/90">{t('hero.exampleRate.description')}</p>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-300/90">
                  {t.rich('hero.exampleRate.example', {
                    tokens: () => <span className="font-semibold">{t('hero.exampleRate.tokens')}</span>,
                    price: () => <span className="font-semibold">{t('hero.exampleRate.price')}</span>,
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        {/* Token packs */}
        <HomeSection className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('tokenPacks.title')}</h2>
              <p className="text-sm text-slate-300/90 max-w-xl">{t('tokenPacks.subtitle')}</p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span>{t('tokenPacks.note')}</span>
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>{t('tokenPacks.info')}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packs.map((pack) => (
              <motion.div
                key={pack.id}
                className={`flex flex-col gap-3 rounded-2xl p-4 border bg-slate-950/75 ${
                  pack.highlighted
                    ? 'border-cyan-500/60 shadow-[0_18px_40px_rgba(8,145,178,0.45)]'
                    : 'border-slate-800'
                }`}
                whileHover={{ y: pack.highlighted ? -6 : -4, scale: pack.highlighted ? 1.02 : 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      <Coins className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-50">{pack.name}</div>
                      <div className="text-[11px] text-slate-400">{pack.subtitle}</div>
                    </div>
                  </div>
                  {pack.label && (
                    <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/60 text-[10px] text-cyan-200 font-medium text-center">
                      {pack.label}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-50">{pack.formattedPrice}</div>
                  <div className="text-[11px] text-slate-400">
                    ≈ {pack.tokens.toLocaleString('en-US')} {tHome('tokens')}
                  </div>
                </div>
                <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
                  {pack.benefits.map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
                <Link
                  href="/top-up"
                  className="mt-2 inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
                >
                  {t('tokenPacks.buyPack', { name: pack.name })}
                </Link>
              </motion.div>
            ))}
          </div>
        </HomeSection>

        {/* Custom top-up & Direct payment */}
        <HomeSection className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Custom top-up */}
            <motion.div
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Wallet className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{t('customTopUp.title')}</h3>
                  <p className="text-xs text-slate-300/90">{t('customTopUp.subtitle')}</p>
                </div>
              </div>
              <div className="mt-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2">
                    <span className="text-[11px] text-slate-400">{t('customTopUp.amountLabel')}</span>
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                        <span className="text-slate-400 text-xs">{getCurrencySymbol(currency)}</span>
                      </div>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        inputMode="decimal"
                        placeholder="0.01"
                        className="w-full pl-5 pr-2 text-xs text-slate-100 bg-transparent border-none outline-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-[11px] text-slate-100 flex items-center gap-1">
                    <span>GBP</span>
                    <span className="text-slate-500">·</span>
                    <span>EUR</span>
                    <span className="text-slate-500">·</span>
                    <span>USD</span>
                    <span className="text-slate-500">·</span>
                    <span>AED</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">{t('customTopUp.minAmount')}</div>
              </div>
              <Link
                href="/top-up"
                className="mt-2 inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {t('customTopUp.buyCta')}
              </Link>
            </motion.div>

            {/* Direct payment */}
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <CreditCard className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{t('directPayment.title')}</h3>
                  <p className="text-xs text-slate-300/90">{t('directPayment.subtitle')}</p>
                </div>
              </div>
              <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
                <li>{t('directPayment.bullets.currencies')}</li>
                <li>{t('directPayment.bullets.noTokens')}</li>
                <li>{t('directPayment.bullets.convertLater')}</li>
              </ul>
              <Link
                href="/checkout"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition"
              >
                <span>{t('directPayment.cta')}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </HomeSection>

        {/* How tokens work */}
        <HomeSection className="pb-10">
          <div className="space-y-5">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('howTokensWork.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('howTokensWork.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              {[
                t.raw('howTokensWork.steps.step1'),
                t.raw('howTokensWork.steps.step2'),
                t.raw('howTokensWork.steps.step3'),
                t.raw('howTokensWork.steps.step4'),
              ].map((step: any, index: number) => (
                <motion.div
                  key={index}
                  className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="text-[11px] font-semibold text-slate-400">{step.number}</div>
                  <div className="font-semibold text-slate-50">{step.title}</div>
                  <div className="text-xs text-slate-300/90">{step.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* Risk & legal notes */}
        <HomeSection className="pb-10">
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-50">{t('riskNotice.title')}</h3>
              </div>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300/90">
              <p>{t('riskNotice.paragraph1')}</p>
              <p>{t('riskNotice.paragraph2')}</p>
            </div>
            <Link
              href="/risk-and-disclaimer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition"
            >
              <span>{t('riskNotice.cta')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </HomeSection>

        {/* Final CTA */}
        <HomeSection className="pb-12">
          <div className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">{t('cta.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/top-up"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {t('cta.choosePack')}
              </Link>
              <Link
                href="/top-up"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
              >
                {t('cta.setTopUp')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

