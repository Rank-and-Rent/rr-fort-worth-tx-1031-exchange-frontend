'use client';

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  locationsData,
  propertyTypesData,
  inventoryCategories,
} from "@/data";
import RotatingHeroBackground from "@/components/home/RotatingHeroBackground";
import { getProfessionalServiceSchema } from "@/lib/seo";

export default function Home() {
  const featuredMarkets = locationsData.filter((l) => l.type === "city").slice(0, 6);
  const propertyShowcase = propertyTypesData.slice(0, 6);

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxIndex = Math.max(0, propertyShowcase.length - 3);

  const nextSlide = () => setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCarouselIndex((prev) => Math.max(prev - 1, 0));

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

  return (
    <div className="bg-paper text-ink">
      <main>
        {/* HERO - Full Screen */}
        <section className="relative h-screen overflow-hidden">
          <RotatingHeroBackground />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <span className="script-the text-5xl md:text-7xl lg:text-8xl">the</span>
            <h1 className="font-serif text-5xl font-normal tracking-[0.15em] text-primary md:text-7xl lg:text-8xl">
              FORT WORTH
            </h1>
            <h2 className="font-serif text-4xl font-normal tracking-[0.15em] text-accent md:text-6xl lg:text-7xl">
              EXCHANGE
            </h2>
          </div>
        </section>

        {/* EXCLUSIVE LISTINGS - Carousel */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-16">
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
              EXPLORE EXCLUSIVE LISTINGS
            </h2>
            
            <div className="mt-12 overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * 33.333}%)` }}
              >
                {propertyShowcase.map((type) => {
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
                            alt={type.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="33vw"
                          />
                        )}
                        <span className="absolute right-4 top-4 text-xs font-medium tracking-[0.15em] text-accent">
                          FOR SALE
                        </span>
                        </div>
                      <div className="mt-4 space-y-1">
                        <p className="font-serif text-2xl text-primary">{type.name}</p>
                        <p className="text-xs uppercase tracking-[0.1em] text-ink/50">
                          FORT WORTH, TX
                        </p>
                        <p className="text-xs text-ink/50">Net Lease Property</p>
                      </div>
                    </Link>
                  );
                })}
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
              <Link href="/property-types" className="malibu-btn-outline">
                VIEW ALL
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED NEIGHBORHOODS - 3x2 Grid */}
        <section className="bg-paper">
          <div className="mx-auto max-w-7xl px-8 pb-20 md:px-12 lg:px-16 lg:pb-28">
            <h2 className="section-title mb-8 text-center text-3xl md:text-4xl lg:text-5xl">
              FEATURED NEIGHBORHOODS
              </h2>
            
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
              {featuredMarkets.map((market) => (
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-serif text-2xl font-normal tracking-[0.1em] text-white md:text-3xl">
                      {market.name.toUpperCase()}
                    </h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="mt-16 border border-white px-4 py-2 text-xs tracking-[0.15em] text-white">
                      LEARN MORE
                </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRESS LOGOS */}
        <section className="border-y border-outline/30 bg-paper py-12">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-8 md:gap-12 lg:gap-16">
            <span className="font-serif text-xl text-ink/30">Fort Worth Star-Telegram</span>
            <span className="hidden h-8 w-px bg-outline/30 md:block" />
            <span className="font-serif text-xl text-ink/30">Dallas Business Journal</span>
            <span className="hidden h-8 w-px bg-outline/30 md:block" />
            <span className="font-serif text-xl text-ink/30">Texas Monthly</span>
            <span className="hidden h-8 w-px bg-outline/30 md:block" />
            <span className="font-serif text-xl text-ink/30">D Magazine</span>
            <span className="hidden h-8 w-px bg-outline/30 md:block" />
            <span className="font-serif text-xl text-ink/30">Forbes</span>
          </div>
        </section>

        {/* ABOUT - Two Images Side by Side */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-8 md:px-12 lg:grid-cols-2 lg:gap-12 lg:px-16">
            {/* Left: Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/fort-worth-texas-1031-exchange-homepage-hero-1.jpg"
                alt="Fort Worth skyline"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right: Image + Text */}
            <div className="flex flex-col gap-8">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/fort-worth-texas-1031-exchange-homepage-hero-2.jpg"
                  alt="Fort Worth real estate"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-normal uppercase tracking-[0.1em] text-primary md:text-4xl">
                  THE FORT WORTH EXCHANGE
                </h2>
                <p className="text-base leading-relaxed text-ink/70">
                  Founded in Fort Worth, our team represents the most experienced 1031 exchange advisors in Texas. We specialize in helping investors defer capital gains through strategic property exchanges, with deep expertise in NNN retail, medical, and industrial assets.
                </p>
                <p className="text-base leading-relaxed text-ink/70">
                  Our team continues to bring in record transactions year after year, ranking among the top 1031 exchange specialists nationally. We perform under a client-first mentality, which means exceptional service is a top priority.
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
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative py-32 lg:py-40">
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
          
          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-8 md:px-12 lg:grid-cols-2 lg:items-center lg:px-16">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <span className="script-the text-4xl text-accent md:text-5xl">the</span>
                <p className="font-serif text-3xl tracking-[0.1em] text-white md:text-4xl">FORT WORTH</p>
                <p className="font-serif text-2xl tracking-[0.1em] text-accent md:text-3xl">EXCHANGE</p>
              </div>
            </div>
            
            {/* Quote */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-normal uppercase tracking-[0.1em] text-white md:text-3xl">
                WHAT OUR CLIENTS SAY
              </h3>
              <blockquote className="text-base leading-relaxed text-white/90 md:text-lg">
                &ldquo;An absolute pleasure working with the Fort Worth team. They responded quickly and were very knowledgeable and friendly. Would recommend to anyone looking to complete a 1031 exchange.&rdquo;
              </blockquote>
              <p className="text-sm font-medium text-white/60">&mdash; FORT WORTH INVESTOR</p>
              <div className="flex items-center gap-4 pt-4">
                <span className="text-sm text-white/50">01 / 03</span>
                <Link href="/contact" className="border border-white px-6 py-3 text-xs font-medium tracking-[0.15em] text-white transition hover:bg-white hover:text-primary">
                  VIEW ALL
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Palm Trees Style */}
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
            <span className="script-the text-5xl md:text-6xl lg:text-7xl">the</span>
            <h2 className="font-serif text-5xl font-normal tracking-[0.15em] text-white md:text-6xl lg:text-7xl">
              FORT WORTH
            </h2>
            <p className="font-serif text-4xl font-normal tracking-[0.15em] text-accent md:text-5xl lg:text-6xl">
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
