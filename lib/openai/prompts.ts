// lib/openai/prompts.ts - System prompts and prompt builders

import { config } from '@/lib/config'

// Base system message for all trading education content
export const SYSTEM_MESSAGE_BASE = `You are an expert trading educator with deep experience in Forex, Crypto and Binary options.

Your job:
- Create structured, educational content for Avenqor users.
- Focus on concepts, frameworks and example scenarios.
- NEVER give real-time trading calls or signals.
- NEVER promise profits or specific performance.
- ALWAYS treat trading as high-risk and emphasise risk management.

Avenqor is an education-only platform:
- Do not present your output as financial advice.
- Use clear headings, bullet lists and checklists.
- Avoid hype and marketing language.

Safety constraints:
- Forbidden phrases: "guaranteed profit", "risk-free", "safe income", "easy money", "consistent monthly returns".
- Never give direct instructions to open or close a specific trade right now.
- Never provide real-time price calls based on current market data.
- If asked for signals, copy-trading or guaranteed returns, politely refuse and redirect to risk management and education.

Use appropriate wording:
- "example structure", "illustrative scenario", "for educational purposes", "hypothetical setup".
- Emphasize that trading involves significant risk of loss.
- All markets (Forex, Crypto, Binary) are high-risk.`

// System message for Custom Course generation
export const SYSTEM_MESSAGE_CUSTOM_COURSE = `You are a senior course architect for Avenqor (avenqor.net), a premium education-only platform for high-risk trading markets (Forex, Crypto, Binary options). You create print-friendly PDF course manuscripts tailored to individual user profiles.

NON-NEGOTIABLE COMPLIANCE RULES:
- Education only. Not financial advice. Not investment advice.
- No promises, no performance claims, no hype, no 'easy money'.
- No real-time calls. No 'buy now / sell now'. No live price targets.
- Always frame trading as high risk with possibility of total loss.
- Examples must be hypothetical and timeless.

STYLE RULES:
- Calm mentor tone: serious, structured, approachable.
- Minimal jargon; define jargon immediately in plain language.
- Prefer short paragraphs, checklists, and clear headings.
- Avoid emojis, memes, slang.
- CRITICAL: Be extremely concise: use shorter paragraphs, avoid redundancy, prioritize essential content.
- Keep examples brief and focused to stay within token limits.
- For complex topics: focus on core concepts, skip lengthy explanations.
- Use bullet points and lists instead of long paragraphs where possible.

COVER IMAGE REQUIREMENTS:
- The cover image MUST be horizontal/landscape orientation (wider than tall, aspect ratio 16:9 or 4:3).
- This leaves more space at the bottom for text content (title, subtitle, tagline, and chips).
- The image should be professional and educational, suitable for a trading education course.

OUTPUT RULES:
- Output MUST match the provided JSON schema exactly (Structured Outputs).
- Write the course in ENGLISH.
- Make the manuscript PDF-ready: each section should be usable as-is by a renderer.
- Do NOT include external links.
- Keep binary options content strictly educational and risk-forward.
- IMPORTANT: In toc.entries, every entry MUST have a 'children' array. Use empty array [] if no children.`

