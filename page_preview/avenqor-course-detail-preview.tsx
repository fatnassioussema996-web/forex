
import React, { useRef } from "react";
import {
  ShieldCheck,
  BookOpen,
  FileText,
  Gauge,
  Layers,
  Globe2,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor single course detail page
// Static content, no routing or real backend – just visual structure.

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

const modules = [
  {
    no: "01",
    title: "How the Forex market is structured",
    desc: "Sessions, major pairs, liquidity and where your orders actually travel in the system.",
  },
  {
    no: "02",
    title: "Core terms & order types",
    desc: "Market vs limit, stop orders, spreads, slippage and how this affects execution.",
  },
  {
    no: "03",
    title: "Risk per trade & position sizing",
    desc: "Calculating % risk, lot size and why a small, consistent risk model matters more than setups.",
  },
  {
    no: "04",
    title: "Basic price structure & candles",
    desc: "Trends, ranges, support/resistance and how to read candles without overcomplicating charts.",
  },
  {
    no: "05",
    title: "Building your first simple plan",
    desc: "Turning theory into a minimal trading plan you can actually follow and review.",
  },
  {
    no: "06",
    title: "Journaling and review",
    desc: "What to track, how to log trades and how to run weekly reviews to learn from data.",
  },
  {
    no: "07",
    title: "Common beginner traps",
    desc: "Overtrading, revenge trading, sizing up too fast and how to build guardrails against them.",
  },
];

export default function AvenqorCourseDetailPreview() {
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
              <span className="font-semibold tracking-tight text-sm">
                Avenqor
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Course detail
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              Education only
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-cyan-300" />
              PDF format
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
              Back to courses
            </button>
          </div>
        </Section>
      </header>

      <main className="pt-6">
        {/* Breadcrumb + hero meta */}
        <Section className="pb-6 space-y-6">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Home</span>
              <span className="text-slate-600">/</span>
              <span>Courses</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">
                Forex Foundations: From Zero to First Trade
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: main info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-200">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-950 font-medium">
                    Beginner
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700">
                    Forex
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700">
                    PDF course
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700 flex items-center gap-1">
                    <Globe2 className="w-3 h-3" />
                    EN · AR planned
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-50">
                    Forex Foundations: From Zero to First Trade
                  </h1>
                  <p className="text-sm text-slate-300/90 max-w-2xl">
                    A structured PDF course for complete beginners who want a
                    clear, risk-aware introduction to the Forex market – without
                    hype, signals or promises.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-300">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Gauge className="w-3 h-3" />
                      <span>Duration</span>
                    </div>
                    <div className="text-slate-100">6–8 hours · self-paced</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Layers className="w-3 h-3" />
                      <span>Modules</span>
                    </div>
                    <div className="text-slate-100">7 modules</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-slate-400">
                      <FileText className="w-3 h-3" />
                      <span>Format</span>
                    </div>
                    <div className="text-slate-100">PDF download</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-slate-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Focus</span>
                    </div>
                    <div className="text-slate-100">
                      Risk awareness · basic process
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-950/80 border border-slate-900 p-3 text-[11px] text-slate-300/90 space-y-1.5">
                  <div className="font-semibold text-slate-100 text-xs">
                    What you will learn
                  </div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>How the Forex market is structured and why that matters.</li>
                    <li>
                      How to define and calculate risk per trade before pressing
                      any button.
                    </li>
                    <li>
                      How to build a simple, minimal trading plan and journal
                      framework.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: pricing & purchase */}
              <div className="lg:col-span-5">
                <motion.div
                  className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-[0_18px_40px_rgba(15,23,42,0.95)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                        <BookOpen className="w-4 h-4 text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-50">
                          Course access
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Immediate PDF download after payment.
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-semibold text-slate-50">€79</div>
                      <div className="text-[11px] text-slate-400">
                        ≈ 7 900 tokens
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <button className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-400 text-slate-950 font-semibold text-xs hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                      <span>Buy with tokens</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 text-slate-100 font-medium hover:border-slate-500">
                      <span>Buy with card</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1.5">
                    <div>
                      You can use existing balance or add tokens at checkout.
                      Card payments support EUR, GBP, USD and AED.
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 mt-0.5" />
                      <span>
                        Education only. This course does not contain trading
                        signals or promises of performance.
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 pt-3 border-t border-slate-900 text-[11px] text-slate-400 space-y-1.5">
                    <div className="font-medium text-slate-200">
                      Before buying, please note:
                    </div>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>
                        Trading Forex is high risk and may lead to total loss of
                        capital.
                      </li>
                      <li>
                        By continuing, you confirm you have read the risk
                        disclaimer.
                      </li>
                    </ul>
                    <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                      <span>Read full risk &amp; disclaimer</span>
                      <span>→</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        {/* Course outline */}
        <Section className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-50 mb-1">
                    Course outline
                  </h2>
                  <p className="text-xs text-slate-300/90">
                    A sequence of modules that build on each other so you are
                    not jumping between random concepts.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {modules.map((m) => (
                  <motion.div
                    key={m.no}
                    className="flex gap-3 rounded-2xl bg-slate-950/80 border border-slate-900 p-3"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700 text-[11px] text-slate-300">
                      {m.no}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-slate-50">
                        {m.title}
                      </div>
                      <div className="text-[11px] text-slate-300/90">
                        {m.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Who this is for / not for */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div
                className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <h2 className="text-xs font-semibold text-slate-50 mb-1">
                  Who this course is for
                </h2>
                <ul className="text-[11px] text-slate-300/90 space-y-1.5">
                  <li>
                    Complete beginners who want a structured, non-hyped
                    introduction to Forex.
                  </li>
                  <li>
                    Traders who opened a few random positions and realised they
                    need a proper base.
                  </li>
                  <li>
                    People who care about risk and process more than short-term
                    excitement.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <h2 className="text-xs font-semibold text-slate-50 mb-1">
                  What this course will not do
                </h2>
                <ul className="text-[11px] text-slate-300/90 space-y-1.5">
                  <li>It will not give you trade calls or entry alerts.</li>
                  <li>It will not promise you any monthly percentage return.</li>
                  <li>
                    It will not remove the need for your own discipline, time
                    and practice.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <h2 className="text-xs font-semibold text-slate-50 mb-1">
                  Included materials
                </h2>
                <ul className="text-[11px] text-slate-300/90 space-y-1.5">
                  <li>Full PDF course (around 80–100 pages).</li>
                  <li>
                    Simple printable risk checklist you can keep near your
                    screen.
                  </li>
                  <li>
                    Basic journaling template to log your first 50–100 trades.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* FAQ about this course */}
        <Section className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3">
              <div className="max-w-xl">
                <h2 className="text-sm sm:text-base font-semibold text-slate-50 mb-1">
                  Questions about this course
                </h2>
                <p className="text-xs text-slate-300/90">
                  Quick answers to how it works, what you receive and how to
                  use it.
                </p>
              </div>
              <div className="space-y-2">
                <details className="group bg-slate-950/80 border border-slate-900 rounded-2xl px-3 py-2 text-sm">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-xs font-medium text-slate-100 pr-4">
                      How do I receive the PDF?
                    </span>
                    <span className="text-slate-500 text-xs group-open:rotate-90 transition-transform">
                      ›
                    </span>
                  </summary>
                  <div className="mt-2 text-[11px] text-slate-300/90 leading-relaxed">
                    Immediately after successful payment, the course is added to
                    your Avenqor library and a download link is sent to your
                    email.
                  </div>
                </details>
                <details className="group bg-slate-950/80 border border-slate-900 rounded-2xl px-3 py-2 text-sm">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-xs font-medium text-slate-100 pr-4">
                      Can I get a refund if I do not like it?
                    </span>
                    <span className="text-slate-500 text-xs group-open:rotate-90 transition-transform">
                      ›
                    </span>
                  </summary>
                  <div className="mt-2 text-[11px] text-slate-300/90 leading-relaxed">
                    As this is digital educational content delivered instantly,
                    refunds are typically not offered. Please review the course
                    description, outline and risk notice before purchasing.
                  </div>
                </details>
                <details className="group bg-slate-950/80 border border-slate-900 rounded-2xl px-3 py-2 text-sm">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-xs font-medium text-slate-100 pr-4">
                      Does this course tell me exactly when to buy or sell?
                    </span>
                    <span className="text-slate-500 text-xs group-open:rotate-90 transition-transform">
                      ›
                    </span>
                  </summary>
                  <div className="mt-2 text-[11px] text-slate-300/90 leading-relaxed">
                    No. This course focuses on understanding, structure and
                    risk management. It does not provide trade signals or exact
                    entries/exits.
                  </div>
                </details>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <motion.div
                className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
                  <CheckCircle2 className="w-3 h-3 text-cyan-300" />
                  <span>Prefer tailored?</span>
                </div>
                <p className="text-[11px] text-slate-300/90">
                  If you want a course built specifically around your experience,
                  deposit and risk tolerance, you can request a custom PDF
                  prepared within 48–96 hours.
                </p>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                  <span>Request custom course instead</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>

              <motion.div
                className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
                  <Cpu className="w-3 h-3 text-cyan-300" />
                  <span>Complement with AI</span>
                </div>
                <p className="text-[11px] text-slate-300/90">
                  Already comfortable with the basics? Use the AI Strategy
                  Builder to generate a focused, educational plan based on your
                  profile, then apply it on top of what you learn here.
                </p>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                  <span>Open AI Strategy Builder</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>

              <motion.div
                className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">
                    High-risk market reminder
                  </span>
                </div>
                <p className="text-[11px] text-slate-200/90">
                  Trading Forex is highly speculative. Never risk money you
                  cannot afford to lose. This course explains concepts and
                  processes only – it does not make decisions for you.
                </p>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 mt-1">
                  <span>Read full risk &amp; disclaimer</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Bottom CTA */}
        <Section className="pb-10">
          <motion.div
            className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-50 mb-1">
                Ready to start with Forex Foundations?
              </h2>
              <p className="text-xs text-slate-300/90 max-w-xl">
                Take this course first, then layer AI strategies or custom PDFs
                on top as your understanding grows.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                Buy course
              </button>
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                View more courses
              </button>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}
