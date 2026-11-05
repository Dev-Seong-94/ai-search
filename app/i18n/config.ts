export const locales = ["ko", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
