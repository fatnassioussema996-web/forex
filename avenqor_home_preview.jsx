import React, { useEffect, useState, useRef } from "react";
import {
  ShieldCheck,
  FileText,
  Cpu,
  SlidersHorizontal,
  BookOpen,
  Layers,
  UserCog,
  Compass,
  CreditCard,
  Repeat,
  Coins,
  ShoppingCart,
  AlertTriangle,
  BookOpenCheck,
  FolderKanban,
  Info,
  PlusCircle,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor home page
// Static content, no routing or real widgets – just visual structure.

const navItems = [
  "Courses",
  "Custom course",
  "AI Strategy",
  "Pricing",
  "Glossary",
  "Resources",
  "FAQ",
];

const featuredCourses = [
  {
    level: "Beginner",
    market: "Forex",
    title: "Forex Foundations: From Zero to First Trade",
    desc: "Build a base in Forex – from key terms and order types to risk per trade and journaling.",
    price: "€79",
    tokens: "≈ 7 900 tokens",
  },
  {
    level: "Intermediate",
    market: "Crypto",
    title: "Crypto Volatility Structures",
    desc: "Understand volatility cycles, liquidity zones and structured approaches to managing crypto swings.",
    price: "€99",
    tokens: "≈ 9 900 tokens",
  },
  {
    level: "Advanced",
    market: "Binary",
    title: "Binary Risk & Payout Geometry",
    desc: "A deep dive into payout curves, risk stacking and how to structure binary exposure.",
    price: "€119",
    tokens: "≈ 11 900 tokens",
  },
];

const heroSlides = [
  {
    level: "Beginner",
    market: "Forex",
    title: "Forex Foundations: From Zero to First Trade",
    summary: "A base in core concepts, order types and risk per trade.",
  },
  {
    level: "Intermediate",
    market: "Crypto",
    title: "Crypto Volatility Structures",
    summary:
      "Volatility cycles, liquidity zones and structured approaches to managing major crypto pairs.",
  },
  {
    level: "Advanced",
    market: "Binary",
    title: "Binary Risk & Payout Geometry",
    summary: "Payout curves, risk stacking and the structure of binary exposure.",
  },
];

const pathCards = [
  {
    icon: Layers,
    title: "Structured PDF courses",
    text: "Pre-built learning paths for Forex, Crypto and Binary, organised by level.",
    cta: "Browse courses",
  },
  {
    icon: UserCog,
    title: "Custom course by a pro trader",
    text: "Share your experience, deposit size, risk tolerance and goals. Receive a tailored PDF within 48–96 hours.",
    badge: "Delivered via email",
    cta: "Request custom course",
  },
  {
    icon: Cpu,
    title: "AI strategy in seconds",
    text: "Generate a structured trading plan with entry/exit logic and a risk checklist, based on your inputs.",
    badge: "Instant",
    cta: "Open AI Strategy Builder",
  },
];

const faqItems = [
  {
    q: "Is Avenqor a broker or a signal provider?",
    a: "No. Avenqor is an educational platform. We do not execute trades, manage funds or provide trading signals.",
  },
  {
    q: "Do you guarantee any profit or performance?",
    a: "No. Markets are unpredictable and high risk. Our focus is on structured education, not on promising outcomes.",
  },
  {
    q: "How are custom courses delivered?",
    a: "You complete a short profile and payment. We prepare a tailored PDF and send it to your email within 48–96 hours.",
  },
  {
    q: "What is the difference between a custom course and an AI strategy?",
    a: "A custom course is a deeper, structured PDF covering multiple modules. An AI strategy is a focused, instantly generated plan with a checklist.",
  },
  {
    q: "Which payment options and currencies do you support?",
    a: "You can use tokens or pay directly in EUR, GBP, USD and AED. Specific payment methods depend on your region.",
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

function CourseCard({ course }: { course: (typeof featuredCourses)[number] }) {
  return (
    <div className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl p-5 gap-4 hover:border-cyan-400/70 hover:-translate-y-1 transition-all duration-150 shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
      <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-700/40 via-slate-900 to-slate-950 flex items-center justify-center text-xs text-slate-300/70">
        Course cover (Sora image)
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
        <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/70">{course.level}</span>
        <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/70">{course.market}</span>
        <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/70">PDF</span>
      </div>
      <div className="flex items-start gap-2">
        <BookOpen className="w-5 h-5 text-cyan-400 mt-1" />
        <div>
          <h3 className="text-sm font-semibold text-slate-50 mb-1">{course.title}</h3>
          <p className="text-xs text-slate-300/80 leading-relaxed">{course.desc}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800/80 text-sm">
        <div>
          <div className="font-semibold text-slate-50">{course.price}</div>
          <div className="text-[11px] text-slate-400">{course.tokens}</div>
        </div>
        <button className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
          <span>View details</span>
          <span className="inline-block translate-x-0 group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}

function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const active = heroSlides[index];

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            Featured today
          </div>
          <div className="text-xs text-slate-300">Selected Avenqor courses</div>
        </div>
        <div className="h-8 w-24 rounded-xl bg-gradient-to-r from-cyan-400/40 to-slate-800 flex items-center justify-center text-[10px] text-slate-100/90 border border-cyan-400/40">
          Slide show
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          key={active.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3 flex flex-col gap-2"
        >
          <div className="text-[11px] text-slate-400 mb-0.5">
            {active.level} · {active.market}
          </div>
          <div className="text-xs font-semibold text-slate-50 mb-1">{active.title}</div>
          <div className="text-[11px] text-slate-300/90 mb-2">{active.summary}</div>
          <button className="self-start inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
            <span>View course</span>
            <span>→</span>
          </button>
        </motion.div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-6 bg-cyan-400" : "w-2 bg-slate-600"
              }`}
            />
          ))}
        </div>
        <span className="text-slate-500">
          Slide {index + 1} of {heroSlides.length}
        </span>
      </div>
    </>
  );
}

export default function AvenqorHomePreview() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Fake video background layer */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold tracking-tight">
              AV
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-sm">Avenqor</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Education only</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-200">
            {navItems.map((item) => (
              <button key={item} className="hover:text-cyan-300 transition-colors">
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Currency switcher */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-200">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700">
                <button className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-950 font-semibold">
                  GBP
                </button>
                <button className="px-1.5 py-0.5 rounded-full hover:text-cyan-300">EUR</button>
                <button className="px-1.5 py-0.5 rounded-full hover:text-cyan-300">USD</button>
                <button className="px-1.5 py-0.5 rounded-full hover:text-cyan-300">AED</button>
              </div>
              {/* Language switcher */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700">
                <button className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-950 font-semibold">
                  EN
                </button>
                <button className="px-1.5 py-0.5 rounded-full hover:text-cyan-300">AR</button>
              </div>
            </div>
            <button className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
              Sign in
            </button>
            <button className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_12px_30px_rgba(8,145,178,0.55)]">
              Get started
            </button>
          </div>
        </Section>
      </header>

      <main className="pb-16">
        {/* Hero */}
        <Section className="pt-10 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 w-max">
              <span className="text-[11px] font-medium text-slate-200">Avenqor Club</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Education only</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
                Premium education for high-risk markets.
              </h1>
              <p className="text-sm sm:text-base text-slate-300/90 max-w-xl leading-relaxed">
                Structured Forex, Crypto and Binary options courses with custom PDFs and AI-generated strategies. No signals, no promises – just clear learning paths.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                Explore courses
              </button>
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                Request custom course
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-300 mt-0.5" />
                <span>No financial advice – education only.</span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-cyan-300 mt-0.5" />
                <span>Courses delivered as structured PDFs.</span>
              </div>
              <div className="flex items-start gap-2">
                <Cpu className="w-4 h-4 text-cyan-300 mt-0.5" />
                <span>AI strategies with token-based access.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/15 via-slate-900/60 to-indigo-500/10 blur-2xl -z-10" />
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(15,23,42,0.95)]">
                <HeroSlideshow />
              </div>
            </div>
          </div>
        </Section>

        {/* Market snapshot */}
        <Section className="pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/70 border border-slate-900 rounded-2xl p-5">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">Market snapshot</h2>
              <p className="text-sm text-slate-300/90">
                Live prices from major markets to support your learning. Avenqor never provides trading signals or investment advice.
              </p>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <Info className="w-4 h-4 mt-0.5" />
                <span>Data is shown for educational purposes only.</span>
              </div>
              <div className="text-[11px] text-slate-500">Data widget placeholder (TradingView).</div>
            </div>
            <div className="lg:col-span-8">
              <div className="rounded-xl bg-slate-900/80 border border-slate-800 h-40 sm:h-52 flex items-center justify-center text-xs text-slate-400">
                Real-time BTC / FX chart placeholder
              </div>
            </div>
          </div>
        </Section>

        {/* Featured courses section */}
        <Section className="pb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Courses designed for clarity, not hype.
              </h2>
              <p className="text-sm text-slate-300/90 max-w-xl">
                Choose by market and level. Each course is a structured PDF you can study at your own pace.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-xs font-medium text-cyan-300 hover:text-cyan-200">
              <span>View all courses</span>
              <span>→</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filters</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["All", "Beginner", "Intermediate", "Advanced"].map((f) => (
                <button
                  key={f}
                  className={`px-2.5 py-1 rounded-full border text-xs ${
                    f === "All"
                      ? "bg-slate-100 text-slate-950 border-slate-100"
                      : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Forex", "Crypto", "Binary"].map((m) => (
                <button
                  key={m}
                  className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs text-slate-300 hover:border-slate-600"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCourses.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </Section>

        {/* Choose your path */}
        <Section className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Three ways to learn with Avenqor.
              </h2>
              <p className="text-sm text-slate-300/90">
                Pick the format that fits your current stage and time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pathCards.map((card) => (
                <motion.div
                  key={card.title}
                  className="flex flex-col gap-3 bg-slate-950/70 border border-slate-900 rounded-2xl p-4"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      <card.icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-50">{card.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300/90 flex-1">{card.text}</p>
                  {card.badge && (
                    <div className="inline-flex w-max px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300">
                      {card.badge}
                    </div>
                  )}
                  <button className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
                    <span>{card.cta}</span>
                    <span>→</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* How it works */}
        <Section className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                How Avenqor fits into your learning.
              </h2>
              <p className="text-sm text-slate-300/90">
                A simple sequence that keeps education and risk awareness at the center.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <Compass className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Define your path</div>
                <div className="text-xs text-slate-300/90">
                  Choose between ready-made courses, a custom PDF or an AI-generated strategy.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <CreditCard className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Add balance or pay directly</div>
                <div className="text-xs text-slate-300/90">
                  Use tokens across products or pay in EUR, GBP, USD or AED at checkout.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <FileText className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Get your PDF</div>
                <div className="text-xs text-slate-300/90">
                  Download and study at your own pace with a clear module structure.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <Repeat className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Refine with AI strategies</div>
                <div className="text-xs text-slate-300/90">
                  Generate additional AI plans as your understanding and needs evolve.
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Tokens & pricing teaser */}
        <Section className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Tokens and direct payments.
              </h2>
              <p className="text-sm text-slate-300/90">
                Pick what’s more convenient: token packs, custom top-ups or direct payments for courses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <Coins className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Token packs</div>
                <div className="text-xs text-slate-300/90">
                  Buy predefined token packs and use them across all Avenqor products.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <PlusCircle className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Custom top-up</div>
                <div className="text-xs text-slate-300/90">
                  Add any amount to your balance and spend tokens as you go.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 mb-1">
                  <ShoppingCart className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="font-semibold text-slate-50">Direct course payments</div>
                <div className="text-xs text-slate-300/90">
                  Pay for ready-made courses in EUR, GBP, USD or AED at checkout.
                </div>
              </motion.div>
            </div>
            <button className="inline-flex items-center gap-2 text-xs font-medium text-cyan-300 hover:text-cyan-200">
              <span>View full pricing & tokens</span>
              <span>→</span>
            </button>
          </div>
        </Section>

        {/* Glossary & resources */}
        <Section className="pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <BookOpenCheck className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">Glossary</h3>
                  <p className="text-xs text-slate-300/90">
                    Clear explanations of key Forex, Crypto and Binary terms – without jargon.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-300/90 space-y-1.5 mt-1">
                <li>
                  <span className="font-medium text-slate-100">Leverage</span> – how much exposure you control per unit of capital.
                </li>
                <li>
                  <span className="font-medium text-slate-100">Drawdown</span> – the peak-to-trough decline of your account.
                </li>
                <li>
                  <span className="font-medium text-slate-100">Risk per trade</span> – the percentage of capital you put at stake in one idea.
                </li>
              </ul>
              <button className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
                <span>Open full glossary</span>
                <span>→</span>
              </button>
            </motion.div>

            <motion.div
              className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <FolderKanban className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">Resources</h3>
                  <p className="text-xs text-slate-300/90">
                    Printable PDFs and templates to support your daily routine.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-300/90 space-y-1.5 mt-1">
                <li>
                  <span className="font-medium text-slate-100">Risk Management Checklist (PDF)</span> – a step-by-step list to review before any trade.
                </li>
                <li>
                  <span className="font-medium text-slate-100">Position Sizing Template (PDF)</span> – a simple structure to calculate lot size based on risk.
                </li>
              </ul>
              <button className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200">
                <span>View all resources</span>
                <span>→</span>
              </button>
            </motion.div>
          </div>
        </Section>

        {/* Risk notice */}
        <Section className="pb-14">
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-50">
                High-risk markets require high awareness.
              </h3>
              <p className="text-xs text-slate-300/90">
                Trading Forex, Crypto and Binary options is highly speculative and can lead to substantial or total loss of capital. Avenqor provides education only. We do not manage funds, execute trades or offer financial advice.
              </p>
              <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                <span>Read full risk &amp; disclaimer</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="pb-14">
          <div className="space-y-6">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Frequently asked questions
              </h2>
              <p className="text-sm text-slate-300/90">
                Key points about what Avenqor is – and what it is not.
              </p>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group bg-slate-950/70 border border-slate-900 rounded-2xl px-4 py-3 text-sm"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-xs font-medium text-slate-100 pr-4">{item.q}</span>
                    <span className="text-slate-500 text-xs group-open:rotate-90 transition-transform">
                      ›
                    </span>
                  </summary>
                  <div className="mt-2 text-[13px] text-slate-300/90 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* Footer CTA */}
        <Section className="pb-10">
          <div className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">
                Start with one course or a single AI plan.
              </h2>
              <p className="text-sm text-slate-300/90">
                No signals. No promises. Just structured education for Forex, Crypto and Binary markets.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                Explore courses
              </button>
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                Request custom course
              </button>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/95">
        <Section className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            <div className="font-semibold text-slate-100 text-xs mb-0.5">Avenqor</div>
            <div>Avenqor provides education only. We do not offer financial advice.</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="hover:text-cyan-300">Courses</button>
            <button className="hover:text-cyan-300">Custom course</button>
            <button className="hover:text-cyan-300">AI Strategy</button>
            <button className="hover:text-cyan-300">Glossary</button>
            <button className="hover:text-cyan-300">Resources</button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="hover:text-cyan-300">Risk &amp; Disclaimer</button>
            <button className="hover:text-cyan-300">Terms &amp; Conditions</button>
            <button className="hover:text-cyan-300">Privacy Policy</button>
            <button className="hover:text-cyan-300">Cookies</button>
            <button className="hover:text-cyan-300">Contact</button>
          </div>
        </Section>
      </footer>
    </div>
  );
}
