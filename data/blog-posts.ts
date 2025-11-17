import type { BlogPost } from "./types";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR, SITE_URL } from "@/lib/constants";

const now = new Date();

const createPost = (
  slug: string,
  title: string,
  excerpt: string,
  category: string,
  content: string[],
  tags: string[]
): BlogPost => ({
  slug,
  title,
  excerpt,
  author: "1031 Exchange Fort Worth Research",
  category,
  publishedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
  readingTime: Math.max(4, Math.ceil(content.join(" ").split(" ").length / 200)),
  featuredImage: {
    src: "/globe.svg",
    alt: `${title} illustration`,
  },
  content,
  tags,
  canonicalUrl: `${SITE_URL}/blog/${slug}`,
});

export const blogPosts: BlogPost[] = [
  createPost(
    "fort-worth-1031-deadline-checklist",
    "Fort Worth 1031 Exchange Deadline Checklist",
    "Use this simple checklist to keep the 45 day identification and 180 day close timelines on track in Fort Worth, TX.",
    "Timelines",
    [
      "Every exchange starts with a written record of the relinquished asset and proof of sale. Capture that at day zero and log it next to your closing statement.",
      "Schedule lender, intermediary, and attorney calls before day ten. Fast follow items keep everyone aligned with the 45 day requirement in Fort Worth, TX.",
      "On day thirty set a reminder for verification of debt replacement and equity roll amounts. Leave room for updated payoff figures before you submit the identification letter.",
      "During the 180 day window hold weekly syncs. Note inspections, estoppels, and loan conditions so no party is surprised when it is time to close.",
    ],
    ["deadlines", "checklist", "fort worth"]
  ),
  createPost(
    "single-tenant-nnn-replacement-strategy",
    "Single Tenant NNN Replacement Strategy",
    "Triple net leases remain the fastest path to predictable cash flow when a Fort Worth seller needs hands free income.",
    "NNN Strategy",
    [
      "Stabilized NNN assets keep expenses on the tenant while the investor focuses on lease covenants and credit.",
      "Start in essential categories like convenience stores, pharmacy, medical clinics, and drive thru QSR so credit committees respond quickly.",
      "Ask for store level sales data or public company coverage ratios. Use that with rent to sales metrics to prioritize the best addresses.",
    ],
    ["nnn", "replacement property", "single tenant"]
  ),
  createPost(
    "medical-office-1031-lanes",
    "Medical Office 1031 Exchange Lanes",
    "Fort Worth, TX medical demand continues to expand which opens a path for 1031 buyers who want healthcare credit.",
    "Medical Office",
    [
      "Outpatient migration keeps ambulatory surgery centers and urgent care clinics in expansion mode.",
      "Pair hospital system credit with strong demographics. Focus on rooftops, median income, and employer density.",
      "Check remaining lease term, extension options, and reimbursement language so taxes, insurance, and maintenance stay on the tenant.",
    ],
    ["medical office", "healthcare", "fort worth"]
  ),
  createPost(
    "industrial-last-mile-plays",
    "Industrial Last Mile 1031 Plays",
    "Alliance Corridor and the west side of Fort Worth provide a steady mix of shallow bay and last mile industrial space.",
    "Industrial",
    [
      "Prioritize infill buildings with truck courts, clear heights above 28 feet, and modern sprinkler coverage.",
      "Compare in place rents to current market rents to uncover embedded upside.",
      "Confirm trailer parking ratios, cross dock functionality, and access to primary highways before committing.",
    ],
    ["industrial", "logistics", "alliance"]
  ),
  createPost(
    "underwriting-rent-rolls-fast",
    "Underwriting Rent Rolls Fast",
    "Rent roll reviews should be fast but complete. Here is how our team handles it for Fort Worth, TX investors.",
    "Underwriting",
    [
      "Request native spreadsheet exports instead of scanned PDFs. This keeps formulas intact and speeds up cross checks.",
      "Sort by lease expiration to see near term rollover. Highlight anything inside the next 36 months for a follow up call.",
      "Match tenant names against Secretary of State records and any public filings to confirm corporate backing.",
    ],
    ["rent roll", "underwriting", "due diligence"]
  ),
  createPost(
    "identification-letter-basics",
    "Identification Letter Basics",
    "A complete identification letter needs precise facts, not fluff. This overview keeps you compliant in Texas.",
    "Compliance",
    [
      "List each property with legal name, street address, city, and state. Include unit numbers when applicable.",
      "State the rule you are following. Three property, 200 percent, or 95 percent. Match the rule to your inventory plan.",
      "Send the letter to your intermediary before the 45th day ends and request acknowledgment in writing.",
    ],
    ["identification letter", "irs", "compliance"]
  ),
  createPost(
    "fort-worth-dst-prep",
    "Fort Worth DST Preparation Steps",
    "Some investors prefer DST placements. Preparation matters because DSTs involve securities professionals.",
    "DST",
    [
      "Document your liquid net worth, income, and exchange goals before you speak with any DST sponsor.",
      "Outline the amount you plan to deploy, the debt you must replace, and any leverage tolerance.",
      "Ask for sponsor track records, property summaries, and fee breakdowns for each tranche you evaluate.",
    ],
    ["dst", "planning", "fort worth"]
  ),
  createPost(
    "project-type-intake-secure",
    "Secure Intake For 1031 Project Types",
    "We protect your intake data. Here is how we handle forms, document transfer, and project classification.",
    "Process",
    [
      "All intake forms move through encrypted transmission. Backend workflows keep data in a single CRM.",
      "We tag each project type with the asset class, deadline, and capital requirement so the search desk can move fast.",
      "Document exchanges with QIs rely on secure file rooms with expiring links and MFA at the folder level.",
    ],
    ["security", "intake", "process"]
  ),
];

