import { CalculatorIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import site from "@/content/site.json";
import Link from "next/link";
import type { Metadata } from "next";
import { PRIMARY_CITY } from "@/lib/constants";
import { toolsData } from "@/data";

const canonicalBase = `https://www.${site.website}`;
const pageUrl = `${canonicalBase}/tools`;
const description =
  "Explore interactive 1031 exchange calculators built for Fort Worth owners including boot and identification tools.";

export const metadata: Metadata = {
  title: `Tools | 1031 Exchange ${PRIMARY_CITY}`,
  description,
  keywords: "1031 tools, Fort Worth boot calculator, identification checker, tax deferred exchange tools",
  openGraph: {
    title: `Tools | 1031 Exchange ${PRIMARY_CITY}`,
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
  { label: "Tools" },
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
      { "@type": "ListItem", position: 2, name: "Tools", item: pageUrl },
    ],
  },
];

const toolIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "boot-calculator": CalculatorIcon,
  "identification-rules-checker": ShieldCheckIcon,
  "deadline-calculator": CalculatorIcon,
  "identification-letter-helper": ShieldCheckIcon,
  "timeline-tracker": ShieldCheckIcon,
};

export default function ToolsIndexPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">Tools</h1>
        <p className="text-lg text-gray-700 mb-8">
          These calculators and checkers keep Fort Worth exchanges compliant with reporting timelines and
          identification rules. Use them before calling your Qualified Intermediary.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {toolsData.map((tool) => {
            const Icon = toolIcons[tool.slug] ?? CalculatorIcon;
            return (
              <Link key={tool.slug} href={tool.route} className="block">
                <article className="group h-full rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="flex items-center justify-between gap-2">
                    <Icon className="h-8 w-8 text-[#0B3C5D]" aria-hidden />
                    <span className="rounded-full border border-[#0B3C5D] px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3C5D]">
                      Tools
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-[#0B3C5D]">{tool.name}</h2>
                  <p className="mt-2 text-sm text-ink/70">{tool.description}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
                    Open tool {">"}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">Need help beyond calculators?</h2>
          <div className="space-y-2 text-sm text-ink">
            <Link href="/services/boot-analysis" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
              Boot Analysis Services
            </Link>
            <Link
              href="/services/property-identification"
              className="text-[#0B3C5D] underline hover:text-[#C9A227]"
            >
              Property Identification Advisory
            </Link>
            <Link
              href="/services/exchange-consultation"
              className="text-[#0B3C5D] underline hover:text-[#C9A227]"
            >
              Exchange Consultation
            </Link>
          </div>
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
