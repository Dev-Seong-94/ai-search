"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchTasks, type SearchItem } from "../data/search";

interface SearchBarProps {
  items: SearchItem[];
  basePath: string;
  labels: {
    label: string;
    placeholder: string;
    search: string;
    results: string;
    noResults: string;
    browse: string;
  };
}

export function SearchBar({ items, basePath, labels }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const hasQuery = query.trim().length > 0;
  const results = searchTasks(items, query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) router.push(`${basePath}/tasks/${results[0].slug}`);
  };

  return (
    <div className="w-full max-w-lg mt-4 text-left">
      <form onSubmit={handleSubmit} role="search" className="flex items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={labels.label}
          placeholder={labels.placeholder}
          className="min-w-0 flex-1 px-5 py-3 rounded-full border border-neutral-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-300 text-base"
        />
        <button
          type="submit"
          className="shrink-0 px-5 py-3 rounded-full bg-primary-700 text-white font-semibold hover:bg-primary-500 transition"
        >
          {labels.search}
        </button>
      </form>

      <div aria-live="polite">
        {hasQuery && results.length > 0 && (
          <div className="mt-3 rounded-xl bg-white border border-neutral-200 shadow-sm p-2">
            <p className="px-3 py-1 text-xs font-semibold text-neutral-600">
              {labels.results}
            </p>
            <ul>
              {results.slice(0, 5).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${basePath}/tasks/${item.slug}`}
                    className="block rounded-lg px-3 py-2 font-medium text-neutral-900 hover:bg-neutral-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasQuery && results.length === 0 && (
          <p className="mt-3 rounded-xl bg-white border border-neutral-200 p-4 text-sm text-neutral-700">
            {labels.noResults}{" "}
            <a href="#categories" className="font-medium underline text-secondary-700">
              {labels.browse}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
