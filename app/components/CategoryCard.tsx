const colorClasses = {
  primary: "text-primary-700",
  secondary: "text-secondary-700",
  tertiary: "text-tertiary-700",
};

interface CategoryCardProps {
  name: string;
  color: keyof typeof colorClasses;
  icon: string;
  href: string;
}

export function CategoryCard({ name, color, icon, href }: CategoryCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white shadow-sm px-2 py-6 text-center hover:shadow-md transition border border-neutral-200"
    >
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <span className={`text-base font-semibold ${colorClasses[color]}`}>
        {name}
      </span>
    </a>
  );
}
