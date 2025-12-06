// components/TopUpPage.tsx - Top-up page component

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Coins,
  PlusCircle,
  ArrowRight,
} from 'lucide-react'
import { HomeSection } from './HomeSection'
import { calculatePriceForTokens, formatPrice, getCurrencySymbol } from '@/lib/currency-utils'
import { getUserCurrency } from '@/lib/currency-client'

export function TopUpPage() {
  const t = useTranslations('topUp')
  const tHome = useTranslations('home.tokenPacks')
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

  // Get packs from home.tokenPacks
  const packs = (tHome.raw('packs') as any[]).map((pack: any, index: number) => ({
    ...pack,
    price: calculatePriceForTokens(pack.tokens, currency),
    formattedPrice: formatPrice(calculatePriceForTokens(pack.tokens, currency), currency),
    highlighted: index === 1, // Structured Growth is highlighted
    label: index === 1 ? t('packs.mostPopular') : undefined,
  }))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        {/* Header */}
        <HomeSection className="pb-8">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
              {t('title')}
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90">
              {t('subtitle')}
            </p>
          </div>
        </HomeSection>

        {/* Token packs */}
        <HomeSection className="pb-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-50">
                {t('packs.title')}
              </h2>
              <p className="text-sm text-slate-300/90">
                {t('packs.subtitle')}
              </p>
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
                      ≈ {pack.tokens.toLocaleString('en-US')} {t('tokens')}
                    </div>
                  </div>
                  <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
                    {pack.benefits.map((benefit: string, i: number) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/checkout?pack=${pack.id}`}
                    className="mt-2 inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
                  >
                    {t('buyPack', { name: pack.name })}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* Custom top-up */}
        <HomeSection className="pb-10">
          <motion.div
            className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                <PlusCircle className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-50">{t('customTopUp.title')}</h3>
                <p className="text-xs text-slate-300/90">{t('customTopUp.subtitle')}</p>
              </div>
            </div>
            <div className="space-y-2">
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
              </div>
              <div className="text-[11px] text-slate-400">{t('customTopUp.minAmount')}</div>
            </div>
            <Link
              href={`/checkout?custom=${customAmount}&currency=${currency}`}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
            >
              <span>{t('customTopUp.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </HomeSection>
      </main>
    </div>
  )
}

