// components/CurrencySelector.tsx - Currency selector component

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getAvailableCurrenciesList, getCurrencyConfigByCode } from '@/lib/currency-config'
import { getUserCurrency, setUserCurrency } from '@/lib/currency-client'

export function CurrencySelector() {
  const [currentCurrency, setCurrentCurrency] = useState('GBP')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentCurrency(getUserCurrency())
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCurrencyChange = (code: string) => {
    setUserCurrency(code)
    setCurrentCurrency(code)
    setIsOpen(false)
    // Reload page to apply currency changes
    window.location.reload()
  }

  const currencyConfig = getCurrencyConfigByCode(currentCurrency)
  const allCurrencies = getAvailableCurrenciesList()

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="currency-button inline-flex items-center px-2 py-1.5 border border-slate-700 rounded-full text-[11px] font-medium text-slate-200 hover:text-cyan-300 hover:border-slate-600 transition whitespace-nowrap bg-slate-900/80"
      >
        <span>{currentCurrency}</span>
        <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-slate-900 rounded-md shadow-lg border border-slate-800 z-50">
          {Object.entries(allCurrencies).map(([code, currency]) => (
            <button
              key={code}
              onClick={() => handleCurrencyChange(code)}
              className={`block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition ${
                code === currentCurrency ? 'bg-slate-800 font-semibold text-cyan-300' : ''
              }`}
            >
              <span>
                {code} ({currency.symbol})
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CurrencySelectorMobile() {
  const [currentCurrency, setCurrentCurrency] = useState('GBP')

  useEffect(() => {
    setCurrentCurrency(getUserCurrency())
  }, [])

  const handleCurrencyChange = (code: string) => {
    setUserCurrency(code)
    setCurrentCurrency(code)
    window.location.reload()
  }

  const allCurrencies = getAvailableCurrenciesList()

  return (
    <div className="px-2 pt-2 pb-2 border-b border-slate-900">
      <label className="block text-xs font-medium text-slate-400 mb-2">Currency</label>
      <div className="flex gap-2">
        {Object.entries(allCurrencies).map(([code, currency]) => (
          <button
            key={code}
            onClick={() => handleCurrencyChange(code)}
            className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-full text-xs font-medium transition ${
              code === currentCurrency
                ? 'border-cyan-400 bg-slate-100 text-slate-950'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{currency.flag}</span>
            <span>{code}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

