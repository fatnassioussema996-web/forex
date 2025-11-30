// components/TokenPacks.tsx - Token packs component

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Coins, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { HomeSection } from './HomeSection'
import { calculatePriceForTokens, formatPrice, getCurrencySymbol } from '@/lib/currency-utils'
import { getUserCurrency } from '@/lib/currency-client'

export function TokenPacks() {
  const t = useTranslations('home.tokenPacks')
  const [currency, setCurrency] = useState('GBP')
  const [customAmount, setCustomAmount] = useState('0.01')

  useEffect(() => {
    setCurrency(getUserCurrency())
  }, [])

  const sanitizeAmount = (value: string): string => {
    // Заменяем запятую на точку
    let sanitized = String(value).replace(',', '.')
    // Удаляем все символы кроме цифр и точки
    sanitized = sanitized.replace(/[^\d.]/g, '')
    
    // Ограничиваем до 2 знаков после запятой
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

  const packs = (t.raw('packs') as any[]).map((pack: any) => ({
    ...pack,
    price: calculatePriceForTokens(pack.tokens, currency),
    formattedPrice: formatPrice(calculatePriceForTokens(pack.tokens, currency), currency),
  }))

  const customTopUp = t.raw('customTopUp') as any

  return (
    <HomeSection className="pb-14">
      <div className="space-y-6">
        <div className="max-w-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('title')}</h2>
          <p className="text-sm text-slate-300/90">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm">
          {/* Pack 1 */}
          <motion.div
            className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Coins className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{packs[0].name}</div>
                  <div className="text-[11px] text-slate-400">{packs[0].subtitle}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-50">{packs[0].formattedPrice}</div>
              <div className="text-[11px] text-slate-400">
                ≈ {packs[0].tokens.toLocaleString('en-US')} {t('tokens')} · {packs[0].description}
              </div>
            </div>
            <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
              {(packs[0].benefits as string[]).map((benefit: string, i: number) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Link
                href="/pricing"
                className="mb-1 inline-flex items-center justify-center w-full px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {packs[0].cta}
              </Link>
            </div>
          </motion.div>

          {/* Pack 2 – most popular */}
          <motion.div
            className="bg-slate-950/80 border border-cyan-500/60 rounded-2xl p-4 flex flex-col gap-3 shadow-[0_18px_40px_rgba(8,145,178,0.45)]"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Coins className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{packs[1].name}</div>
                  <div className="text-[11px] text-slate-400">{packs[1].subtitle}</div>
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/60 text-[10px] text-cyan-200 font-medium text-center">
                {t('mostPopular')}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-50">{packs[1].formattedPrice}</div>
              <div className="text-[11px] text-slate-400">
                ≈ {packs[1].tokens.toLocaleString('en-US')} {t('tokens')} · {packs[1].description}
              </div>
            </div>
            <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
              {(packs[1].benefits as string[]).map((benefit: string, i: number) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Link
                href="/pricing"
                className="mb-1 inline-flex items-center justify-center w-full px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {packs[1].cta}
              </Link>
            </div>
          </motion.div>

          {/* Pack 3 */}
          <motion.div
            className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Coins className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">{packs[2].name}</div>
                  <div className="text-[11px] text-slate-400">{packs[2].subtitle}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-50">{packs[2].formattedPrice}</div>
              <div className="text-[11px] text-slate-400">
                ≈ {packs[2].tokens.toLocaleString('en-US')} {t('tokens')} · {packs[2].description}
              </div>
            </div>
            <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
              {(packs[2].benefits as string[]).map((benefit: string, i: number) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Link
                href="/pricing"
                className="mb-1 inline-flex items-center justify-center w-full px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {packs[2].cta}
              </Link>
            </div>
          </motion.div>

          {/* Custom top-up */}
          <motion.div
            className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                <PlusCircle className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-50">{customTopUp.title}</div>
                <div className="text-[11px] text-slate-400">{customTopUp.subtitle}</div>
              </div>
            </div>
            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-xs">{getCurrencySymbol(currency)}</span>
                  </div>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    inputMode="decimal"
                    placeholder="0.01"
                    className="w-full pl-7 pr-3 py-2 text-xs text-slate-100 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-400">{customTopUp.minAmount}</div>
            </div>
            <div className="mt-auto pt-2">
              <Link
                href="/top-up"
                className="mb-1 inline-flex items-center justify-center w-full px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {customTopUp.cta}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </HomeSection>
  )
}

