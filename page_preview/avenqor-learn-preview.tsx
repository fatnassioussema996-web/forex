import React, { useState, useRef } from "react";
import {
  UserCog,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  SlidersHorizontal,
  Clock,
  FileText,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor Learn page (/learn)
// Static content, no routing or real backend – just visual structure.

type TabKey = "custom" | "ai";

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
    <section className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

function LearnTabSwitcher({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string; icon: any }[] = [
    {
      key: "custom",
      label: "Custom course",
      icon: UserCog,
    },
    {
      key: "ai",
      label: "AI strategy",
      icon: Cpu,
    },
  ];

  return (
    <div className="inline-flex items-stretch rounded-full bg-slate-950/90 border border-slate-800 p-1 text-xs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              isActive
                ? "bg-slate-100 text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-cyan-300"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${
                isActive ? "text-slate-900" : "text-cyan-300"
              }`}
            />
            <span className="font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CustomCourseForm() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: form */}
      <div className="lg:col-span-7 space-y-4">
        <div className="space-y-2">
          <h2 className="text-sm sm:text-base font-semibold text-slate-50">
            Custom course request
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/90">
            Tell us where you are now and what you want to understand. A
            structured PDF is prepared by a senior trader (via AI) and delivered
            within 48–96 hours.
          </p>
        </div>

        <form className="space-y-4 text-xs">
          {/* Experience */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">Your trading experience</span>
              <span className="text-[11px] text-slate-500">
                Required · choose one
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["0 years / complete beginner", "1–2 years", "3+ years"].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Markets */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">Markets you want covered</span>
              <span className="text-[11px] text-slate-500">
                You can pick more than one
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["Forex", "Crypto", "Binary options"].map((m) => (
                <button
                  key={m}
                  type="button"
                  className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Deposit size */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">Typical deposit size</span>
              <span className="text-[11px] text-slate-500">
                Approximate is enough
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["< 1 000", "1 000 – 5 000", "5 000 – 20 000", "20 000+"].map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    className="px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-[11px] hover:border-slate-600"
                  >
                    {r}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Risk & style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-200">Risk tolerance</span>
                <span className="text-[11px] text-slate-500">
                  For position sizing examples
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Low", "Medium", "High"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-200">Trading style</span>
                <span className="text-[11px] text-slate-500">
                  Main way you want to trade
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Scalping", "Day trading", "Swing", "Position"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time & tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-200">Time available per week</label>
              <input
                type="text"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
                placeholder="For example: 3 evenings + 1 weekend session"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-200">
                Platforms / brokers you use (optional)
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
                placeholder="For example: MT4, MT5, TradingView, Binance..."
              />
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-200">
                What do you want from this course?
              </span>
              <span className="text-[11px] text-slate-500">
                Please be as specific as possible
              </span>
            </label>
            <textarea
              rows={4}
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none resize-none"
              placeholder="For example: I want to understand risk per trade, basic price structure and have a simple written plan I can follow for the next 3–6 months."
            />
          </div>

          {/* Extra notes */}
          <div className="space-y-1.5">
            <label className="text-slate-200">
              Anything else we should know? (optional)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none resize-none"
              placeholder="For example: past issues, psychological challenges, or constraints we should consider."
            />
          </div>

          {/* Consents */}
          <div className="space-y-2 text-[11px] text-slate-300">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950"
              />
              <span>
                I understand this is educational material only. Avenqor does
                not provide financial advice or trading signals.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950"
              />
              <span>
                I confirm that I have read and accept the Terms &amp;
                Conditions and Risk &amp; Disclaimer.
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]"
            >
              <span>Submit request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-slate-400">
              You will receive a confirmation email and the PDF within 48–96
              hours.
            </p>
          </div>
        </form>
      </div>

      {/* RIGHT: explainer / risk / pricing note */}
      <div className="lg:col-span-5 space-y-4">
        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
            <Clock className="w-3 h-3 text-cyan-300" />
            <span>Delivered in 48–96 hours</span>
          </div>
          <p className="text-[11px] text-slate-300/90">
            A senior trader (via AI) uses your profile to structure a PDF built
            around your experience, deposit size and risk tolerance. The delay
            is intentional – this is not an instant template.
          </p>
          <ul className="text-[11px] text-slate-300/90 space-y-1.5">
            <li>Modules sequenced for your context.</li>
            <li>Examples and scenarios aligned with your markets.</li>
            <li>Checklist and simple actions for the next 4–8 weeks.</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">Important risk reminder</span>
          </div>
          <p className="text-[11px] text-slate-100/90">
            Custom courses are still education only. They do not remove the risk
            of trading or guarantee any performance. You remain fully
            responsible for all decisions and outcomes.
          </p>
          <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 mt-1">
            <span>Read full risk &amp; disclaimer</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <h3 className="text-xs font-semibold text-slate-50 mb-1">
            How pricing works
          </h3>
          <p className="text-[11px] text-slate-300/90">
            A custom course uses more tokens than a single ready-made PDF. In
            production, pricing will be defined per market and depth. For now,
            treat it as a separate product with its own price in tokens and
            direct payment.
          </p>
          <ul className="text-[11px] text-slate-300/90 space-y-1.5">
            <li>Pay with tokens from your balance.</li>
            <li>Or use EUR, GBP, USD or AED at checkout.</li>
          </ul>
          <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
            <Layers className="w-3 h-3 text-cyan-300" />
            <span>Example only – final pricing TBD</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AIStrategyForm() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: form */}
      <div className="lg:col-span-7 space-y-4">
        <div className="space-y-2">
          <h2 className="text-sm sm:text-base font-semibold text-slate-50">
            AI Strategy Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/90">
            Get a structured, educational plan with setup description,
            entry/exit logic, risk framework and a checklist – generated in
            seconds from your profile.
          </p>
        </div>

        {/* Presets */}
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-200">Quick presets</span>
            <span className="text-slate-500">
              You can still adjust everything below
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Conservative intraday (1–2 trades/day)",
              "Balanced swing (multi-day holds)",
              "Exploratory scalping (high frequency, small size)",
            ].map((p) => (
              <button
                key={p}
                type="button"
                className="px-2.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Core profile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-200">Main market</label>
            <select className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none">
              <option>Forex</option>
              <option>Crypto</option>
              <option>Binary options</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-slate-200">Primary time frame</label>
            <select className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none">
              <option>M15</option>
              <option>M30</option>
              <option>H1</option>
              <option>H4</option>
              <option>D1</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-slate-200">Risk per trade (%)</label>
            <input
              type="number"
              className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
              placeholder="For example: 0.5 – 1.0"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-slate-200">Max trades per day</label>
            <input
              type="number"
              className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
              placeholder="For example: 3"
            />
          </div>
        </div>

        {/* Instruments + notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-200">
              Instruments you want in the plan
            </label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
              placeholder="For example: EURUSD, GBPUSD, BTCUSDT..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-slate-200">
              Key things to focus on (optional)
            </label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none"
              placeholder="For example: fewer trades, clear rules, news avoidance..."
            />
          </div>
        </div>

        {/* Output options */}
        <div className="mt-4 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-200">Output detail level</span>
            <span className="text-slate-500">
              Higher detail uses more tokens
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Quick summary", "Standard plan", "Deep-dive guide"].map(
              (o) => (
                <button
                  key={o}
                  type="button"
                  className="px-2.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/80 text-slate-200 hover:border-slate-600"
                >
                  {o}
                </button>
              )
            )}
          </div>
        </div>

        {/* Consents */}
        <div className="mt-4 space-y-2 text-[11px] text-slate-300">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-0.5 h-3 w-3 rounded border border-slate-600 bg-slate-950"
            />
            <span>
              I understand that the generated plan is for educational purposes
              only and does not contain trading signals or guaranteed results.
            </span>
          </label>
        </div>

        {/* CTA + preview note */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]"
          >
            <span>Generate AI strategy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <p className="text-[11px] text-slate-400">
            The plan will appear below in a structured format and be saved to
            your library.
          </p>
        </div>

        {/* Output preview placeholder */}
        <div className="mt-4 rounded-2xl bg-slate-950/80 border border-slate-900 p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-50">
                  AI strategy output
                </div>
                <div className="text-[11px] text-slate-400">
                  Example layout of the generated plan
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500">
              Placeholder · no real AI here
            </div>
          </div>
          <div className="mt-2 space-y-1.5 text-[11px] text-slate-300/90">
            <p>
              <span className="font-semibold text-slate-100">
                1. Setup description:
              </span>{" "}
              Clear explanation of the pattern or condition you asked for,
              including time frames and instruments.
            </p>
            <p>
              <span className="font-semibold text-slate-100">
                2. Entry &amp; exit logic:
              </span>{" "}
              Rules for when to consider entering and exiting, linked to your
              risk per trade and max trades per day.
            </p>
            <p>
              <span className="font-semibold text-slate-100">
                3. Risk framework:
              </span>{" "}
              Guidance on stop placement, partials and when not to trade (for
              example around news or low liquidity).
            </p>
            <p>
              <span className="font-semibold text-slate-100">
                4. Checklist:
              </span>{" "}
              A simple list you can read before each potential trade to avoid
              emotional decisions.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: info cards */}
      <div className="lg:col-span-5 space-y-4">
        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 w-max">
            <SlidersHorizontal className="w-3 h-3 text-cyan-300" />
            <span>Adjustable depth</span>
          </div>
          <p className="text-[11px] text-slate-300/90">
            You can request a quick overview or a deeper, more detailed plan. In
            production, token cost will scale with the depth and complexity you
            choose.
          </p>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <h3 className="text-xs font-semibold text-slate-50 mb-1">
            How AI strategies fit with courses
          </h3>
          <p className="text-[11px] text-slate-300/90">
            Strategies are best used on top of solid understanding. We recommend
            taking at least one structured course before relying heavily on
            generated plans.
          </p>
        </motion.div>

        <motion.div
          className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 flex flex-col gap-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">No signals. No guarantees.</span>
          </div>
          <p className="text-[11px] text-slate-100/90">
            Even though AI builds a structured plan, markets remain uncertain
            and high risk. You stay fully responsible for whether, when and how
            you trade.
          </p>
          <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 mt-1">
            <span>Read full risk &amp; disclaimer</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function AvenqorLearnPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>("custom");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />

      {/* Simple header */}
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
                Learn
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              Education only
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="w-3 h-3 text-cyan-300" />
              PDF outputs
            </span>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
            Back to home
          </button>
        </Section>
      </header>

      <main className="pt-6">
        {/* Intro + tabs */}
        <Section className="pb-6 space-y-6">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Home</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">Learn</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
                  Build your path: custom course or AI strategy.
                </h1>
                <p className="text-sm text-slate-300/90 max-w-xl">
                  Use one page to request a tailored PDF or generate an instant
                  AI-based educational plan. Both keep risk and process at the
                  center – never signals or guarantees.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-2">
                <LearnTabSwitcher active={activeTab} onChange={setActiveTab} />
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-slate-800">
                    <Info className="w-3 h-3 text-cyan-300" />
                    <span>Education only · no signals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Content by tab */}
        <Section className="pb-10">
          {activeTab === "custom" ? <CustomCourseForm /> : <AIStrategyForm />}
        </Section>
      </main>
    </div>
  );
}
