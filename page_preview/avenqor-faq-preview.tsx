import React, { useRef } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Cpu,
  Wallet,
  CreditCard,
  BookOpen,
  HelpCircle,
  Info,
  Globe2,
  Clock,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor FAQ page (/faq)
// Static content, no routing or real data – just visual structure.

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    category: "About Avenqor",
    question: "Is Avenqor a broker, prop firm or signal provider?",
    answer:
      "No. Avenqor is an educational platform. We do not execute trades, manage client funds, provide trading signals, copy trading, PAMM/MAM services or any form of portfolio management.",
  },
  {
    category: "About Avenqor",
    question: "Do you guarantee any profit or performance?",
    answer:
      "No. Trading Forex, Crypto and Binary options is highly speculative and can lead to substantial or total loss of capital. We do not guarantee any outcome, return, win rate, payout, drawdown or similar metric. Our content is for education only.",
  },
  {
    category: "Courses & content",
    question: "What format are Avenqor courses delivered in?",
    answer:
      "Courses are delivered as structured PDF documents. Each course is organised into modules, key concepts, examples and practical checklists so that you can study at your own pace.",
  },
  {
    category: "Courses & content",
    question: "What is the difference between a ready-made course and a custom course?",
    answer:
      "Ready-made courses are pre-built learning paths by market and level (Beginner / Intermediate / Advanced). A custom course is created specifically around your inputs: experience, deposit size, risk tolerance, preferred markets and goals. It follows a similar PDF structure but is tailored to your situation.",
  },
  {
    category: "Custom course",
    question: "How does the custom course process work?",
    answer:
      "You complete a short form with your experience level, deposit size, risk tolerance, markets, trading style and goals. After payment, we prepare a tailored PDF course and send it to your email within an estimated 48–96 hours. The course is educational and does not contain trading signals.",
  },
  {
    category: "Custom course",
    question: "Why does a custom course take 48–96 hours?",
    answer:
      "The time window reflects the process of reviewing your inputs and structuring a course that matches them. It is not instant like an AI strategy. The 48–96h range is approximate and can vary depending on demand and complexity.",
  },
  {
    category: "AI strategy",
    question: "What is an AI strategy inside Avenqor?",
    answer:
      "An AI strategy is an instantly generated plan that describes setup criteria, entry/exit logic, and a risk checklist based on your inputs. It is not a live signal or an auto-trading system. It is educational material intended to help you think in structured scenarios.",
  },
  {
    category: "AI strategy",
    question: "Can I treat AI strategies as trade signals?",
    answer:
      "No. AI strategies are not trade signals, recommendations, or personalised financial advice. They are examples of how a structured plan could look. You are fully responsible for any trades you take in your own account.",
  },
  {
    category: "Tokens & payments",
    question: "How do tokens work on Avenqor?",
    answer:
      "Tokens are an internal balance that you can use to unlock courses, custom PDFs and AI strategies. You can load tokens by purchasing token packs or by setting a custom top-up. Tokens are not a separate financial product or investment.",
  },
  {
    category: "Tokens & payments",
    question: "Can I pay directly without using tokens?",
    answer:
      "Yes. In many cases you can pay directly in your local currency (for example EUR, GBP, USD or AED) for a single course or product. In that case, tokens are not required for that purchase.",
  },
  {
    category: "Tokens & payments",
    question: "Which currencies and payment methods do you support?",
    answer:
      "Supported currencies in the interface include EUR, GBP, USD and AED. Specific payment methods (for example card brands or local processors) can vary by region and will be shown at checkout.",
  },
  {
    category: "Access & account",
    question: "Do I need an account to access Avenqor courses?",
    answer:
      "You can browse course descriptions without an account. To purchase courses, request a custom course, generate AI strategies or manage your token balance, you will need to create an account and sign in.",
  },
  {
    category: "Access & account",
    question: "Where can I see the courses and strategies I have already purchased?",
    answer:
      "After signing in, you will find your purchased courses, custom PDFs and AI strategies in your dashboard. From there you can open PDFs, review past AI outputs and see your recent activity.",
  },
  {
    category: "Risk & regulation",
    question: "Is Avenqor regulated as a financial services provider?",
    answer:
      "Avenqor is positioned as an education-only platform and does not provide execution, investment services, portfolio management or payment services for trading accounts. As such, it does not operate as a broker or investment firm. Always check our Terms & Conditions and Risk & Disclaimer for the most up-to-date legal classification.",
  },
  {
    category: "Risk & regulation",
    question: "Who is responsible for the trades I decide to take?",
    answer:
      "You are. Any decision to trade in Forex, Crypto or Binary options is your own responsibility. Avenqor does not know your full financial situation, objectives or constraints, and nothing on the platform should be treated as personalised advice.",
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

export default function AvenqorFaqPreview() {
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
                FAQ &amp; key points
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              <span>Education only</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-300" />
              <span>High-risk markets</span>
            </span>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
            Back to home
          </button>
        </Section>
      </header>

      <main className="pt-6">
        {/* Hero */}
        <Section className="pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] text-slate-500">Home / FAQ</div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                  Before you start, here is what Avenqor is – and what it is not.
                </h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">
                  This page highlights key questions about our courses, custom PDFs,
                  AI strategies, tokens and risk. It is intentionally direct and
                  conservative. We prefer clarity over hype.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>Structured PDF courses for Forex, Crypto and Binary.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>AI-generated strategies as educational plans.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>No signals, no managed accounts, no promises.</span>
                </div>
              </div>
            </div>

            {/* Hero side card */}
            <div className="lg:col-span-5">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-900 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">
                      High-level risk summary
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Frequent reminder, not fine print.
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300/90">
                  Trading Forex, Crypto and Binary options is high risk and can lead
                  to substantial or total loss of capital. Avenqor focuses on
                  structured education. We do not provide financial advice, signals
                  or trade management.
                </p>
                <p className="text-[11px] text-slate-300/90">
                  Always evaluate whether such instruments are appropriate for your
                  situation and never trade with money you cannot afford to lose.
                </p>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                  <span>Read full risk &amp; disclaimer</span>
                  <span>→</span>
                </button>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* FAQ grid */}
        <Section className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Common questions about learning with Avenqor.
              </h2>
              <p className="text-sm text-slate-300/90 max-w-xl">
                Grouped by topic so you can quickly see how courses, custom PDFs,
                AI strategies and tokens behave inside the platform.
              </p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>
                  This FAQ is not a legal document. Always refer to Terms &amp;
                  Conditions.
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqs.map((item) => (
              <motion.div
                key={item.question}
                className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 text-sm"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-slate-50 mb-1">
                      {item.question}
                    </div>
                    <p className="text-[11px] text-slate-300/90 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Tokens & payments mini-section */}
        <Section className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Wallet className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    Tokens inside Avenqor
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Internal balance, not a tradeable asset.
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">
                Tokens are used to unlock educational content (courses, custom PDFs,
                AI strategies). They cannot be traded on markets, used as margin or
                withdrawn as cash.
              </p>
              <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                <span>Read pricing &amp; tokens page</span>
                <span>→</span>
              </button>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <CreditCard className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    Currencies &amp; regions
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Interface vs. actual processing.
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">
                You can usually choose between tokens and direct payment in EUR, GBP,
                USD or AED. The exact methods and processing partners can differ by
                region and will be shown at checkout.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Globe2 className="w-3 h-3 text-cyan-300" />
                <span>EU, UK and UAE are primary focus regions.</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Clock className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    Delivery times
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Instant vs. delayed content.
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">
                Ready-made courses unlock immediately after successful payment. AI
                strategies are generated within seconds. Custom courses are delivered
                by email within an estimated 48–96 hours after confirmation.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Final contact / help CTA */}
        <Section className="pb-12">
          <div className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">
                Still unsure about something?
              </h2>
              <p className="text-sm text-slate-300/90">
                If your question is not covered here, you can reach out to us. We will
                respond with clear, non-promotional information about how Avenqor works.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                Contact support
              </button>
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                Back to home
              </button>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
