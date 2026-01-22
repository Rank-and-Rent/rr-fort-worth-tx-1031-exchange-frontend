'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
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
        <div className="border border-outline/40 bg-panel p-6 text-center text-sm text-primary">
          We can help with &quot;{query}&quot;.{" "}
          <Link href="/contact?projectType=Other" className="text-accent underline">
            Contact us with Other selected
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((market) => (
            <Link
              key={market.slug}
              href={market.route}
              className="group relative overflow-hidden aspect-[4/3]"
            >
              {market.heroImage && (
                <Image
                  src={market.heroImage}
                  alt={`${market.name} commercial real estate`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h3 className="font-serif text-xl font-normal tracking-wide text-white md:text-2xl">
                  {market.name.toUpperCase()}
                </h3>
                <div className="mt-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="border border-white px-3 py-1.5 text-xs tracking-[0.1em] text-white">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
