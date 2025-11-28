// app/locale-provider.tsx - Client component to set html lang and dir attributes

'use client'

import { useEffect } from 'react'

const LOCALE_COOKIE_NAME = 'user_locale'
const defaultLocale = 'en'

function getLocaleFromCookie(): string {
  if (typeof window === 'undefined') return defaultLocale

  const cookies = document.cookie.split(';')
  const localeCookie = cookies.find((c) => c.trim().startsWith(`${LOCALE_COOKIE_NAME}=`))
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1]
    if (locale === 'en' || locale === 'ar') {
      return locale
    }
  }
  
  return defaultLocale
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const currentLocale = getLocaleFromCookie()
    
    // Update html attributes
    document.documentElement.lang = currentLocale
    document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr'
  }, [])

  return <>{children}</>
}

