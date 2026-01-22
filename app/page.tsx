'use client';

import Script from "next/script";
import Image from "next/image";
import {
  BanknotesIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CalculatorIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
import RotatingHeroBackground from "@/components/home/RotatingHeroBackground";
import { getProfessionalServiceSchema } from "@/lib/seo";
import { getShortServiceName } from "@/lib/service-names";

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

const trustSignals = [
  {
    title: "Qualified Intermediary Partners",
    description:
      "Escrow and proceeds management handled with vetted QI relationships in Fort Worth and nationwide.",
    icon: ShieldCheckIcon,
  },
  {
    title: "CPA Collaboration",
    description: "Tax deferral strategy aligned with CPA partners before you identify replacements.",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Attorney Review Available",
    description: "Contract packages reviewed with real estate counsel for compliant, timely closings.",
    icon: BuildingOffice2Icon,
  },
  {
    title: "IRS-Compliant Process",
    description: "Documentation, timelines, and escrow controls mirror IRS guidance for every exchange.",
    icon: ChartBarIcon,
  },
];

const whyCards = [
  {
    title: "Texas Market Expertise",
    description:
      "Fort Worth-based sourcing keeps convenience, QSR, pharmacy, auto, and medical assets in play before they hit the market.",
    icon: BuildingOffice2Icon,
  },
  {
    title: "Structured, Timely Coordination",
    description:
      "We map every move against the 45/180 deadlines so debt replacement, inspections, and reporting stay synchronized.",
    icon: ChartBarIcon,
  },
  {
    title: "Local Access, National Reach",
    description:
      "Fort Worth boots on the ground plus national broker, developer, and sale-leaseback partners.",
    icon: BanknotesIcon,
  },
];

const timelineSteps = [
  {
    title: "Sell your relinquished property",
    description:
      "Document net proceeds, debt payoff, and intermediary controls so the 45-day identification clock starts clean.",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Identify replacements within 45 days",
    description:
      "Layer credit, lease term, yield, and geography to shortlist compliant replacements with verified tenants.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Close within 180 days",
    description:
      "Coordinate due diligence, lender requirements, and reporting so closing packages file on time.",
    icon: CalendarDaysIcon,
  },
];

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
  const featuredMarkets = coverageCities.slice(0, 6);
  const coverageHighlights = coverageCities.slice(0, 5).map((city) => city.name);
  const propertyShowcase = propertyTypesData.slice(0, 6);

  const categoryOrder = ["Timelines", "Structures", "Execution", "Property Paths", "Tax", "Reporting", "Education"];
  const serviceCollections = categoryOrder
    .map((category) => ({
      category,
      items: servicesData.filter((service) => service.category === category).slice(0, 4),
    }))
    .filter((group) => group.items.length > 0);

  const servicesGrid = servicesData.slice(0, 6);

  // Carousel state for property showcase
  const [carouselIndex, setCarouselIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, propertyShowcase.length - itemsPerView);

  const nextSlide = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-paper text-ink">
      <main>
        {/* Hero Section - Malibu Life Style */}
        <section className="relative min-h-screen overflow-hidden">
          <RotatingHeroBackground />
          
          {/* Hero Content */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="script-the text-5xl md:text-7xl">the</span>
              <h1 className="mt-2 font-serif text-5xl font-normal tracking-wide text-primary md:text-7xl lg:text-8xl">
                FORT WORTH
              </h1>
              <h2 className="font-serif text-4xl font-normal tracking-wide text-accent md:text-6xl lg:text-7xl">
                EXCHANGE
              </h2>
              
              <p className="mx-auto mt-8 max-w-2xl text-base text-ink/80 md:text-lg">
                Fast, compliant 1031 exchanges rooted in Fort Worth and deployed nationwide.
                We source single tenant NNN retail, shopping centers, ground leases, and zero cash flow options.
              </p>
              
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <ScrollToFormButton
                  targetId="home-contact-form"
                  className="malibu-btn-outline"
                >
                  START MY EXCHANGE
                </ScrollToFormButton>
                <a
                  href={`tel:${site.phoneDigits}`}
                  className="text-xs font-medium tracking-[0.15em] text-primary transition hover:text-accent"
                >
                  CALL {site.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exclusive Listings / Property Showcase - Carousel Style */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
              EXPLORE EXCLUSIVE LISTINGS
            </h2>
            
            <div className="mt-12 overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)` }}
              >
                {propertyShowcase.map((type) => {
                  const getCategoryImage = (slug: string) => {
                    if (slug.includes("auto") || slug.includes("tire") || slug.includes("oil-change")) {
                      return inventoryCategories.find((c) => c.slug === "auto")?.heroImage;
                    }
                    if (slug.includes("medical") || slug.includes("clinic") || slug.includes("dialysis") || slug.includes("veterinary")) {
                      return inventoryCategories.find((c) => c.slug === "medical")?.heroImage;
                    }
                    if (slug.includes("food") || slug.includes("qsr") || slug.includes("coffee") || slug.includes("dining")) {
                      return inventoryCategories.find((c) => c.slug === "food-service")?.heroImage;
                    }
                    if (slug.includes("logistics") || slug.includes("flex") || slug.includes("industrial")) {
                      return inventoryCategories.find((c) => c.slug === "industrial")?.heroImage;
                    }
                    if (slug.includes("nnn") || slug.includes("ground-lease") || slug.includes("outparcel")) {
                      return inventoryCategories.find((c) => c.slug === "nnn")?.heroImage;
                    }
                    return inventoryCategories.find((c) => c.slug === "retail")?.heroImage;
                  };
                  const categoryImage = getCategoryImage(type.slug);

                  return (
                    <Link
                      key={type.slug}
                      href={type.route}
                      className="group relative min-w-[calc(33.333%-1rem)] flex-shrink-0"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {categoryImage && (
                          <Image
                            src={categoryImage}
                            alt={`${type.name} properties`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                        <span className="for-sale-badge">FOR SALE</span>
                      </div>
                      <div className="mt-4">
                        <p className="font-serif text-2xl text-primary">{type.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink/60">
                          Net Lease | Fort Worth Area
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="mt-10 flex items-center justify-between">
              <div className="carousel-nav">
                <button onClick={prevSlide} disabled={carouselIndex === 0} aria-label="Previous">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={nextSlide} disabled={carouselIndex === maxIndex} aria-label="Next">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link
                href="/property-types"
                className="malibu-btn-outline"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Neighborhoods / Markets Grid */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="section-title text-center text-3xl md:text-4xl lg:text-5xl">
              FEATURED NEIGHBORHOODS
            </h2>
            
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {featuredMarkets.map((market, index) => (
                <Link
                  key={market.slug}
                  href={market.route}
                  className={`group relative overflow-hidden ${
                    index < 3 ? 'aspect-[4/3]' : 'aspect-[4/3]'
                  }`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h3 className="font-serif text-2xl font-normal tracking-wide text-white md:text-3xl">
                      {market.name.toUpperCase()}
                    </h3>
                    <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="border border-white px-4 py-2 text-xs tracking-[0.15em] text-white">
                        LEARN MORE
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals / Authority Section */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Authority from the first scroll</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                Trusted Fort Worth professionals guiding compliant, deadline-driven exchanges.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                Investors expect structure, timeline accountability, and documented compliance on day one. These pillars anchor
                every engagement we lead.
              </p>
            </header>
            
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.title}
                    className="malibu-card border border-outline/40 bg-panel p-6"
                  >
                    <Icon className="h-8 w-8 text-accent" aria-hidden />
                    <h3 className="mt-4 font-serif text-lg font-normal text-primary">{signal.title}</h3>
                    <p className="mt-2 text-sm text-ink/70">{signal.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Why Fort Worth investors choose us</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                Structured services tuned for 45/180 discipline, build-to-suit, and turnkey NNN holds.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                Every service listed below lives in our playbook so investors can move from sale proceeds to stable single
                tenant income without missing IRS deadlines.
              </p>
            </header>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="malibu-card border border-outline/40 bg-panel p-6"
                  >
                    <Icon className="h-8 w-8 text-accent" aria-hidden />
                    <h3 className="mt-4 font-serif text-xl font-normal text-primary">{card.title}</h3>
                    <p className="mt-2 text-sm text-ink/70">{card.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16">
              <HomeServiceCollections collections={serviceCollections} />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">How a 1031 works</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                A transparent 1031 timeline that protects the 45/180 windows.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                This process braids together exchange consultation, intermediary controls, nationwide sourcing, and reporting
                so every move is documented for the IRS and lender partners.
              </p>
            </header>

            <div className="relative mt-12">
              <div className="hidden h-px w-full bg-outline/60 md:block" aria-hidden />
              <div className="grid gap-8 md:grid-cols-3">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative malibu-card border border-outline/40 bg-panel p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primaryfg">
                          {index + 1}
                        </span>
                        <Icon className="h-6 w-6 text-accent" aria-hidden />
                      </div>
                      <h3 className="mt-4 font-serif text-lg font-normal text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm text-ink/70">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="bg-primary py-20 text-primaryfg lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Core services</p>
              <h2 className="mt-4 font-serif text-3xl font-normal md:text-4xl">
                Advisory, sourcing, and reporting executed with Fort Worth accountability.
              </h2>
              <p className="mt-4 text-base text-primaryfg/70">
                From forward and reverse exchanges to NNN verification and reporting, these engagements channel the same
                process discipline we bring to every investor relationship.
              </p>
            </header>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesGrid.map((service) => (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group flex flex-col gap-4 border border-white/20 bg-primary/60 p-6 transition hover:border-accent"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-primaryfg/50">{service.category}</p>
                  <h3 className="font-serif text-xl font-normal text-white">{service.name}</h3>
                  <p className="text-sm text-primaryfg/70">{service.short}</p>
                  <span className="mt-auto text-xs font-medium tracking-[0.15em] text-accent">VIEW DETAILS &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Inventory Categories Section */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">NNN inventory coverage</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                Target the essential retail formats exchange buyers search for most.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                We work across food service, medical, auto, logistics, and everyday retail to keep a live list of single tenant
                assets that meet NOI, credit, and term requirements.
              </p>
            </header>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {inventoryCategories.map((category) => (
                <article
                  key={category.slug}
                  className="malibu-card border border-outline/40 bg-panel p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-xl font-normal text-primary">{category.name}</h3>
                    <Link href={category.route} className="text-xs font-medium tracking-[0.15em] text-accent hover:text-primary">
                      LISTINGS
                    </Link>
                  </div>
                  {category.note && <p className="mt-3 text-sm text-ink/70">{category.note}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area / Coverage Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Fort Worth coverage</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                {coverageCities.length}+ DFW metros plus boots-on-the-ground partners in every state.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                Local intel keeps Fort Worth buyers ahead of listings while our broker, developer, and sale-leaseback partners
                unlock credit tenants coast to coast.
              </p>
            </header>

            <div className="mt-8 flex flex-wrap gap-3">
              {coverageHighlights.map((market) => (
                <span key={market} className="border border-primary/30 bg-panel px-4 py-2 text-xs font-medium tracking-[0.1em] text-primary">
                  {market.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="mt-12">
              <HomeServiceArea locations={featuredMarkets} />
            </div>

            <div className="mt-12 border border-outline/40 bg-panel p-6 text-sm text-ink/70">
              A 1031 exchange defers federal and Texas income tax on qualifying real property. Texas does not levy a state income
              tax, but transfer and recording fees may apply.
            </div>
          </div>
        </section>

        {/* Interactive Tools Section */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Interactive tools</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                Real-time calculators to keep your 1031 plan compliant.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                Use our Fort Worth tools to test boot exposure and confirm your replacement identification strategy before
                reaching out to advisors.
              </p>
            </header>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
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
                    className="group malibu-card border border-outline/40 bg-panel p-8"
                  >
                    <Link href={tool.route} className="block">
                      <Icon className="mb-4 h-10 w-10 text-accent" aria-hidden />
                      <h3 className="mb-2 font-serif text-2xl font-normal text-primary">{tool.name}</h3>
                      <p className="text-sm text-ink/70">{tool.description}</p>
                      <p className="mt-4 text-xs font-medium tracking-[0.15em] text-accent">
                        OPEN TOOL &rarr;
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <header className="max-w-3xl text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Compliance resources</p>
              <h2 className="mt-4 font-serif text-3xl font-normal text-primary md:text-4xl">
                Reference-ready IRS links and Texas-specific transfer intel.
              </h2>
              <p className="mt-4 text-base text-ink/70">
                Staying ahead of helpful content signals means giving investors and tax partners the exact source material they
                expect. These are the references we keep at arm's reach for every transaction.
              </p>
            </header>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {resources.map((resource) => (
                <a
                  key={resource.key}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="malibu-card border border-outline/40 bg-panel p-6"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-accent">Official source</p>
                  <h3 className="mt-2 font-serif text-xl font-normal text-primary">{resource.label}</h3>
                  <p className="mt-3 text-xs font-medium tracking-[0.15em] text-accent">OPEN RESOURCE &rarr;</p>
                </a>
              ))}
            </div>

            <div className="mt-12 border border-outline/40 bg-panel/80 p-6 text-sm text-ink/70">
              <strong className="text-primary">Reminder:</strong> Educational content only. Coordinate with your CPA and attorney for personalised guidance.
            </div>
          </div>
        </section>

        {/* About / Team Section - Malibu Life Style */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-normal uppercase tracking-wide text-primary md:text-4xl">
                  THE FORT WORTH EXCHANGE
                </h2>
                <p className="mt-6 text-base text-ink/80">
                  Founded in Fort Worth, our team is now a part of the largest and most exciting 1031 exchange advisory networks
                  in the country. We represent a shared enthusiasm towards people, bespoke properties, and of course, the Texas
                  commercial real estate lifestyle.
                </p>
                <p className="mt-4 text-base text-ink/80">
                  Not only does our team continue to bring in record transactions year after year, ranking among the top 1031
                  exchange advisors nationally, but we perform under a "living life to the fullest" mentality, which means
                  customer service is a top priority—as is staying ahead of the ever-changing industry.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/about" className="malibu-btn-outline">
                    MEET THE TEAM
                  </Link>
                  <Link
                    href="/contact#contact-form"
                    className="bg-primary px-6 py-3 text-xs font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
                  >
                    INQUIRE NOW
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src="/fort-worth-texas-1031-exchange-homepage-hero-1.jpg"
                    alt="Fort Worth skyline"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Malibu Life Style with Background */}
        <section className="relative py-20 lg:py-28">
          <div className="absolute inset-0">
            <Image
              src="/fort-worth-texas-1031-exchange-homepage-hero-2.jpg"
              alt="Fort Worth landscape"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex justify-center">
                <Image
                  src="/1031-exchange-fort-worth-tx-logo.png"
                  alt="Fort Worth 1031 Exchange Logo"
                  width={200}
                  height={200}
                  className="h-32 w-auto opacity-80 md:h-40"
                />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-normal uppercase tracking-wide text-white md:text-3xl">
                  WHAT OUR CLIENTS SAY
                </h2>
                <blockquote className="mt-6">
                  <p className="text-base text-white/90 md:text-lg">
                    "An absolute pleasure working with the Fort Worth team. They responded quickly and were very knowledgeable
                    and friendly. Would recommend to anyone looking to complete a 1031 exchange."
                  </p>
                  <footer className="mt-4 text-sm font-medium text-white/70">
                    — Fort Worth Investor
                  </footer>
                </blockquote>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="border border-white px-6 py-3 text-xs font-medium tracking-[0.15em] text-white transition hover:bg-white hover:text-primary"
                  >
                    VIEW ALL
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Direct Access Section */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-6xl grid gap-12 px-6 md:grid-cols-2 md:px-12 lg:px-16">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Direct access</p>
              <h2 className="font-serif text-3xl font-normal text-primary md:text-4xl">
                Ready to identify your replacement property?
              </h2>
              <p className="text-base text-ink/70">
                Call, email, or use the secure intake form. We help unrepresented exchange buyers move from sale to closing with
                clarity, national inventory, and coordinated reporting.
              </p>
              <div className="space-y-2 text-sm text-ink/70">
                <p>
                  Call{" "}
                  <a href={`tel:${site.phoneDigits}`} className="text-primary hover:text-accent">
                    {site.phone}
                  </a>
                </p>
                <p>
                  Email{" "}
                  <a href={`mailto:${site.email}`} className="text-primary hover:text-accent">
                    {site.email}
                  </a>
                </p>
                <p>Visit {site.address}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ScrollToFormButton
                  targetId="home-contact-form"
                  className="malibu-btn-outline"
                >
                  OPEN THE FORM
                </ScrollToFormButton>
                <Link
                  href="/services"
                  className="px-6 py-3 text-xs font-medium tracking-[0.15em] text-primary transition hover:text-accent"
                >
                  VIEW SERVICES &rarr;
                </Link>
              </div>
            </div>
            <div className="border border-outline/40 bg-panel p-6 text-sm text-ink/70">
              <strong className="text-primary">Disclosure:</strong> This site routes inquiries to our chosen fulfillment partner for
              1031 exchange advisory and property identification support. Educational content only. Not tax, legal, or investment
              advice.
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-16">
            <ContactForm
              formId="home-contact-form"
              variant="default"
              heading="Request 1031 intake"
              description="Tell us about your relinquished asset and replacement timeline. We respond the same business day."
            />
          </div>
        </section>

        {/* Bottom CTA - Palm tree style from Malibu Life */}
        <section className="relative py-32 lg:py-40">
          <div className="absolute inset-0">
            <Image
              src="/fort-worth-texas-1031-exchange-homepage-hero-3.jpg"
              alt="Fort Worth skyline at sunset"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <span className="script-the text-4xl md:text-5xl">the</span>
            <h2 className="mt-2 font-serif text-4xl font-normal tracking-wide text-white md:text-6xl">
              FORT WORTH
            </h2>
            <p className="font-serif text-3xl font-normal tracking-wide text-accent md:text-5xl">
              EXCHANGE
            </p>
            <div className="mt-10">
              <Link
                href="/contact#contact-form"
                className="border border-white px-8 py-4 text-xs font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
              >
                WORK WITH US
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProfessionalServiceSchema()) }}
      />
    </div>
  );
}
