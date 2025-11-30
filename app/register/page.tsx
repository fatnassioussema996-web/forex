// app/register/page.tsx - Register page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { RegisterPage } from '@/components/RegisterPage'
import enAuth from '@/i18n/en/auth.json'

export const metadata: Metadata = {
  title: enAuth.register.title,
  description: enAuth.register.subtitle,
}

export default async function RegisterPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard')
  }

  return <RegisterPage />
}

