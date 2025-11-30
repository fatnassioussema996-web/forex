import React, { useRef } from "react";
import {
  ShieldCheck,
  Wallet,
  Sparkles,
  BookOpen,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  FileText,
  CreditCard,
  Settings,
  BarChart3,
  History,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor Dashboard page (/dashboard)
// Static content, no real data or routing – just visual structure.

type CourseItem = {
  type: "course" | "ai" | "custom";
  label: string;
  title: string;
  status: string;
  market: string;
  level?: string;
};

const recentItems: CourseItem[] = [
  {
    type: "course",
    label: "PDF course",
    title: "Forex Foundations: From Zero to First Trade",
    status: "Completed",
    market: "Forex",
    level: "Beginner",
  },
  {
    type: "ai",
    label: "AI strategy",
    title: "Intraday structure on EURUSD (M30)",
    status: "Ready",
    market: "Forex",
  },
  {
    type: "custom",
    label: "Custom course",
    title: "Crypto swing framework for part-time trader",
    status: "In progress",
    market: "Crypto",
  },
];

const transactions = [
  {
    type: "Top-up",
    detail: "Structured Growth token pack",
    date: "2025-06-11",
    amount: "- £69.99",
    meta: "+ 7 000 tokens",
  },
  {
    type: "Course",
    detail: "Crypto Volatility Structures (PDF)",
    date: "2025-06-09",
    amount: "- 2 300 tokens",
    meta: "Course purchase",
  },
  {
    type: "AI strategy",
    detail: "Balanced swing plan (BTCUSDT)",
    date: "2025-06-08",
    amount: "- 400 tokens",
    meta: "AI generation",
  },
  {
    type: "Custom course",
    detail: "Binary risk foundations (PDF)",
    date: "2025-06-02",
    amount: "- 3 500 tokens",
    meta: "Custom course request",
  },
];

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function AvenqorDashboardPreview() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-900/80 bg-slate-950/90 backdrop-blur-xl">
        <Section className="py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold tracking-tight">
              AV
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-sm">Avenqor</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Dashboard
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              <span>Education only</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="w-3 h-3 text-cyan-300" />
              <span>PDF courses &amp; AI outputs</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
              <Settings className="w-3 h-3" />
              <span>Account</span>
            </button>
          </div>
        </Section>
      </header>

      <main className="pt-6">
        {/* Overview */}
        <Section className="pb-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-500">Home / Dashboard</div>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
                Welcome back. Here is your learning overview.
              </h1>
              <p className="text-sm text-slate-300/90 max-w-xl">
                Track your token balance, custom course status and recent AI strategies
                in one view. Avenqor remains education only – no signals or managed
                accounts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                <BarChart3 className="w-3 h-3 text-cyan-300" />
                <span>Learning overview</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                <History className="w-3 h-3 text-cyan-300" />
                <span>Recent activity</span>
              </span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* Balance */}
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Token balance</span>
                <Wallet className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="text-lg font-semibold text-slate-50">4 860 tokens</div>
              <div className="text-[11px] text-slate-400">
                Approx. £48.60 equivalent – exact value depends on current pricing.
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                <button className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-semibold hover:bg-cyan-300 shadow-[0_10px_26px_rgba(8,145,178,0.55)]">
                  Top up balance
                </button>
                <button className="inline-flex items-center px-2.5 py-1 rounded-full border border-slate-700 text-[11px] text-slate-100 hover:border-slate-500">
                  View pricing
                </button>
              </div>
            </motion.div>

            {/* Custom course status */}
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  Custom course status
                </span>
                <Clock className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="text-sm font-semibold text-slate-50">
                Crypto swing framework for part-time trader
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/60 text-amber-200">
                  <Clock className="w-3 h-3" />
                  <span>In progress · 48–96h window</span>
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Once ready, your PDF will be emailed to you and appear in your library.
              </div>
            </motion.div>

            {/* Learning streak / progress */}
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Recent activity</span>
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="text-sm font-semibold text-slate-50">
                3 learning items this week
              </div>
              <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
                <li>Completed “Forex Foundations: From Zero to First Trade”.</li>
                <li>Generated AI strategy for EURUSD (M30).</li>
                <li>Requested a custom crypto course.</li>
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* Main content grid */}
        <Section className="pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: Library */}
            <div className="lg:col-span-2 space-y-4">
              {/* Library header */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    Your courses &amp; strategies
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Latest items are shown first. All are educational PDFs or AI outputs.
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button className="inline-flex items-center px-2.5 py-1 rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                    <BookOpen className="w-3 h-3 mr-1" />
                    <span>Browse courses</span>
                  </button>
                  <button className="inline-flex items-center px-2.5 py-1 rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                    <Cpu className="w-3 h-3 mr-1" />
                    <span>New AI strategy</span>
                  </button>
                </div>
              </div>

              {/* Library list */}
              <div className="space-y-3">
                {recentItems.map((item) => (
                  <motion.div
                    key={item.title}
                    className="bg-slate-950/80 border border-slate-900 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center gap-3"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mt-0.5">
                        {item.type === "course" && (
                          <BookOpen className="w-4 h-4 text-cyan-300" />
                        )}
                        {item.type === "ai" && (
                          <Cpu className="w-4 h-4 text-cyan-300" />
                        )}
                        {item.type === "custom" && (
                          <FileText className="w-4 h-4 text-cyan-300" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200">
                            {item.label}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
                            {item.market}
                          </span>
                          {item.level && (
                            <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
                              {item.level}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
                            PDF
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-50">
                          {item.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            {item.status === "Completed" && (
                              <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                            )}
                            {item.status === "In progress" && (
                              <Clock className="w-3 h-3 text-amber-300" />
                            )}
                            {item.status === "Ready" && (
                              <Sparkles className="w-3 h-3 text-cyan-300" />
                            )}
                            <span>{item.status}</span>
                          </span>
                          <span className="text-slate-600">·</span>
                          <span>Education only – not a signal.</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-end sm:items-end gap-2 text-[11px]">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-950 font-semibold hover:bg-slate-200">
                        <span>Open PDF</span>
                      </button>
                      <button className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-200">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Side column */}
            <div className="space-y-4">
              {/* Risk reminder */}
              <motion.div
                className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-50">
                      Education only – no guarantees.
                    </div>
                    <div className="text-[11px] text-slate-300/90">
                      All PDFs and AI strategies in your library are educational
                      material. They are not trade signals, and there is no guarantee of
                      profit or performance.
                    </div>
                    <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                      <span>Read full risk &amp; disclaimer</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Billing snapshot */}
              <motion.div
                className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <CreditCard className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">
                      Billing &amp; tokens
                    </div>
                    <div className="text-[11px] text-slate-400">
                      A snapshot of recent payments and token usage.
                    </div>
                  </div>
                </div>
                <div className="mt-1 space-y-2 text-[11px] text-slate-300/90">
                  <div className="flex items-center justify-between">
                    <span>Tokens spent last 30 days</span>
                    <span className="font-semibold text-slate-50">4 200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI strategies generated</span>
                    <span className="font-semibold text-slate-50">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Courses unlocked</span>
                    <span className="font-semibold text-slate-50">3</span>
                  </div>
                </div>
                <button className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                  <span>Open full billing history</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>

              {/* Quick actions */}
              <motion.div
                className="bg-slate-950/85 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="text-xs font-semibold text-slate-50">
                  Quick actions
                </div>
                <div className="space-y-2 text-[11px] text-slate-300/90">
                  <button className="w-full inline-flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/60 hover:bg-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-cyan-300" />
                      <span>Browse all courses</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                  <button className="w-full inline-flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/60 hover:bg-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <FileText className="w-3 h-3 text-cyan-300" />
                      <span>Request a new custom course</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                  <button className="w-full inline-flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/60 hover:bg-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-cyan-300" />
                      <span>Generate AI strategy</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Transactions */}
        <Section className="pb-12 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-slate-50">
                Recent token &amp; payment activity
              </div>
              <div className="text-[11px] text-slate-400">
                A simple log of how tokens and payments move through your account.
              </div>
            </div>
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
              <span>View all activity</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-900 bg-slate-950/80">
            <div className="grid grid-cols-12 px-3 py-2 border-b border-slate-900 text-[11px] text-slate-400">
              <div className="col-span-3">Type</div>
              <div className="col-span-5">Detail</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            <div className="divide-y divide-slate-900">
              {transactions.map((tx) => (
                <div
                  key={tx.type + tx.date + tx.detail}
                  className="grid grid-cols-12 px-3 py-2.5 text-[11px] text-slate-300/90"
                >
                  <div className="col-span-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-200">
                      {tx.type}
                    </span>
                  </div>
                  <div className="col-span-5 flex flex-col">
                    <span className="text-slate-100">{tx.detail}</span>
                    <span className="text-slate-500">{tx.meta}</span>
                  </div>
                  <div className="col-span-2 text-slate-400">{tx.date}</div>
                  <div className="col-span-2 text-right font-semibold text-slate-100">
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
