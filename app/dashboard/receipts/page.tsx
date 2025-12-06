// app/dashboard/receipts/page.tsx - Dashboard receipts/invoices page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { ReceiptsPage } from '@/components/ReceiptsPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: `${enDashboard.title} - Receipts`,
  description: 'Your invoices and receipts',
}

export default async function DashboardReceiptsPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/dashboard/receipts')
  }

  return <ReceiptsPage />
}

