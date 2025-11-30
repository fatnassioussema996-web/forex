// app/login/page.tsx - Login page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { LoginPage } from '@/components/LoginPage'
import enAuth from '@/i18n/en/auth.json'

export const metadata: Metadata = {
  title: enAuth.login.title,
  description: enAuth.login.subtitle,
}

export default async function LoginPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard')
  }

  return <LoginPage />
}

