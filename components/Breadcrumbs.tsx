import Link from "next/link";
import clsx from "clsx";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={clsx("text-xs uppercase tracking-[0.2em]", className || "text-ink/60")}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span className={className?.includes("text-white") ? "text-white" : "text-primary"}>{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:opacity-80">
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="opacity-50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
