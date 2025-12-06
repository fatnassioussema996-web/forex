// lib/pdf/images.ts - Image generation and download functions

import { generateImage } from '@/lib/openai/generate'
import { saveCourseImage } from '@/lib/storage'
import { GeneratedCourse } from './types'
import fs from 'fs/promises'
import path from 'path'

/**
 * Download image from URL or data URL and return as Buffer
 */
async function downloadImage(url: string): Promise<Buffer> {
  // Handle data URL (base64)
  if (url.startsWith('data:')) {
    const base64Data = url.split(',')[1]
    return Buffer.from(base64Data, 'base64')
  }
  
  // Handle regular URL
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

/**
 * Generate cover image for course
 */
export async function generateCoverImage(
  course: GeneratedCourse,
  courseId: string
): Promise<{ publicPath: string; localPath: string }> {
  const { image_prompt, negative_prompt, suggested_format } = course.cover.image_generation

  // Build full prompt with negative prompt
  const fullPrompt = `${image_prompt}. ${negative_prompt ? `Avoid: ${negative_prompt}` : ''}`

  // Determine size based on aspect ratio
  // GPT Image 1 mini supports: '1024x1024', '1024x1536', '1536x1024', 'auto'
  let size: '1024x1024' | '1024x1536' | '1536x1024' = '1024x1024'
  if (suggested_format.aspect_ratio === '3:4') {
    size = '1024x1536' // Portrait (closest to 3:4 ratio)
  } else if (suggested_format.aspect_ratio === '4:5') {
    size = '1024x1024' // Square-ish
  } else if (suggested_format.aspect_ratio === '16:9' || suggested_format.aspect_ratio === '4:3') {
    size = '1536x1024' // Landscape (horizontal) - wider than tall
  }

  // Generate image
  const { url: imageUrl } = await generateImage({
    prompt: fullPrompt,
    size,
    // quality will use default from config (medium)
    n: 1,
  })

  // Download image
  const imageBuffer = await downloadImage(imageUrl)

  // Save to public/images/courses/ for use in course cards
  const filename = `${courseId}-cover.webp`
  const { publicPath } = await saveCourseImage(imageBuffer, filename)

  // Also save to courses/images directory for PDF use
  const coursesDir = path.join(process.cwd(), 'public', 'courses', 'images')
  await fs.mkdir(coursesDir, { recursive: true })
  const localPath = path.join(coursesDir, filename)
  await fs.writeFile(localPath, imageBuffer)

  return {
    publicPath,
    localPath: `/courses/images/${filename}`,
  }
}

/**
 * Generate diagram images for course
 */
export async function generateDiagramImages(
  course: GeneratedCourse,
  courseId: string
): Promise<Record<string, { publicPath: string; localPath: string }>> {
  const results: Record<string, { publicPath: string; localPath: string }> = {}

  for (const diagram of course.diagrams) {
    try {
      // Generate image
      const { url: imageUrl } = await generateImage({
        prompt: diagram.image_prompt,
        size: '1024x1024',
        // quality will use default from config (medium)
        n: 1,
      })

      // Download image
      const imageBuffer = await downloadImage(imageUrl)

      // Save to public/images/courses/diagrams/
      const filename = `${courseId}-${diagram.diagram_id}.webp`
      const { publicPath } = await saveCourseImage(imageBuffer, filename)

      // Also save to courses directory for PDF use
      const coursesDir = path.join(process.cwd(), 'public', 'courses', 'images', 'diagrams')
      await fs.mkdir(coursesDir, { recursive: true })
      const localPath = path.join(coursesDir, filename)
      await fs.writeFile(localPath, imageBuffer)

      results[diagram.diagram_id] = {
        publicPath,
        localPath: `/courses/images/diagrams/${filename}`,
      }
      console.log(`  ✓ Generated diagram: ${diagram.diagram_id}`)
    } catch (error) {
      console.error(`  ✗ Failed to generate diagram ${diagram.diagram_id}:`, error)
      // Continue with other diagrams - don't fail the entire process
    }
  }

  return results
}

