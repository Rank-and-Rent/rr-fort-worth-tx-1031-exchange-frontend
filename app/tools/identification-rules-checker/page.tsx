import Breadcrumbs from "@/components/Breadcrumbs";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";
import site from "@/content/site.json";
import Link from "next/link";
import type { Metadata } from "next";
import { PRIMARY_CITY } from "@/lib/constants";

const canonicalBase = `https://www.${site.website}`;
const pageUrl = `${canonicalBase}/tools/identification-rules-checker`;
const description =
  "Test the three-property, 200%, and 95% rules for Fort Worth 1031 exchanges so you can confidently identify properties.";

export const metadata: Metadata = {
  title: `Identification Rules Checker | 1031 Exchange ${PRIMARY_CITY}`,
  description,
  keywords: "1031 identification rules, three property rule, 200% rule, 95% rule, Fort Worth 1031",
  openGraph: {
    title: `Identification Rules Checker | 1031 Exchange ${PRIMARY_CITY}`,
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
  { label: "Identification Rules Checker" },
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Identification Rules Checker",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Identification Rules Checker",
    applicationCategory: "FinanceApplication",
    description,
    url: pageUrl,
  },
];

export default function IdentificationRulesCheckerPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          Identification Rules Checker
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Validate the three-property, 200%, and 95% identification rules with interactive inputs so you
          know how many properties you can pursue before your 45-day deadline.
        </p>

        <IdentificationRulesChecker />

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates
            only. Consult a qualified intermediary and tax advisor before making decisions. Texas eschews a
            transfer tax, but recording and title fees still apply.
          </p>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/services/property-identification"
                className="text-[#0B3C5D] underline hover:text-[#C9A227]"
              >
                Property Identification Advisory
              </Link>
            </li>
            <li>
              <Link
                href="/services/qualified-intermediary-services"
                className="text-[#0B3C5D] underline hover:text-[#C9A227]"
              >
                Qualified Intermediary Services
              </Link>
            </li>
            <li>
              <Link
                href="/services/form-8824-preparation"
                className="text-[#0B3C5D] underline hover:text-[#C9A227]"
              >
                Form 8824 Preparation
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

