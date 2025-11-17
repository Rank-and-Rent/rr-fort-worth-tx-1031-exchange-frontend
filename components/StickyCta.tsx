'use client';

import { useState } from "react";
import Link from "next/link";
import { CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";

export default function StickyCta() {
  const [mobileOpen, setMobileOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <div className="hidden lg:flex items-center gap-3 rounded-full border border-outline bg-panel/90 px-4 py-2 shadow-glow">
        <span className="text-xs uppercase tracking-[0.35em] text-ink/70">Need help?</span>
        <Link
          href="/contact#contact-form"
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg transition hover:opacity-90"
        >
          Contact
        </Link>
      </div>

      <div className="w-72 rounded-2xl border border-outline bg-panel/95 p-3 shadow-glow lg:hidden">
        <button
          type="button"
          className="mb-2 w-full text-left text-xs font-semibold uppercase tracking-[0.3em] text-ink/70"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "Hide quick actions" : "Show quick actions"}
        </button>
        {mobileOpen && (
          <div className="space-y-3">
            <a
              href={`tel:${CONTACT_PHONE_DIGITS}`}
              className="block rounded-xl border border-outline bg-secondary/40 px-4 py-3 text-center text-sm font-semibold text-heading"
            >
              Call {CONTACT_PHONE}
            </a>
            <Link
              href="/contact#contact-form"
              className="block rounded-xl border border-primary bg-primary/20 px-4 py-3 text-center text-sm font-semibold text-primary"
            >
              Message specialist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

