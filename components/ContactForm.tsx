// components/ContactForm.tsx - Contact form component

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        showToast({
          title: 'Message sent',
          description: 'We will get back to you shortly.',
          variant: 'success',
        })
      } else {
        setSubmitStatus('error')
        showToast({
          title: 'Message failed',
          description: 'Please try again later or email us directly.',
          variant: 'error',
        })
      }
    } catch (error) {
      setSubmitStatus('error')
      showToast({
        title: 'Network error',
        description: 'Unable to reach the server. Please try again.',
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-slate-50 mb-6">Send us a message</h2>

      <div className="mb-6 space-y-3" aria-live="polite">
        {submitStatus === 'success' && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-slate-900/90 p-4 text-emerald-300">
            <span aria-hidden="true" className="text-xl">
              ✅
            </span>
            <div>
              <p className="font-semibold">Message sent</p>
              <p className="text-sm text-slate-300">Thanks for reaching out! We respond within 1 business day.</p>
            </div>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-500/40 bg-slate-900/90 p-4 text-rose-300">
            <span aria-hidden="true" className="text-xl">
              ⚠️
            </span>
            <div>
              <p className="font-semibold">Delivery failed</p>
              <p className="text-sm text-slate-300">Please try again or email us directly at info@avenqor.net.</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-50">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`mt-1 block w-full px-3 py-2 border rounded-xl bg-slate-950 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm ${
              errors.name ? 'border-rose-500' : 'border-slate-800'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-50">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`mt-1 block w-full px-3 py-2 border rounded-xl bg-slate-950 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm ${
              errors.email ? 'border-rose-500' : 'border-slate-800'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-50">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            className={`mt-1 block w-full px-3 py-2 border rounded-xl bg-slate-950 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm ${
              errors.subject ? 'border-rose-500' : 'border-slate-800'
            }`}
          />
          {errors.subject && <p className="mt-1 text-sm text-rose-400">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-50">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className={`mt-1 block w-full px-3 py-2 border rounded-xl bg-slate-950 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm ${
              errors.message ? 'border-rose-500' : 'border-slate-800'
            }`}
          />
          {errors.message && <p className="mt-1 text-sm text-rose-400">{errors.message.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-[0_14px_32px_rgba(8,145,178,0.65)] text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}

