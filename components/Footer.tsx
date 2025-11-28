// components/Footer.tsx - Main footer component

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950/95 border-t border-slate-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Company Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-slate-50">Avenqor</h3>
            <p className="mt-2 text-xs text-slate-400">
              Avenqor provides education only. We do not offer financial advice.
            </p>
            <ul className="mt-4 space-y-1.5">
              <li className="text-sm font-semibold text-slate-200">OVERSEAS SUPPORT LIMITED</li>
              <li>
                <span className="text-sm text-slate-400">Company number: 15969862</span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Products
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/courses" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/learn?tab=custom" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  Custom course
                </Link>
              </li>
              <li>
                <Link href="/learn?tab=ai" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  AI Strategy
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Useful Links
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-400 hover:text-cyan-300 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/risk-and-disclaimer"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition"
                >
                  Risk & Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Get in Touch */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Get In Touch
            </h4>
            <p className="mt-4 text-sm text-slate-400">
              Have questions or feedback? Reach out!
            </p>
            <a
              href="mailto:info@avenqor.net"
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline block mt-2"
            >
              info@avenqor.net
            </a>
            <a
              href="tel:+447457424685"
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline block mt-2"
            >
              +44 7457 424685
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {currentYear} OVERSEAS SUPPORT LIMITED. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Payment logos - will be added later */}
          </div>
        </div>
      </div>
    </footer>
  )
}

