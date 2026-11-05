import type { Locale } from "../i18n/config";

/** Requires every piece of content to exist in all supported languages. */
export type Localized<T = string> = Record<Locale, T>;

export type CategorySlug =
  | "writing"
  | "design"
  | "video"
  | "audio"
  | "docs"
  | "data";

export type Pricing = "free" | "freemium" | "paid";
export type Difficulty = "easy" | "medium" | "advanced";

export interface PaidPlan {
  name: string;
  /** Price per month as listed on the official source on the lastVerified date. */
  amount: number;
  currency: "USD" | "EUR" | "KRW";
}

export interface Tool {
  name: string;
  url: string;
  pricing: Pricing;
  /** Omitted when official sources conflict or could not be read. */
  paidPlan?: PaidPlan;
  freeTier: Localized;
  difficulty: Difficulty;
  /** Only present when Korean/Japanese support was confirmed on an official page. */
  languageNote?: Localized;
  description: Localized;
  /** ISO date the facts above were checked against official sources. */
  lastVerified: string;
}
