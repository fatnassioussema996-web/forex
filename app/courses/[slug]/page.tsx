// app/courses/[slug]/page.tsx - Course detail page

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CourseDetailPage } from '@/components/CourseDetailPage'
import { demoCourses } from '@/src/data/courses'

interface CourseDetailPageProps {
  params: {
    slug: string
  }
}

// Helper function to capitalize first letter
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Transform static course data to DB format
function transformStaticCourse(course: typeof demoCourses[0]) {
  return {
    id: 1, // Temporary ID
    slug: course.slug,
    title: course.title,
    title_ar: null,
    description: course.longDescription,
    description_ar: null,
    level: capitalizeFirst(course.level),
    market: capitalizeFirst(course.market),
    tokens: course.price.tokens,
    price_gbp: course.price.GBP,
    pdf_path: course.pdfUrl,
    cover_image: null,
    featured: course.isFeatured,
    modules: course.modules.map((m) => ({
      order: m.order,
      title: m.title,
      summary: m.summary,
    })),
    duration_hours_min: course.durationHoursMin,
    duration_hours_max: course.durationHoursMax,
  }
}

async function getCourse(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        title_ar: true,
        description: true,
        description_ar: true,
        level: true,
        market: true,
        tokens: true,
        price_gbp: true,
        pdf_path: true,
        cover_image: true,
        featured: true,
        modules: true,
        duration_hours_min: true,
        duration_hours_max: true,
      },
    })

    return course
  } catch (error: any) {
    console.error('Error fetching course:', error)
    
    // Если БД недоступна, используем статические данные как fallback
    const isDatabaseError = 
      error?.code?.startsWith('P') ||
      error?.message?.includes('does not exist') ||
      error?.message?.includes('relation') ||
      error?.message?.includes('table') ||
      error?.message?.includes('database') ||
      error?.message?.includes('connection') ||
      error?.message?.includes('timeout') ||
      error?.message?.includes('Can\'t reach database') ||
      error?.name === 'PrismaClientInitializationError' ||
      error?.name === 'PrismaClientKnownRequestError' ||
      error?.name === 'PrismaClientUnknownRequestError'
    
    if (isDatabaseError) {
      console.warn('Database connection issue, using static fallback data:', error?.code || error?.name)
      
      // Ищем курс в статических данных
      try {
        const staticCourse = demoCourses.find((c) => c.slug === slug)
        
        if (!staticCourse) {
          return null
        }
        
        return transformStaticCourse(staticCourse)
      } catch (fallbackError) {
        console.error('Error loading static course:', fallbackError)
        return null
      }
    }
    
    return null
  }
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const course = await getCourse(params.slug)

  if (!course) {
    return {
      title: 'Course not found',
    }
  }

  return {
    title: course.title,
    description: course.description,
  }
}

export default async function CourseDetailPageRoute({
  params,
}: CourseDetailPageProps) {
  const course = await getCourse(params.slug)

  if (!course) {
    notFound()
  }

  return <CourseDetailPage course={course} />
}

