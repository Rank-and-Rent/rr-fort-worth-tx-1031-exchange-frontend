'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-outline/50 bg-paper/90 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-heading">
          {site.company}
        </Link>

        <button
          type="button"
          className="lg:hidden rounded border border-outline px-3 py-1 text-sm text-heading"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-navigation"
          className={clsx(
            "absolute left-0 top-full w-full border-b border-outline/40 bg-paper/95 p-4 lg:static lg:flex lg:w-auto lg:border-0 lg:bg-transparent lg:p-0",
            mobileMenuOpen ? "block" : "hidden lg:block"
          )}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <DropdownTrigger
              label="Services"
              open={openDropdown === "services"}
              onOpenChange={(state) => setOpenDropdown(state ? "services" : null)}
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
              className="rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>

      <div ref={dropdownRef} className="relative">
        {openDropdown === "services" && (
          <div className="container">
            <DropdownPanel>
              <DropdownMenu
                items={servicesPreview}
                viewAllLabel="View all services"
                viewAllHref="/services"
                onNavigate={() => setOpenDropdown(null)}
              />
            </DropdownPanel>
          </div>
        )}
        {openDropdown === "locations" && (
          <div className="container">
            <DropdownPanel>
              <DropdownMenu
                items={locationPreview}
                viewAllLabel="View all locations"
                viewAllHref="/locations"
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
};

function DropdownTrigger({ label, children, open, onOpenChange }: DropdownTriggerProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        className={clsx(
          "flex items-center gap-2 text-sm text-ink transition",
          open && "text-primary"
        )}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        {label}
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <>
          <div className="mt-2 space-y-2 lg:hidden">{children}</div>
          <div className="absolute left-0 top-full hidden lg:block">{children}</div>
        </>
      )}
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
          className="rounded-xl border border-outline/50 bg-paper/40 px-3 py-2 text-sm text-heading hover:border-primary"
          onClick={onNavigate}
        >
          {item.name}
        </Link>
      ))}
      <Link
        href={viewAllHref}
        className="text-xs font-semibold uppercase tracking-[0.3em] text-primary hover:underline"
        onClick={onNavigate}
      >
        {viewAllLabel}
      </Link>
    </div>
  );
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden w-full justify-center lg:flex">
      <div className="pt-2">{children}</div>
    </div>
  );
}

