export interface SearchItem {
  slug: string;
  title: string;
  /** Lowercased phrases this task should match: keywords, category, tool names. */
  terms: string[];
}

/**
 * Ranks tasks against a free-form query. Korean and Japanese sentences often have
 * no useful word breaks ("ブログを書きたい"), so a term found inside the query
 * counts as a match as well as a query word found inside a term.
 */
export function searchTasks(items: SearchItem[], query: string): SearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const words = normalized.split(/\s+/);

  const scored = items
    .map((item) => {
      const title = item.title.toLowerCase();
      const haystack = [title, ...item.terms];
      const wordHits = words.filter((word) =>
        haystack.some((term) => term.includes(word)),
      ).length;
      const termHits = item.terms.filter((term) =>
        normalized.includes(term),
      ).length;
      return { item, score: wordHits + termHits };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  // Drops weak matches on a common word like "만들기" when a much better match exists.
  const threshold = (scored[0]?.score ?? 0) / 2;
  return scored
    .filter(({ score }) => score >= threshold)
    .map(({ item }) => item);
}
