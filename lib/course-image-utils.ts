// lib/course-image-utils.ts - Utility functions for course images

/**
 * Get the image path for a course by slug
 * Maps course slugs to image filenames
 */
export function getCourseImagePath(slug: string): string | null {
  const imageMap: Record<string, string> = {
    'forex-foundations-from-zero-to-first-trade': '/images/courses/forex_foundations.webp',
    'crypto-volatility-structures': '/images/courses/crypto_volatility_structures.png',
  }

  return imageMap[slug] || null
}

/**
 * Check if an image exists (for client-side)
 * This is a simple check - in production, you might want to use a more robust method
 */
export function courseImageExists(slug: string): boolean {
  return getCourseImagePath(slug) !== null
}

