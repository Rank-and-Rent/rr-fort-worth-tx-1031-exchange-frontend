import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import { propertyTypesData } from "@/data/property-types";
import { inventoryCategories } from "@/data/inventory-categories";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Inventory",
  description: "Browse replacement property categories and types for 1031 exchanges.",
  path: "/inventory",
});

export default function InventoryPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/inventory" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header>
          <h1 className="text-4xl font-semibold text-heading">1031 exchange property inventory</h1>
          <p className="mt-3 text-base text-ink/80">
            Browse replacement property types suitable for 1031 exchanges. We provide nationwide property identification for single tenant retail, NNN properties, and more.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-heading mb-6">Property categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inventoryCategories.map((category) => (
              <Link key={category.slug} href={category.route} className="block rounded-2xl border border-outline bg-panel p-6 hover:border-primary">
                <h3 className="text-xl font-semibold text-heading">{category.name}</h3>
                {category.note && <p className="mt-2 text-sm text-ink/80">{category.note}</p>}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-heading mb-6">Property types</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertyTypesData.map((propertyType) => (
              <Link key={propertyType.slug} href={propertyType.route} className="block rounded-2xl border border-outline bg-panel p-6 hover:border-primary">
                <h3 className="text-xl font-semibold text-heading">{propertyType.name}</h3>
                <p className="mt-2 text-sm text-ink/80">Browse {propertyType.name.toLowerCase()} properties for 1031 exchange</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-outline bg-panel p-6 text-sm text-ink/70">
          <p className="mb-2">
            <strong>Note:</strong> DST or TIC may be securities. We do not sell securities. We provide introductions to licensed providers only.
          </p>
          <p>This site routes inquiries to our chosen fulfillment partner for 1031 exchange advisory and property identification support.</p>
        </div>
      </div>

      <Script
        id="inventory-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

