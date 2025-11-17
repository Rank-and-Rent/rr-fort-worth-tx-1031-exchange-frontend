import type { PageLayoutVariant, LayoutAssignments } from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Traditional layout with hero, description, FAQs, and CTA",
    sections: ["hero", "description", "faqs", "inclusions", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Comprehensive layout with table of contents and sidebar",
    sections: ["hero", "toc", "description", "faqs", "inclusions", "situations", "compliance", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Streamlined layout emphasizing key information",
    sections: ["hero", "description", "inclusions", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "educational",
    label: "Educational",
    description: "Education focused with examples and resources",
    sections: ["hero", "description", "examples", "faqs", "resources", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Layout comparing options and alternatives",
    sections: ["hero", "description", "comparison", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "process",
    label: "Process",
    description: "Step by step process focused layout",
    sections: ["hero", "description", "process", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Map prominent with location details",
    sections: ["hero-map", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "map",
    },
  },
  {
    key: "overview",
    label: "Overview",
    description: "Comprehensive location overview",
    sections: ["hero", "description", "paths", "faqs", "examples", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "image",
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Streamlined location information",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Detailed location analysis",
    sections: ["hero", "description", "paths", "market", "faqs", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Compare location to alternatives",
    sections: ["hero", "description", "comparison", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "market",
    label: "Market",
    description: "Market focused layout",
    sections: ["hero", "market", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
];

function assignLayoutsRoundRobin<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[]
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;

  items.forEach((item, index) => {
    if (index > 0 && index % variants.length === 0) {
      variantIndex = (variantIndex + 1) % variants.length;
    }
    assignments[item.slug] = variants[variantIndex].key;
    variantIndex = (variantIndex + 1) % variants.length;
  });

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayoutsRoundRobin(servicesData, serviceVariants),
  locations: assignLayoutsRoundRobin(locationsData, locationVariants),
};

