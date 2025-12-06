// lib/custom-course-pricing.ts - Custom course pricing calculator

/**
 * Calculate custom course price in tokens based on user selections
 */
export interface CustomCoursePricingParams {
  experience: 'beginner' | 'intermediate' | 'advanced' | ''
  deposit: 'low' | 'medium' | 'high' | 'veryHigh' | ''
  riskTolerance: 'low' | 'medium' | 'high' | ''
  markets: string[] // Array of market keys
  selectedDays: string[] // Array of day names (Monday, Tuesday, etc.)
  selectedPlatforms: string[] // Array of platform names
  languages: string[] // Array of language codes ('en', 'ar')
}

/**
 * Base price: €200 = 20,000 tokens
 */
const BASE_PRICE_TOKENS = 20000

/**
 * Experience multipliers (additional tokens)
 */
const EXPERIENCE_MULTIPLIERS: Record<string, number> = {
  beginner: 0,
  intermediate: 2000,
  advanced: 5000,
}

/**
 * Deposit multipliers (additional tokens)
 */
const DEPOSIT_MULTIPLIERS: Record<string, number> = {
  low: 0,
  medium: 1500,
  high: 3000,
  veryHigh: 5000,
}

/**
 * Risk tolerance multipliers (additional tokens)
 */
const RISK_MULTIPLIERS: Record<string, number> = {
  low: 0,
  medium: 1000,
  high: 2500,
}

/**
 * Cost per day per week (additional tokens)
 */
const TOKENS_PER_DAY = 500

/**
 * Cost per platform (additional tokens)
 */
const TOKENS_PER_PLATFORM = 1000

/**
 * Cost per additional market (first market is free, each additional costs tokens)
 */
const TOKENS_PER_ADDITIONAL_MARKET = 1500

/**
 * Cost for second language (additional 500 tokens)
 */
const TOKENS_FOR_SECOND_LANGUAGE = 500

/**
 * Calculate custom course price in tokens
 */
export function calculateCustomCoursePrice(params: CustomCoursePricingParams): number {
  let total = BASE_PRICE_TOKENS

  // Add experience cost
  if (params.experience && EXPERIENCE_MULTIPLIERS[params.experience] !== undefined) {
    total += EXPERIENCE_MULTIPLIERS[params.experience]
  }

  // Add deposit cost
  if (params.deposit && DEPOSIT_MULTIPLIERS[params.deposit] !== undefined) {
    total += DEPOSIT_MULTIPLIERS[params.deposit]
  }

  // Add risk tolerance cost
  if (params.riskTolerance && RISK_MULTIPLIERS[params.riskTolerance] !== undefined) {
    total += RISK_MULTIPLIERS[params.riskTolerance]
  }

  // Add days cost (each selected day adds tokens)
  total += params.selectedDays.length * TOKENS_PER_DAY

  // Add platforms cost (each selected platform adds tokens)
  total += params.selectedPlatforms.length * TOKENS_PER_PLATFORM

  // Add additional markets cost (first market is free)
  if (params.markets.length > 1) {
    total += (params.markets.length - 1) * TOKENS_PER_ADDITIONAL_MARKET
  }

  // Add cost for second language (if 2 languages selected)
  if (params.languages && params.languages.length === 2) {
    total += TOKENS_FOR_SECOND_LANGUAGE
  }

  return total
}

/**
 * Get pricing breakdown for display
 */
export function getPricingBreakdown(params: CustomCoursePricingParams): {
  base: number
  experience: number
  deposit: number
  risk: number
  days: number
  platforms: number
  markets: number
  languages: number
  total: number
} {
  const base = BASE_PRICE_TOKENS
  const experience = params.experience ? EXPERIENCE_MULTIPLIERS[params.experience] || 0 : 0
  const deposit = params.deposit ? DEPOSIT_MULTIPLIERS[params.deposit] || 0 : 0
  const risk = params.riskTolerance ? RISK_MULTIPLIERS[params.riskTolerance] || 0 : 0
  const days = params.selectedDays.length * TOKENS_PER_DAY
  const platforms = params.selectedPlatforms.length * TOKENS_PER_PLATFORM
  const markets = params.markets.length > 1 ? (params.markets.length - 1) * TOKENS_PER_ADDITIONAL_MARKET : 0
  const languages = params.languages && params.languages.length === 2 ? TOKENS_FOR_SECOND_LANGUAGE : 0
  const total = base + experience + deposit + risk + days + platforms + markets + languages

  return {
    base,
    experience,
    deposit,
    risk,
    days,
    platforms,
    markets,
    languages,
    total,
  }
}

