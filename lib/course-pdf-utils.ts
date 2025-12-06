// lib/course-pdf-utils.ts - Utility functions for course PDF paths

/**
 * Get PDF path for a course based on slug and locale
 * @param slug - Course slug
 * @param locale - User locale ('en' | 'ar')
 * @returns PDF path (EN version by default, AR version if locale is 'ar')
 */
export function getCoursePdfPath(slug: string, locale: string = 'en'): string {
  const basePath = `/courses/${slug}`
  const suffix = locale === 'ar' ? '-ar.pdf' : '-en.pdf'
  return `${basePath}${suffix}`
}

/**
 * Get PDF path for a course from database pdf_path field, adjusting for locale
 * @param dbPdfPath - PDF path from database (usually EN version)
 * @param locale - User locale ('en' | 'ar')
 * @returns PDF path adjusted for locale
 */
export function getCoursePdfPathFromDb(dbPdfPath: string, locale: string = 'en'): string {
  // If database path is already locale-specific, return as is
  if (dbPdfPath.includes('-ar.pdf') || dbPdfPath.includes('-en.pdf')) {
    // Replace the locale suffix if needed
    if (locale === 'ar') {
      return dbPdfPath.replace('-en.pdf', '-ar.pdf')
    } else {
      return dbPdfPath.replace('-ar.pdf', '-en.pdf')
    }
  }
  
  // If database path doesn't have locale suffix, add it
  const basePath = dbPdfPath.replace('.pdf', '')
  return getCoursePdfPath(basePath.split('/').pop() || '', locale)
}

