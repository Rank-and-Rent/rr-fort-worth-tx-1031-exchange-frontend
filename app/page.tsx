'use client';

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { locationsData, servicesData } from "@/data";
import type { LocationItem, ServiceItem } from "@/data";
import { getProfessionalServiceSchema } from "@/lib/seo";

// Property types we handle
const propertyTypes = [
  "Residential",
  "Commercial", 
  "Industrial",
  "Student Housing",
  "Multi-Family",
  "Retail",
];

// Benefits of 1031 Exchange
const benefits = [
  {
    title: "Defer Capital Gains Tax",
    description: "Postpone paying capital gains taxes by reinvesting proceeds into like-kind property.",
  },
  {
    title: "Grow Your Portfolio",
    description: "Use the full sale amount to acquire larger or multiple replacement properties.",
  },
  {
    title: "Diversify Investments",
    description: "Exchange into different property types or geographic locations.",
  },
  {
    title: "Increase Cash Flow",
    description: "Trade up to properties with better income potential and returns.",
  },
];

export default function Home() {
  const featuredMarkets = locationsData.filter((l: LocationItem) => l.type === "city").slice(0, 6);
  const servicesShowcase = servicesData.slice(0, 6);

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxIndex = Math.max(0, servicesShowcase.length - 3);

  const nextSlide = () => setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCarouselIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-paper text-ink">
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
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Hero Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <span className="script-the text-6xl md:text-8xl lg:text-9xl">the</span>
            <h1 className="font-serif text-5xl font-light tracking-[0.2em] text-accent md:text-7xl lg:text-8xl">
              FORT WORTH
            </h1>
            <h2 className="font-serif text-4xl font-light tracking-[0.2em] text-accent md:text-6xl lg:text-7xl">
              EXCHANGE
            </h2>
          </div>
        </section>

        {/* SERVICES CAROUSEL */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-16">
            <h2 className="section-title text-3xl italic md:text-4xl lg:text-5xl">
              EXPLORE OUR SERVICES
            </h2>
            
            <div className="mt-12 overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * 33.333}%)` }}
              >
                {servicesShowcase.map((service: ServiceItem) => (
                  <Link
                    key={service.slug}
                    href={service.route}
                    className="group relative min-w-[calc(33.333%-1rem)] flex-shrink-0"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-6xl text-primary/20">1031</span>
                      </div>
                      <span className="absolute right-4 top-4 text-xs font-medium tracking-[0.15em] text-accent">
                        SERVICE
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="font-serif text-2xl text-primary">{service.name}</p>
                      <p className="text-xs uppercase tracking-[0.1em] text-ink/50">
                        {service.category}
                      </p>
                      <p className="text-sm text-ink/60 line-clamp-2">{service.short}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Carousel Nav */}
            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide} 
                  disabled={carouselIndex === 0}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-primaryfg disabled:opacity-30"
                  aria-label="Previous"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide} 
                  disabled={carouselIndex === maxIndex}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-primaryfg disabled:opacity-30"
                  aria-label="Next"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link href="/services" className="malibu-btn-outline">
                VIEW ALL
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED NEIGHBORHOODS - 3x2 Grid */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[100vw]">
            <h2 className="section-title mb-0 bg-paper py-8 text-center text-3xl md:text-4xl lg:text-5xl">
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
                    <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white md:text-3xl lg:text-4xl">
                      {market.name.toUpperCase()}
                    </h3>
                    <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="border border-white px-5 py-2 text-xs tracking-[0.2em] text-white">
                        LEARN MORE
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTY TYPES - Scrolling Bar */}
        <section className="overflow-hidden border-y border-outline/30 bg-paper py-10">
          <div className="flex animate-scroll items-center gap-16 whitespace-nowrap">
            {[...propertyTypes, ...propertyTypes, ...propertyTypes].map((type, i) => (
              <span key={i} className="flex items-center gap-16">
                <span className="font-serif text-2xl tracking-[0.1em] text-ink/40 md:text-3xl">{type}</span>
                <span className="h-6 w-px bg-outline/40" />
              </span>
            ))}
          </div>
        </section>

        {/* WHY 1031 EXCHANGE FORT WORTH */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-8 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16">
            {/* Left: Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/fort-worth-texas-1031-exchange-homepage-hero-1.jpg"
                  alt="Fort Worth skyline"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden">
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
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="font-serif text-3xl font-light uppercase tracking-[0.1em] text-primary md:text-4xl">
                WHY 1031 EXCHANGE FORT WORTH
              </h2>
              <p className="text-base leading-relaxed text-ink/70">
                Founded in Fort Worth, our team represents the most experienced 1031 exchange advisors in Texas. We specialize in helping investors defer capital gains through strategic property exchanges, with deep expertise in NNN retail, medical, industrial, and residential assets.
              </p>
              <p className="text-base leading-relaxed text-ink/70">
                Our team continues to bring in record transactions year after year, ranking among the top 1031 exchange specialists nationally. We operate under a client-first mentality, which means exceptional service is our top priority—as is staying ahead of the ever-changing real estate industry.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/about" className="malibu-btn-outline">
                  MEET THE TEAM
                </Link>
                <Link
                  href="/contact"
                  className="bg-primary px-6 py-3 text-xs font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
                >
                  INQUIRE NOW
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS OF 1031 EXCHANGE */}
        <section className="relative py-32 lg:py-40">
          <div className="absolute inset-0">
            <Image
              src="/fort-worth-texas-1031-exchange-homepage-hero-3.jpg"
              alt="Fort Worth landscape"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Left: Logo */}
              <div className="text-center lg:text-left">
                <span className="script-the text-5xl md:text-6xl">the</span>
                <p className="font-serif text-3xl tracking-[0.15em] text-white md:text-4xl">FORT WORTH</p>
                <p className="font-serif text-2xl tracking-[0.15em] text-accent md:text-3xl">EXCHANGE</p>
              </div>
              
              {/* Right: Benefits */}
              <div className="space-y-8">
                <h3 className="font-serif text-2xl font-light uppercase tracking-[0.15em] text-white md:text-3xl">
                  THE BENEFITS OF 1031 EXCHANGE
                </h3>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="border-l-2 border-accent pl-4">
                      <h4 className="font-serif text-lg text-white">{benefit.title}</h4>
                      <p className="mt-1 text-sm text-white/70">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 pt-4">
                  <span className="text-sm text-white/50">01 / 04</span>
                  <Link href="/services" className="border border-white px-6 py-3 text-xs font-medium tracking-[0.15em] text-white transition hover:bg-white hover:text-primary">
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-32 lg:py-48">
          <div className="absolute inset-0">
            <Image
              src="/fort-worth-texas-1031-exchange-homepage-hero-4.jpg"
              alt="Fort Worth skyline"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <span className="script-the text-6xl md:text-7xl lg:text-8xl">the</span>
            <h2 className="font-serif text-5xl font-light tracking-[0.2em] text-accent md:text-6xl lg:text-7xl">
              FORT WORTH
            </h2>
            <p className="font-serif text-4xl font-light tracking-[0.2em] text-accent md:text-5xl lg:text-6xl">
              EXCHANGE
            </p>
            <Link
              href="/contact"
              className="mt-12 border border-white px-8 py-4 text-xs font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
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
