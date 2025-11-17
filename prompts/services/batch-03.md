# SERVICES Content Generation — BATCH 03  Items 17 to 24

## Your Mission
Generate SEO optimized content for 8 services in Fort Worth, TX. The site prioritizes nationwide replacement property identification and compliant guidance.

**Critical**
- Technical accuracy, plain language, no tax, legal, or investment advice
- DO NOT MAKE UP INFORMATION WITHOUT VERIFYING IT TO BE TRUE, ESPECIALLY FOR OUR LOCATIONS!
- Rank and rent compliant language only
- No testimonials, no unverifiable claims
- Follow Hobo Technical SEO 2025 best practices
- Use the assigned layout key for each item

## Services In This Batch  8 total
1) exchange-reporting — Exchange Reporting  Layout: comparison
2) nnn-property-identification — NNN Property Identification  Layout: process
3) retail-property-identification — Retail Property Identification  Layout: classic
4) industrial-property-identification — Industrial Property Identification  Layout: detailed
5) medical-property-identification — Medical Property Identification  Layout: focused
6) exchange-education — Exchange Education  Layout: educational
7) exchange-consultation — Exchange Consultation  Layout: comparison
8) investor-resources — Investor Resources  Layout: process

## Content Requirements  for EACH Service
### 1. Main Description  220 to 300 words
- Who it is for, what is included, forty five day and one hundred eighty day timing
- Mention Qualified Intermediary and qualified escrow at a high level
- Mention Fort Worth, TX once
- Follow the assigned layout sections

### 2. FAQs  4 to 6
- Include Fort Worth, TX in every answer
- Include at least one identification rules question and one boot question

### 3. What We Include
- 5 to 8 bullet points

### 4. Common Situations
- 3 short examples framed as examples we can handle

### 5. Compliance and Limits
- Educational content only. Not tax, legal, or investment advice.
- 1031 defers income tax on qualifying real property and does not remove transfer or documentary taxes.

### 6. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "serviceType":"[Service Name]", "location":"Fort Worth, TX", "scope":"...", "clientSituation":"...", "ourApproach":"...", "expectedOutcome":"...", "contactCTA":"Contact us to discuss your situation in Fort Worth, TX. We can share references upon request." }

## Output Format  TypeScript  write to /data/batches/services/batch-03.ts
export const servicesBatch03 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    faqs:[{question:"...",answer:"..."}],
    inclusions:["..."],
    commonSituations:["..."],
    complianceNote:"Educational content only. Not tax, legal, or investment advice.",
    exampleCapability:{ ... }
  }
}

