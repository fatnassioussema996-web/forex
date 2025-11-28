'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ToastProvider'
import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect } from 'react'

// Static import for default locale to avoid loading issues
import enCommon from '@/i18n/en/common.json'
import enHome from '@/i18n/en/home.json'

const LOCALE_COOKIE_NAME = 'user_locale'
const defaultLocale = 'en'

// Default messages available immediately
const defaultMessages = {
  common: enCommon,
  home: enHome,
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
    ])
      .then(([common, home]) => {
        setMessages({
          common: common.default,
          home: home.default,
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
        <ToastProvider>
          {children}
        </ToastProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}

