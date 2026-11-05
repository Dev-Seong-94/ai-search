"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "../i18n/config";

interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}

export function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav aria-label={label} className="flex items-center gap-1 text-sm">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest ? `/${rest}` : ""}`}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? "true" : undefined}
          className={`rounded-full px-3 py-2 font-medium transition ${
            locale === current
              ? "bg-primary-700 text-white"
              : "text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </nav>
  );
}
