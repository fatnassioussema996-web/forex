// components/ForgotPasswordPage.tsx - Forgot password page component

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, ArrowLeft, Info } from 'lucide-react'
import { HomeSection } from './HomeSection'
import { useToast } from '@/hooks/use-toast'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword')
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSuccess(true)
        showToast({
          title: t('success'),
          variant: 'success',
        })
      } else {
        showToast({
          title: result.error || t('errors.generic'),
          variant: 'error',
        })
      }
    } catch (error) {
      console.error('Failed to submit forgot password form:', error)
      showToast({
        title: t('errors.generic'),
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      {/* Header */}
      <header className="py-4">
        <HomeSection className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold tracking-tight">
              AV
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-sm">Avenqor</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Account security
              </span>
            </div>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>{t('backToSignIn')}</span>
          </Link>
        </HomeSection>
      </header>

      <main className="pt-4">
        <HomeSection className="pb-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('title')}</h1>
                <p className="text-sm text-slate-300/90">{t('subtitle')}</p>
              </div>

              {isSuccess ? (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/40 px-4 py-3 text-sm text-emerald-300">
                  {t('success')}
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t('email')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full pl-10 pr-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border ${
                          errors.email ? 'border-rose-500' : 'border-slate-700'
                        } focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400`}
                        placeholder={t('emailPlaceholder')}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : t('submit')}
                  </button>
                </form>
              )}

              <div className="flex items-start gap-2 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-cyan-300 mt-0.5 flex-shrink-0" />
                <p>{t('note')}</p>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-xs text-cyan-300 hover:text-cyan-200 transition"
                >
                  {t('backToSignIn')}
                </Link>
              </div>
            </motion.div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

