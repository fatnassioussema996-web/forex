// components/LoginPage.tsx - Login page component

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { HomeSection } from './HomeSection'

export function LoginPage() {
  const t = useTranslations('auth.login')
  const tCommon = useTranslations('common.auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push(callbackUrl)
    }
  }, [status, session, router, callbackUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(t('errors.invalidCredentials'))
        setIsLoading(false)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError(t('errors.generic'))
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    await signIn('google', { callbackUrl })
  }

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  // Don't render if already authenticated (redirect will happen)
  if (status === 'authenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-6">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      <main className="pt-6">
        <HomeSection className="pb-6">
          <div className="max-w-md mx-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">{t('title')}</h1>
                <p className="text-sm text-slate-300/90">{t('subtitle')}</p>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-5"
              >
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="block text-xs font-medium text-slate-300">
                        {t('password')}
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-cyan-300 hover:text-cyan-200 transition"
                      >
                        {t('forgotPassword')}
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing in...' : t('submit')}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-slate-950 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="group w-full py-2.5 px-4 text-sm font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition flex items-center justify-center gap-2"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    {/* Default gray G */}
                    <span className="text-slate-100 group-hover:opacity-0 transition-opacity duration-300 text-lg font-bold leading-none">
                      G
                    </span>
                    {/* Colored G on hover with Google colors */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-bold leading-none"
                      style={{
                        backgroundImage:
                          'linear-gradient(135deg, #EA4335 0%, #FBBC05 30%, #4285F4 60%, #34A853 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      G
                    </span>
                  </div>
                  {t('googleSignIn')}
                </button>

                {/* Sign up link */}
                <div className="text-center text-sm text-slate-400">
                  <span>{t('noAccount')} </span>
                  <Link href="/register" className="text-cyan-300 hover:text-cyan-200 transition font-medium">
                    {t('signUp')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

