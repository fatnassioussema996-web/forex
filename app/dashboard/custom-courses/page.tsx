// app/dashboard/custom-courses/page.tsx - Dashboard custom courses page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { CustomCoursesPage } from '@/components/CustomCoursesPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: `${enDashboard.title} - Custom Courses`,
  description: enDashboard.customCoursesPage?.subtitle || 'Track your custom course requests',
}

export default async function DashboardCustomCoursesPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/dashboard/custom-courses')
  }

  return <CustomCoursesPage />
}

