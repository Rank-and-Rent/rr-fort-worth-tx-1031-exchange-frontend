'use client';

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { locationsData, servicesData } from "@/data";
import type { LocationItem, ServiceItem } from "@/data";
import { getProfessionalServiceSchema } from "@/lib/seo";

// Property types we handle - for the luxurious scrolling section
const propertyTypes = [
  "Residential",
  "Commercial", 
  "Industrial",
  "Student Housing",
  "Multi-Family",
  "Retail",
  "Medical",
  "Hospitality",
];

export default function Home() {
  const featuredMarkets = locationsData.filter((l: LocationItem) => l.type === "city").slice(0, 6);
  const servicesShowcase = servicesData.slice(0, 6);
  const [showContactPopup, setShowContactPopup] = useState(false);

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenContactPopup');
      if (!hasSeenPopup) {
        setShowContactPopup(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowContactPopup(false);
    sessionStorage.setItem('hasSeenContactPopup', 'true');
  };

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxIndex = Math.max(0, servicesShowcase.length - 3);

  const nextSlide = () => setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCarouselIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-paper text-ink">
      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative mx-4 max-w-md bg-paper p-8 shadow-2xl">
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 text-ink/50 hover:text-ink"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <span className="script-the text-3xl">the</span>
              <h3 className="font-serif text-2xl tracking-[0.1em] text-primary">FORT WORTH EXCHANGE</h3>
              <p className="mt-4 text-sm text-ink/70">
                Ready to start your 1031 exchange? Our team of experts is here to guide you through every step.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={closePopup}
                  className="bg-primary px-6 py-3 text-xs font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
                >
                  GET STARTED TODAY
                </Link>
                <button
                  onClick={closePopup}
                  className="text-xs tracking-[0.1em] text-ink/50 hover:text-ink"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* HERO - Full Screen Video */}
        <section className="relative h-screen overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/fortworth!.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Hero Content - Professional Logo Treatment */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="space-y-2">
              <p className="font-serif text-2xl font-light italic tracking-wide text-accent md:text-3xl">the</p>
              <h1 className="font-serif text-6xl font-extralight tracking-[0.25em] text-accent md:text-8xl lg:text-9xl" style={{ fontWeight: 200 }}>
                FORT WORTH
              </h1>
              <h2 className="font-serif text-5xl font-extralight tracking-[0.25em] text-accent md:text-7xl lg:text-8xl" style={{ fontWeight: 200 }}>
                EXCHANGE
              </h2>
            </div>
          </div>
        </section>

        {/* SERVICES - Smaller Cards, Full View */}
        <section className="bg-paper py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl font-light italic text-primary md:text-4xl">
              EXPLORE OUR SERVICES
              </h2>
            
            <div className="mt-8 overflow-hidden">
              <div 
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * 33.333}%)` }}
              >
                {servicesShowcase.map((service: ServiceItem) => (
                  <Link
                    key={service.slug}
                    href={service.route}
                    className="group relative min-w-[calc(33.333%-0.75rem)] flex-shrink-0"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-8xl font-extralight text-primary/10">1031</span>
                      </div>
                      <span className="absolute right-3 top-3 text-[10px] font-medium tracking-[0.2em] text-accent">
                        SERVICE
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="font-serif text-xl text-primary">{service.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink/40">
                        {service.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Carousel Nav */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide} 
                  disabled={carouselIndex === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-primaryfg disabled:opacity-30"
                  aria-label="Previous"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide} 
                  disabled={carouselIndex === maxIndex}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-primaryfg disabled:opacity-30"
                  aria-label="Next"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link href="/services" className="malibu-btn-outline text-[10px]">
                VIEW ALL
                </Link>
            </div>
          </div>
        </section>

        {/* FEATURED NEIGHBORHOODS - Full Bleed Grid */}
        <section className="bg-paper">
          <h2 className="py-6 text-center font-serif text-3xl font-light italic text-primary md:text-4xl">
            FEATURED NEIGHBORHOODS
              </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3">
            {featuredMarkets.map((market: LocationItem) => (
                    <Link
                key={market.slug}
                href={market.route}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {market.heroImage && (
                          <Image
                    src={market.heroImage}
                    alt={market.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white md:text-3xl">
                    {market.name.toUpperCase()}
                  </h3>
                  <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-white px-4 py-2 text-[10px] tracking-[0.2em] text-white">
                      LEARN MORE
                    </span>
                        </div>
                      </div>
                    </Link>
            ))}
          </div>
        </section>

        {/* PROPERTY TYPES - Luxurious Scrolling Marquee */}
        <section className="overflow-hidden border-y border-primary/10 bg-paper py-8">
          <div className="flex animate-scroll items-center gap-20 whitespace-nowrap">
            {[...propertyTypes, ...propertyTypes, ...propertyTypes].map((type, i) => (
              <span key={i} className="flex items-center gap-20">
                <span className="font-serif text-3xl font-extralight italic tracking-[0.15em] text-primary/50 md:text-4xl">
                  {type}
                </span>
                <span className="text-accent">&#9830;</span>
                </span>
              ))}
          </div>
        </section>

        {/* WHY 1031 EXCHANGE FORT WORTH */}
        <section className="bg-paper py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-14">
            {/* Left: Staggered Images */}
            <div className="flex gap-4">
              <div className="relative mt-12 aspect-[3/4] w-1/2 overflow-hidden">
                <Image
                  src="/fort-worth-texas-1031-exchange-homepage-hero-1.jpg"
                  alt="Fort Worth skyline"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-[3/4] w-1/2 overflow-hidden">
                <Image
                  src="/fort-worth-texas-1031-exchange-homepage-hero-2.jpg"
                  alt="Fort Worth real estate"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl font-light uppercase tracking-[0.08em] text-primary md:text-4xl">
                THE FORT WORTH EXCHANGE
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-ink/70">
                Founded in Fort Worth, our team represents the most experienced 1031 exchange advisors in Texas. We specialize in helping investors defer capital gains through strategic property exchanges, with deep expertise in NNN retail, medical, industrial, and residential assets.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Our team continues to bring in record transactions year after year, ranking among the top 1031 exchange specialists nationally. We operate under a client-first mentality, which means exceptional service is our top priority—as is staying ahead of the ever-changing real estate industry.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link href="/about" className="malibu-btn-outline text-[10px]">
                  MEET THE TEAM
                </Link>
                <Link
                  href="/contact"
                  className="bg-primary px-6 py-3 text-[10px] font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
                >
                  INQUIRE NOW
                    </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT OUR CLIENTS SAY - Matching Reference Exactly */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0">
            <Image
              src="/fort-worth-texas-1031-exchange-homepage-hero-3.jpg"
              alt="Fort Worth landscape"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left: Logo Mark */}
              <div className="flex justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                  <Image
                    src="/1031-exchange-fort-worth-tx-logo.png"
                    alt="Fort Worth 1031 Exchange"
                    width={120}
                    height={120}
                    className="mx-auto h-24 w-auto opacity-70 lg:mx-0"
                  />
                </div>
            </div>

              {/* Right: Testimonial */}
              <div>
                <h3 className="font-serif text-xl font-light uppercase tracking-[0.2em] text-white/80 md:text-2xl">
                  WHAT OUR CLIENTS SAY
                </h3>
                <blockquote className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
                  &ldquo;An absolute pleasure working with the Fort Worth team. They responded quickly and were very knowledgeable and friendly. Would recommend to anyone looking to complete a 1031 exchange.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                  &mdash; FORT WORTH INVESTOR
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <span className="text-sm text-white/40">01 / <span className="text-white/70">03</span></span>
                  <Link href="/contact" className="border border-white/50 px-5 py-2.5 text-[10px] font-medium tracking-[0.15em] text-white transition hover:bg-white hover:text-primary">
                    VIEW ALL
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 lg:py-40">
          <div className="absolute inset-0">
            <Image
              src="/fort-worth-texas-1031-exchange-homepage-hero-4.jpg"
              alt="Fort Worth"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-2xl font-light italic tracking-wide text-accent md:text-3xl">the</p>
            <h2 className="font-serif text-5xl font-extralight tracking-[0.25em] text-accent md:text-7xl lg:text-8xl" style={{ fontWeight: 200 }}>
              FORT WORTH
              </h2>
            <p className="font-serif text-4xl font-extralight tracking-[0.25em] text-accent md:text-6xl lg:text-7xl" style={{ fontWeight: 200 }}>
              EXCHANGE
            </p>
                <Link
              href="/contact"
              className="mt-10 border border-white/70 px-8 py-3.5 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
                >
              WORK WITH US
                </Link>
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
