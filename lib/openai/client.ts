// lib/openai/client.ts - OpenAI client initialization

import OpenAI from 'openai'
import { config } from '@/lib/config'

// Initialize OpenAI client singleton
let openaiClient: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  if (openaiClient) {
    return openaiClient
  }

  // Read directly from process.env to support dotenv loading in scripts
  const apiKey = process.env.OPENAI_API_KEY || config.openai.apiKey

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  openaiClient = new OpenAI({
    apiKey,
    // Organization ID if needed (for verified organizations)
    // organization: process.env.OPENAI_ORG_ID,
  })

  return openaiClient
}

// Model names - using latest available models
export const OPENAI_MODELS = {
  // Text generation models (GPT-5 series)
  GPT_5: 'gpt-5', // Full GPT-5 model
  GPT_5_MINI: 'gpt-5-mini', // Faster, cost-efficient version
  GPT_5_NANO: 'gpt-5-nano', // Fastest, most cost-efficient
  GPT_5_PRO: 'gpt-5-pro', // Smarter and more precise
  
  // GPT-4 models (currently used)
  GPT_4O: 'gpt-4o', // GPT-4 Optimized (16K output tokens, higher quality)
  GPT_4O_MINI: 'gpt-4o-mini', // Faster, cheaper variant (16K output tokens, RECOMMENDED for cost)
  GPT_4_TURBO: 'gpt-4-turbo-preview', // GPT-4 Turbo
  GPT_35_TURBO: 'gpt-3.5-turbo', // Fallback option
  
  // Image generation models
  GPT_IMAGE_1: 'gpt-image-1', // State-of-the-art image generation (RECOMMENDED)
  GPT_IMAGE_1_MINI: 'gpt-image-1-mini', // Cost-efficient version
  DALL_E_3: 'dall-e-3', // Previous generation (deprecated)
  DALL_E_2: 'dall-e-2', // Fallback option
} as const

// Helper to get model name with fallback
export function getModelForFeature(feature: 'strategy' | 'course' | 'customCourse' | 'image'): string {
  const modelEnv = process.env[`OPENAI_${feature.toUpperCase()}_MODEL`]
  if (modelEnv) {
    return modelEnv
  }

  switch (feature) {
    case 'strategy':
      return config.openai.models.strategy
    case 'course':
      return config.openai.models.course
    case 'customCourse':
      return config.openai.models.customCourse
    case 'image':
      return config.openai.models.image
    default:
      return OPENAI_MODELS.GPT_4O_MINI
  }
}

