// components/FAQAccordion.tsx - FAQ accordion component

'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  searchQuery: string
  selectedCategory: string
}

export default function FAQAccordion({ searchQuery, selectedCategory }: FAQAccordionProps) {
  const t = useTranslations('home.faq')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  // Get FAQ items from i18n
  const faqData: FAQItem[] = (t.raw('items') as any[]).map((item: any) => ({
    id: item.id,
    category: item.id.includes('payments') ? 'payments' : item.id.includes('account') ? 'account' : item.id.includes('legal') ? 'legal' : 'general',
    question: item.question,
    answer: item.answer,
  }))

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory, faqData])

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  if (filteredFAQs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-slate-50 mb-4">
          {t('noQuestionsMatch')}
        </h3>
        <p className="text-slate-300">
          {t('tryAdjusting')}{' '}
          <a href="/#pricing" className="text-cyan-300 hover:text-cyan-200 hover:underline">
            {t('pricing')}
          </a>{' '}
          {t('and')}{' '}
          <a href="/allergens" className="text-cyan-300 hover:text-cyan-200 hover:underline">
            allergen
          </a>{' '}
          {t('guides')}
        </p>
      </div>
    )
  }

  // Limit to 8 FAQs for home page
  const displayedFAQs = filteredFAQs.slice(0, 8)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedFAQs.map((faq) => (
          <div
            key={faq.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-800 transition"
              aria-expanded={openItems.has(faq.id)}
            >
              <span className="font-semibold text-slate-50">{faq.question}</span>
              <svg
                className={`h-5 w-5 text-slate-400 transition-transform ${
                  openItems.has(faq.id) ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openItems.has(faq.id) && (
              <div className="px-6 py-4 border-t border-slate-800 text-slate-300">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

