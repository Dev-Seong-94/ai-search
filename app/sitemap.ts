import type { MetadataRoute } from "next";
import { tasks } from "./data/tasks";
import { toolSlugs } from "./data/tools";
import { locales } from "./i18n/config";
import { siteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...tasks.map((task) => `/tasks/${task.slug}`),
    ...toolSlugs.map((slug) => `/tools/${slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, `${siteUrl}/${code}${path}`]),
        ),
      },
    })),
  );
}
