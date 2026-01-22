'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";
import { getShortServiceName } from "@/lib/service-names";

type Collection = {
  category: string;
  items: ServiceItem[];
};

type Props = {
  collections: Collection[];
};

export default function HomeServiceCollections({ collections }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return collections;
    const q = query.trim().toLowerCase();
    return collections
      .map((collection) => ({
        ...collection,
        items: collection.items.filter((service) => service.name.toLowerCase().includes(q)),
      }))
      .filter((collection) => collection.items.length > 0);
  }, [collections, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search services on this page"
        placeholder="Filter services"
        value={query}
        onChange={setQuery}
      />

      {filtered.length === 0 ? (
        <div className="border border-outline/40 bg-panel p-6 text-center text-sm text-primary">
          We can help with &quot;{query}&quot;.{" "}
          <Link href={`/contact?projectType=${encodeURIComponent(query)}`} className="text-accent underline">
            Contact us
          </Link>{" "}
          and we will route the request.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {filtered.map((group) => (
            <article
              key={group.category}
              className="malibu-card flex flex-col gap-5 border border-outline/40 bg-panel p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-accent">{group.category}</p>
                  <h3 className="mt-2 font-serif text-xl font-normal text-primary">{group.category} Support</h3>
                </div>
                <span className="border border-outline/40 px-3 py-1 text-xs text-ink/60">
                  {group.items.length} core
                </span>
              </div>
              <ul className="space-y-3">
                {group.items.map((service) => (
                  <li
                    key={service.slug}
                    className="border-b border-outline/30 pb-3 transition hover:border-primary"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">{getShortServiceName(service.slug)}</p>
                        <p className="text-xs text-ink/60">{service.short}</p>
                      </div>
                      <Link
                        href={service.route}
                        className="text-xs font-medium tracking-[0.1em] text-accent hover:text-primary"
                      >
                        DETAILS
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
