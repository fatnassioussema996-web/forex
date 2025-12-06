// components/AiStrategiesPage.tsx - AI strategies dashboard page

'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Cpu,
  AlertTriangle,
  ChevronRight,
  Clock,
  Coins,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Target,
  Sparkles,
} from 'lucide-react'

import { DashboardNavigation } from './DashboardNavigation'
import { HomeSection } from './HomeSection'

type AiStrategyStatus = 'processing' | 'ready' | 'failed'

interface AiStrategy {
  id: string
  title: string
  markets: string[]
  status: AiStrategyStatus
  created: string
  tokens: number
  languages: string[]
  pdfLinks: Array<{ language: 'en' | 'ar'; url: string }>
}

function StatusBadge({ status, t }: { status: AiStrategyStatus; t: any }) {
  let classes =
    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] w-fit whitespace-nowrap'
  let icon: React.ReactNode = null

  switch (status) {
    case 'processing':
      classes += ' border-cyan-500/60 text-cyan-200'
      icon = <Clock className="w-3 h-3 flex-shrink-0" />
      break
    case 'ready':
      classes += ' border-emerald-500/70 text-emerald-200'
      icon = <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
      break
    case 'failed':
      classes += ' border-rose-500/70 text-rose-200'
      icon = <XCircle className="w-3 h-3 flex-shrink-0" />
      break
  }

  return (
    <span className={classes}>
      {icon}
      <span>{t(`status.${status}`)}</span>
    </span>
  )
}

