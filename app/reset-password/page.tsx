// app/reset-password/page.tsx - Reset password page

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { ResetPasswordPage } from '@/components/ResetPasswordPage'
import enAuth from '@/i18n/en/auth.json'

export const metadata: Metadata = {
  title: enAuth.resetPassword.title,
  description: enAuth.resetPassword.subtitle,
}

export default async function ResetPasswordPageRoute() {
  const session = await getServerSession(authOptions)

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard')
  }

  return <ResetPasswordPage />
}

