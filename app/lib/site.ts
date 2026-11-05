import type { Metadata } from "next";
import { locales, type Locale } from "../i18n/config";
import type { PaidPlan } from "../data/types";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Canonical and hreflang links for a path that exists in every language. */
export function localizedAlternates(
  locale: Locale,
  path = "",
): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(
      locales.map((code) => [code, `/${code}${path}`]),
    ),
  };
}

export function formatPlanPrice(plan: PaidPlan, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: plan.currency,
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  }).format(plan.amount);
}

export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
