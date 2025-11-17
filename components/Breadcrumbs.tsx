import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.35em] text-ink/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span className="text-primary">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-ink hover:text-primary">
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="text-ink/40">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

