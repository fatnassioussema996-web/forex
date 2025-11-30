// components/LearnPage.tsx - Learn page component with Custom Course and AI Strategy tabs

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import {
  UserCog,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  SlidersHorizontal,
  Clock,
  FileText,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react'
import Link from 'next/link'
import { HomeSection } from './HomeSection'

type TabKey = 'custom' | 'ai'

function LearnTabSwitcher({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (key: TabKey) => void
}) {
  const t = useTranslations('learn.tabs')

  const tabs: { key: TabKey; label: string; icon: typeof UserCog }[] = [
    {
      key: 'custom',
      label: t('custom'),
      icon: UserCog,
    },
    {
      key: 'ai',
      label: t('ai'),
      icon: Cpu,
    },
  ]

  return (
    <div className="inline-flex items-stretch rounded-full bg-slate-950/90 border border-slate-800 p-1 text-xs">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              isActive
                ? 'bg-slate-100 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-cyan-300'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-cyan-300'}`}
            />
            <span className="font-medium">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function CustomCourseForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { showToast } = useToast()
  const t = useTranslations('learn.custom')
  const tForm = useTranslations('learn.custom.form')
  const tSidebar = useTranslations('learn.custom.sidebar')
  const tAuth = useTranslations('learn.auth')
  const tCommon = useTranslations('common.auth')

  const [experience, setExperience] = useState<string>('')
  const [markets, setMarkets] = useState<string[]>([])
  const [deposit, setDeposit] = useState<string>('')
  const [riskTolerance, setRiskTolerance] = useState<string>('')
  const [tradingStyle, setTradingStyle] = useState<string>('')
  const [timeAvailable, setTimeAvailable] = useState('')
  const [platforms, setPlatforms] = useState('')
  const [goals, setGoals] = useState('')
  const [notes, setNotes] = useState('')
  const [consentEducation, setConsentEducation] = useState(false)
  const [consentTerms, setConsentTerms] = useState(false)

  const handleMarketToggle = (market: string) => {
    setMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      showToast({
        title: tAuth('required'),
        description: tCommon('signIn'),
        variant: 'info',
      })
      router.push('/login?redirect=/learn?tab=custom')
      return
    }

    // Validate required fields
    if (!experience || markets.length === 0 || !deposit || !riskTolerance || !tradingStyle || !goals || !consentEducation || !consentTerms) {
      showToast({
        title: 'Please fill all required fields',
        variant: 'error',
      })
      return
    }

    // TODO: Implement form submission
    console.log('Custom course form submitted', {
      experience,
      markets,
      deposit,
      riskTolerance,
      tradingStyle,
      timeAvailable,
      platforms,
      goals,
      notes,
      consentEducation,
      consentTerms,
    })
    
    showToast({
      title: 'Request submitted',
      description: 'Your custom course request has been submitted successfully.',
      variant: 'success',
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: form */}
      <div className="lg:col-span-7 space-y-4">
        <div className="space-y-2">
          <h2 className="text-sm sm:text-base font-semibold text-slate-50">{t('title')}</h2>
          <p className="text-xs sm:text-sm text-slate-300/90">{t('description')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Experience */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">{tForm('experience.label')}</span>
              <span className="text-[11px] text-slate-500">{tForm('experience.required')}</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['beginner', 'intermediate', 'advanced'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setExperience(key)}
                  className={`px-2.5 py-1 rounded-full border transition ${
                    experience === key
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {tForm(`experience.options.${key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Markets */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">{tForm('markets.label')}</span>
              <span className="text-[11px] text-slate-500">{tForm('markets.hint')}</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['forex', 'crypto', 'binary'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleMarketToggle(key)}
                  className={`px-2.5 py-1 rounded-full border transition ${
                    markets.includes(key)
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {tForm(`markets.${key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Deposit size */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">{tForm('deposit.label')}</span>
              <span className="text-[11px] text-slate-500">{tForm('deposit.hint')}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['low', 'medium', 'high', 'veryHigh'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDeposit(key)}
                  className={`px-2.5 py-1.5 rounded-xl border transition text-[11px] ${
                    deposit === key
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {tForm(`deposit.options.${key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Risk & style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-200">{tForm('risk.label')}</span>
                <span className="text-[11px] text-slate-500">{tForm('risk.hint')}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['low', 'medium', 'high'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRiskTolerance(key)}
                    className={`px-2.5 py-1 rounded-full border transition ${
                      riskTolerance === key
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    {tForm(`risk.${key}`)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-200">{tForm('style.label')}</span>
                <span className="text-[11px] text-slate-500">{tForm('style.hint')}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['scalping', 'day', 'swing', 'position'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTradingStyle(key)}
                    className={`px-2.5 py-1 rounded-full border transition ${
                      tradingStyle === key
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    {tForm(`style.${key}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time & tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('time.label')}</label>
              <input
                type="text"
                value={timeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder={tForm('time.placeholder')}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('platforms.label')}</label>
              <input
                type="text"
                value={platforms}
                onChange={(e) => setPlatforms(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder={tForm('platforms.placeholder')}
              />
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">{tForm('goals.label')}</span>
              <span className="text-[11px] text-slate-500">{tForm('goals.hint')}</span>
            </label>
            <textarea
              rows={4}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none resize-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder={tForm('goals.placeholder')}
            />
          </div>

          {/* Extra notes */}
          <div className="space-y-1.5">
            <label className="text-slate-200">{tForm('notes.label')}</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none resize-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder={tForm('notes.placeholder')}
            />
          </div>

          {/* Consents */}
          <div className="space-y-2 text-[11px] text-slate-300">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consentEducation}
                onChange={(e) => setConsentEducation(e.target.checked)}
                className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950 text-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <span>{tForm('consents.education')}</span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950 text-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <span className="text-[11px] text-slate-300">
                {tForm('consents.termsBefore')}{' '}
                <Link href="/terms" className="text-cyan-300 hover:text-cyan-200 underline">
                  {tForm('consents.termsLink')}
                </Link>{' '}
                {tForm('consents.termsAnd')}{' '}
                <Link href="/risk-and-disclaimer" className="text-cyan-300 hover:text-cyan-200 underline">
                  {tForm('consents.riskLink')}
                </Link>
                .
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
            >
              <span>{tForm('submit')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-slate-400">{tForm('delivery')}</p>
          </div>
        </form>
      </div>

      {/* RIGHT: explainer / risk / pricing note */}
      <div className="lg:col-span-5 space-y-4">
        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
            <Clock className="w-3 h-3 text-cyan-300" />
            <span>{tSidebar('delivery.badge')}</span>
          </div>
          <p className="text-[11px] text-slate-300/90">{tSidebar('delivery.description')}</p>
          <ul className="text-[11px] text-slate-300/90 space-y-1.5">
            <li>{tSidebar('delivery.points.modules')}</li>
            <li>{tSidebar('delivery.points.examples')}</li>
            <li>{tSidebar('delivery.points.checklist')}</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">{tSidebar('risk.title')}</span>
          </div>
          <p className="text-[11px] text-slate-100/90">{tSidebar('risk.description')}</p>
          <Link
            href="/risk-and-disclaimer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 mt-1"
          >
            <span>{tSidebar('risk.link')}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <h3 className="text-xs font-semibold text-slate-50 mb-1">{tSidebar('pricing.title')}</h3>
          <p className="text-[11px] text-slate-300/90">{tSidebar('pricing.description')}</p>
          <ul className="text-[11px] text-slate-300/90 space-y-1.5">
            <li>{tSidebar('pricing.points.tokens')}</li>
            <li>{tSidebar('pricing.points.currencies')}</li>
          </ul>
          <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
            <Layers className="w-3 h-3 text-cyan-300" />
            <span>{tSidebar('pricing.badge')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function AIStrategyForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { showToast } = useToast()
  const t = useTranslations('learn.ai')
  const tForm = useTranslations('learn.ai.form')
  const tOutput = useTranslations('learn.ai.output')
  const tSidebar = useTranslations('learn.ai.sidebar')
  const tAuth = useTranslations('learn.auth')
  const tCommon = useTranslations('common.auth')

  const [preset, setPreset] = useState<string>('')
  const [market, setMarket] = useState('forex')
  const [timeframe, setTimeframe] = useState('H1')
  const [riskPerTrade, setRiskPerTrade] = useState('')
  const [maxTrades, setMaxTrades] = useState('')
  const [instruments, setInstruments] = useState('')
  const [focus, setFocus] = useState('')
  const [detailLevel, setDetailLevel] = useState<string>('')
  const [consent, setConsent] = useState(false)
  const [consentTerms, setConsentTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      showToast({
        title: tAuth('required'),
        description: tCommon('signIn'),
        variant: 'info',
      })
      router.push('/login?redirect=/learn?tab=ai')
      return
    }

    // Validate required fields
    if (!market || !timeframe || !riskPerTrade || !maxTrades || !instruments || !detailLevel || !consent || !consentTerms) {
      showToast({
        title: 'Please fill all required fields',
        variant: 'error',
      })
      return
    }

    // TODO: Implement form submission
    console.log('AI strategy form submitted', {
      preset,
      market,
      timeframe,
      riskPerTrade,
      maxTrades,
      instruments,
      focus,
      detailLevel,
      consent,
      consentTerms,
    })
    
    showToast({
      title: 'Strategy generated',
      description: 'Your AI strategy has been generated successfully.',
      variant: 'success',
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: form */}
      <div className="lg:col-span-7 space-y-4">
        <div className="space-y-2">
          <h2 className="text-sm sm:text-base font-semibold text-slate-50">{t('title')}</h2>
          <p className="text-xs sm:text-sm text-slate-300/90">{t('description')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Presets */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-200">{tForm('presets.label')}</span>
              <span className="text-slate-500">{tForm('presets.hint')}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['conservative', 'balanced', 'scalping'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPreset(key)}
                  className={`px-2.5 py-1.5 rounded-full border transition ${
                    preset === key
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {tForm(`presets.${key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Core profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('market.label')}</label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
              >
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="binary">Binary options</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('timeframe.label')}</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
              >
                <option value="M15">M15</option>
                <option value="M30">M30</option>
                <option value="H1">H1</option>
                <option value="H4">H4</option>
                <option value="D1">D1</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('risk.label')}</label>
              <input
                type="number"
                step="0.1"
                value={riskPerTrade}
                onChange={(e) => setRiskPerTrade(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder={tForm('risk.placeholder')}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('maxTrades.label')}</label>
              <input
                type="number"
                value={maxTrades}
                onChange={(e) => setMaxTrades(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder={tForm('maxTrades.placeholder')}
              />
            </div>
          </div>

          {/* Instruments + notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('instruments.label')}</label>
              <input
                type="text"
                value={instruments}
                onChange={(e) => setInstruments(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder={tForm('instruments.placeholder')}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-200">{tForm('focus.label')}</label>
              <input
                type="text"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder={tForm('focus.placeholder')}
              />
            </div>
          </div>

          {/* Output options */}
          <div className="mt-4 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-200">{tForm('detail.label')}</span>
              <span className="text-slate-500">{tForm('detail.hint')}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['quick', 'standard', 'deep'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDetailLevel(key)}
                  className={`px-2.5 py-1.5 rounded-full border transition ${
                    detailLevel === key
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {tForm(`detail.${key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Consents */}
          <div className="mt-4 space-y-2 text-[11px] text-slate-300">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950 text-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <span>{tForm('consent')}</span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950 text-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <span className="text-[11px] text-slate-300">
                {tForm('consentTermsBefore')}{' '}
                <Link href="/terms" className="text-cyan-300 hover:text-cyan-200 underline">
                  {tForm('consentTermsLink')}
                </Link>{' '}
                {tForm('consentTermsAnd')}{' '}
                <Link href="/risk-and-disclaimer" className="text-cyan-300 hover:text-cyan-200 underline">
                  {tForm('consentRiskLink')}
                </Link>
                .
              </span>
            </label>
          </div>

          {/* CTA + preview note */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!consent || !consentTerms}
            >
              <span>{tForm('submit')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-slate-400">{tForm('output')}</p>
          </div>

          {/* Output preview placeholder */}
          <div className="mt-4 rounded-2xl bg-slate-950/80 border border-slate-900 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-50">{tOutput('title')}</div>
                  <div className="text-[11px] text-slate-400">{tOutput('description')}</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500">{tOutput('placeholder')}</div>
            </div>
            <div className="mt-2 space-y-1.5 text-[11px] text-slate-300/90">
              <p>
                <span className="font-semibold text-slate-100">{tOutput('sections.setup')}</span>{' '}
                {tOutput('setupDesc')}
              </p>
              <p>
                <span className="font-semibold text-slate-100">{tOutput('sections.entry')}</span>{' '}
                {tOutput('entryDesc')}
              </p>
              <p>
                <span className="font-semibold text-slate-100">{tOutput('sections.risk')}</span>{' '}
                {tOutput('riskDesc')}
              </p>
              <p>
                <span className="font-semibold text-slate-100">{tOutput('sections.checklist')}</span>{' '}
                {tOutput('checklistDesc')}
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* RIGHT: info cards */}
      <div className="lg:col-span-5 space-y-4">
        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
            <SlidersHorizontal className="w-3 h-3 text-cyan-300" />
            <span>{tSidebar('depth.badge')}</span>
          </div>
          <p className="text-[11px] text-slate-300/90">{tSidebar('depth.description')}</p>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <h3 className="text-xs font-semibold text-slate-50 mb-1">{tSidebar('courses.title')}</h3>
          <p className="text-[11px] text-slate-300/90">{tSidebar('courses.description')}</p>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">{tSidebar('risk.title')}</span>
          </div>
          <p className="text-[11px] text-slate-100/90">{tSidebar('risk.description')}</p>
          <Link
            href="/risk-and-disclaimer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 mt-1"
          >
            <span>{tSidebar('risk.link')}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export function LearnPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabKey>('custom')
  const t = useTranslations('learn')
  const tBreadcrumb = useTranslations('learn.breadcrumb')
  const tInfo = useTranslations('learn.info')
  const tNav = useTranslations('common.nav')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'custom' || tab === 'ai') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab)
    router.push(`/learn?tab=${tab}`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      <main className="pt-6">
        {/* Intro + tabs */}
        <HomeSection className="pb-6 space-y-6">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <Link href="/" className="hover:text-slate-300 transition">
                {tBreadcrumb('home')}
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{tBreadcrumb('learn')}</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">{t('title')}</h1>
                <p className="text-sm text-slate-300/90 max-w-xl">{t('subtitle')}</p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-2">
                <LearnTabSwitcher active={activeTab} onChange={handleTabChange} />
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-slate-800">
                    <Info className="w-3 h-3 text-cyan-300" />
                    <span>{tInfo('educationOnly')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeSection>

        {/* Content by tab */}
        <HomeSection className="pb-10">
          {activeTab === 'custom' ? <CustomCourseForm /> : <AIStrategyForm />}
        </HomeSection>
      </main>
    </div>
  )
}

