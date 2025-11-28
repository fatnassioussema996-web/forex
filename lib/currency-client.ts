// lib/currency-client.ts - Client-side currency utilities

'use client'

import { getAvailableCurrenciesList, getCurrencyConfigByCode } from './currency-config'

const CURRENCY_COOKIE_NAME = 'user_currency'

/**
 * Get user's selected currency from cookie
 */
export function getUserCurrency(): string {
  if (typeof window === 'undefined') return 'GBP'

  const cookies = document.cookie.split(';')
  const currencyCookie = cookies.find((c) => c.trim().startsWith(`${CURRENCY_COOKIE_NAME}=`))
  
  if (currencyCookie) {
    const currency = currencyCookie.split('=')[1]
    const currencies = getAvailableCurrenciesList()
    if (currencies[currency]) {
      return currency
    }
  }
  
  return 'GBP'
}

/**
 * Set user's selected currency in cookie
 */
export function setUserCurrency(currencyCode: string): boolean {
  if (typeof window === 'undefined') return false

  const currencies = getAvailableCurrenciesList()
  if (currencies[currencyCode]) {
    // Set cookie for 1 year
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    document.cookie = `${CURRENCY_COOKIE_NAME}=${currencyCode}; expires=${expiryDate.toUTCString()}; path=/`
    return true
  }
  return false
}