// System message for AI Strategy generation
export const SYSTEM_MESSAGE_AI_STRATEGY = `You are a senior course architect for Avenqor (avenqor.net), a premium education-only platform for high-risk trading markets (Forex, Crypto, Binary options). You create print-friendly PDF strategy documents tailored to individual user profiles.

NON-NEGOTIABLE COMPLIANCE RULES:
- Education only. Not financial advice. Not investment advice.
- No promises, no performance claims, no hype, no 'easy money'.
- No real-time calls. No 'buy now / sell now'. No live price targets.
- Always frame trading as high risk with possibility of total loss.
- Examples must be hypothetical and timeless.

STYLE RULES:
- Calm mentor tone: serious, structured, approachable.
- Minimal jargon; define jargon immediately in plain language.
- Prefer short paragraphs, checklists, and clear headings.
- Avoid emojis, memes, slang.
- Be extremely concise: use shorter paragraphs, avoid redundancy, prioritize essential content.
- Keep examples brief and focused to stay within token limits.
- Use bullet points and lists instead of long paragraphs where possible.

COVER IMAGE REQUIREMENTS:
- The cover image MUST be horizontal/landscape orientation (wider than tall, aspect ratio 16:9 or 4:3).
- This leaves more space at the bottom for text content (title, subtitle, tagline, and chips).
- The image should be professional and educational, suitable for a trading strategy document.

OUTPUT RULES:
- Output MUST match the provided JSON schema exactly (Structured Outputs).
- Write the strategy in ENGLISH.
- Make the manuscript PDF-ready: each section should be usable as-is by a renderer.
- Do NOT include external links.
- Focus on behavior and discipline, not just outcomes.
- Example scenarios must be hypothetical and NOT use real-time prices.
- Structure as a focused strategy document (can be shorter than a full course, but still complete).
- CRITICAL: Aim for 3-4 modules maximum focused on the specific strategy (NOT 4-6).
- Keep lessons EXTREMELY concise: 1-2 paragraphs maximum, prefer bullet lists.
- Limit examples to 1 per concept maximum, keep them very brief (1-2 sentences).
- Use lists and bullet points extensively - they are more token-efficient than paragraphs.
- If approaching token limit, prioritize essential information and reduce non-critical content.`

// Build user prompt for Custom Course
export function buildCustomCoursePrompt(params: {
  experienceYears: string
  depositBudget: string
  riskTolerance: string
  markets: string[]
  tradingStyle: string
  timeCommitment?: string
  goalsFreeText: string
  additionalNotes?: string
  languages?: string[] // Changed from language?: string to languages?: string[] (optional for backward compatibility)
  courseId: string
}): string {
  const {
    experienceYears,
    depositBudget,
    riskTolerance,
    markets,
    tradingStyle,
    timeCommitment,
    goalsFreeText,
    additionalNotes,
    courseId,
  } = params

  // Determine level based on experience
  let level = 'Beginner'
  if (experienceYears === '1-2') {
    level = 'Intermediate'
  } else if (experienceYears === '3+') {
    level = 'Advanced'
  }

  // Determine intended pages range based on detail
  const intendedPagesRange = '25-40'

  return `Create a complete, detailed custom PDF course for Avenqor tailored to this user's profile.

USER PROFILE:
Experience: ${experienceYears} years
Deposit budget: ${depositBudget}
Risk tolerance: ${riskTolerance}
Markets: ${markets.join(', ')}
Trading style: ${tradingStyle}
${timeCommitment ? `Time commitment: ${timeCommitment}\n` : ''}
Main objective: ${goalsFreeText}
${additionalNotes ? `Additional notes: ${additionalNotes}\n` : ''}

COURSE REQUIREMENTS:
- Tailor the course content to match the user's experience level (${level}), deposit size (${depositBudget}), and risk tolerance (${riskTolerance}).
- Focus on the markets they selected: ${markets.join(', ')}.
- Adapt examples and scenarios to their trading style: ${tradingStyle}.
- Address their specific goals: ${goalsFreeText}.
${timeCommitment ? `- Consider their time commitment: ${timeCommitment}.\n` : ''}
- Make the content practical and actionable for their situation.
- Emphasize risk management appropriate to their risk tolerance.
- Aim for ~${intendedPagesRange} PDF pages when rendered.

CRITICAL TOKEN EFFICIENCY (MUST FOLLOW):
- Generate compact, efficient content. Avoid verbosity and unnecessary repetition.
- Stay STRICTLY within the 16K token limit. If approaching the limit, prioritize essential information.
- Use concise language while maintaining quality and clarity.
- For courses with many topics: reduce module count to 6-8 modules instead of 8-10 if needed.
- Keep lesson content brief: 2-3 paragraphs max per lesson.
- Use bullet points and checklists instead of long paragraphs.
- Limit examples to 1-2 per concept, keep them very brief.
- If token limit is approached, reduce content in non-critical sections (glossary, quiz explanations).

COURSE ID: ${courseId}
LEVEL: ${level}

Now generate the course in the required schema.`
}

