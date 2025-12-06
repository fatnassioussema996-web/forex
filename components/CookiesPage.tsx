// components/CookiesPage.tsx - Cookies Policy page component

'use client'

import { useEffect, useRef, type ComponentType } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  FileText,
  Globe2,
  Info,
  Lock,
  Mail,
  MapPin,
  Settings2,
  ShieldCheck,
} from 'lucide-react'
import { HomeSection } from './HomeSection'
import { useToast } from '@/hooks/use-toast'

type SectionCard = {
  icon: string
  title: string
  description: string
}

type SectionTable = {
  headers: string[]
  rows: {
    name: string
    purpose: string
    category: string
    lifetime: string
  }[]
}

type SectionBlock = {
  id: string
  number: string
  title: string
  content?: string[]
  list?: string[]
  cards?: SectionCard[]
  table?: SectionTable
  contacts?: string[]
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  settings: Settings2,
  cpu: Cpu,
  lock: Lock,
  alert: AlertTriangle,
}

export function CookiesPage() {
  const t = useTranslations('cookies')
  const { showToast } = useToast()
  const snapshotCard = t.raw('hero.snapshotCard') as {
    title: string
    subtitle: string
    items: string[]
    note: string
  }
  const hero = t.raw('hero') as any
  const metaPanel = t.raw('metaPanel') as any
  const toc = t.raw('toc') as any
  const sections = t.raw('sections') as SectionBlock[]
  const entryToast = t.raw('entryToast') as { title: string; description: string }
  const toastShownRef = useRef(false)

  const openCookieSettings = () => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('open-cookie-settings'))
  }

  useEffect(() => {
    if (toastShownRef.current) return
    if (entryToast?.title) {
      showToast({
        title: entryToast.title,
        description: entryToast.description,
        variant: 'info',
        duration: 6500,
      })
      toastShownRef.current = true
    }
  }, [entryToast, showToast])

  const renderSectionCards = (cards: SectionCard[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px]">
      {cards.map((card, idx) => {
        const Icon = iconMap[card.icon] ?? ShieldCheck
        return (
          <div key={`${card.title}-${idx}`} className="bg-slate-950 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon className="w-4 h-4 text-cyan-300" />
              <span className="font-semibold text-slate-100 text-sm">{card.title}</span>
            </div>
            <p className="text-slate-300/90">{card.description}</p>
          </div>
        )
      })}
    </div>
  )

  const renderSectionTable = (table: SectionTable) => (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800 text-[12px]">
        <thead className="bg-slate-950/80 text-slate-200 text-left">
          <tr>
            {table.headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold uppercase tracking-wide text-[10px]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/70 text-slate-300/90">
          {table.rows.map((row, idx) => (
            <tr key={`${row.name}-${idx}`} className="hover:bg-slate-900/30 transition">
              <td className="px-4 py-3 font-semibold text-slate-100">{row.name}</td>
              <td className="px-4 py-3">{row.purpose}</td>
              <td className="px-4 py-3 text-slate-100">{row.category}</td>
              <td className="px-4 py-3">{row.lifetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        <HomeSection className="pb-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Link href="/" className="hover:text-slate-300 transition">
                  {t('breadcrumb.home')}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t('breadcrumb.cookies')}</span>
              </div>

              <div className="inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full border border-slate-800 bg-slate-950/60 text-cyan-200 w-fit">
                <Info className="w-3.5 h-3.5" />
                <span>{hero.pill}</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{hero.title}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-3xl">{hero.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <Globe2 className="w-3.5 h-3.5" />
                  {hero.badges.regions}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <FileText className="w-3.5 h-3.5" />
                  {hero.badges.features}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-amber-500/60 text-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {hero.badges.optional}
                </span>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-4 space-y-2">
                <p className="text-[12px] text-slate-300/90">{hero.note}</p>
                <ul className="space-y-1.5">
                  {hero.highlights?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-[12px] text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <Info className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{snapshotCard?.title}</div>
                    <div className="text-[11px] text-slate-400">{snapshotCard?.subtitle}</div>
                  </div>
                </div>
                <ul className="text-[11px] text-slate-300/90 space-y-1.5 leading-relaxed">
                  {snapshotCard?.items?.map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
                <div className="text-[11px] text-slate-400">{snapshotCard?.note}</div>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        <HomeSection className="pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4 space-y-4 text-[12px]">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-300" />
                  <span className="text-xs font-semibold text-slate-50">{toc.title}</span>
                </div>
                <ul className="space-y-1.5 text-slate-300/90">
                  {toc.items?.map((item: string, idx: number) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {toc.relatedPages.label}
                </div>
                <p className="text-slate-400 text-[12px] leading-relaxed">
                  {toc.relatedPages.text}{' '}
                  <Link href="/privacy" className="underline decoration-slate-600 hover:text-slate-100 transition">
                    {toc.relatedPages.privacyLink}
                  </Link>{' '}
                  ·{' '}
                  <Link href="/terms" className="underline decoration-slate-600 hover:text-slate-100 transition">
                    {toc.relatedPages.termsLink}
                  </Link>{' '}
                  {toc.relatedPages.suffix}
                </p>
              </div>

              <motion.div
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3"
                whileHover={{ y: -3 }}
              >
                <div className="text-[11px] font-semibold text-slate-200">{metaPanel.effectiveDate}</div>
                <p className="text-[12px] text-slate-400">{metaPanel.compliance}</p>
                <div className="space-y-2">
                  {metaPanel.details?.map((detail: any) => (
                    <div key={detail.label}>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{detail.label}</div>
                      <div className="text-slate-200">{detail.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </aside>

            <div className="lg:col-span-8 space-y-5 text-[13px] text-slate-300/90">
              {sections?.map((section) => (
                <motion.section
                  key={section.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">{section.number}.</span>
                    <span className="text-sm font-semibold text-slate-50">{section.title}</span>
                  </div>
                  {section.content?.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}

                  {section.list && (
                    <ul className="space-y-1.5 text-[12px] text-slate-200">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.cards && renderSectionCards(section.cards)}
                  {section.table && renderSectionTable(section.table)}

                  {section.contacts && (
                    <div className="space-y-1 text-[12px]">
                      {section.contacts.map((contact, idx) => (
                        <div key={contact} className="flex items-start gap-2">
                          {idx === 0 ? (
                            <Mail className="w-4 h-4 text-cyan-300 mt-0.5" />
                          ) : (
                            <MapPin className="w-4 h-4 text-cyan-300 mt-0.5" />
                          )}
                          <span>{contact}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          </div>
        </HomeSection>

        <HomeSection className="pb-12">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">{t('cta.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-slate-100 text-slate-950 hover:bg-slate-200 transition"
              >
                {t('cta.backToHome')}
              </Link>
              <button
                onClick={openCookieSettings}
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 transition hover:border-slate-500"
              >
                {t('cta.openCookieSettings')}
              </button>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

