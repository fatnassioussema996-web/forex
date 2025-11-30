// app/dashboard/page.tsx - Dashboard page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { DashboardPage } from '@/components/DashboardPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: enDashboard.title,
  description: enDashboard.overview.subtitle,
}

export default async function DashboardPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/dashboard')
  }

  return <DashboardPage />
}

