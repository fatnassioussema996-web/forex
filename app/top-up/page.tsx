// app/top-up/page.tsx - Top-up page route

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { redirect } from 'next/navigation'
import { TopUpPage } from '@/components/TopUpPage'
import enTopUp from '@/i18n/en/topUp.json'

export const metadata: Metadata = {
  title: enTopUp.title,
  description: enTopUp.subtitle,
}

export default async function TopUpPageRoute() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/top-up')
  }

  return <TopUpPage />
}

