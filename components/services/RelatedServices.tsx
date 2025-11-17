'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";

type Props = {
  services: ServiceItem[];
  currentService: string;
};

export default function RelatedServices({ services, currentService }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return services;
    return services.filter((service) => service.name.toLowerCase().includes(normalized));
  }, [query, services]);

  return (
    <section className="space-y-4 rounded-2xl border border-outline bg-panel p-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-heading">Related services</h2>
        <p className="text-sm text-ink/70">These paths often pair with {currentService}.</p>
      </header>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Filter related services"
        label="Filter related services"
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-outline/60 bg-secondary/40 p-4 text-sm text-ink/80">
          We can help with "{query}".{" "}
          <Link href={`/contact?projectType=${encodeURIComponent(query)}`} className="text-primary hover:underline">
            Contact our team
          </Link>{" "}
          and we will route the request.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((service) => (
            <article key={service.slug} className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
              <h3 className="text-lg font-semibold text-heading">{service.name}</h3>
              <p className="mt-2 text-sm text-ink/80">{service.short}</p>
              <Link href={service.route} className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
                View service
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

