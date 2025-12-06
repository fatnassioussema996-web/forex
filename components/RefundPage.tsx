'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Info, FileText, Shield, CreditCard, AlertTriangle, LifeBuoy } from 'lucide-react'
import { HomeSection } from './HomeSection'

type SummaryCard = {
  title: string
  subtitle: string
  items: string[]
  note: string
}

type HeroMeta = {
  label: string
  value: string
}[]

type TocItem = {
  label: string
  anchor: string
}

type Toc = {
  title: string
  items: TocItem[]
  reminder: {
    label: string
    text: string
  }
}

type DefinitionItem = {
  term: string
  description: string
}

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'definition'; items: DefinitionItem[] }
  | { type: 'note'; text: string }

type Section = {
  id: string
  number: string
  title: string
  accent?: 'default' | 'warning'
  content: ContentBlock[]
}

export function RefundPage() {
  const t = useTranslations('refund')
  const tBreadcrumb = useTranslations('courses.breadcrumb')

  const summaryCard = (t.raw('hero.summaryCard') as SummaryCard) || null
  const heroMeta = (Array.isArray(t.raw('hero.meta')) ? (t.raw('hero.meta') as HeroMeta) : []) || []
  const toc = (t.raw('toc') as Toc) || null
  const sections = (Array.isArray(t.raw('sections')) ? (t.raw('sections') as Section[]) : []) || []

  const renderContentBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case 'list':
        return (
          <ul key={`list-${idx}`} className="list-disc pl-5 space-y-1 text-slate-300/90">
            {block.items.map((item, listIdx) => (
              <li key={listIdx}>{item}</li>
            ))}
          </ul>
        )
      case 'definition':
        return (
          <dl key={`definition-${idx}`} className="space-y-2">
            {block.items.map((item, defIdx) => (
              <div key={defIdx}>
                <dt className="text-slate-100 font-semibold text-sm">{item.term}</dt>
                <dd className="text-slate-300/90 text-[13px]">{item.description}</dd>
              </div>
            ))}
          </dl>
        )
      case 'note':
        return (
          <div key={`note-${idx}`} className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-3 py-2 text-[12px] text-cyan-100">
            {block.text}
          </div>
        )
      case 'paragraph':
      default:
        return (
          <p key={`paragraph-${idx}`} className="text-slate-300/90">
            {block.type === 'paragraph' ? block.text : (block as any)}
          </p>
        )
    }
  }

  const getSectionStyles = (accent?: 'default' | 'warning') => {
    if (accent === 'warning') {
      return {
        wrapper: 'border border-amber-500/40',
        number: 'text-amber-200',
        title: 'text-amber-100',
      }
    }

    return {
      wrapper: 'border border-slate-800',
      number: 'text-slate-400',
      title: 'text-slate-50',
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        <HomeSection className="pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Link href="/" className="hover:text-slate-300 transition">
                  {tBreadcrumb('home')}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t('breadcrumb.refund')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl">{t('hero.subtitle')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300/80">
                {Array.isArray(heroMeta) && heroMeta.length > 0
                  ? heroMeta.map((meta) => (
                      <div key={meta.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/70">
                        <Shield className="w-3 h-3 text-cyan-300" />
                        <span className="text-slate-400">{meta.label}:</span>
                        <span className="text-slate-100">{meta.value}</span>
                      </div>
                    ))
                  : null}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <CreditCard className="w-3 h-3" />
                  <span>{t('hero.badges.payments')}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <LifeBuoy className="w-3 h-3" />
                  <span>{t('hero.badges.support')}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-amber-500/60 text-amber-100">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{t('hero.badges.digitalOnly')}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <motion.div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 flex flex-col gap-3" whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <Info className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{summaryCard?.title}</div>
                    <div className="text-[11px] text-slate-400">{summaryCard?.subtitle}</div>
                  </div>
                </div>
                <ul className="text-[11px] text-slate-300/90 space-y-1.5">
                  {summaryCard?.items && Array.isArray(summaryCard.items)
                    ? summaryCard.items.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))
                    : null}
                </ul>
                {summaryCard?.note && <div className="text-[11px] text-slate-400">{summaryCard.note}</div>}
              </motion.div>
            </div>
          </div>
        </HomeSection>

        <HomeSection className="pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 space-y-3 text-[11px]">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 text-cyan-300" />
                  <div className="text-xs font-semibold text-slate-50">{toc?.title}</div>
                </div>
                <ul className="space-y-1.5 text-slate-300/90">
                  {toc?.items && Array.isArray(toc.items)
                    ? toc.items.map((item, idx: number) => (
                        <li key={item.anchor} className="flex items-start gap-1.5">
                          <span className="text-slate-500">{idx + 1}.</span>
                          <a href={`#${item.anchor}`} className="hover:text-cyan-300 transition-colors">
                            {item.label}
                          </a>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 space-y-1.5 text-slate-400">
                <div className="text-[10px] uppercase tracking-[0.16em]">{toc?.reminder?.label}</div>
                <p className="text-[11px]">{toc?.reminder?.text}</p>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-5 text-[13px] text-slate-300/90">
              {Array.isArray(sections) && sections.length > 0
                ? sections.map((section) => {
                    const theme = getSectionStyles(section.accent)
                    return (
                      <motion.section key={section.id} id={section.id} className={`bg-slate-950/80 rounded-2xl p-4 sm:p-5 space-y-3 ${theme.wrapper}`} whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[11px] font-semibold ${theme.number}`}>{section.number}.</span>
                          <span className={`text-sm font-semibold ${theme.title}`}>{section.title}</span>
                        </div>
                        {section.content && Array.isArray(section.content)
                          ? section.content.map((block, idx) => renderContentBlock(block, idx))
                          : null}
                      </motion.section>
                    )
                  })
                : null}
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
              <Link href="/contact" className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-slate-100 text-slate-950 hover:bg-slate-200 transition">
                {t('cta.contactSupport')}
              </Link>
              <Link href="/" className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition">
                {t('cta.backHome')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}


