import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Services | Fort Worth Replacement Property Support",
  description: "Search 1031 exchange services for replacement property identification, timelines, underwriting, and planning.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  return (
    <div className="bg-paper">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/fort-worth-texas-1031-exchange-homepage-hero-1.jpg"
            alt="Fort Worth"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <h1 className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            1031 EXCHANGE SERVICES
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Pick the support path that keeps your 45 day and 180 day deadlines safe. Search by service name or property focus.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service, index) => {
              const imageIndex = (index % 4) + 1;
              const imageSrc = `/fort-worth-texas-1031-exchange-homepage-hero-${imageIndex}.jpg`;
              
              return (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group"
                >
                  <article className="overflow-hidden border border-outline/30 bg-panel transition hover:border-primary/30">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute right-3 top-3 bg-accent px-2 py-1 text-[9px] font-medium tracking-[0.15em] text-primary">
                        {service.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="p-5">
                      <h2 className="font-serif text-xl text-primary group-hover:text-accent" style={{ fontWeight: 400 }}>
                        {service.name}
                      </h2>
                      <p className="mt-2 text-sm text-ink/60 line-clamp-2">{service.short}</p>
                      <p className="mt-4 text-[10px] font-medium tracking-[0.15em] text-accent">
                        LEARN MORE &rarr;
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Ready to Start Your Exchange?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Our team is ready to help you navigate the 1031 exchange process with confidence.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block border border-white px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
          >
            CONTACT US
          </Link>
        </div>
      </section>

      <Script
        id="services-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
