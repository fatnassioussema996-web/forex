// lib/course-image-utils.ts - Utility functions for course images

/**
 * Get the image path for a course by slug
 * Maps course slugs to image filenames
 * Uses standard pattern: /images/courses/{slug}-cover.webp
 */
export function getCourseImagePath(slug: string): string | null {
  // Explicit mappings for courses with custom paths (if any)
  const imageMap: Record<string, string> = {
    // Add any courses with non-standard image paths here
  }

  // If explicit mapping exists, use it
  if (imageMap[slug]) {
    return imageMap[slug]
  }

  // Default pattern: /images/courses/{slug}-cover.webp
  return `/images/courses/${slug}-cover.webp`
}

/**
 * Check if an image exists (for client-side)
 * This is a simple check - in production, you might want to use a more robust method
 */
export function courseImageExists(slug: string): boolean {
  return getCourseImagePath(slug) !== null
}

