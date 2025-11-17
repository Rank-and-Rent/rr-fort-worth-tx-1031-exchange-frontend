# SERVICES Content Generation — BATCH 02  Items 9 to 16

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
1) qualified-intermediary-services — Qualified Intermediary Services  Layout: focused
2) qualified-escrow-services — Qualified Escrow Services  Layout: educational
3) exchange-documentation — Exchange Documentation  Layout: comparison
4) property-identification — Property Identification  Layout: process
5) tax-basis-calculation — Tax Basis Calculation  Layout: classic
6) boot-analysis — Boot Analysis  Layout: detailed
7) depreciation-recapture-planning — Depreciation Recapture Planning  Layout: focused
8) form-8824-preparation — Form 8824 Preparation  Layout: educational

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

## Output Format  TypeScript  write to /data/batches/services/batch-02.ts
export const servicesBatch02 = {
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

