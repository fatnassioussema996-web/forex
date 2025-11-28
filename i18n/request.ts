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

  return {
    messages: {
      common: (await import(`./${locale}/common.json`)).default,
      home: (await import(`./${locale}/home.json`)).default,
    },
  }
})

