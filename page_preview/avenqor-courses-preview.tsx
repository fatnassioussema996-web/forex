
import React, { useState, useRef } from "react";
import {
  SlidersHorizontal,
  Search,
  BookOpen,
  Layers,
  Gauge,
  ShieldCheck,
  Cpu,
  AlertTriangle,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor courses listing page
// Static content, no routing or real backend – just visual structure.

type Level = "Beginner" | "Intermediate" | "Advanced";
type Market = "Forex" | "Crypto" | "Binary";

const levelFilters: Array<Level | "All levels"> = [
  "All levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const marketFilters: Array<Market | "All markets"> = [
  "All markets",
  "Forex",
  "Crypto",
  "Binary",
];

const courses = [
  {
    id: 1,
    level: "Beginner" as Level,
    market: "Forex" as Market,
    title: "Forex Foundations: From Zero to First Trade",
    desc: "Core terms, order types, sessions and a first risk-aware approach to the FX market.",
    duration: "6–8 hours · self-paced",
    modules: 7,
    format: "PDF",
    price: "€79",
    tokens: "≈ 7 900 tokens",
  },
  {
    id: 2,
    level: "Beginner" as Level,
    market: "Crypto" as Market,
    title: "Crypto Basics & Exchange Structure",
    desc: "Spot vs derivatives, exchange structure, volatility characteristics and risk differences vs Forex.",
    duration: "5–7 hours · self-paced",
    modules: 6,
    format: "PDF",
    price: "€79",
    tokens: "≈ 7 900 tokens",
  },
  {
    id: 3,
    level: "Intermediate" as Level,
    market: "Crypto" as Market,
    title: "Crypto Volatility Structures",
    desc: "How volatility cycles, liquidity zones and narrative waves shape major crypto pairs.",
    duration: "8–10 hours · self-paced",
    modules: 8,
    format: "PDF",
    price: "€99",
    tokens: "≈ 9 900 tokens",
  },
  {
    id: 4,
    level: "Intermediate" as Level,
    market: "Forex" as Market,
    title: "FX Session Flows & Liquidity",
    desc: "Session overlaps, liquidity timing and common structural patterns in major FX pairs.",
    duration: "7–9 hours · self-paced",
    modules: 7,
    format: "PDF",
    price: "€99",
    tokens: "≈ 9 900 tokens",
  },
  {
    id: 5,
    level: "Advanced" as Level,
    market: "Binary" as Market,
    title: "Binary Risk & Payout Geometry",
    desc: "Risk stacking, payout curves and structuring exposure in binary products without chasing signals.",
    duration: "8–12 hours · self-paced",
    modules: 9,
    format: "PDF",
    price: "€119",
    tokens: "≈ 11 900 tokens",
  },
  {
    id: 6,
    level: "Advanced" as Level,
    market: "Forex" as Market,
    title: "Advanced Risk Management & Journaling",
    desc: "Drawdown control, distribution of outcomes and building a journal you actually use.",
    duration: "10–12 hours · self-paced",
    modules: 10,
    format: "PDF",
    price: "€129",
    tokens: "≈ 12 900 tokens",
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

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex flex-col bg-slate-950/80 border border-slate-900 rounded-2xl p-4 sm:p-5 gap-3 shadow-[0_18px_40px_rgba(15,23,42,0.75)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300">
          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80">
            {course.level}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80">
            {course.market}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80">
            {course.format}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <Gauge className="w-3 h-3" />
          {course.duration}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
          <BookOpen className="w-4 h-4 text-cyan-300" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm sm:text-[15px] font-semibold text-slate-50">
            {course.title}
          </h2>
          <p className="text-xs text-slate-300/90 leading-relaxed">
            {course.desc}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
        <span>
          {course.modules} modules · {course.format} download
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-600" />
        <span>Education only · no signals</span>
      </div>

      <div className="mt-2 pt-3 border-t border-slate-900 flex items-center justify-between gap-3 text-sm">
        <div>
          <div className="font-semibold text-slate-50">{course.price}</div>
          <div className="text-[11px] text-slate-400">
            {course.tokens} · pay with tokens or card
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200">
            <span>View course</span>
            <span>→</span>
          </button>
          <button className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300 hover:text-slate-100">
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function AvenqorCoursesPreview() {
  const [activeLevel, setActiveLevel] = useState<Level | "All levels">(
    "All levels"
  );
  const [activeMarket, setActiveMarket] = useState<Market | "All markets">(
    "All markets"
  );
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) => {
    if (activeLevel !== "All levels" && course.level !== activeLevel) {
      return false;
    }
    if (activeMarket !== "All markets" && course.market !== activeMarket) {
      return false;
    }
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.desc.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      {/* Simple header placeholder */}
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
                Courses
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              Education only
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-cyan-300" />
              PDF format
            </span>
            <span className="inline-flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-300" />
              AI strategies available separately
            </span>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500">
            Back to home
          </button>
        </Section>
      </header>

      <main className="pt-6">
        {/* Intro & controls */}
        <Section className="pb-6 space-y-6">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Home</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">Courses</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
                  All Avenqor courses.
                </h1>
                <p className="text-sm text-slate-300/90 max-w-xl">
                  Structured PDFs for Forex, Crypto and Binary options. Choose by
                  level and market – every course keeps risk and process at the
                  center, not hype.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-[11px] text-slate-400">
                <span>
                  {courses.length} courses available · more in preparation.
                </span>
                <span>
                  Pay with tokens or directly in EUR, GBP, USD or AED.
                </span>
              </div>
            </div>
          </div>

          {/* Filters row */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between text-[11px]">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-slate-200">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Filters</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {levelFilters.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-2.5 py-1 rounded-full border ${
                      activeLevel === lvl
                        ? "bg-slate-100 text-slate-950 border-slate-100"
                        : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {marketFilters.map((mkt) => (
                  <button
                    key={mkt}
                    onClick={() => setActiveMarket(mkt)}
                    className={`px-2.5 py-1 rounded-full border ${
                      activeMarket === mkt
                        ? "bg-slate-100 text-slate-950 border-slate-100"
                        : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {mkt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-1 lg:flex-none items-center gap-2">
              <div className="flex-1 flex items-center gap-2 rounded-full bg-slate-950/90 border border-slate-800 px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
                  placeholder="Search by title or topic..."
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Courses grid & sidebar note */}
        <Section className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              {filteredCourses.length === 0 ? (
                <div className="rounded-2xl border border-slate-900 bg-slate-950/80 p-4 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-300 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-slate-100 font-medium text-xs">
                      No courses match your filters yet.
                    </div>
                    <div className="text-[11px] text-slate-300/90">
                      Try resetting one of the filters or clearing the search
                      field. New content is added regularly as our curriculum
                      expands.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>

            {/* Right-side panel */}
            <aside className="lg:col-span-4 space-y-4">
              <motion.div
                className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="inline-flex items-center gap-2 text-[11px] px-2 py-1 rounded-full bg-slate-900/80 border border-slate-800 w-max">
                  <ShieldCheck className="w-3 h-3 text-cyan-300" />
                  <span className="text-slate-200">Education only · no signals</span>
                </div>
                <p className="text-xs text-slate-300/90 mt-1">
                  All courses are designed to explain concepts, structure and
                  risk management. They never contain trade signals or promises
                  of performance.
                </p>
              </motion.div>

              <motion.div
                className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <h2 className="text-xs font-semibold text-slate-50 mb-1">
                  Prefer a tailored path?
                </h2>
                <p className="text-[11px] text-slate-300/90 mb-2">
                  If none of the ready-made courses fully match your context,
                  you can request a custom PDF built around your experience,
                  deposit size and risk tolerance.
                </p>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                  <span>Request custom course</span>
                  <span>→</span>
                </button>
              </motion.div>

              <motion.div
                className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <h2 className="text-xs font-semibold text-slate-50 mb-1">
                  Short on time today?
                </h2>
                <p className="text-[11px] text-slate-300/90 mb-2">
                  Use the AI Strategy Builder to get a focused, instantly
                  generated plan, then come back to full courses when you are
                  ready to go deeper.
                </p>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                  <span>Open AI Strategy Builder</span>
                  <span>→</span>
                </button>
              </motion.div>
            </aside>
          </div>
        </Section>
      </main>
    </div>
  );
}
