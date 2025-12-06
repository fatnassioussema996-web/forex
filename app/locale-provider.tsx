// app/locale-provider.tsx - Client component to set html lang and dir attributes

'use client'

import { useEffect, useState } from 'react'

const LOCALE_COOKIE_NAME = 'user_locale'
const defaultLocale = 'en'

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

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted after hydration
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only update DOM after component is mounted (after hydration)
    if (!isMounted) return

    const currentLocale = getLocaleFromCookie()
    
    // Update html attributes
    const html = document.documentElement
    if (html.lang !== currentLocale) {
      html.lang = currentLocale
    }
    const dir = currentLocale === 'ar' ? 'rtl' : 'ltr'
    if (html.dir !== dir) {
      html.dir = dir
    }
  }, [isMounted])

  return <>{children}</>
}