export function AiStrategiesPage() {
  const t = useTranslations('dashboard.aiStrategiesPage')
  const tDashboard = useTranslations('dashboard')
  const { data: session, status } = useSession()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | AiStrategyStatus>('all')
  const [strategies, setStrategies] = useState<AiStrategy[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard/ai-strategies')
    }
  }, [status, router])

  useEffect(() => {
    async function fetchStrategies() {
      if (!session?.user?.id || status !== 'authenticated') return

      try {
        setIsLoading(true)
        const response = await fetch('/api/ai-strategies')
        if (!response.ok) {
          console.error('Failed to fetch AI strategies')
          return
        }
        const data = await response.json()
        setStrategies(data.strategies || [])
      } catch (error) {
        console.error('Error fetching AI strategies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStrategies()
  }, [session?.user?.id, status])

  const filteredStrategies = useMemo(() => {
    return strategies.filter((strategy) => {
      const matchesSearch =
        searchQuery === '' ||
        strategy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        strategy.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || strategy.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [strategies, searchQuery, statusFilter])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated' || !session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-12">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-25 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_55%)]" />

      <main className="pt-6">
        <DashboardNavigation />

        <HomeSection className="pb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-[11px] text-slate-500">
              <Link href="/dashboard" className="hover:text-slate-300 transition">
                {tDashboard('breadcrumb.dashboard')}
              </Link>
              <span className="text-slate-600"> / </span>
              <span className="text-slate-300">{t('title')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">{t('heading')}</h1>
            <p className="text-xs sm:text-sm text-slate-300/90 max-w-xl">{t('subtitle')}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 text-[11px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 border border-slate-800 px-3 py-1.5">
              <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-200 font-medium">{t('deliveryInfo.title')}</span>
                <span className="text-slate-500">{t('deliveryInfo.subtitle')}</span>
              </div>
            </div>
            <Link
              href="/learn?tab=custom"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition"
            >
              <Target className="w-3 h-3" />
              <span>{t('switchToCustom')}</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </HomeSection>

        <HomeSection className="pb-6 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/learn?tab=ai"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-cyan-400 text-slate-950 text-xs sm:text-sm font-semibold hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                <Cpu className="w-4 h-4" />
                <span>{t('generateNewStrategy')}</span>
              </Link>
            </div>
            <div className="flex-1 flex items-center gap-2 md:justify-end">
              <div className="flex-1 max-w-xs flex items-center gap-2 rounded-xl bg-slate-950/90 border border-slate-800 px-3 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="bg-transparent border-none outline-none text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 flex-1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800">
              <span>{t('filters.status')}:</span>
            </div>
            {(['all', 'processing', 'ready', 'failed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded-full border transition ${
                  statusFilter === f
                    ? 'bg-slate-100 text-slate-950 border-slate-100'
                    : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                {t(`filters.statusOptions.${f}`)}
              </button>
            ))}
          </div>
        </HomeSection>

        <HomeSection className="pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-slate-50">{t('strategies.title')}</div>
                <div className="text-[11px] text-slate-400">{t('strategies.subtitle')}</div>
              </div>
            </div>

            {isLoading ? (
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 text-center">
                <div className="text-sm text-slate-400">Loading...</div>
              </div>
            ) : filteredStrategies.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-slate-900 bg-slate-950/80">
                <div className="grid grid-cols-12 px-4 py-2 text-[11px] text-slate-400 border-b border-slate-900">
                  <div className="col-span-3">{t('table.title')}</div>
                  <div className="col-span-2">{t('table.marketLevel')}</div>
                  <div className="col-span-2">{t('table.tokens')}</div>
                  <div className="col-span-2">{t('table.status')}</div>
                  <div className="col-span-2">{t('table.created')}</div>
                  <div className="col-span-1 text-right">{t('table.actions')}</div>
                </div>
                <div className="divide-y divide-slate-900">
                  {filteredStrategies.map((strategy) => (
                    <motion.div
                      key={strategy.id}
                      className="grid grid-cols-12 px-4 py-3 text-[11px] text-slate-200 hover:bg-slate-900/70 transition-colors"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="col-span-3 flex flex-col gap-0.5 pr-2">
                        <span className="font-medium text-slate-50 truncate">{strategy.title}</span>
                        <span className="text-slate-500">#{strategy.id}</span>
                      </div>
                      <div className="col-span-2 flex flex-col gap-0.5">
                        <span className="text-slate-100 truncate">
                          {strategy.markets.length > 0 ? strategy.markets.join(', ') : t('table.noMarket')}
                        </span>
                        <span className="text-slate-500 capitalize">{strategy.languages.join(', ')}</span>
                      </div>
                      <div className="col-span-2 flex items-center text-slate-300">
                        <Coins className="w-3 h-3 text-cyan-300 mr-1.5" />
                        <span>{strategy.tokens.toLocaleString('en-US')}</span>
                      </div>
                      <div className="col-span-2 flex flex-col gap-1 items-start">
                        <StatusBadge status={strategy.status} t={t} />
                      </div>
                      <div className="col-span-2 flex items-center text-slate-300">
                        {new Date(strategy.created).toLocaleDateString()}
                      </div>
                      <div className="col-span-1 flex items-center justify-end">
                        {strategy.status === 'ready' && strategy.pdfLinks.length > 0 ? (
                          <div className="flex flex-col items-end gap-1 text-right">
                            {strategy.pdfLinks.map((link) => (
                              <a
                                key={`${strategy.id}-${link.language}`}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition"
                              >
                                <Download className="w-3 h-3" />
                                <span>{t(`actions.downloadPDF_${link.language}`)}</span>
                              </a>
                            ))}
                          </div>
                        ) : strategy.status === 'ready' ? (
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{t('actions.checkEmail')}</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">{t('actions.processing')}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-8 text-center">
                <AlertTriangle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <div className="text-sm font-semibold text-slate-100 mb-1">{t('emptyState.title')}</div>
                <div className="text-[11px] text-slate-400">{t('emptyState.description')}</div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 text-[11px] text-slate-300/90 space-y-2"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                <div className="text-xs font-semibold text-slate-100">{t('sidebar.builder.title')}</div>
              </div>
              <ul className="space-y-1.5">
                <li>• {t('sidebar.builder.points.objective')}</li>
                <li>• {t('sidebar.builder.points.market')}</li>
                <li>• {t('sidebar.builder.points.risk')}</li>
                <li>• {t('sidebar.builder.points.languages')}</li>
              </ul>
              <p className="text-slate-400 mt-1">{t('sidebar.builder.note')}</p>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 text-[11px] text-slate-300/90 space-y-2"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Coins className="w-3.5 h-3.5 text-emerald-300" />
                <div className="text-xs font-semibold text-slate-100">{t('sidebar.delivery.title')}</div>
              </div>
              <p className="text-slate-400">{t('sidebar.delivery.description')}</p>
              <ul className="space-y-1.5">
                <li>• {t('sidebar.delivery.points.pdf')}</li>
                <li>• {t('sidebar.delivery.points.email')}</li>
                <li>• {t('sidebar.delivery.points.library')}</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 text-[11px] text-slate-300/90 space-y-2"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <div className="text-xs font-semibold text-slate-100">{t('sidebar.tips.title')}</div>
              </div>
              <p className="text-slate-400">{t('sidebar.tips.description')}</p>
              <Link
                href="/risk-and-disclaimer"
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
              >
                <span>{t('sidebar.tips.cta')}</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}


