// lib/ai-strategy-pricing.ts - AI Strategy pricing calculator

/**
 * Calculate AI Strategy price in tokens based on user selections
 */
export interface AIStrategyPricingParams {
  preset: 'conservative' | 'balanced' | 'scalping' | ''
  market: 'forex' | 'crypto' | 'binary' | ''
  timeframe: 'M15' | 'M30' | 'H1' | 'H4' | 'D1' | ''
  riskPerTrade: string // Percentage as string (e.g., "0.5", "1.5", "2.5")
  maxTrades: string // Number as string (e.g., "2", "5", "10")
  instruments: string // Comma-separated list (e.g., "EURUSD, GBPUSD, BTCUSDT")
  detailLevel: 'quick' | 'standard' | 'deep' | ''
  experience: 'beginner' | 'intermediate' | 'advanced' | ''
  deposit: 'low' | 'medium' | 'high' | 'veryHigh' | ''
  riskTolerance: 'low' | 'medium' | 'high' | ''
  markets: string[] // Array of market keys
  tradingStyle: 'scalp' | 'day' | 'swing' | ''
  languages: string[] // Array of language codes ('en', 'ar')
}

/**
 * Base price: €30 = 3,000 tokens
 */
const BASE_PRICE_TOKENS = 3000

/**
 * Preset multipliers (additional tokens)
 */
const PRESET_MULTIPLIERS: Record<string, number> = {
  conservative: 0,
  balanced: 500,
  scalping: 1000,
}

/**
 * Market multipliers (additional tokens)
 */
const MARKET_MULTIPLIERS: Record<string, number> = {
  forex: 0,
  crypto: 500,
  binary: 500,
}

/**
 * Timeframe multipliers (additional tokens)
 */
const TIMEFRAME_MULTIPLIERS: Record<string, number> = {
  M15: 1000,
  M30: 500,
  H1: 0,
  H4: 0,
  D1: 0,
}

/**
 * Risk per trade multipliers (additional tokens)
 */
function getRiskPerTradeMultiplier(riskPerTrade: string): number {
  const risk = parseFloat(riskPerTrade)
  if (isNaN(risk)) return 0
  if (risk < 1) return 0
  if (risk >= 1 && risk <= 2) return 300
  return 500 // > 2%
}

/**
 * Max trades per day multipliers (additional tokens)
 */
function getMaxTradesMultiplier(maxTrades: string): number {
  const trades = parseInt(maxTrades)
  if (isNaN(trades)) return 0
  if (trades >= 1 && trades <= 2) return 0
  if (trades >= 3 && trades <= 5) return 300
  if (trades >= 6 && trades <= 10) return 500
  return 800 // > 10
}

/**
 * Instruments cost: 200 tokens per instrument (counted by comma separation)
 */
function getInstrumentsCost(instruments: string): number {
  if (!instruments.trim()) return 0
  // Split by comma and count non-empty items
  const instrumentList = instruments
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
  return instrumentList.length * 200
}

/**
 * Detail level multipliers (additional tokens)
 */
const DETAIL_LEVEL_MULTIPLIERS: Record<string, number> = {
  quick: 0,
  standard: 1000,
  deep: 2500,
}

/**
 * Experience multipliers (additional tokens)
 */
const EXPERIENCE_MULTIPLIERS: Record<string, number> = {
  beginner: 0,
  intermediate: 500,
  advanced: 1000,
}

/**
 * Deposit multipliers (additional tokens)
 */
const DEPOSIT_MULTIPLIERS: Record<string, number> = {
  low: 0,
  medium: 300,
  high: 600,
  veryHigh: 1000,
}

/**
 * Risk tolerance multipliers (additional tokens)
 */
const RISK_MULTIPLIERS: Record<string, number> = {
  low: 0,
  medium: 300,
  high: 600,
}

/**
 * Cost per additional market (first market is free, each additional costs tokens)
 */
const TOKENS_PER_ADDITIONAL_MARKET = 500

/**
 * Trading style multipliers (additional tokens)
 */
const TRADING_STYLE_MULTIPLIERS: Record<string, number> = {
  scalp: 500,
  day: 0,
  swing: 0,
}

