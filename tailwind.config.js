/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Avenqor Design System - Base hex palette
        'avenqor-black': '#020617', // slate-950
        'avenqor-slate-900': '#0F172A',
        'avenqor-slate-800': '#1E293B',
        'avenqor-slate-700': '#334155',
        'avenqor-slate-500': '#64748B',
        'avenqor-slate-300': '#CBD5F5',
        'avenqor-cyan-400': '#22D3EE',
        'avenqor-cyan-500': '#06B6D4',
        'avenqor-indigo-500': '#6366F1',
        'avenqor-amber-400': '#FBBF24',
        'avenqor-emerald-400': '#4ADE80',
        'avenqor-rose-500': '#F43F5E',
        
        // Semantic tokens (for backward compatibility and ease of use)
        'primary': '#22D3EE', // cyan-400
        'primary-hover': '#06B6D4', // cyan-500
        'text-main': '#F9FAFB', // slate-50
        'text-secondary': '#CBD5F5', // slate-300 with opacity
        'text-muted': '#64748B', // slate-500
        'background': '#020617', // slate-950
        'surface': '#0F172A', // slate-900
        'border': '#1E293B', // slate-800
        'border-subtle': '#0F172A',
        'border-strong': '#334155', // slate-700
        'accent-primary': '#22D3EE',
        'accent-secondary': '#6366F1',
        'accent-warning': '#FBBF24',
      },
      boxShadow: {
        'brand-strong': '0 14px 32px rgba(8,145,178,0.65)',
        'card-deep': '0 20px 50px rgba(15,23,42,0.95)',
      },
      maxWidth: {
        'page': '72rem', // ~1152px
      },
    },
  },
  plugins: [],
}
