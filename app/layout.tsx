import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from './providers'
import { LocaleProvider } from './locale-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Avenqor',
    template: '%s | Avenqor',
  },
  description: 'Avenqor - Premium education for high-risk markets. Structured Forex, Crypto and Binary options courses.',
  keywords: ['Avenqor', 'Forex', 'Crypto', 'Binary options', 'Trading education'],
  authors: [{ name: 'Avenqor Team' }],
  creator: 'Avenqor',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avenqor.net',
    siteName: 'Avenqor',
    title: 'Avenqor',
    description: 'Premium education for high-risk markets. Structured Forex, Crypto and Binary options courses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avenqor',
    description: 'Premium education for high-risk markets. Structured Forex, Crypto and Binary options courses.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} antialiased`}>
        <LocaleProvider>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  )
}

