import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AICard } from "../../../components/AICard";
import { getTask, tasks } from "../../../data/tasks";
import { tools } from "../../../data/tools";
import { hasLocale } from "../../../i18n/config";
import { getDictionary } from "../../../i18n";
import { localizedAlternates } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return tasks.map((task) => ({ slug: task.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/tasks/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const task = getTask(slug);
  if (!hasLocale(lang) || !task) return {};

  return {
    title: task.title[lang],
    description: task.picks
      .map((pick) => `${tools[pick.tool].name}: ${pick.reason[lang]}`)
      .join(" "),
    alternates: localizedAlternates(lang, `/tasks/${slug}`),
  };
}

export default async function TaskPage({
  params,
}: PageProps<"/[lang]/tasks/[slug]">) {
  const { lang, slug } = await params;
  const task = getTask(slug);
  if (!hasLocale(lang) || !task) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Link
        href={`/${lang}#${task.category}`}
        className="text-sm font-medium text-secondary-700 underline"
      >
        ← {dict.task.back}
      </Link>
      <p className="mt-6 text-sm font-semibold text-neutral-600">
        {dict.categories[task.category]}
      </p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900">
        {task.title[lang]}
      </h1>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          {dict.task.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {task.picks.map((pick, index) => {
            const tool = tools[pick.tool];
            return (
              <AICard
                key={pick.tool}
                name={tool.name}
                pricingLabel={dict.pricing[tool.pricing]}
                difficultyLabel={`${dict.tool.difficulty}: ${dict.difficulty[tool.difficulty]}`}
                whyLabel={dict.task.why}
                reason={pick.reason[lang]}
                description={tool.description[lang]}
                viewText={dict.task.view}
                href={`/${lang}/tools/${pick.tool}`}
                isPrimary={index === 0}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
