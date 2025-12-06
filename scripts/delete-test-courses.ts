// scripts/delete-test-courses.ts - Script to delete test courses from database

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// List of test courses to delete
const TEST_COURSE_SLUGS = [
  'crypto-volatility-structures',
  'forex-foundations-from-zero-to-first-trade',
]

async function main() {
  console.log('🗑️  Starting to delete test courses from database...\n')

  try {
    // First, check which courses exist
    const existingCourses = await prisma.course.findMany({
      where: {
        slug: {
          in: TEST_COURSE_SLUGS,
        },
      },
      select: {
        id: true,
        slug: true,
        title: true,
      },
    })

    if (existingCourses.length === 0) {
      console.log('ℹ️  No test courses found in database. They may have already been deleted.\n')
      return
    }

    console.log(`Found ${existingCourses.length} test course(s) to delete:\n`)
    existingCourses.forEach((course) => {
      console.log(`  - ${course.title} (${course.slug})`)
    })
    console.log('')

    // Delete the courses
    const deleteResult = await prisma.course.deleteMany({
      where: {
        slug: {
          in: TEST_COURSE_SLUGS,
        },
      },
    })

    console.log(`✅ Successfully deleted ${deleteResult.count} test course(s) from database!\n`)

    // Verify deletion
    const remainingCourses = await prisma.course.findMany({
      where: {
        slug: {
          in: TEST_COURSE_SLUGS,
        },
      },
    })

    if (remainingCourses.length === 0) {
      console.log('✅ Verification: All test courses have been successfully removed.\n')
    } else {
      console.warn(`⚠️  Warning: ${remainingCourses.length} test course(s) still remain in database:`)
      remainingCourses.forEach((course) => {
        console.warn(`  - ${course.title} (${course.slug})`)
      })
    }
  } catch (error) {
    console.error('❌ Error deleting test courses:', error)
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

