import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

type Params = { slug: string };

export function generateStaticParams() {
  return locationsData.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const location = locationsData.find((item) => item.slug === params.slug);
  if (!location) return {};

  return createPageMetadata({
    title: `${location.name} 1031 Exchange Support`,
    description: `1031 exchange replacement property support for ${location.name} near ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    path: `/locations/${location.slug}`,
  });
}

export default function LocationPage({ params }: { params: Params }) {
  const location = locationsData.find((item) => item.slug === params.slug);
  if (!location) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
    { label: location.name, href: `/locations/${location.slug}` },
  ];

  const faq = buildFaq(location.name);
  const featuredServices = servicesData.slice(0, 4);

  return (
    <div className="bg-panel py-16">
      <div className="container space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4 rounded-2xl border border-outline bg-secondary/40 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{location.type}</p>
          <h1 className="text-4xl font-semibold text-heading">{location.name} 1031 exchange support</h1>
          <p className="text-base text-ink/80">
            We keep investors in {location.name} plugged into replacement property inventory from {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} to all 50 states.
            Timeline management, underwriting, and sourcing updates deliver weekly so you stay ahead of the 45 day clock.
          </p>
        </header>

        <section className="rounded-2xl border border-outline bg-panel p-6">
          <h2 className="text-2xl font-semibold text-heading">Focused services</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {featuredServices.map((service) => (
              <article key={service.slug} className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{service.category || "Service"}</p>
                <h3 className="mt-2 text-lg font-semibold text-heading">{service.name}</h3>
                <p className="mt-1 text-sm text-ink/80">{service.short}</p>
                <Link href={service.route} className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
                  View details
                </Link>
              </article>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-6 inline-flex rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading"
          >
            View all services
          </Link>
        </section>

        <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
          <h2 className="text-2xl font-semibold text-heading">Questions investors ask</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <article key={item.q} className="rounded-xl border border-outline/60 bg-panel p-4">
                <h3 className="text-base font-semibold text-heading">{item.q}</h3>
                <p className="mt-2 text-sm text-ink/80">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact?projectType=Other"
            className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
          >
            Contact us
          </Link>
          <Link
            href="/locations"
            className="rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading"
          >
            View all locations
          </Link>
        </div>
      </div>

      <Script
        id="location-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

function buildFaq(name: string) {
  return [
    {
      q: `Do you have inventory ready for ${name}?`,
      a: `Yes. We track on and off market assets around ${name} plus out of state options so you can compare yields beyond ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      q: `Can you coordinate site tours in ${name}?`,
      a: `We schedule tours with local brokers and provide digital walk throughs when travel to ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} is not possible.`,
    },
    {
      q: `How are deadlines handled for ${name}?`,
      a: `All communication is timestamped and stored, so your 45 day and 180 day evidence trail references ${name} and ${PRIMARY_STATE_ABBR} time zones.`,
    },
    {
      q: `Can you help if I need assets outside ${name}?`,
      a: `Absolutely. We cover every state and coordinate replacement property searches that start in ${name} and expand nationwide.`,
    },
  ];
}

