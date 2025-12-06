// app/dashboard/transactions/page.tsx - Dashboard transactions/billing page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { BillingPage } from '@/components/BillingPage'
import enDashboard from '@/i18n/en/dashboard.json'

export const metadata: Metadata = {
  title: `${enDashboard.title} - Billing`,
  description: enDashboard.billingPage?.subtitle || 'Your billing and transaction history',
}

export default async function DashboardTransactionsPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/dashboard/transactions')
  }

  return <BillingPage />
}

