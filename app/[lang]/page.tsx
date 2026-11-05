import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard } from "../components/CategoryCard";
import { SearchBar } from "../components/SearchBar";
import type { SearchItem } from "../data/search";
import { categories, tasks } from "../data/tasks";
import { tools } from "../data/tools";
import { hasLocale } from "../i18n/config";
import { getDictionary } from "../i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  // Only the current language's text is sent to the browser for client-side search.
  const searchItems: SearchItem[] = tasks.map((task) => ({
    slug: task.slug,
    title: task.title[lang],
    terms: [
      ...task.keywords[lang],
      dict.categories[task.category],
      ...task.picks.map((pick) => tools[pick.tool].name),
    ].map((term) => term.toLowerCase()),
  }));

  return (
    <>
      <section className="flex flex-col items-center text-center gap-4 py-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 max-w-2xl">
          {dict.hero.title}
        </h1>
        <p className="text-lg text-neutral-600 max-w-xl">{dict.hero.desc}</p>
        <SearchBar
          items={searchItems}
          basePath={`/${lang}`}
          labels={{
            label: dict.search.label,
            placeholder: dict.hero.placeholder,
            search: dict.hero.search,
            results: dict.search.results,
            noResults: dict.search.noResults,
            browse: dict.search.browse,
          }}
        />
      </section>

      <section id="categories" className="py-8 scroll-mt-24">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          {dict.categories.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              name={dict.categories[category.slug]}
              color={category.color}
              icon={category.icon}
              href={`#${category.slug}`}
            />
          ))}
        </div>
      </section>

      {categories.map((category) => (
        <section
          key={category.slug}
          id={category.slug}
          className="py-6 scroll-mt-24"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900 mb-3">
            <span aria-hidden="true">{category.icon}</span>
            {dict.categories[category.slug]}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tasks
              .filter((task) => task.category === category.slug)
              .map((task) => (
                <li key={task.slug}>
                  <Link
                    href={`/${lang}/tasks/${task.slug}`}
                    className="flex h-full items-center rounded-xl bg-white border border-neutral-200 shadow-sm px-4 py-4 font-medium text-neutral-900 hover:shadow-md hover:border-secondary-300 transition"
                  >
                    {task.title[lang]}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
