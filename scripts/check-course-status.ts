// scripts/check-course-status.ts - Check which courses have been generated

import { readFile } from 'fs/promises'
import { readdir } from 'fs/promises'
import { join } from 'path'

/**
 * Generate course ID from title (same logic as in generator.ts)
 */
function generateCourseId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

/**
 * Check course status
 */
async function checkCourseStatus() {
  try {
    // Read all JSON files
    console.log('📖 Reading course request files...\n')
    
    const file1 = await readFile('avenqor-course-requests-07-16.json', 'utf-8')
    const data1 = JSON.parse(file1)
    
    const file2 = await readFile('avenqor-course-requests-16-19-21-35.json', 'utf-8')
    const data2 = JSON.parse(file2)
    
    const file3 = await readFile('avenqor-course-requests-36-48.json', 'utf-8')
    const data3 = JSON.parse(file3)

    // Get all PDF files
    const pdfDir = join(process.cwd(), 'public', 'courses')
    const pdfFiles = (await readdir(pdfDir))
      .filter(f => f.endsWith('-en.pdf'))
      .map(f => f.replace('-en.pdf', ''))

    console.log(`✅ Found ${pdfFiles.length} PDF files\n`)

    // Collect all expected courses
    const expectedCourses: Array<{ index: number; title: string; courseId: string }> = []

    // From file 1 (courses 7-16)
    if (data1.requests && Array.isArray(data1.requests)) {
      for (const course of data1.requests) {
        const index = course.course_index || data1.requests.indexOf(course) + 7
        const title = course.course_title || ''
        const courseId = generateCourseId(title)
        expectedCourses.push({ index, title, courseId })
      }
    }

    // From file 2 (courses 16-19, 21-35)
    if (data2.requests && Array.isArray(data2.requests)) {
      for (const course of data2.requests) {
        const index = course.course_index || data2.requests.indexOf(course) + 16
        const title = course.course_title || ''
        const courseId = generateCourseId(title)
        expectedCourses.push({ index, title, courseId })
      }
    }

    // From file 3 (courses 36-48)
    if (data3.requests && Array.isArray(data3.requests)) {
      for (const course of data3.requests) {
        const index = course.course_index || data3.requests.indexOf(course) + 36
        const title = course.course_title || ''
        const courseId = generateCourseId(title)
        expectedCourses.push({ index, title, courseId })
      }
    }

    // Sort by index
    expectedCourses.sort((a, b) => a.index - b.index)

    console.log(`📚 Expected courses: ${expectedCourses.length}\n`)

    // Check status
    const generated: Array<{ index: number; title: string; courseId: string }> = []
    const missing: Array<{ index: number; title: string; courseId: string }> = []

    for (const course of expectedCourses) {
      if (pdfFiles.includes(course.courseId)) {
        generated.push(course)
      } else {
        missing.push(course)
      }
    }

    // Display results
    console.log('='.repeat(70))
    console.log('📊 COURSE GENERATION STATUS')
    console.log('='.repeat(70))
    console.log(`\n✅ Generated: ${generated.length}/${expectedCourses.length}`)
    console.log(`❌ Missing: ${missing.length}/${expectedCourses.length}\n`)

    if (generated.length > 0) {
      console.log('\n✅ GENERATED COURSES:')
      console.log('-'.repeat(70))
      for (const course of generated) {
        console.log(`  ${course.index.toString().padStart(2)}: ${course.title}`)
        console.log(`      ID: ${course.courseId}`)
      }
    }

    if (missing.length > 0) {
      console.log('\n❌ MISSING COURSES:')
      console.log('-'.repeat(70))
      for (const course of missing) {
        console.log(`  ${course.index.toString().padStart(2)}: ${course.title}`)
        console.log(`      ID: ${course.courseId}`)
        // Determine correct file based on course index
        let file = '07-16'
        if (course.index >= 16 && course.index <= 19) {
          file = '16-19-21-35'
        } else if (course.index >= 21 && course.index <= 35) {
          file = '16-19-21-35'
        } else if (course.index >= 36 && course.index <= 48) {
          file = '36-48'
        }
        console.log(`      Command: npm run generate-specific-courses avenqor-course-requests-${file}.json ${course.index}`)
      }
    }

    console.log('\n' + '='.repeat(70) + '\n')

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

checkCourseStatus()

