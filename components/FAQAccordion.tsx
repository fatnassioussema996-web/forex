// components/FAQAccordion.tsx - FAQ accordion component

'use client'

import { useState, useMemo } from 'react'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string | JSX.Element
}

interface FAQAccordionProps {
  searchQuery: string
  selectedCategory: string
}

const faqData: FAQItem[] = [
  // Accuracy
  {
    id: 'accuracy-1',
    category: 'accuracy',
    question: 'How accurate is nutrition info?',
    answer:
      'We estimate using standard factors and reference databases. Brands differ and cooking changes weight, so expect small deviations. Use as guidance, not medical advice.',
  },
  {
    id: 'accuracy-2',
    category: 'accuracy',
    question: "Why don't numbers match my package label?",
    answer:
      'Labels vary by brand, country and serving basis. Pick a closer ingredient match or adjust servings. Minor rounding differences are normal.',
  },
  {
    id: 'accuracy-3',
    category: 'accuracy',
    question: 'Do you subtract fiber/net carbs?',
    answer:
      'By default we show total carbs. Net-carb subtraction (fiber/sugar alcohols) appears only when explicitly enabled in settings.',
  },
  {
    id: 'accuracy-4',
    category: 'accuracy',
    question: 'Raw vs. cooked weights?',
    answer:
      'We scale values based on the form you select (raw/cooked). If unspecified, we default to raw references and divide totals by the servings you set.',
  },
  // Allergens
  {
    id: 'allergens-1',
    category: 'allergens',
    question: 'How do allergen filters work?',
    answer:
      'Select allergens to exclude. We avoid ingredients tagged with those allergens and suggest swaps where possible. Always verify labels for cross-contact.',
  },
  {
    id: 'allergens-2',
    category: 'allergens',
    question: 'Which allergens do you support?',
    answer:
      'We cover the 14 EU allergens (gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, tree nuts, celery, mustard, sesame, sulphites, lupin, molluscs). See the Allergens & Safety page for details.',
  },
  {
    id: 'allergens-3',
    category: 'allergens',
    question: 'Is this medical or dietetic advice?',
    answer:
      'No. Information is general guidance only. For diagnoses, intolerances, or therapeutic diets, consult a qualified clinician or dietitian.',
  },
  {
    id: 'allergens-4',
    category: 'allergens',
    question: 'Can you guarantee no traces?',
    answer:
      'We cannot guarantee absence of traces due to supply chains and kitchens. Always check product labels and follow your doctor&apos;s advice.',
  },
  // Payments
  {
    id: 'payments-1',
    category: 'payments',
    question: 'How do tokens work?',
    answer:
      'Buy tokens in packs. Each generation costs a small token amount shown before you confirm. Unused tokens remain on your balance.',
  },
  {
    id: 'payments-2',
    category: 'payments',
    question: 'Can I cancel an order?',
    answer:
      "If a generation hasn't started yet, you can cancel from the queue and tokens are not deducted. Once generation begins, tokens are consumed.",
  },
  {
    id: 'payments-3',
    category: 'payments',
    question: 'Refund policy (tokens)',
    answer: (
      <>
        <p className="mb-2">
          <strong>Eligible:</strong> duplicate purchases, technical failure on our side, or
          unauthorized charge (once verified). In such cases we restore tokens or refund the payment
          method.
        </p>
        <p className="mb-2">
          <strong>Not eligible:</strong> subjective dissatisfaction with taste/photos where the
          generator functioned as designed. You can regenerate with different inputs.
        </p>
        <p className="text-sm text-text-secondary">
          To request a review, contact support with your email, payment ID, and a brief description.
          We respond within 2 business days.
        </p>
      </>
    ),
  },
  {
    id: 'payments-4',
    category: 'payments',
    question: 'Chargebacks &amp; disputes',
    answer:
      "We'll work with you to resolve issues quickly. Filing a chargeback pauses your account while we investigate. Provide context to accelerate resolution.",
  },
  // Account
  {
    id: 'account-1',
    category: 'account',
    question: 'Do I need an account?',
    answer:
      'Yes, to save recipes, track tokens, and export PDFs. Email sign-in; no social login required.',
  },
  {
    id: 'account-2',
    category: 'account',
    question: 'Do you store my ingredients or PDFs?',
    answer:
      'We store your generated results in your account for convenience. You can delete them anytime from the dashboard.',
  },
  {
    id: 'account-3',
    category: 'account',
    question: 'How do I delete my data?',
    answer:
      'Go to Account → Privacy and request deletion. We&apos;ll confirm by email when it&apos;s complete.',
  },
  {
    id: 'account-4',
    category: 'account',
    question: 'Invoices &amp; VAT?',
    answer:
      'Invoices are emailed after purchase and available in Account → Billing. VAT handling follows your billing country rules.',
  },
  // Troubleshooting
  {
    id: 'troubleshoot-1',
    category: 'troubleshoot',
    question: 'Recipe looks off / wrong style',
    answer:
      'Use Generate similar with clearer goals (diet, cuisine, time). Add or exclude ingredients. Small changes improve results a lot.',
  },
  {
    id: 'troubleshoot-2',
    category: 'troubleshoot',
    question: "Image didn&apos;t load in PDF",
    answer:
      'Check your connection and re-download. If it persists, regenerate; tokens are adjusted if our service was at fault.',
  },
  {
    id: 'troubleshoot-3',
    category: 'troubleshoot',
    question: 'Payment went through but tokens not added',
    answer:
      'Wait 1–2 minutes. If still missing, refresh and check Account → Billing. Contact support with your payment ID if unresolved.',
  },
  // Legal
  {
    id: 'legal-1',
    category: 'legal',
    question: 'Medical disclaimer',
    answer:
      'Not medical advice. For allergies, intolerances, or medical conditions, consult a qualified clinician. Use allergen filters as a helper, not a guarantee.',
  },
  {
    id: 'legal-2',
    category: 'legal',
    question: 'Content ownership',
    answer:
      'You own your generated recipes and PDFs. You grant us a limited license to host them in your account. Delete anytime from the dashboard.',
  },
  {
    id: 'legal-3',
    category: 'legal',
    question: 'Acceptable use',
    answer:
      "Don&apos;t upload illegal content or violate third-party rights. We may limit accounts that abuse the service.",
  },
]

export default function FAQAccordion({ searchQuery, selectedCategory }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof faq.answer === 'string' &&
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

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
          No questions match your filters 🤔
        </h3>
        <p className="text-slate-300">
          Try adjusting the category or search term, or explore our{' '}
          <a href="/#pricing" className="text-cyan-300 hover:text-cyan-200 hover:underline">
            pricing
          </a>{' '}
          and{' '}
          <a href="/allergens" className="text-cyan-300 hover:text-cyan-200 hover:underline">
            allergen
          </a>{' '}
          guides.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400 text-center">
        Showing {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFAQs.map((faq) => (
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
                {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

