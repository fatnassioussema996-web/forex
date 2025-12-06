// components/TopUpForm.tsx - Top-up form component

'use client'

import { useState, useEffect, useCallback } from 'react'
import { formatPrice, calculateTokens } from '@/lib/currency-utils'
import type { CurrencyConfig } from '@/lib/currency-config'
import { useToast } from '@/hooks/use-toast'

interface TopUpFormProps {
  currency: string
  currencyConfig: CurrencyConfig
  presets: {
    preset1000: { amount: number; tokens: number }
    preset2750: { amount: number; tokens: number }
    preset6000: { amount: number; tokens: number }
  }
}

export default function TopUpForm({ currency, currencyConfig, presets }: TopUpFormProps) {
  const { showToast } = useToast()
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [tokenEquivalent, setTokenEquivalent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateTokenDisplay = useCallback(
    (value: number) => {
      if (isNaN(value) || value <= 0) {
        setTokenEquivalent('')
        return
      }
      const tokens = Math.floor(calculateTokens(value, currency))
      setTokenEquivalent(`You'll get ${tokens.toLocaleString('en-US')} Tokens`)
    },
    [currency]
  )

  useEffect(() => {
    // Select first preset by default
    if (presets.preset1000) {
      setSelectedPreset('1000')
      setAmount(presets.preset1000.amount.toFixed(2))
      updateTokenDisplay(presets.preset1000.amount)
    }
  }, [presets.preset1000, updateTokenDisplay])

  const sanitize = (value: string) => {
    return String(value).replace(',', '.').replace(/[^\d.]/g, '')
  }

  const handlePresetClick = (presetKey: string) => {
    setSelectedPreset(presetKey)
    setError(null)

    if (presetKey === 'custom') {
      setAmount('')
      setTokenEquivalent('')
    } else {
      const preset = presets[presetKey as keyof typeof presets]
      if (preset) {
        setAmount(preset.amount.toFixed(2))
        updateTokenDisplay(preset.amount)
      }
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitize(e.target.value)
    setAmount(sanitized)
    setSelectedPreset('custom')
    setError(null)

    const numValue = parseFloat(sanitized)
    if (!isNaN(numValue)) {
      updateTokenDisplay(numValue)
    } else {
      setTokenEquivalent('')
    }
  }

  const handleSubmit = async (button: HTMLButtonElement) => {
    const numAmount = parseFloat(sanitize(amount))
    
    if (isNaN(numAmount) || numAmount < 0.01) {
      const validationMessage = 'Please enter a valid amount (minimum 0.01)'
      setError(validationMessage)
      showToast({
        title: 'Invalid amount',
        description: validationMessage,
        variant: 'error',
      })
      return
    }

    setIsLoading(true)
    setError(null)
    const originalText = button.textContent

    try {
      button.textContent = 'Processing...'
      button.disabled = true

      const response = await fetch('/api/topup/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numAmount,
          currency: currency,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      if (!data.redirectUrl) {
        throw new Error('No redirect URL received')
      }

      // Redirect to payment gateway
      window.location.href = data.redirectUrl
    } catch (err: any) {
      const message = err.message || 'An error occurred. Please try again.'
      setError(message)
      showToast({
        title: 'Payment error',
        description: message,
        variant: 'error',
      })
      button.textContent = originalText || ''
      button.disabled = false
      setIsLoading(false)
    }
  }

  return (
    <>
      <form id="topup-form" className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-50">Choose a package</label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handlePresetClick('1000')}
              className={`px-4 py-3 rounded-xl border transition ${
                selectedPreset === '1000'
                  ? 'border-cyan-400 bg-slate-900/80 text-slate-50'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold">{formatPrice(presets.preset1000.amount, currency)}</div>
              <div className="text-xs font-normal mt-1">1,000 Tokens</div>
            </button>
            <button
              type="button"
              onClick={() => handlePresetClick('2750')}
              className={`px-4 py-3 rounded-xl border transition ${
                selectedPreset === '2750'
                  ? 'border-cyan-400 bg-slate-900/80 text-slate-50'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold">{formatPrice(presets.preset2750.amount, currency)}</div>
              <div className="text-xs font-normal mt-1">2,750 Tokens (+10% Bonus)</div>
            </button>
            <button
              type="button"
              onClick={() => handlePresetClick('6000')}
              className={`px-4 py-3 rounded-xl border transition ${
                selectedPreset === '6000'
                  ? 'border-cyan-400 bg-slate-900/80 text-slate-50'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold">{formatPrice(presets.preset6000.amount, currency)}</div>
              <div className="text-xs font-normal mt-1">6,000 Tokens (+20% Bonus)</div>
            </button>
            <button
              type="button"
              onClick={() => handlePresetClick('custom')}
              className={`px-4 py-3 rounded-xl border transition ${
                selectedPreset === 'custom'
                  ? 'border-cyan-400 bg-slate-900/80 text-slate-50'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold">Custom</div>
              <div className="text-xs font-normal mt-1">Any amount</div>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="topup-amount" className="block text-sm font-medium text-slate-50">
            Or enter custom amount
          </label>
          <div className="mt-1 relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-400 sm:text-sm">{currencyConfig.symbol}</span>
            </div>
            <input
              type="text"
              id="topup-amount"
              value={amount}
              onChange={handleAmountChange}
              inputMode="decimal"
              placeholder="0.01"
              className="focus:ring-cyan-400 focus:border-cyan-400 block w-full pl-7 pr-12 sm:text-sm border border-slate-800 rounded-xl bg-slate-950 text-slate-50 placeholder:text-slate-500"
            />
          </div>
          {tokenEquivalent && (
            <p className="mt-2 text-sm text-center text-slate-300 font-medium">
              {tokenEquivalent}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <button
            type="button"
            id="checkout-button"
            onClick={(e) => handleSubmit(e.currentTarget)}
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-[0_14px_32px_rgba(8,145,178,0.65)] text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Add Tokens
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-slate-900/90 border border-rose-500/40 rounded-xl p-3 text-center">
          <p className="text-rose-400 font-medium">❌ Error</p>
          <p className="text-rose-300 text-sm">{error}</p>
        </div>
      )}
    </>
  )
}


