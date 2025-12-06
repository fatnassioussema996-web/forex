'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ToastProvider'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'
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
import enResources from '@/i18n/en/resources.json'
import enAbout from '@/i18n/en/about.json'
import enContact from '@/i18n/en/contact.json'
import enTerms from '@/i18n/en/terms.json'
import enPrivacy from '@/i18n/en/privacy.json'
import enCookies from '@/i18n/en/cookies.json'
import enRisk from '@/i18n/en/risk.json'
import enTopUp from '@/i18n/en/topUp.json'
import enRefund from '@/i18n/en/refund.json'

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
  resources: enResources,
  about: enAbout,
  contact: enContact,
  terms: enTerms,
  privacy: enPrivacy,
  cookies: enCookies,
  risk: enRisk,
  topUp: enTopUp,
  refund: enRefund,
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
      import(`@/i18n/${currentLocale}/resources.json`),
      import(`@/i18n/${currentLocale}/about.json`),
      import(`@/i18n/${currentLocale}/contact.json`),
      import(`@/i18n/${currentLocale}/terms.json`),
      import(`@/i18n/${currentLocale}/privacy.json`),
      import(`@/i18n/${currentLocale}/cookies.json`),
      import(`@/i18n/${currentLocale}/risk.json`),
      import(`@/i18n/${currentLocale}/topUp.json`),
      import(`@/i18n/${currentLocale}/refund.json`),
    ])
      .then(([common, home, courses, cart, learn, pricing, dashboard, auth, faq, glossary, resources, about, contact, terms, privacy, cookies, risk, topUp, refund]) => {
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
          resources: resources.default,
          about: about.default,
          contact: contact.default,
          terms: terms.default,
          privacy: privacy.default,
          cookies: cookies.default,
          risk: risk.default,
          topUp: topUp.default,
          refund: refund.default,
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
            <CookieConsentBanner />
          </ToastProvider>
        </CartProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}

