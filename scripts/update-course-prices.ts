// scripts/update-course-prices.ts - Update course prices in database using new pricing logic

import { PrismaClient } from '@prisma/client'
import { calculateCoursePriceEur, calculateTokensFromEur } from '../lib/course-pricing'
import { convertAmount } from '../lib/currency-utils'

const prisma = new PrismaClient()

// List of General courses (level = "General", market = "General")
const GENERAL_COURSES = [
  'trading-foundations-how-markets-really-work',
  'risk-first-capital-protection-for-beginners',
  'trading-psychology-101-discipline-over-dopamine',
  'journaling-review-system-learn-from-your-decisions',
  'building-a-personal-trading-plan-education-only',
  'position-sizing-r-multiples-plain-language',
]

async function main() {
  console.log('💰 Starting to update course prices in database...\n')

  try {
    // Get all courses from database
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        level: true,
        market: true,
        modules: true,
        duration_hours_max: true,
        price_gbp: true,
        tokens: true,
      },
    })

    console.log(`Found ${courses.length} courses to update\n`)

    let updatedCount = 0
    const priceMap = new Map<number, { courses: string[], slugs: string[] }>() // Track prices for uniqueness check
    const coursePrices: Array<{ id: number; slug: string; title: string; priceEur: number; level: string; moduleCount: number; durationHoursMax: number }> = []

    // First pass: calculate all prices
    for (const course of courses) {
      // Determine if this is a General course
      const isGeneralCourse = GENERAL_COURSES.includes(course.slug)
      
      // Update level and market if needed
      let level = course.level
      let market = course.market
      
      if (isGeneralCourse) {
        level = 'General'
        market = 'General'
      }

      // Get module count
      const modules = course.modules as any[]
      const moduleCount = Array.isArray(modules) ? modules.length : 0
      const durationHoursMax = course.duration_hours_max || moduleCount * 1.5

      // Calculate new price
      let priceEur = calculateCoursePriceEur(
        level as 'General' | 'Beginner' | 'Intermediate' | 'Advanced',
        moduleCount,
        Math.ceil(durationHoursMax),
        course.slug
      )

      // Store calculated price for duplicate resolution
      coursePrices.push({
        id: course.id,
        slug: course.slug,
        title: course.title,
        priceEur,
        level,
        moduleCount,
        durationHoursMax: Math.ceil(durationHoursMax),
      })
    }

    // Second pass: resolve duplicates
    const usedPrices = new Set<number>()
    const finalPrices = new Map<number, { id: number; slug: string; title: string; priceEur: number; level: string; moduleCount: number; durationHoursMax: number }>()

    for (const coursePrice of coursePrices) {
      let finalPriceEur = coursePrice.priceEur
      let attempts = 0
      const maxAttempts = 50 // Prevent infinite loop
      const range = coursePrice.level === 'General' ? { min: 100, max: 200 } :
                   coursePrice.level === 'Beginner' ? { min: 50, max: 149 } :
                   coursePrice.level === 'Intermediate' ? { min: 150, max: 249 } :
                   { min: 250, max: 350 }

      // If price already used, adjust it
      while (usedPrices.has(finalPriceEur) && attempts < maxAttempts) {
        // Try adjusting by ±1, ±2, ±3, etc.
        const adjustment = Math.floor(attempts / 2) + 1
        const direction = attempts % 2 === 0 ? 1 : -1
        finalPriceEur = Math.round(coursePrice.priceEur + (adjustment * direction))
        
        // Ensure price stays within range
        finalPriceEur = Math.max(range.min, Math.min(range.max, finalPriceEur))
        attempts++
      }

      if (attempts >= maxAttempts) {
        console.warn(`⚠️  Could not find unique price for ${coursePrice.title}, using original: €${finalPriceEur}`)
      }

      usedPrices.add(finalPriceEur)
      finalPrices.set(coursePrice.id, { ...coursePrice, priceEur: finalPriceEur })

      // Track prices for report
      if (!priceMap.has(finalPriceEur)) {
        priceMap.set(finalPriceEur, { courses: [], slugs: [] })
      }
      priceMap.get(finalPriceEur)!.courses.push(coursePrice.title)
      priceMap.get(finalPriceEur)!.slugs.push(coursePrice.slug)
    }

    // Third pass: update database with resolved prices
    for (const [courseId, courseData] of finalPrices) {
      const tokens = calculateTokensFromEur(courseData.priceEur)
      const priceGbp = convertAmount(courseData.priceEur, 'EUR', 'GBP')

      // Find original course data
      const originalCourse = courses.find(c => c.id === courseId)!
      const isGeneralCourse = GENERAL_COURSES.includes(originalCourse.slug)
      const level = isGeneralCourse ? 'General' : originalCourse.level
      const market = isGeneralCourse ? 'General' : originalCourse.market

      // Find original calculated price (before duplicate resolution)
      const originalCalculatedPrice = coursePrices.find(cp => cp.id === courseId)?.priceEur || courseData.priceEur

      // Update course in database
      await prisma.course.update({
        where: { id: courseId },
        data: {
          level,
          market,
          price_gbp: Math.round(priceGbp * 100) / 100,
          tokens,
        },
      })
      
      console.log(`✅ Updated: ${courseData.title}`)
      console.log(`   Level: ${level}, Market: ${market}`)
      console.log(`   Old: £${originalCourse.price_gbp} (${originalCourse.tokens} tokens)`)
      console.log(`   New: €${courseData.priceEur.toFixed(2)} (£${Math.round(priceGbp * 100) / 100} GBP) - ${tokens} tokens`)
      if (courseData.priceEur !== originalCalculatedPrice) {
        console.log(`   ⚠️  Price adjusted from €${originalCalculatedPrice} to avoid duplicate`)
      }
      console.log('')

      updatedCount++
    }

    // Check for duplicate prices
    const duplicates = Array.from(priceMap.entries()).filter(([_, data]) => data.courses.length > 1)
    
    console.log(`\n🎉 Successfully updated ${updatedCount} courses!`)
    console.log(`\n📊 Price Summary:`)
    console.log(`   Total unique prices: ${priceMap.size}`)
    
    if (duplicates.length > 0) {
      console.log(`\n⚠️  Warning: Found ${duplicates.length} duplicate prices (should be resolved):`)
      duplicates.forEach(([price, data]) => {
        console.log(`   €${price.toFixed(2)}: ${data.courses.length} courses`)
        data.courses.forEach(title => console.log(`      - ${title}`))
      })
    } else {
      console.log(`   ✅ All prices are unique!`)
    }
    
    // Show price distribution
    const prices = Array.from(priceMap.keys()).sort((a, b) => a - b)
    console.log(`\n📈 Price Distribution:`)
    console.log(`   Min: €${Math.min(...prices).toFixed(2)}`)
    console.log(`   Max: €${Math.max(...prices).toFixed(2)}`)
    console.log(`   Average: €${(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)}`)
  } catch (error) {
    console.error('❌ Error updating course prices:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

