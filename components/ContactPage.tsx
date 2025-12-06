// components/ContactPage.tsx - Contact page component

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  MessageSquare,
  Globe2,
  Clock,
  AlertTriangle,
  HelpCircle,
  FileText,
  User,
  MapPin,
  BookOpenCheck,
  Info,
} from 'lucide-react'
import { HomeSection } from './HomeSection'
import { useToast } from '@/hooks/use-toast'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address').max(200),
  region: z.string().min(1, 'Region is required'),
  topic: z.string().min(1, 'Topic is required'),
  accountId: z.string().max(100).optional(),
  language: z.string().min(1, 'Language is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactPage() {
  const t = useTranslations('contact')
  const tBreadcrumb = useTranslations('courses.breadcrumb')
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      consent: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        showToast({
          title: t('form.submit.success'),
          variant: 'success',
        })
        reset()
      } else {
        showToast({
          title: t('form.submit.error'),
          variant: 'error',
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      showToast({
        title: t('form.submit.error'),
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get data from translations
  const quickNotes = t.raw('hero.quickNotes') as any
  const sideCard = t.raw('hero.sideCard') as any
  const sideInfo = t.raw('sideInfo') as any

  const regions = ['EU', 'UK', 'UAE', 'Other']
  const topics = [
    'Courses',
    'Tokens & billing',
    'Account access',
    'Legal & compliance',
    'Other',
  ]
  const languages = ['English', 'Arabic']

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
                <span className="text-slate-300">{t('breadcrumb.contact')}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('hero.title')}</h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">{t('hero.subtitle')}</p>
              </div>

              {/* Quick notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>
                    {quickNotes?.responseWindow?.label}{' '}
                    <span className="font-medium text-slate-100">
                      {quickNotes?.responseWindow?.value}
                    </span>
                    .
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpenCheck className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>
                    {quickNotes?.faq?.text}{' '}
                    <Link href="/faq" className="underline underline-offset-2 decoration-slate-500 hover:text-slate-100">
                      {quickNotes?.faq?.link}
                    </Link>{' '}
                    {quickNotes?.faq?.suffix}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-300 mt-0.5" />
                  <span>
                    {quickNotes?.noTrades?.text}{' '}
                    <span className="font-medium text-slate-100">
                      {quickNotes?.noTrades?.highlight}
                    </span>
                    {quickNotes?.noTrades?.suffix}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact summary card */}
            <div className="lg:col-span-5">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <Mail className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{sideCard?.title}</div>
                    <div className="text-[11px] text-slate-400">{sideCard?.subtitle}</div>
                  </div>
                </div>
                <div className="space-y-2 text-[11px] text-slate-300/90">
                  {sideCard?.channels?.map((channel: any, idx: number) => {
                    const icons = [MessageSquare, Mail, FileText]
                    const Icon = icons[idx] || MessageSquare
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon className="w-3.5 h-3.5 text-cyan-300 mt-0.5" />
                        <div>
                          <div className="font-medium text-slate-100">{channel.title}</div>
                          <div>{channel.description}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-1 flex items-start gap-2 text-[11px] text-slate-400">
                  <Info className="w-3 h-3 mt-0.5" />
                  <span>
                    {sideCard?.urgentNote?.text}{' '}
                    <span className="font-medium text-slate-100">
                      {sideCard?.urgentNote?.highlight}
                    </span>
                    {sideCard?.urgentNote?.suffix}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        {/* Contact form */}
        <HomeSection className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl px-4 sm:px-5 py-5 flex flex-col gap-4 text-sm"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <MessageSquare className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">{t('form.title')}</div>
                    <div className="text-[11px] text-slate-400">{t('form.subtitle')}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-slate-200">
                      {t('form.fields.fullName.label')}
                    </label>
                    <div
                      className={`rounded-xl bg-slate-950 border px-3 py-2 flex items-center gap-2 ${
                        errors.name ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        {...register('name')}
                        placeholder={t('form.fields.fullName.placeholder')}
                        className="bg-transparent border-0 outline-none text-xs text-slate-100 placeholder:text-slate-500 flex-1"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[10px] text-rose-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-slate-200">
                      {t('form.fields.email.label')}
                    </label>
                    <div
                      className={`rounded-xl bg-slate-950 border px-3 py-2 flex items-center gap-2 ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="email"
                        {...register('email')}
                        placeholder={t('form.fields.email.placeholder')}
                        className="bg-transparent border-0 outline-none text-xs text-slate-100 placeholder:text-slate-500 flex-1"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] text-rose-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-slate-200">
                      {t('form.fields.region.label')}
                    </label>
                    <div
                      className={`rounded-xl bg-slate-950 border px-3 py-2 flex items-center gap-2 ${
                        errors.region ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    >
                      <Globe2 className="w-3.5 h-3.5 text-slate-500" />
                      <select
                        {...register('region')}
                        className="bg-transparent border-0 outline-none text-xs text-slate-100 flex-1 cursor-pointer"
                      >
                        <option value="">{t('form.fields.region.placeholder')}</option>
                        {regions.map((region) => (
                          <option key={region} value={region} className="bg-slate-950">
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.region && (
                      <p className="text-[10px] text-rose-400">{errors.region.message}</p>
                    )}
                    <p className="text-[10px] text-slate-500">{t('form.fields.region.hint')}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-slate-200">
                      {t('form.fields.topic.label')}
                    </label>
                    <div
                      className={`rounded-xl bg-slate-950 border px-3 py-2 flex items-center gap-2 ${
                        errors.topic ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <select
                        {...register('topic')}
                        className="bg-transparent border-0 outline-none text-xs text-slate-100 flex-1 cursor-pointer"
                      >
                        <option value="">{t('form.fields.topic.placeholder')}</option>
                        {topics.map((topic) => (
                          <option key={topic} value={topic} className="bg-slate-950">
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.topic && (
                      <p className="text-[10px] text-rose-400">{errors.topic.message}</p>
                    )}
                    <p className="text-[10px] text-slate-500">{t('form.fields.topic.hint')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-slate-200">
                      {t('form.fields.accountId.label')}
                    </label>
                    <div className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        {...register('accountId')}
                        placeholder={t('form.fields.accountId.placeholder')}
                        className="bg-transparent border-0 outline-none text-xs text-slate-100 placeholder:text-slate-500 flex-1"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">{t('form.fields.accountId.hint')}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-slate-200">
                      {t('form.fields.language.label')}
                    </label>
                    <div className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5 text-slate-500" />
                      <select
                        {...register('language')}
                        className="bg-transparent border-0 outline-none text-xs text-slate-100 flex-1 cursor-pointer"
                      >
                        <option value="">{t('form.fields.language.placeholder')}</option>
                        {languages.map((lang) => (
                          <option key={lang} value={lang} className="bg-slate-950">
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.language && (
                      <p className="text-[10px] text-rose-400">{errors.language.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-slate-200">
                    {t('form.fields.message.label')}
                  </label>
                  <div
                    className={`rounded-2xl bg-slate-950 border px-3 py-2 ${
                      errors.message ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  >
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder={t('form.fields.message.placeholder')}
                      className="bg-transparent border-0 outline-none text-xs text-slate-100 placeholder:text-slate-500 w-full resize-none"
                    />
                  </div>
                  {errors.message && (
                    <p className="text-[10px] text-rose-400">{errors.message.message}</p>
                  )}
                  <div className="flex items-start gap-2 text-[10px] text-slate-500">
                    <AlertTriangle className="w-3 h-3 mt-0.5 text-amber-300" />
                    <span>{t('form.warning.text')}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-slate-400">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-0.5 h-3 w-3 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                  />
                  <span>{t('form.consent.text')}</span>
                </div>
                {errors.consent && (
                  <p className="text-[10px] text-rose-400">{errors.consent.message}</p>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('form.submit.sending') : t('form.submit.button')}
                  </button>
                </div>
              </motion.form>
            </div>

            {/* Side info: before you write */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <HelpCircle className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">
                      {sideInfo?.beforeYouSend?.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {sideInfo?.beforeYouSend?.subtitle}
                    </div>
                  </div>
                </div>
                <ul className="text-[11px] text-slate-300/90 space-y-1.5">
                  {sideInfo?.beforeYouSend?.items?.map((item: any, idx: number) => (
                    <li key={idx}>
                      • {item.text}{' '}
                      {item.link ? (
                        <Link
                          href="/faq"
                          className="underline underline-offset-2 decoration-slate-500 hover:text-slate-100"
                        >
                          {item.link}
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/risk-and-disclaimer"
                            className="underline underline-offset-2 decoration-slate-500 hover:text-slate-100"
                          >
                            {item.link1}
                          </Link>{' '}
                          {item.and}{' '}
                          <Link
                            href="/privacy-policy"
                            className="underline underline-offset-2 decoration-slate-500 hover:text-slate-100"
                          >
                            {item.link2}
                          </Link>
                        </>
                      )}{' '}
                      {item.suffix}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <MapPin className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">
                      {sideInfo?.regions?.title}
                    </div>
                    <div className="text-[11px] text-slate-400">{sideInfo?.regions?.subtitle}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300/90">
                  {sideInfo?.regions?.items?.map((item: any, idx: number) => (
                    <div key={idx} className="rounded-xl bg-slate-950 border border-slate-800 p-2">
                      <div className="font-medium text-slate-100 mb-0.5">{item.name}</div>
                      <div>{item.description}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400">{sideInfo?.regions?.note}</div>
              </motion.div>
            </div>
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
                href="/faq"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
              >
                {t('cta.openFaq')}
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
              >
                {t('cta.viewResources')}
              </Link>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

