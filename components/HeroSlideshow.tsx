// components/HeroSlideshow.tsx - Hero slideshow component

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface Slide {
  level: string
  market: string
  title: string
  summary: string
}

export function HeroSlideshow() {
  const t = useTranslations('home.heroSlideshow')
  const [index, setIndex] = useState(0)

  const slides: Slide[] = [
    {
      level: t('slides.0.level'),
      market: t('slides.0.market'),
      title: t('slides.0.title'),
      summary: t('slides.0.summary'),
    },
    {
      level: t('slides.1.level'),
      market: t('slides.1.market'),
      title: t('slides.1.title'),
      summary: t('slides.1.summary'),
    },
    {
      level: t('slides.2.level'),
      market: t('slides.2.market'),
      title: t('slides.2.title'),
      summary: t('slides.2.summary'),
    },
  ]

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [slides.length])

  const active = slides[index]

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{t('labelTop')}</div>
          <div className="text-xs text-slate-300">{t('labelSub')}</div>
        </div>
        <div className="h-8 w-24 rounded-xl bg-gradient-to-r from-cyan-400/40 to-slate-800 flex items-center justify-center text-[10px] text-slate-100/90 border border-cyan-400/40">
          Slide show
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          key={active.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3 flex flex-col gap-2"
        >
          <div className="text-[11px] text-slate-400 mb-0.5">
            {active.level} · {active.market}
          </div>
          <div className="text-xs font-semibold text-slate-50 mb-1">{active.title}</div>
          <div className="text-[11px] text-slate-300/90 mb-2">{active.summary}</div>
          <Link
            href="#"
            className="self-start inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
          >
            <span>{t('ctaViewCourse')}</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-600'
              }`}
            />
          ))}
        </div>
        <span className="text-slate-500">
          {t('slideCounterPrefix')} {index + 1} {t('slideCounterOf')} {slides.length}
        </span>
      </div>
    </>
  )
}

