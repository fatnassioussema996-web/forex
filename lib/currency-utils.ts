// currency-utils.ts - Utility functions for multi-currency support

import { getAvailableCurrencies, getCurrencyConfig, type CurrencyConfig } from './currency-config'

/**
 * Get all available currencies
 */
export function getAvailableCurrenciesList(): Record<string, CurrencyConfig> {
  return getAvailableCurrencies()
}

/**
 * Get configuration for specific currency
 */
export function getCurrencyConfigByCode(code: string): CurrencyConfig {
  return getCurrencyConfig(code)
}

/**
 * Convert amount from one currency to another
 */
export function convertAmount(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  const currencies = getAvailableCurrencies()
  const fromRate = currencies[fromCurrency]?.rate ?? 1.0
  const toRate = currencies[toCurrency]?.rate ?? 1.0

  // Convert through GBP (base currency)
  const gbpAmount = amount / fromRate
  return gbpAmount * toRate
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currencyCode: string = 'GBP'): string {
  const currency = getCurrencyConfig(currencyCode)
  return `${currency.symbol}${amount.toFixed(2)}`
}

/**
 * Calculate tokens from amount in any currency
 * Always converts to GBP first for consistency
 */
export function calculateTokens(amount: number, currencyCode: string = 'GBP'): number {
  const currency = getCurrencyConfig(currencyCode)

  // Convert to GBP first
  const gbpAmount = amount / currency.rate

  // Calculate tokens (100 tokens per 1 GBP)
  return gbpAmount * 100
}

/**
 * Calculate price for given number of tokens in specified currency
 */
export function calculatePriceForTokens(
  tokens: number,
  currencyCode: string = 'GBP'
): number {
  const currency = getCurrencyConfig(currencyCode)

  // Calculate price in GBP first
  const gbpPrice = tokens / 100

  // Convert to target currency
  return gbpPrice * currency.rate
}

/**
 * Get current currency symbol
 */
export function getCurrencySymbol(currencyCode: string = 'GBP'): string {
  const currency = getCurrencyConfig(currencyCode)
  return currency.symbol
}

