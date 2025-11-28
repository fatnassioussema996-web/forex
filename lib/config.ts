// lib/config.ts - Configuration constants

export const config = {
  site: {
    baseUrl: process.env.SITE_BASE_URL || 'http://localhost:3000',
    name: 'Avenqor',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  transfermit: {
    apiUrl: process.env.TM_API_URL || 'https://app.transfermit.com/api/v1',
    apiKey: process.env.TM_API_KEY || '',
    signingKey: process.env.TM_SIGNING_KEY || '',
  },
  nextauth: {
    secret: process.env.NEXTAUTH_SECRET || '',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'mail.privateemail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '',
    fromName: process.env.SMTP_FROM_NAME || 'Avenqor Support',
  },
  generation: {
    cost: 60.0, // Tokens per generation
  },
} as const

