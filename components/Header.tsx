'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import site from "@/content/site.json";
import { servicesData } from "@/data";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const servicesPreview = servicesData.slice(0, 8);

  const cancelCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (!headerRef.current) return;
      if (headerRef.current.contains(target)) return;
      setMobileMenuOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        cancelCloseTimeout();
        setServicesOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      cancelCloseTimeout();
    };
  }, []);

  const handleMouseEnter = () => {
    cancelCloseTimeout();
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setServicesOpen(false), 150);
    closeTimeoutRef.current = timeout;
  };

  return (
    <header ref={headerRef} className="fixed left-0 right-0 top-0 z-50 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 lg:px-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/1031-exchange-fort-worth-tx-logo.png"
            alt={site.company}
            width={140}
            height={42}
            className="h-10 w-auto object-contain md:h-12"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={clsx(
                "flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary transition hover:text-accent",
                servicesOpen && "text-accent"
              )}
              aria-expanded={servicesOpen}
            >
              SERVICES
              <svg 
                className={clsx("h-3 w-3 transition-transform", servicesOpen && "rotate-180")} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <Link href="/locations" className="text-xs font-medium tracking-[0.2em] text-primary transition hover:text-accent">
            NEIGHBORHOODS
          </Link>
          <Link href="/tools" className="text-xs font-medium tracking-[0.2em] text-primary transition hover:text-accent">
            TOOLS
          </Link>
          <Link href="/contact" className="text-xs font-medium tracking-[0.2em] text-primary transition hover:text-accent">
            CONTACT
          </Link>
        </nav>

        {/* Yellow/Gold Hamburger Menu Button - Malibu Life Style */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary transition hover:bg-accent/90"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen((prev) => !prev);
          }}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1.5">
            <span className={clsx(
              "block h-0.5 w-5 bg-current transition-all duration-300",
              mobileMenuOpen && "translate-y-2 rotate-45"
            )} />
            <span className={clsx(
              "block h-0.5 w-5 bg-current transition-all duration-300",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={clsx(
              "block h-0.5 w-5 bg-current transition-all duration-300",
              mobileMenuOpen && "-translate-y-2 -rotate-45"
            )} />
          </div>
        </button>
      </div>

      {/* Services Dropdown Panel */}
      <div
        ref={dropdownRef}
        className={clsx(
          "absolute left-0 right-0 top-full bg-paper shadow-lg transition-all duration-300",
          servicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-5xl px-8 py-8 md:px-12 lg:px-16">
          <div className="grid gap-4 md:grid-cols-4">
            {servicesPreview.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="border-b border-outline/30 py-3 text-sm text-primary transition hover:border-primary hover:text-accent"
                onClick={() => setServicesOpen(false)}
              >
                {service.name}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services"
              className="text-xs font-medium tracking-[0.15em] text-accent transition hover:text-primary"
              onClick={() => setServicesOpen(false)}
            >
              VIEW ALL SERVICES &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 top-0 bg-paper transition-all duration-500",
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        {/* Close button in top right */}
        <button
          type="button"
          className="absolute right-6 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary md:right-10"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex h-full flex-col items-center justify-center gap-8">
          <Link
            href="/services"
            className="font-serif text-3xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-4xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            SERVICES
          </Link>
          <Link
            href="/locations"
            className="font-serif text-3xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-4xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            NEIGHBORHOODS
          </Link>
          <Link
            href="/property-types"
            className="font-serif text-3xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-4xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            PROPERTY TYPES
          </Link>
          <Link
            href="/tools"
            className="font-serif text-3xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-4xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            TOOLS
          </Link>
          <Link
            href="/about"
            className="font-serif text-3xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-4xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="mt-8 border border-primary px-10 py-4 text-sm font-medium tracking-[0.2em] text-primary transition hover:bg-primary hover:text-primaryfg"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </nav>
      </div>
    </header>
  );
}
