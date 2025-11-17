'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import site from "@/content/site.json";
import { locationsData, servicesData } from "@/data";

type DropdownKey = "services" | "locations" | null;

const staticLinks = [
  { label: "Property Types", href: "/property-types" },
  { label: "Inventory", href: "/inventory" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
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
      
      // Don't close if clicking inside the header (mobile menu button or nav)
      if (headerRef.current.contains(target)) {
        return;
      }
      
      // Close mobile menu and dropdowns when clicking outside
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
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-outline/40 bg-paper/95 shadow-sm backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/1031-exchange-fort-worth-tx-logo.png"
            alt={site.company}
            width={200}
            height={60}
            className="h-16 w-auto object-contain md:h-20"
            priority
            unoptimized
          />
        </Link>

        <button
          type="button"
          className="rounded border border-outline px-3 py-1 text-sm text-heading lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen((prev) => !prev);
          }}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-navigation"
          className={clsx(
            "absolute left-0 top-full w-full border-b border-outline/30 bg-paper/98 p-4 shadow-sm lg:static lg:flex lg:w-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
            mobileMenuOpen ? "block" : "hidden lg:block"
          )}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <DropdownTrigger
              label="Services"
              open={openDropdown === "services"}
              onOpenChange={(state) => setOpenDropdown(state ? "services" : null)}
              onSetCloseTimeout={(timeout) => {
                closeTimeoutRef.current = timeout;
              }}
              onCancelCloseTimeout={cancelCloseTimeout}
            >
              <DropdownMenu
                items={servicesPreview}
                viewAllLabel="View all services"
                viewAllHref="/services"
                className="w-full"
                onNavigate={() => {
                  setOpenDropdown(null);
                  setMobileMenuOpen(false);
                }}
              />
            </DropdownTrigger>

            <DropdownTrigger
              label="Locations"
              open={openDropdown === "locations"}
              onOpenChange={(state) => setOpenDropdown(state ? "locations" : null)}
              onSetCloseTimeout={(timeout) => {
                closeTimeoutRef.current = timeout;
              }}
              onCancelCloseTimeout={cancelCloseTimeout}
            >
              <DropdownMenu
                items={locationPreview}
                viewAllLabel="View all locations"
                viewAllHref="/locations"
                className="w-full"
                onNavigate={() => {
                  setOpenDropdown(null);
                  setMobileMenuOpen(false);
                }}
              />
            </DropdownTrigger>

            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink transition hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact#contact-form"
              className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>

      <div
        ref={dropdownRef}
        className="absolute left-0 right-0 top-full w-full border-b border-outline/40 bg-paper/98 backdrop-blur"
        onMouseEnter={() => {
          cancelCloseTimeout();
        }}
        onMouseLeave={() => {
          setOpenDropdown(null);
        }}
      >
        {openDropdown === "services" && (
          <div className="container mx-auto">
            <DropdownPanel>
              <DropdownMenu
                items={servicesPreview}
                viewAllLabel="View all services"
                viewAllHref="/services"
                className="w-full"
                onNavigate={() => setOpenDropdown(null)}
              />
            </DropdownPanel>
          </div>
        )}
        {openDropdown === "locations" && (
          <div className="container mx-auto">
            <DropdownPanel>
              <DropdownMenu
                items={locationPreview}
                viewAllLabel="View all locations"
                viewAllHref="/locations"
                className="w-full"
                onNavigate={() => setOpenDropdown(null)}
              />
            </DropdownPanel>
          </div>
        )}
      </div>
    </header>
  );
}

type DropdownTriggerProps = {
  label: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetCloseTimeout: (timeout: NodeJS.Timeout) => void;
  onCancelCloseTimeout: () => void;
};

function DropdownTrigger({
  label,
  children,
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
          "flex items-center gap-2 text-sm text-ink transition hover:text-primary",
          open && "text-primary"
        )}
        aria-expanded={open}
        onClick={() => {
          onCancelCloseTimeout();
          onOpenChange(!open);
        }}
      >
        {label}
        <span aria-hidden="true">▾</span>
      </button>
      {open && <div className="mt-2 space-y-2 lg:hidden">{children}</div>}
    </div>
  );
}

type DropdownMenuProps = {
  items: Array<{ slug: string; name: string; route: string }>;
  viewAllLabel: string;
  viewAllHref: string;
  onNavigate: () => void;
  className?: string;
};

function DropdownMenu({ items, viewAllHref, viewAllLabel, onNavigate, className }: DropdownMenuProps) {
  return (
    <div
      className={clsx(
        "grid gap-3 rounded-2xl border border-outline bg-panel p-4 shadow-glow",
        className ?? "w-[320px]"
      )}
    >
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.route}
          className="rounded-xl border border-outline/60 bg-secondary/40 px-3 py-2 text-sm text-heading transition hover:border-accent hover:bg-secondary/70"
          onClick={onNavigate}
        >
          {item.name}
        </Link>
      ))}
      <Link
        href={viewAllHref}
        className="text-xs font-semibold uppercase tracking-[0.3em] text-primary hover:text-accent"
        onClick={onNavigate}
      >
        {viewAllLabel}
      </Link>
    </div>
  );
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden w-full justify-center py-4 lg:flex">
      <div className="w-full max-w-5xl">{children}</div>
    </div>
  );
}