/**
 * Cost for second language (additional 500 tokens)
 */
const TOKENS_FOR_SECOND_LANGUAGE = 500

/**
 * Calculate AI Strategy price in tokens
 */
export function calculateAIStrategyPrice(params: AIStrategyPricingParams): number {
  let total = BASE_PRICE_TOKENS

  // Add preset cost
  if (params.preset && PRESET_MULTIPLIERS[params.preset] !== undefined) {
    total += PRESET_MULTIPLIERS[params.preset]
  }

  // Add market cost
  if (params.market && MARKET_MULTIPLIERS[params.market] !== undefined) {
    total += MARKET_MULTIPLIERS[params.market]
  }

  // Add timeframe cost
  if (params.timeframe && TIMEFRAME_MULTIPLIERS[params.timeframe] !== undefined) {
    total += TIMEFRAME_MULTIPLIERS[params.timeframe]
  }

  // Add risk per trade cost
  total += getRiskPerTradeMultiplier(params.riskPerTrade)

  // Add max trades cost
  total += getMaxTradesMultiplier(params.maxTrades)

  // Add instruments cost
  total += getInstrumentsCost(params.instruments)

  // Add detail level cost
  if (params.detailLevel && DETAIL_LEVEL_MULTIPLIERS[params.detailLevel] !== undefined) {
    total += DETAIL_LEVEL_MULTIPLIERS[params.detailLevel]
  }

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

  // Add additional markets cost (first market is free)
  if (params.markets.length > 1) {
    total += (params.markets.length - 1) * TOKENS_PER_ADDITIONAL_MARKET
  }

  // Add trading style cost
  if (params.tradingStyle && TRADING_STYLE_MULTIPLIERS[params.tradingStyle] !== undefined) {
    total += TRADING_STYLE_MULTIPLIERS[params.tradingStyle]
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
export function getAIStrategyPricingBreakdown(params: AIStrategyPricingParams): {
  base: number
  preset: number
  market: number
  timeframe: number
  riskPerTrade: number
  maxTrades: number
  instruments: number
  detailLevel: number
  experience: number
  deposit: number
  risk: number
  markets: number
  tradingStyle: number
  languages: number
  total: number
} {
  const base = BASE_PRICE_TOKENS
  const preset = params.preset ? PRESET_MULTIPLIERS[params.preset] || 0 : 0
  const market = params.market ? MARKET_MULTIPLIERS[params.market] || 0 : 0
  const timeframe = params.timeframe ? TIMEFRAME_MULTIPLIERS[params.timeframe] || 0 : 0
  const riskPerTrade = getRiskPerTradeMultiplier(params.riskPerTrade)
  const maxTrades = getMaxTradesMultiplier(params.maxTrades)
  const instruments = getInstrumentsCost(params.instruments)
  const detailLevel = params.detailLevel ? DETAIL_LEVEL_MULTIPLIERS[params.detailLevel] || 0 : 0
  const experience = params.experience ? EXPERIENCE_MULTIPLIERS[params.experience] || 0 : 0
  const deposit = params.deposit ? DEPOSIT_MULTIPLIERS[params.deposit] || 0 : 0
  const risk = params.riskTolerance ? RISK_MULTIPLIERS[params.riskTolerance] || 0 : 0
  const markets = params.markets.length > 1 ? (params.markets.length - 1) * TOKENS_PER_ADDITIONAL_MARKET : 0
  const tradingStyle = params.tradingStyle ? TRADING_STYLE_MULTIPLIERS[params.tradingStyle] || 0 : 0
  const languages = params.languages && params.languages.length === 2 ? TOKENS_FOR_SECOND_LANGUAGE : 0
  const total = base + preset + market + timeframe + riskPerTrade + maxTrades + instruments + detailLevel + experience + deposit + risk + markets + tradingStyle + languages

  return {
    base,
    preset,
    market,
    timeframe,
    riskPerTrade,
    maxTrades,
    instruments,
    detailLevel,
    experience,
    deposit,
    risk,
    markets,
    tradingStyle,
    languages,
    total,
  }
}

