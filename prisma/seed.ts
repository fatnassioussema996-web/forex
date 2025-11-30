// prisma/seed.ts - Seed script for courses

import { PrismaClient } from '@prisma/client'
import { demoCourses } from '../src/data/courses'

const prisma = new PrismaClient()

// Helper function to capitalize first letter
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing courses (optional - comment out if you want to keep existing data)
  // await prisma.course.deleteMany({})
  // console.log('🗑️  Cleared existing courses')

  for (const course of demoCourses) {
    // Transform level: "beginner" -> "Beginner"
    const level = capitalizeFirst(course.level)
    
    // Transform market: "forex" -> "Forex"
    const market = capitalizeFirst(course.market)

    // Prepare modules data for JSON field
    const modules = course.modules.map((m) => ({
      order: m.order,
      title: m.title,
      summary: m.summary,
    }))

    try {
      const result = await prisma.course.upsert({
        where: { slug: course.slug },
        update: {
          title: course.title,
          description: course.longDescription,
          level,
          market,
          price_gbp: course.price.GBP,
          tokens: course.price.tokens,
          pdf_path: course.pdfUrl,
          featured: course.isFeatured,
          modules: modules as any,
          duration_hours_min: course.durationHoursMin,
          duration_hours_max: course.durationHoursMax,
        },
        create: {
          slug: course.slug,
          title: course.title,
          description: course.longDescription,
          level,
          market,
          price_gbp: course.price.GBP,
          tokens: course.price.tokens,
          pdf_path: course.pdfUrl,
          featured: course.isFeatured,
          modules: modules as any,
          duration_hours_min: course.durationHoursMin,
          duration_hours_max: course.durationHoursMax,
        },
      })

      console.log(`✅ Seeded course: ${result.title}`)
    } catch (error) {
      console.error(`❌ Error seeding course ${course.slug}:`, error)
    }
  }

  console.log('✨ Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

