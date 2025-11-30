import React, { useRef } from "react";
import {
  ShieldCheck,
  BookOpenCheck,
  Search,
  Info,
  TrendingUp,
  Waves,
  LineChart,
  Activity,
  AlertTriangle,
  Brain,
  Compass,
  Clock,
  Layers,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor Glossary page (/glossary)
// Static content, no routing or real data – just visual structure.

type Term = {
  id: string;
  label: string;
  category: string;
  short: string;
  explanation: string;
  tag?: string;
};

const terms: Term[] = [
  {
    id: "leverage",
    label: "Leverage",
    category: "Risk",
    short: "How much exposure you control per unit of capital.",
    explanation:
      "Leverage is the ratio between the size of your position and the amount of capital you put at risk. Higher leverage amplifies both gains and losses. Misusing leverage is one of the fastest ways to blow an account.",
    tag: "Core risk concept",
  },
  {
    id: "drawdown",
    label: "Drawdown",
    category: "Risk",
    short: "The peak-to-trough decline of your account or system.",
    explanation:
      "Drawdown measures how much your equity curve has fallen from its last high. It is usually expressed as a percentage. Deep or prolonged drawdowns are often a sign that risk is too high or the strategy is misaligned with current conditions.",
    tag: "Risk tracking",
  },
  {
    id: "risk-per-trade",
    label: "Risk per trade",
    category: "Risk",
    short: "The percentage of capital you put at stake in one idea.",
    explanation:
      "Risk per trade defines how much of your account you are willing to lose if a single idea fails. Many educational frameworks use fixed percentages (for example 0.5–2%) to avoid oversized losses from any one position.",
  },
  {
    id: "pip",
    label: "Pip",
    category: "Forex",
    short: "A small unit used to measure price movement in Forex.",
    explanation:
      "A pip (percentage in point) is a standardised unit that represents a change in value between two currencies. For most major pairs one pip is 0.0001, although some brokers quote fractional (\"pipette\") values.",
  },
  {
    id: "lot-size",
    label: "Lot size",
    category: "Forex",
    short: "How big your position is in standardised contract units.",
    explanation:
      "Lot size defines the number of currency units you control in a Forex trade. Standard lots are typically 100,000 units, mini lots 10,000 and micro lots 1,000. Position sizing connects lot size to your risk per trade.",
  },
  {
    id: "volatility",
    label: "Volatility",
    category: "Crypto",
    short: "How fast and how far the price moves over time.",
    explanation:
      "Volatility describes the magnitude of price changes in a given period. Crypto markets often show higher volatility than many traditional pairs. Higher volatility can create opportunity but also increases the risk of rapid losses.",
  },
  {
    id: "liquidity-zones",
    label: "Liquidity zones",
    category: "Crypto",
    short: "Areas where a large number of orders may be resting.",
    explanation:
      "Liquidity zones are price areas where many orders are expected: previous highs/lows, consolidation ranges or obvious levels. Understanding where liquidity may sit can help frame potential sweeps or sharp moves.",
  },
  {
    id: "strike-price",
    label: "Strike price",
    category: "Binary",
    short: "The level that defines the outcome of a binary option.",
    explanation:
      "The strike price is the level you compare the underlying price to at expiry. In many binary structures your payout depends purely on whether price is above or below this strike at a specific time.",
  },
  {
    id: "expiry-time",
    label: "Expiry time",
    category: "Binary",
    short: "The moment when a binary option settles.",
    explanation:
      "Expiry time is the exact moment your binary option is evaluated. Very short expiries magnify noise and randomness. Educational material often emphasises understanding how expiry interacts with volatility and structure.",
  },
  {
    id: "trading-plan",
    label: "Trading plan",
    category: "Process",
    short: "A documented set of rules for how you operate.",
    explanation:
      "A trading plan outlines when you trade, how you manage risk, which setups you look for and when you stand aside. It is a living document that evolves with experience, not a one-time checklist.",
  },
  {
    id: "journal",
    label: "Trading journal",
    category: "Process",
    short: "A log of your trades, thoughts and lessons.",
    explanation:
      "A trading journal records entries, exits, reasoning and emotional state. Reviewing it regularly helps identify patterns, repeated mistakes and areas to adjust in your approach.",
  },
  {
    id: "psych-capital",
    label: "Psychological capital",
    category: "Psychology",
    short: "Your ability to keep making clear decisions under stress.",
    explanation:
      "Psychological capital is the mental bandwidth you have for decision-making and risk. Over-leveraging, over-trading or constantly monitoring positions can quickly burn through it, leading to impulsive choices.",
  },
];

const categories = ["All", "Forex", "Crypto", "Binary", "Risk", "Process", "Psychology"];

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

export default function AvenqorGlossaryPreview() {
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
                Glossary
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              <span>Education only</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Info className="w-3 h-3 text-cyan-300" />
              <span>No legal or tax advice</span>
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
              <div className="text-[11px] text-slate-500">Home / Glossary</div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                  A practical glossary for Forex, Crypto and Binary education.
                </h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">
                  Short, readable definitions that stay as close as possible to how
                  traders actually use these terms. No hype, no marketing language –
                  just context for your learning.
                </p>
              </div>

              {/* Search + filters */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <div className="flex-1 flex items-center gap-2 rounded-full bg-slate-950/80 border border-slate-800 px-3 py-1.5">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                      disabled
                      placeholder="Search a term (preview only, not interactive)"
                      className="bg-transparent border-0 outline-none text-xs text-slate-100 placeholder:text-slate-500 flex-1"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Info className="w-3 h-3" />
                    <span>Search will be implemented in-app. Here it is visual only.</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`px-2.5 py-1 rounded-full border ${
                        cat === "All"
                          ? "bg-slate-100 text-slate-950 border-slate-100"
                          : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
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
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                    <BookOpenCheck className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-50">
                      How to use this glossary
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Support for your courses, not a standalone strategy guide.
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300/90">
                  The glossary is designed to sit next to your Avenqor PDFs and AI
                  strategies. If you meet a term you do not recognise, you can quickly
                  look it up here, then return to the main material.
                </p>
                <p className="text-[11px] text-slate-300/90">
                  Definitions are intentionally conservative and do not attempt to
                  predict markets or tell you what to trade. They simply give
                  structure to the language used in courses.
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Term grid */}
        <Section className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Selected terms from the Avenqor glossary.
              </h2>
              <p className="text-sm text-slate-300/90 max-w-xl">
                In the full product you will be able to search, filter and open
                dedicated glossary views directly from course modules.
              </p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>
                  Definitions here are for preview. Full glossary will be extended per
                  release.
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {terms.map((term) => (
              <motion.div
                key={term.id}
                className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 text-sm flex flex-col gap-2"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      {term.category === "Risk" && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                      )}
                      {term.category === "Forex" && (
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
                      )}
                      {term.category === "Crypto" && (
                        <Waves className="w-3.5 h-3.5 text-cyan-300" />
                      )}
                      {term.category === "Binary" && (
                        <Activity className="w-3.5 h-3.5 text-cyan-300" />
                      )}
                      {term.category === "Process" && (
                        <Layers className="w-3.5 h-3.5 text-cyan-300" />
                      )}
                      {term.category === "Psychology" && (
                        <Brain className="w-3.5 h-3.5 text-cyan-300" />
                      )}
                      {term.category === "All" && (
                        <LineChart className="w-3.5 h-3.5 text-cyan-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-50">
                        {term.label}
                      </div>
                      <div className="text-[11px] text-slate-400">{term.category}</div>
                    </div>
                  </div>
                  {term.tag && (
                    <div className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300">
                      {term.tag}
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-slate-300/90">{term.short}</div>
                <div className="text-[11px] text-slate-300/90 leading-relaxed">
                  {term.explanation}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Education vs. advice section */}
        <Section className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    Education, not advice
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Glossary entries do not tell you what to trade.
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">
                The glossary explains language used in high-risk markets. It does not
                suggest instruments, position sizes or directions. Any decisions to
                trade remain fully your responsibility.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Compass className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    Link from courses
                  </div>
                  <div className="text-[11px] text-slate-400">
                    In the app, you can jump here from inside PDFs.
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">
                In production, key terms in Avenqor courses will link to glossary
                entries. You can open them, read the explanation and then return to
                your place in the PDF or module.
              </p>
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
                    Updates over time
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Glossary evolves with new modules and markets.
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300/90">
                As Avenqor adds new courses and AI templates, additional terms will be
                documented here. All updates will keep the same conservative,
                education-first tone.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Final CTA */}
        <Section className="pb-12">
          <div className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">
                Continue with a course or AI strategy.
              </h2>
              <p className="text-sm text-slate-300/90">
                Use the glossary as a support tool, then move back into structured
                learning – PDFs, custom courses and AI plans.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                Browse courses
              </button>
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                Generate AI strategy
              </button>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
