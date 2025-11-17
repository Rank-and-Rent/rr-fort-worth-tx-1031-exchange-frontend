import Breadcrumbs from "@/components/Breadcrumbs";
import BootCalculator from "@/components/tools/BootCalculator";
import site from "@/content/site.json";
import Link from "next/link";
import type { Metadata } from "next";
import { PRIMARY_CITY } from "@/lib/constants";

const canonicalBase = `https://www.${site.website}`;
const pageUrl = `${canonicalBase}/tools/boot-calculator`;
const description =
  "Estimate cash and mortgage boot for your Fort Worth 1031 exchange so you can plan tax-deferred reinvestments.";

export const metadata: Metadata = {
  title: `Boot Calculator | 1031 Exchange ${PRIMARY_CITY}`,
  description,
  keywords: "1031 boot calculator, cash boot, mortgage boot, Fort Worth 1031, tax deferred exchange",
  openGraph: {
    title: `Boot Calculator | 1031 Exchange ${PRIMARY_CITY}`,
    description,
    type: "website",
    url: pageUrl,
  },
  alternates: {
    canonical: pageUrl,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Boot Calculator" },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadata.title,
    description,
    url: pageUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalBase },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${canonicalBase}/tools` },
      { "@type": "ListItem", position: 3, name: "Boot Calculator", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Boot Calculator",
    applicationCategory: "FinanceApplication",
    description,
    url: pageUrl,
  },
];

export default function BootCalculatorPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          Boot Calculator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Use this calculator to estimate the cash and mortgage boot you may incur during your 1031 exchange
          so you can plan for illustrative tax exposure.
        </p>

        <BootCalculator />

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates
            only. Consult a qualified intermediary and tax advisor before making decisions. Texas does not impose
            a real estate transfer tax; recording fees and title insurance still apply.
          </p>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/services/boot-analysis"
                className="text-[#0B3C5D] underline hover:text-[#C9A227]"
              >
                Boot Calculation Services
              </Link>
            </li>
            <li>
              <Link
                href="/services/exchange-consultation"
                className="text-[#0B3C5D] underline hover:text-[#C9A227]"
              >
                Exchange Consultation
              </Link>
            </li>
            <li>
              <Link
                href="/services/property-identification"
                className="text-[#0B3C5D] underline hover:text-[#C9A227]"
              >
                Property Identification Advisory
              </Link>
            </li>
          </ul>
        </div>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </>
  );
}

