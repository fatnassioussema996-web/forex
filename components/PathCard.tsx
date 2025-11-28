// components/PathCard.tsx - Learning path card component

'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface PathCardProps {
  icon: LucideIcon
  title: string
  text: string
  badge?: string
  cta: string
  href?: string
}

export function PathCard({ icon: Icon, title, text, badge, cta, href = '#' }: PathCardProps) {
  return (
    <div className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl p-5 gap-4 hover:border-cyan-400/70 hover:-translate-y-1 transition-all duration-150 shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-slate-800 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/70 text-[10px] text-slate-300">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300/80 leading-relaxed">{text}</p>
        </div>
      </div>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200"
      >
        <span>{cta}</span>
        <span className="inline-block translate-x-0 group-hover:translate-x-0.5 transition-transform">→</span>
      </Link>
    </div>
  )
}

