// src/data/courses.ts

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseMarket = "forex" | "crypto" | "binary";

export interface CourseModule {
  order: number;
  title: string;
  summary: string;
}

export interface Course {
  id: string;
  slug: string;
  level: CourseLevel;
  market: CourseMarket;
  title: string;
  shortDescription: string;
  longDescription: string;
  language: "en" | "ar";
  durationHoursMin: number;
  durationHoursMax: number;
  modules: CourseModule[];
  format: "pdf";
  price: {
    EUR: number;
    GBP: number;
    USD: number;
    AED: number;
    tokens: number;
  };
  isFeatured: boolean;
  pdfUrl: string; // public URL, например /courses/forex-foundations-en.pdf
}

export const demoCourses: Course[] = [
  {
    id: "forex-foundations-beginner",
    slug: "forex-foundations-from-zero-to-first-trade",
    level: "beginner",
    market: "forex",
    title: "Forex Foundations: From Zero to First Trade",
    shortDescription:
      "A structured beginner PDF for understanding how the Forex market works, how to place orders and how to think about risk.",
    longDescription:
      "This course is designed for complete beginners who want a clear, risk-aware introduction to the Forex market. It covers structure, core terms, order types, basic price behaviour and how to build a minimal trading plan and journal.",
    language: "en",
    durationHoursMin: 6,
    durationHoursMax: 8,
    modules: [
      {
        order: 1,
        title: "How the Forex market is structured",
        summary:
          "Sessions, major pairs, liquidity and where your orders actually travel in the system.",
      },
      {
        order: 2,
        title: "Core terms & order types",
        summary:
          "Market vs limit, stop orders, spreads, slippage and the effect on execution.",
      },
      {
        order: 3,
        title: "Risk per trade & position sizing",
        summary:
          "How to define % risk per trade and translate it into lot size.",
      },
      {
        order: 4,
        title: "Basic price structure & candles",
        summary:
          "Trends, ranges, support/resistance and reading candles without overcomplication.",
      },
      {
        order: 5,
        title: "Building your first simple plan",
        summary:
          "A minimal framework you can follow and later refine as you learn.",
      },
      {
        order: 6,
        title: "Journaling and review",
        summary:
          "What to log, how to review weekly and how to learn from your own data.",
      },
      {
        order: 7,
        title: "Common beginner traps",
        summary:
          "Overtrading, revenge trading, sizing up too fast and guardrails against them.",
      },
    ],
    format: "pdf",
    price: {
      EUR: 79,
      GBP: 69,
      USD: 86,
      AED: 315,
      tokens: 7900,
    },
    isFeatured: true,
    pdfUrl: "/courses/avenqor-forex-foundations-test.pdf",
  },
  {
    id: "crypto-volatility-intermediate",
    slug: "crypto-volatility-structures",
    level: "intermediate",
    market: "crypto",
    title: "Crypto Volatility Structures",
    shortDescription:
      "An intermediate look at how volatility, liquidity and narrative interact in major crypto markets.",
    longDescription:
      "This course is aimed at traders who understand basic trading concepts but want a structured view of how crypto volatility behaves. It walks through volatility cycles, liquidity zones, narrative waves and how to frame risk in such an environment.",
    language: "en",
    durationHoursMin: 8,
    durationHoursMax: 10,
    modules: [
      {
        order: 1,
        title: "Volatility cycles in crypto",
        summary:
          "How high and low volatility phases tend to cluster across time.",
      },
      {
        order: 2,
        title: "Liquidity zones and levels",
        summary:
          "Where liquidity tends to sit and why that matters for entries and exits.",
      },
      {
        order: 3,
        title: "Narrative and flow",
        summary:
          "The role of news, narratives and funding in shifting flows across assets.",
      },
      {
        order: 4,
        title: "Structuring risk in volatile assets",
        summary:
          "Position sizing and portfolio thinking when swings are large.",
      },
      {
        order: 5,
        title: "Scenario building",
        summary:
          "Creating simple scenarios instead of guessing single outcomes.",
      },
      {
        order: 6,
        title: "Review & adaptation",
        summary:
          "Using journaling and metrics to adjust your approach over time.",
      },
    ],
    format: "pdf",
    price: {
      EUR: 99,
      GBP: 87,
      USD: 108,
      AED: 395,
      tokens: 9900,
    },
    isFeatured: true,
    pdfUrl: "/courses/avenqor-crypto-volatility-structures-test.pdf",
  },
];
