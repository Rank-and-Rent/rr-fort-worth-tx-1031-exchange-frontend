# LOCATIONS Content Generation — BATCH 02  Items 8 to 14

## Your Mission
Generate SEO optimized content for 7 locations near Fort Worth, TX that help users find replacement properties nationwide.

**Critical**
- No boilerplate
- Include Fort Worth, TX once in each body
- Rank and rent compliant language only
- Emphasize nationwide property identification support
- Use the assigned layout key

## Research Requirements
1) Search "[Location] TX population 2024 2025"
2) Search "[Location] TX major employers industries"
3) Search "[Location] TX neighborhoods business districts"
4) Confirm map location and radius

## Locations In This Batch  7 total
1) carrollton — Carrollton, TX  Layout: overview
2) denton — Denton, TX  Layout: focused
3) garland — Garland, TX  Layout: detailed
4) mesquite — Mesquite, TX  Layout: comparison
5) grand-prairie — Grand Prairie, TX  Layout: market
6) lewisville — Lewisville, TX  Layout: map-first
7) richardson — Richardson, TX  Layout: overview

## Content Requirements  for EACH Location
### 1. Main Description  180 to 260 words
- Local exchange drivers, asset types, any transfer or documentary tax notes
- One reference to Fort Worth, TX
- Mention national identification support
- Follow the assigned layout sections

### 2. Popular Paths  rank 1 to 6
- Order services or property types with 2 to 3 sentence rationale each

### 3. FAQs  4 items
- Include the location and state abbreviation in each answer

### 4. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "location":"[Location, TX]", "situation":"...", "ourApproach":"...", "expectedOutcome":"..." }

## Output Format  TypeScript  write to /data/batches/locations/batch-02.ts
export const locationsBatch02 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}

