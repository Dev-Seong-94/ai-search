import Link from "next/link";

interface AICardProps {
  name: string;
  pricingLabel: string;
  difficultyLabel: string;
  whyLabel: string;
  reason: string;
  description: string;
  viewText: string;
  href: string;
  isPrimary?: boolean;
}

export function AICard({
  name,
  pricingLabel,
  difficultyLabel,
  whyLabel,
  reason,
  description,
  viewText,
  href,
  isPrimary = false,
}: AICardProps) {
  const cardClass = isPrimary
    ? "bg-primary-700 text-white shadow-lg"
    : "bg-white text-neutral-900 shadow border border-neutral-200";
  const badgeClass = isPrimary
    ? "bg-white/15 text-white"
    : "bg-secondary-50 text-secondary-700";
  const mutedClass = isPrimary ? "text-white/80" : "text-neutral-600";
  const linkClass = isPrimary ? "text-white" : "text-secondary-700";

  return (
    <article className={`rounded-2xl p-6 flex flex-col gap-3 ${cardClass}`}>
      <h3 className="font-bold text-xl">{name}</h3>
      <div className="flex flex-wrap gap-2">
        <span className={`text-xs font-medium rounded px-2 py-1 ${badgeClass}`}>
          {pricingLabel}
        </span>
        <span className={`text-xs font-medium rounded px-2 py-1 ${badgeClass}`}>
          {difficultyLabel}
        </span>
      </div>
      <div>
        <p className={`text-xs font-semibold ${mutedClass}`}>{whyLabel}</p>
        <p className="mt-1 text-base">{reason}</p>
      </div>
      <p className={`text-sm ${mutedClass}`}>{description}</p>
      <Link
        href={href}
        className={`mt-auto pt-2 underline font-medium ${linkClass}`}
      >
        {viewText}
      </Link>
    </article>
  );
}
