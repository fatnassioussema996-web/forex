// app/checkout/page.tsx - Checkout page

'use client'

import { useCart } from '@/contexts/CartContext'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CreditCard, Coins } from 'lucide-react'
import { calculatePriceForTokens, formatPrice } from '@/lib/currency-utils'
import { getUserCurrency } from '@/lib/currency-client'
import { getCourseImagePath } from '@/lib/course-image-utils'
import { useState, useEffect } from 'react'
import { HomeSection } from '@/components/HomeSection'
import { useSession } from 'next-auth/react'
import { CardPaymentForm, CardFormData } from '@/components/CardPaymentForm'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const { showToast } = useToast()
  const t = useTranslations('cart.checkout')
  const tCommon = useTranslations('common.buttons')
  const tNav = useTranslations('common.nav')
  const [currency, setCurrency] = useState('GBP')
  const [paymentMethod, setPaymentMethod] = useState<'tokens' | 'card'>('tokens')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  useEffect(() => {
    setCurrency(getUserCurrency())
  }, [])

  const user = session?.user as { balance?: number } | undefined
  const userBalance = user?.balance || 0
  const total = getCartTotal(currency)
  const totalPrice = calculatePriceForTokens(total.tokens, currency)
  const formattedPrice = formatPrice(totalPrice, currency)
  const hasEnoughTokens = userBalance >= total.tokens

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, router])

  const handleCardPayment = async (cardData: CardFormData) => {
    setIsProcessingPayment(true)
    try {
      // TODO: Integrate with payment gateway API
      // For now, simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Simulate successful payment
      showToast({
        title: t('payment.success'),
        description: t('payment.successDescription'),
        variant: 'success',
      })
      
      clearCart()
      router.push('/dashboard/library')
      router.refresh()
    } catch (error: any) {
      throw error
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const handleTokenPayment = async () => {
    if (!hasEnoughTokens) {
      showToast({
        title: t('payment.insufficientTokens'),
        variant: 'error',
      })
      return
    }

    setIsProcessingPayment(true)
    try {
      // TODO: Implement actual token deduction and order processing
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      showToast({
        title: t('payment.success'),
        description: t('payment.successDescription'),
        variant: 'success',
      })
      
      clearCart()
      router.push('/dashboard/library')
      router.refresh()
    } catch (error: any) {
      showToast({
        title: t('payment.failed'),
        description: error.message || t('payment.failedDescription'),
        variant: 'error',
      })
    } finally {
      setIsProcessingPayment(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HomeSection>
          <div className="mb-6">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToCart')}
            </Link>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-2">{t('title')}</h1>
            <p className="text-slate-400">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5">
                <h2 className="text-lg font-semibold text-slate-50 mb-4">{t('payment.title')}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('tokens')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${
                      paymentMethod === 'tokens'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Coins className="w-5 h-5 text-cyan-300" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-50">{t('payment.withTokens')}</div>
                      <div className="text-xs text-slate-400">
                        {userBalance.toLocaleString('en-US')} {tCommon('tokens')} available
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${
                      paymentMethod === 'card'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-cyan-300" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-50">{t('payment.withCard')}</div>
                      <div className="text-xs text-slate-400">Pay with {currency}</div>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'tokens' && !hasEnoughTokens && (
                  <div className="mt-4 p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
                    <p className="text-sm text-slate-300 mb-2">{t('payment.insufficientTokens')}</p>
                    <Link
                      href="/pricing"
                      className="text-sm text-cyan-300 hover:text-cyan-200 transition"
                    >
                      {t('payment.buyTokens')} →
                    </Link>
                  </div>
                )}
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <CardPaymentForm
                  total={totalPrice}
                  currency={currency}
                  onSubmit={handleCardPayment}
                  isLoading={isProcessingPayment}
                  userEmail={session?.user?.email}
                />
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5 sticky top-4">
                <h2 className="text-lg font-semibold text-slate-50 mb-4">{t('orderSummary.title')}</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => {
                    const imagePath = getCourseImagePath(item.slug)
                    const displayTitle = item.title_ar || item.title
                    const itemPrice = calculatePriceForTokens(item.tokens, currency)
                    const formattedItemPrice = formatPrice(itemPrice, currency)

                    return (
                      <div key={item.slug} className="flex items-start gap-3 pb-3 border-b border-slate-800">
                        {imagePath ? (
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0">
                            <Image
                              src={imagePath}
                              alt={displayTitle}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-slate-900 border border-slate-700 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-slate-200 line-clamp-2 mb-1">
                            {displayTitle}
                          </h4>
                          <p className="text-[10px] text-slate-400">{formattedItemPrice}</p>
                        </div>
                      </div>
                    )
                  })}
                  
                  <div className="pt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{t('orderSummary.subtotal')}</span>
                      <span className="font-semibold text-slate-50">{formattedPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{tCommon('tokens')}</span>
                      <span className="font-semibold text-slate-50">
                        {total.tokens.toLocaleString('en-US')}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-slate-200">
                          {t('orderSummary.total')}
                        </span>
                        <span className="text-lg font-bold text-slate-50">{formattedPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTokenPayment}
                  disabled={(paymentMethod === 'tokens' && !hasEnoughTokens) || isProcessingPayment}
                  className="w-full px-4 py-3 text-sm font-semibold rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? t('payment.processing') : t('placeOrder')}
                </button>
              </div>
            </div>
          </div>
        </HomeSection>
      </main>
    </div>
  )
}

