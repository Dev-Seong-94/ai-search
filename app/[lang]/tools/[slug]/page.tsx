import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tasks } from "../../../data/tasks";
import { hasTool, toolSlugs, tools } from "../../../data/tools";
import type { Tool } from "../../../data/types";
import { hasLocale } from "../../../i18n/config";
import { getDictionary } from "../../../i18n";
import {
  formatDate,
  formatPlanPrice,
  localizedAlternates,
} from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return toolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/tools/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !hasTool(slug)) return {};

  const tool = tools[slug];
  return {
    title: tool.name,
    description: tool.description[lang],
    alternates: localizedAlternates(lang, `/tools/${slug}`),
  };
}

export default async function ToolPage({
  params,
}: PageProps<"/[lang]/tools/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !hasTool(slug)) notFound();

  const dict = getDictionary(lang);
  const tool: Tool = tools[slug];
  const usedFor = tasks.filter((task) =>
    task.picks.some((pick) => pick.tool === slug),
  );

  const price = tool.paidPlan
    ? `${dict.pricing[tool.pricing]} · ${tool.paidPlan.name}: ${dict.pricing.monthly.replace(
        "{price}",
        formatPlanPrice(tool.paidPlan, lang),
      )}`
    : `${dict.pricing[tool.pricing]} · ${dict.tool.noPrice}`;

  const facts = [
    { label: dict.tool.price, value: price },
    { label: dict.tool.freeTier, value: tool.freeTier[lang] },
    { label: dict.tool.difficulty, value: dict.difficulty[tool.difficulty] },
    ...(tool.languageNote
      ? [{ label: dict.tool.language, value: tool.languageNote[lang] }]
      : []),
    {
      label: dict.tool.lastVerified,
      value: formatDate(tool.lastVerified, lang),
    },
  ];

  return (
    <article className="max-w-2xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
        {tool.name}
      </h1>
      <p className="mt-3 text-lg text-neutral-700">{tool.description[lang]}</p>

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-500 transition"
      >
        {dict.tool.officialSite} ↗
      </a>

      <dl className="mt-8 rounded-xl border border-neutral-200 bg-white shadow-sm divide-y divide-neutral-200">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-4"
          >
            <dt className="text-sm font-semibold text-neutral-600">
              {fact.label}
            </dt>
            <dd className="sm:col-span-2 text-neutral-900">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {usedFor.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            {dict.tool.usedFor}
          </h2>
          <ul className="flex flex-col gap-2">
            {usedFor.map((task) => (
              <li key={task.slug}>
                <Link
                  href={`/${lang}/tasks/${task.slug}`}
                  className="font-medium text-secondary-700 underline"
                >
                  {task.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
