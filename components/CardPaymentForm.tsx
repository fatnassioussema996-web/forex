// components/CardPaymentForm.tsx - Card payment form component

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { CreditCard, Loader2, AlertCircle, Mail } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface CardPaymentFormProps {
  total: number
  currency: string
  onSubmit: (cardData: CardFormData) => Promise<void>
  isLoading?: boolean
  userEmail?: string
}

export interface CardFormData {
  email: string
  cardNumber: string
  expiry: string
  cvv: string
  name: string
  address: string
  city: string
  postalCode: string
}

export function CardPaymentForm({ total, currency, onSubmit, isLoading = false, userEmail }: CardPaymentFormProps) {
  const t = useTranslations('cart.checkout.cardForm')
  const { showToast } = useToast()

  const [formData, setFormData] = useState<CardFormData>({
    email: userEmail || '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const [consentTerms, setConsentTerms] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof CardFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update email when userEmail prop changes
  useEffect(() => {
    if (userEmail) {
      setFormData((prev) => ({ ...prev, email: userEmail }))
    }
  }, [userEmail])

  // Format card number: XXXX XXXX XXXX XXXX
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16)
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
    setFormData((prev) => ({ ...prev, cardNumber: formatted }))
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: undefined }))
    }
  }

  // Format expiry: MM/YY
  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4)
    let formatted = cleaned
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
    }
    setFormData((prev) => ({ ...prev, expiry: formatted }))
    if (errors.expiry) {
      setErrors((prev) => ({ ...prev, expiry: undefined }))
    }
  }

  // Format CVV: 3 digits only
  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 3)
    setFormData((prev) => ({ ...prev, cvv: cleaned }))
    if (errors.cvv) {
      setErrors((prev) => ({ ...prev, cvv: undefined }))
    }
  }

  const handleFieldChange = (field: keyof CardFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CardFormData, string>> = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid')
    }

    // Card number validation
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '')
    if (!formData.cardNumber) {
      newErrors.cardNumber = t('errors.cardNumberRequired')
    } else if (cardNumberDigits.length !== 16) {
      newErrors.cardNumber = t('errors.cardNumberInvalid')
    }

    // Expiry validation
    if (!formData.expiry) {
      newErrors.expiry = t('errors.expiryRequired')
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = t('errors.expiryInvalid')
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = t('errors.cvvRequired')
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = t('errors.cvvInvalid')
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired')
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = t('errors.addressRequired')
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = t('errors.cityRequired')
    }

    // Postal code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = t('errors.postalCodeRequired')
    }

    setErrors(newErrors)
    
    // Check consent checkbox
    if (!consentTerms) {
      return false
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check consent checkbox first
    if (!consentTerms) {
      showToast({
        title: t('errors.consentRequired'),
        variant: 'error',
      })
      return
    }

    if (!validateForm()) {
      showToast({
        title: t('errors.validationFailed'),
        variant: 'error',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error: any) {
      showToast({
        title: t('errors.submitFailed'),
        description: error.message || t('errors.generic'),
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
          <CreditCard className="w-5 h-5 text-cyan-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-50">{t('title')}</h2>
          <p className="text-xs text-slate-400">{t('subtitle')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
            {t('fields.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-4 h-4 text-slate-500" />
            </div>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder={t('placeholders.email')}
              className={`w-full pl-10 pr-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
                errors.email ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-xs font-medium text-slate-300 mb-1.5">
            {t('fields.cardNumber')}
          </label>
          <input
            id="cardNumber"
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder={t('placeholders.cardNumber')}
            className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
              errors.cardNumber ? 'border-rose-500' : 'border-slate-700'
            }`}
          />
          {errors.cardNumber && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="expiry" className="block text-xs font-medium text-slate-300 mb-1.5">
              {t('fields.expiry')}
            </label>
            <input
              id="expiry"
              type="text"
              value={formData.expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder={t('placeholders.expiry')}
              className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
                errors.expiry ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.expiry && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.expiry}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="cvv" className="block text-xs font-medium text-slate-300 mb-1.5">
              {t('fields.cvv')}
            </label>
            <input
              id="cvv"
              type="text"
              value={formData.cvv}
              onChange={(e) => handleCvvChange(e.target.value)}
              placeholder={t('placeholders.cvv')}
              className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
                errors.cvv ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.cvv && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
            {t('fields.name')}
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder={t('placeholders.name')}
            className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
              errors.name ? 'border-rose-500' : 'border-slate-700'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Billing Address */}
        <div>
          <label htmlFor="address" className="block text-xs font-medium text-slate-300 mb-1.5">
            {t('fields.address')}
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            placeholder={t('placeholders.address')}
            className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
              errors.address ? 'border-rose-500' : 'border-slate-700'
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.address}
            </p>
          )}
        </div>

        {/* City and Postal Code */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="city" className="block text-xs font-medium text-slate-300 mb-1.5">
              {t('fields.city')}
            </label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              placeholder={t('placeholders.city')}
              className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
                errors.city ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-xs font-medium text-slate-300 mb-1.5">
              {t('fields.postalCode')}
            </label>
            <input
              id="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={(e) => handleFieldChange('postalCode', e.target.value)}
              placeholder={t('placeholders.postalCode')}
              className={`w-full px-3 py-2.5 text-sm text-slate-100 rounded-xl bg-slate-900 border focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 ${
                errors.postalCode ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.postalCode && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.postalCode}
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={consentTerms}
              onChange={(e) => setConsentTerms(e.target.checked)}
              className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950 text-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <span className="text-[11px] text-slate-300">
              {t('consent.before')}{' '}
              <Link href="/terms" className="text-cyan-300 hover:text-cyan-200 underline">
                {t('consent.termsLink')}
              </Link>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading || !consentTerms}
          className="w-full mt-6 py-2.5 px-4 text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting || isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('processing')}
            </>
          ) : (
            <>
              {t('payButton')} {total.toFixed(2)} {currency}
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

