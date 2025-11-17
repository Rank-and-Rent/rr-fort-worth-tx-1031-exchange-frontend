'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LocationItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";

type Props = {
  locations: LocationItem[];
};

export default function HomeServiceArea({ locations }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return locations;
    const q = query.trim().toLowerCase();
    return locations.filter((location) => location.name.toLowerCase().includes(q));
  }, [locations, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search service areas"
        placeholder="Type a neighborhood"
        value={query}
        onChange={setQuery}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-outline bg-secondary/40 p-6 text-center text-sm text-ink/70">
          We can help with "{query}".{" "}
          <Link href="/contact?projectType=Other" className="text-primary hover:underline">
            Contact us with Other selected
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((market) => (
            <Link
              key={market.slug}
              href={market.route}
              className="rounded-2xl border border-outline/60 bg-secondary/40 p-5 transition hover:border-primary"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-ink/60">Texas metro</p>
              <h3 className="mt-2 text-2xl font-semibold text-heading">{market.name}</h3>
              <p className="mt-2 text-sm text-ink/75">1031 exchange support in {market.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

