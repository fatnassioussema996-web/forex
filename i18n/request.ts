// i18n/request.ts - i18n configuration for next-intl

import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // After validation, we know locale is a valid Locale (which is a string)
  const validLocale = locale as Locale

  return {
    locale: validLocale,
    messages: {
      common: (await import(`./${validLocale}/common.json`)).default,
      home: (await import(`./${validLocale}/home.json`)).default,
    },
  }
})

