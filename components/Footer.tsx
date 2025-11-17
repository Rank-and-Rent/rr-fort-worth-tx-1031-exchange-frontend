import Link from "next/link";
import site from "@/content/site.json";
import { toolsData } from "@/data";
import {
  COMPANY_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DIGITS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_URL,
} from "@/lib/constants";

const sitemapLinks = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Property Types", href: "/property-types" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`)}&output=embed`;

  return (
    <footer className="mt-16 border-t border-outline bg-panel">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <section>
            <p className="text-xs uppercase tracking-[0.35em] text-ink/60">1031 Exchange Desk</p>
            <h3 className="mt-2 text-2xl font-semibold text-heading">{COMPANY_NAME}</h3>
            <p className="mt-3 text-sm text-ink">
              {CONTACT_ADDRESS}
              <br />
              Serving {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} and all 50 states.
            </p>
            <p className="mt-3 text-sm text-ink">Hours: 24 hours a day, 7 days a week.</p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-heading">Navigation</h4>
            <nav className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {sitemapLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-ink hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-heading">Tools</h4>
            <div className="mt-4 space-y-2 text-sm">
              {toolsData.map((tool) => (
                <Link key={tool.slug} href={tool.route} className="block text-ink hover:text-primary">
                  {tool.name}
                </Link>
              ))}
              <Link href="/tools" className="text-xs font-semibold uppercase tracking-[0.35em] text-primary hover:underline">
                View all tools
              </Link>
            </div>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-heading">Contact</h4>
            <div className="mt-4 space-y-2 text-sm text-ink">
              <p>
                Phone:{" "}
                <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="text-primary hover:underline">
                  {CONTACT_PHONE}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>Secure uploads available on request.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-2 text-sm text-ink/70">
            <p>This site helps investors identify potential replacement properties for Section 1031 exchanges.</p>
            <p>This site is not a Qualified Intermediary, law firm, broker, or CPA.</p>
            <p>Users should consult a Qualified Intermediary and tax advisor before acting.</p>
          </div>

          <div className="h-60 overflow-hidden rounded-2xl border border-outline">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title={`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} map`}
            />
          </div>
        </div>

        <div className="mt-10 border-t border-outline/40 pt-6 text-center text-xs text-ink/60">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <p>
            <span className="text-ink/50">Canonical:</span> {SITE_URL}
          </p>
        </div>
      </div>
    </footer>
  );
}

