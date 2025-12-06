// components/ResetPasswordPage.tsx - Reset password page component

'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Lock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Mail,
  ArrowLeft,
} from 'lucide-react'
import { HomeSection } from './HomeSection'
import { useToast } from '@/hooks/use-toast'

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    consent: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

// Calculate password strength
function calculatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 8) return 'weak'
  if (password.length < 12) return 'medium'
  
  let strength = 0
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  if (strength <= 2) return 'weak'
  if (strength <= 4) return 'medium'
  return 'strong'
}

export function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak')
  const [state, setState] = useState<'form' | 'success' | 'error'>('form')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setState('error')
      setErrorMessage(t('errors.tokenRequired'))
    }
  }, [token, t])

  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password))
    } else {
      setPasswordStrength('weak')
    }
  }, [password])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      consent: false,
    },
  })

  const watchedPassword = watch('password')
  useEffect(() => {
    setPassword(watchedPassword || '')
  }, [watchedPassword])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setState('error')
      setErrorMessage(t('errors.tokenRequired'))
      return
    }

    setIsSubmitting(true)
    setState('form')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
          consent: data.consent,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setState('success')
        showToast({
          title: t('states.success.title'),
          description: t('states.success.message'),
          variant: 'success',
        })
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setState('error')
        setErrorMessage(result.error || t('errors.generic'))
        showToast({
          title: t('states.error.title'),
          description: result.error || t('states.error.message'),
          variant: 'error',
        })
      }
    } catch (error) {
      console.error('Failed to reset password:', error)
      setState('error')
      setErrorMessage(t('errors.generic'))
      showToast({
        title: t('states.error.title'),
        description: t('errors.generic'),
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

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
                className="bg-slate-950/80 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-emerald-100 mb-1">
                      {t('states.success.title')}
                    </div>
                    <div className="text-sm text-slate-300/90">
                      {t('states.success.message')}
                    </div>
                  </div>
                </div>
                <Link
                  href="/login"
                  className="block w-full text-center py-2.5 px-4 text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
                >
                  {t('backToSignIn')}
                </Link>
              </motion.div>
            </div>
          </HomeSection>
        </main>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

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
                className="bg-slate-950/80 border border-amber-500/60 rounded-2xl p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-amber-100 mb-1">
                      {t('states.error.title')}
                    </div>
                    <div className="text-sm text-slate-300/90">
                      {errorMessage || t('states.error.message')}
                    </div>
                  </div>
                </div>
                <Link
                  href="/forgot-password"
                  className="block w-full text-center py-2.5 px-4 text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition"
                >
                  Request new reset link
                </Link>
              </motion.div>
            </div>
          </HomeSection>
        </main>
      </div>
    )
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
        {/* Hero + main card */}
        <HomeSection className="pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80">
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-[11px] font-medium text-slate-200">{t('badge')}</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('title')}</h1>
              <p className="text-sm sm:text-base text-slate-300/90">{t('subtitle')}</p>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300/90">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 mt-0.5" />
                <span>{t('securityInfo.linkValid')}</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-300 mt-0.5" />
                <span>{t('securityInfo.didNotRequest')}</span>
              </div>
            </div>
          </div>

          {/* Right card */}
          <div className="lg:col-span-7">
            <motion.div
              className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(15,23,42,0.95)] space-y-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Step header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px]">
                  <div className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 font-medium">
                    {t('stepIndicator')}
                  </div>
                  <span className="text-slate-500">{t('stepNote')}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500">
                  <span className="h-1 w-8 rounded-full bg-slate-700" />
                  <span className="h-1 w-8 rounded-full bg-cyan-400" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-200" htmlFor="password">
                    {t('newPassword')}
                  </label>
                  <div
                    className={`flex items-center gap-2 rounded-xl bg-slate-900 border px-3 py-2 ${
                      errors.password ? 'border-rose-500' : 'border-slate-700'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <input
                      id="password"
                      type="password"
                      {...register('password')}
                      placeholder={t('newPasswordPlaceholder')}
                      className="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-rose-400">{errors.password.message}</p>
                  )}
                  {password && (
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        {t('passwordStrength')}:{' '}
                        {passwordStrength === 'weak'
                          ? t('passwordStrengthWeak')
                          : passwordStrength === 'medium'
                          ? t('passwordStrengthMedium')
                          : t('passwordStrengthStrong')}
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className={`h-1 w-6 rounded-full ${
                            passwordStrength === 'weak'
                              ? 'bg-rose-400'
                              : passwordStrength === 'medium'
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <span
                          className={`h-1 w-6 rounded-full ${
                            passwordStrength === 'medium' || passwordStrength === 'strong'
                              ? passwordStrength === 'medium'
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                              : 'bg-slate-700'
                          }`}
                        />
                        <span
                          className={`h-1 w-6 rounded-full ${
                            passwordStrength === 'strong' ? 'bg-emerald-400' : 'bg-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-200" htmlFor="confirmPassword">
                    {t('confirmPassword')}
                  </label>
                  <div
                    className={`flex items-center gap-2 rounded-xl bg-slate-900 border px-3 py-2 ${
                      errors.confirmPassword ? 'border-rose-500' : 'border-slate-700'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register('confirmPassword')}
                      placeholder={t('confirmPasswordPlaceholder')}
                      className="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[11px] text-rose-400">{errors.confirmPassword.message}</p>
                  )}
                  <p className="text-[11px] text-slate-400">{t('securityNote')}</p>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-slate-300">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register('consent')}
                    className="mt-0.5 h-3 w-3 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                  />
                  <label htmlFor="consent">{t('consent')}</label>
                </div>
                {errors.consent && (
                  <p className="text-[11px] text-rose-400">{errors.consent.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Resetting...' : t('submit')}</span>
                </button>
              </form>

              {/* Helper note */}
              <div className="mt-2 flex items-start gap-2 text-[11px] text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-300 mt-0.5" />
                <p>{t('helperNote')}</p>
              </div>
            </motion.div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

