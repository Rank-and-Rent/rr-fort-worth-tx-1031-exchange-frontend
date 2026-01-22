'use client';

import { useState } from "react";
import Link from "next/link";
import { CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";

export default function StickyCta() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Malibu Life style green stripe */}
      <div className="malibu-stripe hidden lg:block" aria-hidden="true" />
      
      {/* LET'S CONNECT floating button - Malibu Life style */}
      <div className="fixed bottom-6 left-6 z-50 lg:left-10">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-2 rounded-full bg-panel px-5 py-3 shadow-lg transition hover:shadow-xl"
          aria-expanded={isOpen}
        >
          <span className="text-xs font-medium tracking-[0.12em] text-primary">
            LET&apos;S CONNECT
          </span>
          <svg 
            className={`h-3 w-3 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Expanded contact options */}
        {isOpen && (
          <div className="absolute bottom-14 left-0 w-64 rounded-2xl bg-panel p-4 shadow-xl animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT_PHONE_DIGITS}`}
                className="block rounded-lg border border-outline/50 bg-secondary/30 px-4 py-3 text-center text-sm font-medium text-primary transition hover:border-primary hover:bg-secondary/50"
              >
                Call {CONTACT_PHONE}
              </a>
              <Link
                href="/contact#contact-form"
                className="block rounded-lg bg-primary px-4 py-3 text-center text-xs font-medium tracking-[0.1em] text-primaryfg transition hover:bg-primary/90"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
