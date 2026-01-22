'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import site from "@/content/site.json";
import { locationsData, servicesData } from "@/data";

type DropdownKey = "services" | "locations" | null;

const staticLinks = [
  { label: "PROPERTY TYPES", href: "/property-types" },
  { label: "INVENTORY", href: "/inventory" },
  { label: "TOOLS", href: "/tools" },
  { label: "ABOUT", href: "/about" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesPreview = servicesData.slice(0, 8);
  const locationPreview = locationsData.slice(0, 8);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancelCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
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
      
      if (headerRef.current.contains(target)) {
        return;
      }
      
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        cancelCloseTimeout();
        setOpenDropdown(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      cancelCloseTimeout();
    };
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex items-center justify-between gap-6 px-8 py-4 md:px-12 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/1031-exchange-fort-worth-tx-logo.png"
            alt={site.company}
            width={180}
            height={54}
            className="h-14 w-auto object-contain md:h-16"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <DropdownTrigger
            label="SERVICES"
            open={openDropdown === "services"}
            onOpenChange={(state) => setOpenDropdown(state ? "services" : null)}
            onSetCloseTimeout={(timeout) => {
              closeTimeoutRef.current = timeout;
            }}
            onCancelCloseTimeout={cancelCloseTimeout}
          />

          <DropdownTrigger
            label="LOCATIONS"
            open={openDropdown === "locations"}
            onOpenChange={(state) => setOpenDropdown(state ? "locations" : null)}
            onSetCloseTimeout={(timeout) => {
              closeTimeoutRef.current = timeout;
            }}
            onCancelCloseTimeout={cancelCloseTimeout}
          />

          {staticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-[0.15em] text-primary transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu Button */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primaryfg transition hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen((prev) => !prev);
          }}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1">
            <span className={clsx(
              "block h-0.5 w-5 bg-current transition-transform",
              mobileMenuOpen && "translate-y-1.5 rotate-45"
            )} />
            <span className={clsx(
              "block h-0.5 w-5 bg-current transition-opacity",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={clsx(
              "block h-0.5 w-5 bg-current transition-transform",
              mobileMenuOpen && "-translate-y-1.5 -rotate-45"
            )} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        id="primary-navigation"
        className={clsx(
          "absolute left-0 top-full w-full bg-paper/98 p-6 shadow-lg transition-all duration-300 lg:hidden",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4">
          <Link
            href="/services"
            className="text-sm font-medium tracking-[0.1em] text-primary transition hover:text-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            SERVICES
          </Link>
          <Link
            href="/locations"
            className="text-sm font-medium tracking-[0.1em] text-primary transition hover:text-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            LOCATIONS
          </Link>
          {staticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-[0.1em] text-primary transition hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact#contact-form"
            className="mt-4 inline-flex items-center justify-center border border-primary bg-primary px-6 py-3 text-xs font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </Link>
        </div>
      </nav>

      {/* Desktop Dropdown Panel */}
      <div
        ref={dropdownRef}
        className={clsx(
          "absolute left-0 right-0 top-full w-full bg-paper/98 backdrop-blur transition-all duration-300",
          openDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        onMouseEnter={() => {
          cancelCloseTimeout();
        }}
        onMouseLeave={() => {
          setOpenDropdown(null);
        }}
      >
        {openDropdown === "services" && (
          <div className="mx-auto max-w-6xl px-8 py-8">
            <DropdownMenu
              items={servicesPreview}
              viewAllLabel="VIEW ALL SERVICES"
              viewAllHref="/services"
              onNavigate={() => setOpenDropdown(null)}
            />
          </div>
        )}
        {openDropdown === "locations" && (
          <div className="mx-auto max-w-6xl px-8 py-8">
            <DropdownMenu
              items={locationPreview}
              viewAllLabel="VIEW ALL LOCATIONS"
              viewAllHref="/locations"
              onNavigate={() => setOpenDropdown(null)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

type DropdownTriggerProps = {
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetCloseTimeout: (timeout: NodeJS.Timeout) => void;
  onCancelCloseTimeout: () => void;
};

function DropdownTrigger({
  label,
  open,
  onOpenChange,
  onSetCloseTimeout,
  onCancelCloseTimeout,
}: DropdownTriggerProps) {
  const handleMouseEnter = () => {
    onCancelCloseTimeout();
    onOpenChange(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      onOpenChange(false);
    }, 150);
    onSetCloseTimeout(timeout);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        className={clsx(
          "flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-primary transition hover:text-accent",
          open && "text-accent"
        )}
        aria-expanded={open}
        onClick={() => {
          onCancelCloseTimeout();
          onOpenChange(!open);
        }}
      >
        {label}
        <svg 
          className={clsx("h-3 w-3 transition-transform", open && "rotate-180")} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

type DropdownMenuProps = {
  items: Array<{ slug: string; name: string; route: string }>;
  viewAllLabel: string;
  viewAllHref: string;
  onNavigate: () => void;
};

function DropdownMenu({ items, viewAllHref, viewAllLabel, onNavigate }: DropdownMenuProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.route}
          className="border-b border-outline/30 py-3 text-sm text-primary transition hover:border-primary hover:text-accent"
          onClick={onNavigate}
        >
          {item.name}
        </Link>
      ))}
      <div className="md:col-span-4 pt-4">
        <Link
          href={viewAllHref}
          className="text-xs font-medium tracking-[0.15em] text-primary transition hover:text-accent"
          onClick={onNavigate}
        >
          {viewAllLabel} &rarr;
        </Link>
      </div>
    </div>
  );
}
