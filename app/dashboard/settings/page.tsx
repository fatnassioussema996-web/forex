// app/dashboard/settings/page.tsx - Dashboard settings page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { SettingsPage } from '@/components/SettingsPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: `${enDashboard.title} - Settings`,
  description: enDashboard.settingsPage?.subtitle || 'Update your account settings and preferences',
}

export default async function DashboardSettingsPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/dashboard/settings')
  }

  return <SettingsPage />
}

