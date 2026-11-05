import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { hasLocale, locales } from "../i18n/config";
import { getDictionary } from "../i18n";
import { localizedAlternates, siteUrl } from "../lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s | ${dict.meta.title}` },
    description: dict.meta.description,
    alternates: localizedAlternates(lang),
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="w-full border-b border-neutral-300 bg-white/90 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 text-xl font-bold text-primary-700"
            >
              <span
                className="inline-block w-7 h-7 bg-primary-700 rounded-lg"
                aria-hidden="true"
              />
              {dict.meta.title}
            </Link>
            <LanguageSwitcher current={lang} label={dict.header.language} />
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6">
          {children}
        </main>

        <footer className="w-full border-t border-neutral-300 bg-white mt-10">
          <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 flex flex-col gap-2 text-sm text-neutral-600">
            <p>{dict.footer.disclaimer}</p>
            <p>{dict.footer.copyright}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
