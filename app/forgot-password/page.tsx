// app/forgot-password/page.tsx - Forgot password page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { ForgotPasswordPage } from '@/components/ForgotPasswordPage'
import enAuth from '@/i18n/en/auth.json'

export const metadata: Metadata = {
  title: enAuth.forgotPassword.title,
  description: enAuth.forgotPassword.subtitle,
}

export default async function ForgotPasswordPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard')
  }

  return <ForgotPasswordPage />
}

