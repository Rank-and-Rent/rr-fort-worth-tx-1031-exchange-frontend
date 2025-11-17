'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";
import { getShortServiceName } from "@/lib/service-names";

type Props = {
  services: ServiceItem[];
};

export default function ServicesDirectory({ services }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const sorted = [...services].sort((a, b) => {
      if (!normalized) return a.name.localeCompare(b.name);
      return score(a, normalized) - score(b, normalized);
    });

    if (!normalized) return sorted;
    return sorted.filter((service) => service.name.toLowerCase().includes(normalized));
  }, [query, services]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search services"
        placeholder="Type a service or property path"
        value={query}
        onChange={setQuery}
      />

      {results.length === 0 ? (
        <div className="rounded-2xl border border-outline bg-secondary/40 p-6 text-center">
          <p className="text-lg font-semibold text-heading">We can help with "{query}"</p>
          <p className="mt-2 text-sm text-ink/70">
            Send the request to our desk and we will build a plan that matches your timeline.
          </p>
          <Link
            href={`/contact?projectType=${encodeURIComponent(query)}`}
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
          >
            Contact us about "{query}"
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((service) => (
            <article key={service.slug} className="rounded-2xl border border-outline/60 bg-panel p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{service.category || "Service"}</p>
              <h3 className="mt-2 text-xl font-semibold text-heading">{getShortServiceName(service.slug)}</h3>
              <p className="mt-2 text-sm text-ink/80">{service.short}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={service.route} className="text-xs font-semibold uppercase tracking-[0.35em] text-primary hover:underline">
                  View details
                </Link>
                <Link
                  href={`/contact?projectType=${encodeURIComponent(service.name)}`}
                  className="text-xs font-semibold uppercase tracking-[0.35em] text-ink/70 hover:text-primary"
                >
                  Contact about this
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function score(service: ServiceItem, query: string) {
  const name = service.name.toLowerCase();
  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (name.includes(query)) return 2;
  return 3;
}

