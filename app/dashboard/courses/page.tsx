// app/dashboard/courses/page.tsx - Dashboard courses/library page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { LibraryPage } from '@/components/LibraryPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: `${enDashboard.title} - Library`,
  description: enDashboard.libraryPage?.subtitle || 'Your courses and AI strategies library',
}

export default async function DashboardCoursesPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/dashboard/courses')
  }

  return <LibraryPage />
}

