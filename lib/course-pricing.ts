// lib/course-pricing.ts - Course pricing logic based on level, modules, and duration

/**
 * Price ranges by course level (in EUR)
 */
const LEVEL_PRICE_RANGES = {
  General: { min: 100, max: 200 },
  Beginner: { min: 50, max: 149 },
  Intermediate: { min: 150, max: 249 },
  Advanced: { min: 250, max: 350 },
} as const

/**
 * Calculate course price in EUR based on level, module count, and duration
 * 
 * Formula:
 * - Base price = min of level range
 * - Volume factor = (moduleCount / maxModules) * 0.5 + (durationHoursMax / maxDuration) * 0.5
 * - Price = min + (max - min) * volumeFactor
 * - Deterministic adjustment (30% range) based on combined hash of slug, level, modules, duration, and character sum for unique prices
 * 
 * Price is FIXED and DETERMINISTIC - same course slug always gets same price
 * Returns whole numbers only (€50.00, €100.00, €135.00, etc.)
 * 
 * @param level - Course level: "General" | "Beginner" | "Intermediate" | "Advanced"
 * @param moduleCount - Number of modules in the course
 * @param durationHoursMax - Maximum duration in hours
 * @param courseSlug - Course slug for deterministic price assignment
 * @returns Price in EUR (rounded to nearest integer, fixed for this course)
 */
export function calculateCoursePriceEur(
  level: keyof typeof LEVEL_PRICE_RANGES,
  moduleCount: number,
  durationHoursMax: number,
  courseSlug: string
): number {
  const range = LEVEL_PRICE_RANGES[level]
  if (!range) {
    throw new Error(`Invalid course level: ${level}`)
  }

  // Normalize level name (handle case variations)
  const normalizedLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() as keyof typeof LEVEL_PRICE_RANGES
  const normalizedRange = LEVEL_PRICE_RANGES[normalizedLevel] || range

  // Estimate max values for normalization (based on typical course structure)
  // Most courses have 6-12 modules and 6-15 hours
  const maxModules = 12
  const maxDuration = 15

  // Calculate volume factor (0 to 1)
  // Weight: 50% modules, 50% duration
  const moduleFactor = Math.min(moduleCount / maxModules, 1)
  const durationFactor = Math.min(durationHoursMax / maxDuration, 1)
  const volumeFactor = moduleFactor * 0.5 + durationFactor * 0.5

  // Base price calculation: min + (max - min) * volumeFactor
  const basePrice = normalizedRange.min + (normalizedRange.max - normalizedRange.min) * volumeFactor

  // Add deterministic adjustment based on multiple factors for price diversity
  // This ensures different courses get unique prices even with same volume
  // The hash ensures the same course always gets the same price (deterministic)
  // Use combination of slug, level, moduleCount, and duration for more unique hash
  const hashInput = `${courseSlug}-${normalizedLevel}-${moduleCount}-${durationHoursMax}`
  const slugHash = simpleHash(hashInput)
  
  // Additional uniqueness factor: sum of character codes in slug
  const slugCharSum = courseSlug.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  
  // Combine both hash and character sum for better distribution
  const combinedHash = (slugHash * 31 + slugCharSum) % 10000
  
  // Increase adjustment range to 30% for more diversity
  const adjustmentRange = (normalizedRange.max - normalizedRange.min) * 0.30 // 30% adjustment range
  // Use larger modulo for better distribution
  const adjustment = ((combinedHash % 2000) / 2000 - 0.5) * adjustmentRange // -15% to +15%

  const finalPrice = basePrice + adjustment

  // Round to nearest integer (ensures whole numbers like €50.00, €100.00, €135.00)
  const roundedPrice = Math.round(finalPrice)
  
  // Ensure price is within range and is a whole number
  const clampedPrice = Math.max(normalizedRange.min, Math.min(normalizedRange.max, roundedPrice))
  
  return clampedPrice
}

/**
 * Get price range for a course level
 */
export function getCoursePriceRange(level: keyof typeof LEVEL_PRICE_RANGES): { min: number; max: number } {
  const normalizedLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() as keyof typeof LEVEL_PRICE_RANGES
  return LEVEL_PRICE_RANGES[normalizedLevel] || LEVEL_PRICE_RANGES.Beginner
}

/**
 * Calculate tokens from EUR price (100 tokens = 1 EUR)
 */
export function calculateTokensFromEur(priceEur: number): number {
  return Math.round(priceEur * 100)
}

/**
 * Simple hash function for deterministic variation
 * Returns a number between 0 and 9999
 */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash) % 10000
}

