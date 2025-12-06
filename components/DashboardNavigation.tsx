// components/DashboardNavigation.tsx - Dashboard navigation component

'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart3,
  BookOpen,
  FileText,
  History,
  Settings,
  Receipt,
  Cpu,
} from 'lucide-react'
import { HomeSection } from './HomeSection'

export function DashboardNavigation() {
  const t = useTranslations('dashboard.navigation')
  const pathname = usePathname()

  const navItems = [
    {
      href: '/dashboard',
      label: t('dashboard'),
      icon: BarChart3,
      isActive: pathname === '/dashboard',
    },
    {
      href: '/dashboard/courses',
      label: t('myCourses'),
      icon: BookOpen,
      isActive: pathname === '/dashboard/courses',
    },
    {
      href: '/dashboard/custom-courses',
      label: t('customCourses'),
      icon: FileText,
      isActive: pathname === '/dashboard/custom-courses',
    },
    {
      href: '/dashboard/ai-strategies',
      label: t('aiStrategies'),
      icon: Cpu,
      isActive: pathname === '/dashboard/ai-strategies',
    },
    {
      href: '/dashboard/transactions',
      label: t('transactions'),
      icon: History,
      isActive: pathname === '/dashboard/transactions',
    },
    {
      href: '/dashboard/receipts',
      label: t('receipts'),
      icon: Receipt,
      isActive: pathname === '/dashboard/receipts',
    },
    {
      href: '/dashboard/settings',
      label: t('settings'),
      icon: Settings,
      isActive: pathname === '/dashboard/settings',
    },
  ]

  return (
    <HomeSection className="pb-4">
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition ${
                item.isActive
                  ? 'bg-slate-100 text-slate-950'
                  : 'border border-slate-700 bg-slate-950/90 text-slate-200 hover:border-slate-500'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </HomeSection>
  )
}

