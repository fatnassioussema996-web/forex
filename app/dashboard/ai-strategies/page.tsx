// app/dashboard/ai-strategies/page.tsx - Dashboard AI strategies route

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth-config'
import { AiStrategiesPage } from '@/components/AiStrategiesPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: `${enDashboard.title} - AI Strategies`,
  description: enDashboard.aiStrategiesPage?.subtitle || 'Track your AI strategy generations',
}

export default async function DashboardAiStrategiesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/dashboard/ai-strategies')
  }

  return <AiStrategiesPage />
}


