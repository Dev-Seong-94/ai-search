import type { Locale } from "./config";
import en from "./en";
import ja from "./ja";
import ko from "./ko";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { ko, en, ja };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
