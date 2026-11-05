"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, hasLocale } from "../i18n/config";
import { getDictionary } from "../i18n";

export default function NotFound() {
  const { lang } = useParams<{ lang: string }>();
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-neutral-900">
        {dict.notFound.title}
      </h1>
      <Link
        href={`/${locale}`}
        className="mt-4 inline-block font-medium text-secondary-700 underline"
      >
        {dict.notFound.home}
      </Link>
    </div>
  );
}
