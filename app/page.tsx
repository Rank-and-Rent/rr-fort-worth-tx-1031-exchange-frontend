'use client';

import { Suspense } from "react";
import Script from "next/script";
import { CalculatorIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import site from "@/content/site.json";
import {
  inventoryCategories,
  locationsData,
  propertyTypesData,
  resources,
  servicesData,
  toolsData,
} from "@/data";
import type { ServiceItem } from "@/data";
import BottomCTA from "@/components/BottomCTA";
import ContactForm from "@/app/contact/contact-form";
import HomeServiceCollections from "@/components/home/HomeServiceCollections";
import HomeServiceArea from "@/components/home/HomeServiceArea";
import ScrollToFormButton from "@/components/home/ScrollToFormButton";
import { getProfessionalServiceSchema } from "@/lib/seo";

const toolIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "boot-calculator": CalculatorIcon,
  "deadline-calculator": CalculatorIcon,
  "identification-rules-checker": ShieldCheckIcon,
  "identification-letter-helper": ShieldCheckIcon,
  "timeline-tracker": ShieldCheckIcon,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const heroHighlightSlugs = ["forward-exchange", "reverse-exchange", "nnn-property-identification"];
  const heroHighlights = heroHighlightSlugs.reduce<ServiceItem[]>((acc, slug) => {
    const match = servicesData.find((service) => service.slug === slug);
    if (match) {
      acc.push(match);
    }
    return acc;
  }, []);

  const coverageCities = locationsData.filter((location) => location.type === "city");
  const featuredMarkets = coverageCities.slice(0, 8);
  const propertyShowcase = propertyTypesData.slice(0, 8);

  const categoryOrder = ["Timelines", "Structures", "Execution", "Property Paths", "Tax", "Reporting", "Education"];
  const serviceCollections = categoryOrder
    .map((category) => ({
      category,
      items: servicesData.filter((service) => service.category === category).slice(0, 4),
    }))
    .filter((group) => group.items.length > 0);

  const processBlueprint = [
    {
      slug: "exchange-consultation",
      title: "Briefing & 1031 strategy",
      extra:
        "Document relinquished proceeds, debt replacement, and investor profile before the 45-day clock starts.",
    },
    {
      slug: "forward-exchange",
      title: "Timeline lock & escrow",
      extra: "Tighten the 45/180 milestones with compliant escrow and intermediary controls.",
    },
    {
      slug: "property-identification",
      title: "Nationwide property matching",
      extra: "Layer credit, lease term, and yield targets across single tenant nets in every region.",
    },
    {
      slug: "nnn-property-identification",
      title: "NNN verification & offers",
      extra: "Prioritize convenience, QSR, pharmacy, auto, and healthcare nets with zero-day management expectations.",
    },
    {
      slug: "form-8824-preparation",
      title: "Reporting & closing",
      extra: "Package IRS Form 8824 with depreciation and boot analysis so tax teams can file without scrambling.",
    },
  ].map((step, index) => {
    const match = servicesData.find((service) => service.slug === step.slug);
    return {
      ...step,
      stepNumber: index + 1,
      service: match,
      description: match ? `${match.short}. ${step.extra}` : step.extra,
    };
  });

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <main className="container space-y-20 py-16">
        <header className="relative overflow-hidden rounded-2xl border border-outline bg-gradient-to-br from-secondary to-panel px-8 py-12">
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-secondary/70 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-primaryfg/80">All 50 States · NNN Buyer Counsel</p>
              <h1 className="mt-4 text-4xl font-semibold text-heading sm:text-5xl lg:text-6xl">
                {site.company} - fast, compliant 1031 exchanges rooted in Fort Worth and deployed nationwide.
              </h1>
              <p className="mt-6 text-lg text-ink/90">
                We source single tenant NNN retail, shopping centers, ground leases, and zero cash flow options so you
                can defer gains without inheriting daily management. Our team synchronizes your 45/180 calendar with
                creditworthy inventory in convenience, QSR, pharmacy, medical, and essential retail.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`tel:${site.phoneDigits}`}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-wide text-primaryfg transition hover:opacity-90"
                >
                  Call {site.phone}
                </a>
            <Link
                  href="/inventory"
                  className="inline-flex items-center justify-center rounded-full border border-primary px-7 py-3 text-sm font-semibold uppercase tracking-wide text-heading transition hover:bg-primary hover:text-primaryfg"
            >
                  Browse Inventory
            </Link>
            <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-outline px-7 py-3 text-sm font-semibold uppercase tracking-wide text-heading transition hover:bg-heading hover:text-paper"
            >
                  See Services
            </Link>
              </div>

              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.35em] text-ink/70">Local HQ</dt>
                  <dd className="mt-2 text-lg font-semibold text-heading">{site.address}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.35em] text-ink/70">Metro Coverage</dt>
                  <dd className="mt-2 text-lg font-semibold text-heading">
                    {coverageCities.length}+ Texas markets
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.35em] text-ink/70">Property Scope</dt>
                  <dd className="mt-2 text-lg font-semibold text-heading">Single tenant retail & NNN nationwide</dd>
                </div>
              </dl>
            </div>

            <div className="flex-1 rounded-2xl border border-outline/70 bg-panel/60 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primaryfg/80">
                Exchange moves we run daily
              </p>
              <div className="mt-6 space-y-4">
                {heroHighlights.map((service) => (
                  <article
                    key={service.slug}
                    className="rounded-xl border border-outline/60 bg-secondary/40 p-5 transition hover:border-primary"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-lg font-semibold text-heading">{service.name}</h2>
                      <Link href={service.route} className="text-sm text-primary hover:underline">
                        Learn more {">"}
                      </Link>
                    </div>
                    <p className="mt-2 text-sm text-ink/80">{service.short}</p>
                  </article>
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-ink/60">
                {propertyShowcase.slice(0, 4).map((type) => (
                  <li key={type.slug} className="rounded-full border border-outline px-3 py-1">
                    {type.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <section aria-labelledby="service-architecture" className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Exchange Architecture</p>
              <h2 id="service-architecture" className="mt-2 text-3xl font-semibold text-heading">
                Structured services tuned for 45/180 discipline, build-to-suit, and turnkey NNN holds.
              </h2>
              <p className="mt-3 max-w-3xl text-base text-ink/85">
                Every service listed below lives in our playbook so investors can move from sale proceeds to stable
                single tenant income without missing IRS deadlines. Tap into timelines, construction, execution, tax, and
                education support.
              </p>
            </div>
            <Link href="/services" className="text-sm font-semibold uppercase tracking-[0.35em] text-primary hover:underline">
              View all services
            </Link>
          </div>

          <HomeServiceCollections collections={serviceCollections} />
        </section>

        <section aria-labelledby="timeline-blueprint" className="rounded-2xl border border-outline bg-secondary/40 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Execution Blueprint</p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="timeline-blueprint" className="text-3xl font-semibold text-heading">
                A transparent 1031 timeline that protects the 45/180 windows and keeps your P&Qs buttoned up.
              </h2>
              <p className="mt-3 max-w-2xl text-base text-ink/85">
                This process braids together exchange consultation, intermediary controls, nationwide sourcing, and
                reporting so every move is documented for the IRS and lender partners.
              </p>
        </div>
            <Link href="/contact" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primaryfg hover:opacity-90">
              Talk to a specialist
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {processBlueprint.map((step) => (
              <article key={step.slug} className="rounded-2xl border border-outline/60 bg-panel p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-ink/60">
                  <span>Step {step.stepNumber}</span>
                  {step.service && (
                    <Link href={step.service.route} className="text-primary hover:underline">
                      {step.service.name}
              </Link>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-heading">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/80">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="inventory-focus" className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ink/70">NNN Inventory Coverage</p>
              <h2 id="inventory-focus" className="mt-2 text-3xl font-semibold text-heading">
                Target the essential retail formats exchange buyers search for most.
              </h2>
              <p className="mt-3 max-w-2xl text-base text-ink/85">
                We work across food service, medical, auto, logistics, and everyday retail to keep a live list of single
                tenant assets that meet NOI, credit, and term requirements.
              </p>
            </div>
            <Link href="/inventory" className="text-sm font-semibold uppercase tracking-[0.35em] text-primary hover:underline">
              Explore all categories
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {inventoryCategories.map((category) => (
              <article key={category.slug} className="rounded-2xl border border-outline bg-panel p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-heading">{category.name}</h3>
                  <Link href={category.route} className="text-xs uppercase tracking-[0.35em] text-primary hover:underline">
                    Listings
              </Link>
                </div>
                {category.note && <p className="mt-3 text-sm text-ink/75">{category.note}</p>}
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-outline/60 bg-secondary/40 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Featured Tenant Profiles</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {propertyShowcase.map((type) => (
                <Link
                  key={type.slug}
                  href={type.route}
                  className="rounded-2xl border border-outline/60 bg-panel p-5 transition hover:border-primary"
                >
                  <p className="text-sm uppercase tracking-[0.35em] text-ink/60">Net Lease</p>
                  <h3 className="mt-2 text-xl font-semibold text-heading">{type.name}</h3>
                  <p className="mt-2 text-sm text-primary">View details {">"}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="coverage-grid" className="rounded-2xl border border-outline bg-panel p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Nationwide Reach</p>
              <h2 id="coverage-grid" className="mt-2 text-3xl font-semibold text-heading">
                {coverageCities.length}+ DFW metros plus boots-on-the-ground partners in every state.
              </h2>
              <p className="mt-3 max-w-xl text-base text-ink/80">
                Local intel keeps Fort Worth buyers ahead of listings while our broker, developer, and sale-leaseback
                partners unlock credit tenants coast to coast.
              </p>
            </div>
            <Link href="/locations" className="text-sm font-semibold uppercase tracking-[0.35em] text-primary hover:underline">
              See every market
            </Link>
          </div>
          <HomeServiceArea locations={featuredMarkets} />
          <div className="mt-8 rounded-2xl border border-outline/60 bg-secondary/30 p-6">
            <p className="text-sm text-ink/80">
              Need a relocation outside of Texas? We coordinate property identification in all 50 states, aligning with your credit target - convenience stores, pharmacies, urgent care, auto service, grocery, logistics, and more.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/locations" className="rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading">
              View all locations
              </Link>
          </div>
        </section>

        <section aria-labelledby="tools-highlight" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Interactive Tools</p>
              <h2 id="tools-highlight" className="mt-2 text-3xl font-semibold text-heading">
                Real-time calculators to keep your 1031 plan compliant.
              </h2>
              <p className="mt-3 max-w-3xl text-base text-ink/85">
                Use our Fort Worth tools to test boot exposure and confirm your replacement identification strategy before reaching out to advisors.
              </p>
            </div>
            <Link href="/tools" className="text-sm font-semibold uppercase tracking-[0.35em] text-primary hover:underline">
              Explore all tools
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {toolsData.map((tool, index) => {
              const Icon = toolIcons[tool.slug] ?? CalculatorIcon;
              return (
                <motion.div
                  key={tool.slug}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-[#0B3C5D] to-[#16486C] p-8 text-white shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Link href={tool.route} className="block">
                    <Icon className="mb-4 h-12 w-12 text-[#C9A227]" aria-hidden />
                    <h3 className="mb-2 text-2xl font-semibold">{tool.name}</h3>
                    <p className="text-sm text-white/80">{tool.description}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
                      Open tool {">"}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="resource-library" className="rounded-2xl border border-outline bg-secondary/40 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Compliance Resources</p>
          <h2 id="resource-library" className="mt-2 text-3xl font-semibold text-heading">
            Reference-ready IRS links and Texas-specific transfer intel.
          </h2>
          <p className="mt-3 max-w-3xl text-base text-ink/85">
            Staying ahead of helpful content signals means giving investors and tax partners the exact source material
            they expect. These are the references we keep at arm’s reach for every transaction.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {resources.map((resource) => (
              <a
                key={resource.key}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-outline/60 bg-panel p-6 transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-ink/60">Official Source</p>
                <h3 className="mt-2 text-xl font-semibold text-heading">{resource.label}</h3>
                <p className="mt-2 text-sm text-primary">Open resource ↗</p>
              </a>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-outline/60 bg-panel/60 p-5 text-sm text-ink/70">
            <strong>Reminder:</strong> Educational content only. Coordinate with your CPA and attorney for personalised
            guidance.
          </div>
        </section>

        <section aria-labelledby="contact-cta" className="rounded-2xl border border-outline bg-panel p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Direct access</p>
              <h2 id="contact-cta" className="text-3xl font-semibold text-heading">
                Ready to identify your replacement property?
              </h2>
              <p className="text-base text-ink/80">
                Call, email, or use the secure intake form. We help unrepresented exchange buyers move from sale to closing with clarity, national inventory, and coordinated reporting.
              </p>
              <div className="space-y-2 text-sm text-ink/70">
                <p>Call <a href={`tel:${site.phoneDigits}`} className="text-primary hover:underline">{site.phone}</a></p>
                <p>Email <a href={`mailto:${site.email}`} className="text-primary hover:underline">{site.email}</a></p>
                <p>Visit {site.address}</p>
            </div>
              <ScrollToFormButton
                targetId="home-contact-form"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primaryfg"
              >
                Open the form
              </ScrollToFormButton>
            </div>
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm formId="home-contact-form" variant="compact" />
            </Suspense>
          </div>
        </section>

        <BottomCTA />

        <div className="rounded-2xl border border-outline bg-panel p-6 text-sm text-ink/70">
          <strong>Disclosure:</strong> This site routes inquiries to our chosen fulfillment partner for 1031 exchange
          advisory and property identification support. Educational content only. Not tax, legal, or investment advice.
        </div>
      </main>
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProfessionalServiceSchema()) }}
      />
    </div>
  );
}
