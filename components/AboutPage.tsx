// components/AboutPage.tsx - About page component

'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldCheck,
  Info,
  Users,
  Globe2,
  BookOpen,
  Cpu,
  FileText,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Clock,
  Scale,
  Brain,
  LineChart,
  Activity,
  CreditCard,
  ArrowRight,
} from 'lucide-react'
import { HomeSection } from './HomeSection'

export function AboutPage() {
  const t = useTranslations('about')
  const tBreadcrumb = useTranslations('courses.breadcrumb')

  // Get profiles from translations
  const profiles = (t.raw('whoIsFor') as any)?.profiles as Array<{
    title: string
    description: string
  }>

  // Get howWeBuild items from translations
  const howWeBuildItems = (t.raw('howWeBuild') as any)?.items as Array<{
    title: string
    description: string
  }>

  // Get regions items from translations
  const regionsItems = (t.raw('regions') as any)?.items as Array<{
    title: string
    description: string
  }>

  // Get principles items from translations
  const principlesItems = (t.raw('principles') as any)?.items as Array<{
    title: string
    description: string
  }>

  // Get neverDoes items from translations
  const neverDoesItems = (t.raw('neverDoes') as any)?.items as string[]

  // Get whatWeAre and whatWeAreNot items
  const whatWeAreItems = (t.raw('hero.sideCard') as any)?.whatWeAre?.items as string[]
  const whatWeAreNotItems = (t.raw('hero.sideCard') as any)?.whatWeAreNot?.items as string[]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        {/* Hero / Intro */}
        <HomeSection className="pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Link href="/" className="hover:text-slate-300 transition">
                  {tBreadcrumb('home')}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t('breadcrumb.about')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">{t('hero.subtitle')}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <Globe2 className="w-3 h-3" />
                  <span>{t('hero.badges.regions')}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <MapPin className="w-3 h-3" />
                  <span>{t('hero.badges.markets')}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  <FileText className="w-3 h-3" />
                  <span>{t('hero.badges.format')}</span>
                </div>
              </div>
            </div>

            {/* What Avenqor is / is not */}
            <div className="lg:col-span-5">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <Info className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{t('hero.sideCard.title')}</div>
                    <div className="text-[11px] text-slate-400">{t('hero.sideCard.subtitle')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-cyan-300" />
                      <span>{t('hero.sideCard.whatWeAre.label')}</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-300/90">
                      {whatWeAreItems?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      <AlertTriangle className="w-3 h-3 text-amber-300" />
                      <span>{t('hero.sideCard.whatWeAreNot.label')}</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-300/90">
                      {whatWeAreNotItems?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        {/* Who Avenqor is for */}
        <HomeSection className="pb-10 space-y-6">
          <div className="max-w-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('whoIsFor.title')}</h2>
            <p className="text-sm text-slate-300/90">{t('whoIsFor.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {profiles?.map((profile, idx) => {
              const icons = [Users, Activity, Brain]
              const Icon = icons[idx] || Users
              return (
                <motion.div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="text-xs font-semibold text-slate-50">{profile.title}</div>
                  </div>
                  <p className="text-[11px] text-slate-300/90">{profile.description}</p>
                </motion.div>
              )
            })}
          </div>
        </HomeSection>

        {/* How we build courses */}
        <HomeSection className="pb-10 space-y-6">
          <div className="max-w-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('howWeBuild.title')}</h2>
            <p className="text-sm text-slate-300/90">{t('howWeBuild.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
            {howWeBuildItems?.map((item, idx) => {
              const icons = [BookOpen, FileText, Cpu]
              const Icon = icons[idx] || BookOpen
              return (
                <motion.div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="text-xs font-semibold text-slate-50">{item.title}</div>
                  </div>
                  <p className="text-[11px] text-slate-300/90">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </HomeSection>

        {/* Regions, currencies, languages */}
        <HomeSection className="pb-10 space-y-6">
          <div className="max-w-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('regions.title')}</h2>
            <p className="text-sm text-slate-300/90">{t('regions.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {regionsItems?.map((item, idx) => {
              const icons = [Globe2, CreditCard, Users]
              const Icon = icons[idx] || Globe2
              return (
                <motion.div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <div className="text-xs font-semibold text-slate-50">{item.title}</div>
                  </div>
                  <p className="text-[11px] text-slate-300/90">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </HomeSection>

        {/* Principles */}
        <HomeSection className="pb-10 space-y-6">
          <div className="max-w-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">{t('principles.title')}</h2>
            <p className="text-sm text-slate-300/90">{t('principles.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {principlesItems?.map((item, idx) => {
              const icons = [ShieldCheck, Scale, LineChart, Clock]
              const Icon = icons[idx] || ShieldCheck
              return (
                <motion.div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <div className="text-xs font-semibold text-slate-50">{item.title}</div>
                  </div>
                  <p className="text-[11px] text-slate-300/90">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </HomeSection>

        {/* What Avenqor never does */}
        <HomeSection className="pb-10">
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl px-5 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-50">{t('neverDoes.title')}</div>
                <div className="text-[11px] text-slate-400">{t('neverDoes.subtitle')}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300/90">
              <ul className="space-y-1.5">
                {neverDoesItems?.slice(0, 3).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <ul className="space-y-1.5">
                {neverDoesItems?.slice(3).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <Link
              href="/risk-and-disclaimer"
              className="self-start inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition mt-1"
            >
              <span>{t('neverDoes.readMore')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </HomeSection>

        {/* Final CTA */}
        <HomeSection className="pb-12">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">{t('cta.title')}</h2>
              <p className="text-sm text-slate-300/90">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {t('cta.browseCourses')}
              </Link>
              <Link
                href="/learn?tab=custom"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
              >
                {t('cta.requestCustom')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

