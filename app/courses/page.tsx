// app/courses/page.tsx - Courses listing page

import { Metadata } from 'next'
import { CoursesPage } from '@/components/CoursesPage'
import enCourses from '@/i18n/en/courses.json'

export const metadata: Metadata = {
  title: enCourses.title,
  description: enCourses.subtitle,
}

export default function CoursesListingPage() {
  return <CoursesPage />
}

