'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LocationItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";

type Props = {
  locations: LocationItem[];
};

export default function LocationsDirectory({ locations }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return locations;
    return locations.filter((location) => location.name.toLowerCase().includes(normalized));
  }, [locations, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search a neighborhood or district"
        label="Search locations"
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-outline bg-secondary/40 p-6 text-center">
          <p className="text-lg font-semibold text-heading">Need another market?</p>
          <p className="mt-2 text-sm text-ink/70">
            We can help with "{query}". Contact us and select Other as the project type.
          </p>
          <Link
            href={`/contact?projectType=${encodeURIComponent(query || "Other")}`}
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
          >
            Contact us
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((location) => (
            <article key={location.slug} className="rounded-2xl border border-outline/60 bg-panel p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{location.type}</p>
              <h3 className="mt-2 text-xl font-semibold text-heading">{location.name}</h3>
              <p className="mt-2 text-sm text-ink/80">{location.description}</p>
              <Link href={location.route} className="mt-4 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
                View location
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

