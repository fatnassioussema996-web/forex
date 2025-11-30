'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ToastProvider'
import { NextIntlClientProvider } from 'next-intl'
import { CartProvider } from '@/contexts/CartContext'
import { useState, useEffect } from 'react'

// Static import for default locale to avoid loading issues
import enCommon from '@/i18n/en/common.json'
import enHome from '@/i18n/en/home.json'
import enCourses from '@/i18n/en/courses.json'
import enCart from '@/i18n/en/cart.json'
import enLearn from '@/i18n/en/learn.json'
import enPricing from '@/i18n/en/pricing.json'
import enDashboard from '@/i18n/en/dashboard.json'
import enAuth from '@/i18n/en/auth.json'
import enFaq from '@/i18n/en/faq.json'
import enGlossary from '@/i18n/en/glossary.json'

const LOCALE_COOKIE_NAME = 'user_locale'
const defaultLocale = 'en'

// Default messages available immediately
const defaultMessages = {
  common: enCommon,
  home: enHome,
  courses: enCourses,
  cart: enCart,
  learn: enLearn,
  pricing: enPricing,
  dashboard: enDashboard,
  auth: enAuth,
  faq: enFaq,
  glossary: enGlossary,
}

function getLocaleFromCookie(): string {
  if (typeof window === 'undefined') return defaultLocale

  const cookies = document.cookie.split(';')
  const localeCookie = cookies.find((c) => c.trim().startsWith(`${LOCALE_COOKIE_NAME}=`))
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1]?.trim()
    if (locale === 'en' || locale === 'ar') {
      return locale
    }
  }
  
  return defaultLocale
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>(defaultLocale)
  const [messages, setMessages] = useState<any>(defaultMessages)

  useEffect(() => {
    const currentLocale = getLocaleFromCookie()
    
    // If locale is already default, messages are already loaded
    if (currentLocale === defaultLocale) {
      setLocale(currentLocale)
      return
    }
    
    // Load messages for non-default locale
    setLocale(currentLocale)
    
    Promise.all([
      import(`@/i18n/${currentLocale}/common.json`),
      import(`@/i18n/${currentLocale}/home.json`),
      import(`@/i18n/${currentLocale}/courses.json`),
      import(`@/i18n/${currentLocale}/cart.json`),
      import(`@/i18n/${currentLocale}/learn.json`),
      import(`@/i18n/${currentLocale}/pricing.json`),
      import(`@/i18n/${currentLocale}/dashboard.json`),
      import(`@/i18n/${currentLocale}/auth.json`),
      import(`@/i18n/${currentLocale}/faq.json`),
      import(`@/i18n/${currentLocale}/glossary.json`),
    ])
      .then(([common, home, courses, cart, learn, pricing, dashboard, auth, faq, glossary]) => {
        setMessages({
          common: common.default,
          home: home.default,
          courses: courses.default,
          cart: cart.default,
          learn: learn.default,
          pricing: pricing.default,
          dashboard: dashboard.default,
          auth: auth.default,
          faq: faq.default,
          glossary: glossary.default,
        })
      })
      .catch((error) => {
        console.error('Failed to load i18n messages:', error)
        // Keep default messages on error
        setLocale(defaultLocale)
      })
  }, [])

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <SessionProvider>
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}

