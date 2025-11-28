// components/Header.tsx - Main header component

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { CurrencySelector, CurrencySelectorMobile } from './CurrencySelector'
import { LanguageToggle } from './LanguageToggle'
import { getUserCurrency } from '@/lib/currency-client'

export default function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentCurrency, setCurrentCurrency] = useState('GBP')

  useEffect(() => {
    setCurrentCurrency(getUserCurrency())
  }, [])

  const user = session?.user as { id?: number; name?: string; email?: string; balance?: number } | undefined
  const isLoggedIn = !!session
  const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '?'

  return (
    <header className="sticky top-0 z-30 border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Site Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold tracking-tight text-slate-950">
              AV
            </div>
            <Link href="/" className="flex flex-col">
              <span className="font-semibold tracking-tight text-sm text-slate-50">Avenqor</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Education only</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex header-nav flex-1 gap-6 text-xs text-slate-200">
            {isLoggedIn ? (
              <>
                <Link href="/" className="hover:text-cyan-300 transition-colors">
                  Home
                </Link>
                <Link href="/cabinet" className="hover:text-cyan-300 transition-colors">
                  Cabinet
                </Link>
                <Link href="/faq" className="hover:text-cyan-300 transition-colors">
                  FAQ
                </Link>
              </>
            ) : (
              <>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  About
                </Link>
                <Link href="/pricing" className="hover:text-cyan-300 transition-colors">
                  Pricing
                </Link>
                <Link href="/faq" className="hover:text-cyan-300 transition-colors">
                  FAQ
                </Link>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex header-actions text-sm items-center gap-3">
            <CurrencySelector />
            <LanguageToggle />
            {isLoggedIn && user ? (
              <>
                <div className="balance-text text-xs text-slate-300 whitespace-nowrap">
                         Balance:{' '}
                         <strong className="font-semibold text-slate-50">
                           {user.balance ? Math.floor(user.balance).toLocaleString('en-US') : 0} Tokens
                         </strong>
                </div>
                <Link
                  href="/top-up"
                  className="top-up-link inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition whitespace-nowrap"
                >
                  Top-Up
                </Link>
                <Link
                  href="/cabinet"
                  className="flex items-center justify-center h-9 w-9 bg-slate-800 rounded-full font-bold text-slate-50 hover:bg-slate-700 transition"
                >
                  {userInitial}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 transition"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_12px_30px_rgba(8,145,178,0.55)] transition"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-t border-slate-900">
          <CurrencySelectorMobile />
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-50 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/cabinet"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cabinet
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-900">
            {isLoggedIn && user ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 bg-slate-800 rounded-full font-bold text-slate-50">
                      {userInitial}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-slate-50">{user.name}</div>
                    <div className="text-sm font-medium text-slate-300">
                      Balance: {user.balance ? Math.floor(user.balance).toLocaleString('en-US') : 0} Tokens
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/top-up"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Top-Up Balance
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800 transition"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-5">
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <p className="mt-3 text-center text-base font-medium text-slate-300">
                  Already have an account?{' '}
                  <Link href="/login" className="text-cyan-300 hover:text-cyan-200 hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