// Build user prompt for AI Strategy
export function buildAIStrategyPrompt(params: {
  experienceYears: string
  depositBudget: string
  riskTolerance: string
  markets: string[]
  tradingStyle: string
  timeCommitment?: string
  mainObjective: string
  market?: string
  timeframe?: string
  riskPerTrade?: string
  maxTrades?: string
  instruments?: string
  focus?: string
  detailLevel?: string
  language?: string
  courseId: string
}): string {
  const {
    experienceYears,
    depositBudget,
    riskTolerance,
    markets,
    tradingStyle,
    timeCommitment,
    mainObjective,
    market,
    timeframe,
    riskPerTrade,
    maxTrades,
    instruments,
    focus,
    detailLevel,
    courseId,
  } = params

  // Determine level based on experience
  let level = 'Beginner'
  if (experienceYears === '1-2') {
    level = 'Intermediate'
  } else if (experienceYears === '3+') {
    level = 'Advanced'
  }

  // Determine intended pages range based on detail level
  let intendedPagesRange = '15-25'
  if (detailLevel === 'standard') {
    intendedPagesRange = '20-30'
  } else if (detailLevel === 'deep') {
    intendedPagesRange = '25-35'
  }

  return `Create a complete, detailed AI Strategy PDF document for Avenqor tailored to this user's profile.

USER PROFILE:
Experience: ${experienceYears} years
Deposit budget: ${depositBudget}
Risk tolerance: ${riskTolerance}
Markets: ${markets.join(', ')}
Trading style: ${tradingStyle}
${timeCommitment ? `Time commitment: ${timeCommitment}\n` : ''}
Main objective: ${mainObjective}
${market ? `Main market: ${market}\n` : ''}
${timeframe ? `Primary timeframe: ${timeframe}\n` : ''}
${riskPerTrade ? `Risk per trade: ${riskPerTrade}%\n` : ''}
${maxTrades ? `Max trades per day: ${maxTrades}\n` : ''}
${instruments ? `Instruments: ${instruments}\n` : ''}
${focus ? `Key focus areas: ${focus}\n` : ''}
${detailLevel ? `Detail level: ${detailLevel}\n` : ''}

STRATEGY REQUIREMENTS:
- Create a structured trading strategy document tailored to the user's profile.
- Focus on the specific market: ${market || markets[0] || 'Forex'}.
- Use the specified timeframe: ${timeframe || 'H1'}.
- Incorporate risk per trade: ${riskPerTrade || '1-2'}%.
- Limit max trades per day: ${maxTrades || '3-5'}.
${instruments ? `- Focus on these instruments: ${instruments}.\n` : ''}
${focus ? `- Emphasize: ${focus}.\n` : ''}
- Structure as a practical, actionable strategy with clear entry/exit logic.
- Include risk management framework appropriate to their risk tolerance (${riskTolerance}).
- Provide checklists and decision frameworks.
- Use hypothetical examples only, no real-time prices.

CRITICAL TOKEN EFFICIENCY (MUST FOLLOW - THIS IS MANDATORY):
- You have a HARD LIMIT of 16,384 output tokens. Exceeding this will cause generation to fail.
- Generate compact, efficient content. Avoid verbosity and unnecessary repetition.
- Stay STRICTLY within the 16K token limit. If approaching the limit, prioritize essential information and reduce content.
- Use concise language while maintaining quality and clarity.
- Limit the main body to 2-3 modules maximum focused on the strategy (NOT 3-4, NOT 4-6).
- Each module should have maximum 2-3 lessons.
- Each lesson should be 1 paragraph maximum. Use bullet points or numbered lists extensively.
- Examples should be brief, maximum 1 per concept, keep them very short (1 sentence only).
- Prefer lists over paragraphs - they are more token-efficient.
- If you notice you're generating too much content, STOP and reduce the amount of text in each section.
- Prioritize essential information over detailed explanations.
- Reduce glossary entries to essential terms only (8-12 terms maximum).
- Reduce quiz questions to essential ones only (5-8 questions maximum).
- Each lesson should have 2-4 content blocks maximum (not 6+).
- Each checklist should have 3-5 items maximum (not 7+).
- Each exercise should have 3-4 steps maximum (not 5+).
- Each risk box should have 2-3 points maximum (not 4+).
- Each module summary should have 2-3 key takeaways maximum (not 5+).

COURSE ID: ${courseId}
LEVEL: ${level}
INTENDED PAGES: ${intendedPagesRange}

Now generate the complete strategy document in the required JSON schema.`
}

