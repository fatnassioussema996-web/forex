import React, { useRef } from "react";
import {
  Coins,
  CreditCard,
  Repeat,
  ShieldCheck,
  Info,
  ArrowRight,
  AlertTriangle,
  Gauge,
  Wallet,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Preview-only layout for Avenqor Pricing & Tokens page (/pricing)
// Static content, no routing or real payment logic – just visual structure.

type Pack = {
  id: string;
  name: string;
  label?: string;
  price: string;
  tokens: string;
  bestFor: string;
  bullets: string[];
  highlighted?: boolean;
};

const packs: Pack[] = [
  {
    id: "starter",
    name: "Focused Start",
    price: "£39.99",
    tokens: "≈ 4 000 tokens",
    bestFor: "First course or a few AI strategies.",
    bullets: [
      "Try Avenqor with a small, contained balance.",
      "Enough for one full course and several AI plans.",
    ],
  },
  {
    id: "growth",
    name: "Structured Growth",
    label: "Most popular",
    price: "£69.99",
    tokens: "≈ 7 000 tokens",
    bestFor: "Regular use across markets.",
    bullets: [
      "Comfortable room for multiple courses and strategies.",
      "Better value per token compared to Starter.",
    ],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Discipline Pro",
    price: "£99.99",
    tokens: "≈ 10 000 tokens",
    bestFor: "Long-term structured learning.",
    bullets: [
      "Built for traders who plan to study consistently.",
      "Best value per token in the current packs.",
    ],
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

function PackCard({ pack }: { pack: Pack }) {
  const Icon = Coins;
  return (
    <motion.div
      className={`flex flex-col gap-3 rounded-2xl p-4 border bg-slate-950/75 ${
        pack.highlighted
          ? "border-cyan-500/60 shadow-[0_18px_40px_rgba(8,145,178,0.45)]"
          : "border-slate-900"
      }`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
            <Icon className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-50">
              {pack.name}
            </div>
            <div className="text-[11px] text-slate-400">{pack.bestFor}</div>
          </div>
        </div>
        {pack.label && (
          <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/60 text-[10px] text-cyan-200 font-medium">
            {pack.label}
          </div>
        )}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-50">
          {pack.price}
        </div>
        <div className="text-[11px] text-slate-400">{pack.tokens}</div>
      </div>
      <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
        {pack.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
        <span>Select {pack.name}</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

export default function AvenqorPricingPreview() {
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
                Pricing &amp; tokens
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Wallet className="w-3 h-3 text-cyan-300" />
              <span>Use tokens across courses and AI</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              <span>Education only</span>
            </span>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 text-[11px] font-medium rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
            Back to home
          </button>
        </Section>
      </header>

      <main className="pt-6">
        {/* Hero section */}
        <Section className="pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <span>Home</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">Pricing &amp; tokens</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                  One balance for courses and AI strategies.
                </h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl">
                  Load a token balance once and use it across Avenqor: structured PDF
                  courses, custom courses and AI-generated strategies. Or pay directly
                  for a single course if you prefer.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="flex items-start gap-2">
                  <Coins className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>One balance for Forex, Crypto and Binary content.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>Pay with tokens or direct in EUR, GBP, USD or AED.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Repeat className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>Top up any time – tokens do not expire.</span>
                </div>
              </div>
            </div>

            {/* Highlight card */}
            <div className="lg:col-span-5">
              <motion.div
                className="rounded-2xl bg-slate-950/90 border border-slate-900 p-4 flex flex-col gap-3"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                      <Gauge className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-50">
                        Example effective rate
                      </div>
                      <div className="text-[11px] text-slate-400">
                        For visual purposes only
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300">
                    Non-binding
                  </div>
                </div>
                <p className="text-[11px] text-slate-300/90">
                  In production, token pricing will be defined per region and currency.
                  Here we simply show how packs and custom top-ups could work inside the
                  interface.
                </p>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-300/90">
                  For example: <span className="font-semibold">100 tokens</span> might
                  correspond to approximately <span className="font-semibold">£1.00</span>{" "}
                  (or regional equivalent), but final values will be defined in legal
                  terms and payment settings.
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Token packs */}
        <Section className="pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                Token packs.
              </h2>
              <p className="text-sm text-slate-300/90 max-w-xl">
                Start small or commit for longer – each pack loads tokens into your
                Avenqor balance for use across courses and AI.
              </p>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-col items-start sm:items-end gap-1">
              <span>
                Currency shown here is illustrative. Final pricing may differ.
              </span>
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-300" />
                <span>Exact token conversion will be defined in production.</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </Section>

        {/* Custom top-up & direct payment */}
        <Section className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Custom top-up */}
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <Wallet className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Custom top-up
                  </h3>
                  <p className="text-xs text-slate-300/90">
                    Set any amount in your preferred currency. In production, the
                    system converts it to tokens automatically.
                  </p>
                </div>
              </div>
              <div className="mt-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2">
                    <span className="text-[11px] text-slate-400">Amount</span>
                    <span className="text-xs text-slate-100">0.01</span>
                  </div>
                  <div className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-[11px] text-slate-100 flex items-center gap-1">
                    <span>GBP</span>
                    <span className="text-slate-500">·</span>
                    <span>EUR</span>
                    <span className="text-slate-500">·</span>
                    <span>USD</span>
                    <span className="text-slate-500">·</span>
                    <span>AED</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Minimum 0.01 in any supported currency. No formal maximum – larger
                  top-ups are simply converted into more tokens.
                </div>
              </div>
              <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                <span>Preview in tokens</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>

            {/* Direct payment */}
            <motion.div
              className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <CreditCard className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Pay directly for a single course
                  </h3>
                  <p className="text-xs text-slate-300/90">
                    If you prefer not to manage a balance, you can pay for individual
                    courses or custom PDFs directly in your currency.
                  </p>
                </div>
              </div>
              <ul className="mt-1 space-y-1.5 text-[11px] text-slate-300/90">
                <li>Use EUR, GBP, USD or AED depending on your region.</li>
                <li>
                  Tokens are not required – direct payment simply unlocks that specific
                  product.
                </li>
                <li>
                  In future, you can always convert to a token-based workflow if you
                  prefer.
                </li>
              </ul>
              <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
                <span>See example checkout</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </div>
        </Section>

        {/* How tokens behave */}
        <Section className="pb-10">
          <div className="space-y-5">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1">
                How tokens work inside Avenqor.
              </h2>
              <p className="text-sm text-slate-300/90">
                A simple balance that powers both structured courses and AI-based tools.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="text-[11px] font-semibold text-slate-400">
                  Step 1
                </div>
                <div className="font-semibold text-slate-50">Add tokens</div>
                <div className="text-xs text-slate-300/90">
                  Buy a pack or set a custom top-up using your preferred currency.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="text-[11px] font-semibold text-slate-400">
                  Step 2
                </div>
                <div className="font-semibold text-slate-50">
                  Use tokens on content
                </div>
                <div className="text-xs text-slate-300/90">
                  Spend tokens on ready-made courses, custom PDFs and AI strategies.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="text-[11px] font-semibold text-slate-400">
                  Step 3
                </div>
                <div className="font-semibold text-slate-50">
                  Track in your dashboard
                </div>
                <div className="text-xs text-slate-300/90">
                  See balance, usage and history – including which products used how
                  many tokens.
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-950/70 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="text-[11px] font-semibold text-slate-400">
                  Step 4
                </div>
                <div className="font-semibold text-slate-50">
                  Top up when needed
                </div>
                <div className="text-xs text-slate-300/90">
                  Tokens do not expire, so you can top up at your own pace when the
                  balance gets low.
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Risk & legal notes */}
        <Section className="pb-10">
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center border border-amber-400/60">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Important risk and token notice.
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300/90">
              <p>
                Trading Forex, Crypto and Binary options is highly speculative and can
                lead to substantial or total loss of capital. Tokens, courses and AI
                outputs on Avenqor are for educational purposes only. They do not
                contain financial advice or trading signals.
              </p>
              <p>
                Tokens themselves are a way to access digital educational content inside
                Avenqor. They are not a separate financial product or investment. Token
                pricing, refund rules and any region-specific limitations will be
                defined in the final Terms &amp; Conditions and Risk &amp; Disclaimer.
              </p>
            </div>
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200">
              <span>Read full risk &amp; disclaimer</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </Section>

        {/* Final CTA */}
        <Section className="pb-12">
          <div className="bg-slate-950/90 border border-slate-900 rounded-2xl px-5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 mb-1">
                Ready to load your first balance?
              </h2>
              <p className="text-sm text-slate-300/90">
                Start with a small pack or custom top-up. You can always switch to a
                different approach later – your focus stays on structured learning.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_14px_32px_rgba(8,145,178,0.65)]">
                Choose a token pack
              </button>
              <button className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-700 text-slate-100 hover:border-slate-500">
                Set custom top-up
              </button>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
