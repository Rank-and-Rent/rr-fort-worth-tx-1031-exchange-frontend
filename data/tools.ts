import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import type { ToolItem } from "./types";

const locationCopy = `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`;

export const toolsData: ToolItem[] = [
  {
    slug: "boot-calculator",
    name: "Boot Calculator",
    description: `Estimate cash and mortgage boot exposure for ${locationCopy} exchanges.`,
    route: "/tools/boot-calculator",
  },
  {
    slug: "identification-rules-checker",
    name: "Identification Rules Checker",
    description: `Confirm your replacement shortlist complies with the three property, 200 percent, and 95 percent rules in ${locationCopy}.`,
    route: "/tools/identification-rules-checker",
  },
  {
    slug: "deadline-calculator",
    name: "45/180 Day Deadline Calculator",
    description: `Track the 45 day identification and 180 day close milestones with timestamps aligned to ${locationCopy}.`,
    route: "/tools/deadline-calculator",
  },
  {
    slug: "identification-letter-helper",
    name: "Identification Letter Helper",
    description: "Draft a printable letter with placeholders for property descriptions and delivery language.",
    route: "/tools/identification-letter",
  },
  {
    slug: "timeline-tracker",
    name: "Timeline Tracker",
    description: "Review key checkpoints from sale to replacement closing with reminders for lenders and QIs.",
    route: "/tools/timeline-tracker",
  },
];

