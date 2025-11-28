// components/LanguageToggle.tsx - Language toggle component

'use client'

import { useState, useEffect } from 'react'

const LOCALE_COOKIE_NAME = 'user_locale'

function getLocaleFromCookie(): 'en' | 'ar' {
  if (typeof window === 'undefined') return 'en'

  const cookies = document.cookie.split(';')
  const localeCookie = cookies.find((c) => c.trim().startsWith(`${LOCALE_COOKIE_NAME}=`))
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1]
    if (locale === 'en' || locale === 'ar') {
      return locale
    }
  }
  
  return 'en'
}

export function LanguageToggle() {
  // Initialize with default locale to avoid hydration mismatch
  // Will be updated in useEffect after mount
  const [currentLocale, setCurrentLocale] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    // Update locale from cookie after mount
    const locale = getLocaleFromCookie()
    setCurrentLocale(locale)
    
    // Listen for cookie changes
    const interval = setInterval(() => {
      const newLocale = getLocaleFromCookie()
      if (newLocale !== currentLocale) {
        setCurrentLocale(newLocale)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [currentLocale])

  const handleLocaleChange = (newLocale: 'en' | 'ar') => {
    if (newLocale === currentLocale) return

    // Set cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000`
    
    // Update state
    setCurrentLocale(newLocale)
    
    // Update html attributes
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    
    // Reload to apply locale change
    window.location.reload()
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-slate-900/60 border border-slate-800 p-1">
      <button
        onClick={() => handleLocaleChange('en')}
        className={`px-2 py-1 text-xs font-medium rounded transition ${
          currentLocale === 'en'
            ? 'bg-cyan-400 text-slate-950'
            : 'text-slate-300 hover:text-slate-50'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLocaleChange('ar')}
        className={`px-2 py-1 text-xs font-medium rounded transition ${
          currentLocale === 'ar'
            ? 'bg-cyan-400 text-slate-950'
            : 'text-slate-300 hover:text-slate-50'
        }`}
      >
        AR
      </button>
    </div>
  )
}

