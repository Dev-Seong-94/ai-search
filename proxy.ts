import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "./app/i18n/config";

/** Picks the highest-weighted supported language from an Accept-Language header. */
function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      return {
        language: tag.split("-")[0].toLowerCase(),
        weight: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter(({ weight }) => weight > 0)
    .sort((a, b) => b.weight - a.weight);

  const match = ranked.find(({ language }) => hasLocale(language));
  return match && hasLocale(match.language) ? match.language : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";
  if (hasLocale(firstSegment)) return;

  const url = request.nextUrl.clone();
  const locale = preferredLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skips Next.js internals and anything with a file extension (favicon, sitemap.xml).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
