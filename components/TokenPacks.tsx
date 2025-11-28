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

  useEffect(() => {
    setCurrency(getUserCurrency())
  }, [])

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
            <Link
              href="/pricing"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
            >
              <span>{packs[0].cta}</span>
              <span>→</span>
            </Link>
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
              <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/60 text-[10px] text-cyan-200 font-medium">
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
            <Link
              href="/pricing"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
            >
              <span>{packs[1].cta}</span>
              <span>→</span>
            </Link>
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
            <Link
              href="/pricing"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
            >
              <span>{packs[2].cta}</span>
              <span>→</span>
            </Link>
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
                <div className="flex-1 flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2">
                  <span className="text-[11px] text-slate-400">{customTopUp.amountLabel}</span>
                  <span className="text-xs text-slate-100">0.01</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400">{customTopUp.minAmount}</div>
            </div>
            <Link
              href="/top-up"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
            >
              <span>{customTopUp.cta}</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </HomeSection>
  )
}

