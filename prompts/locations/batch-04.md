# LOCATIONS Content Generation — BATCH 04  Items 22 to 28

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
1) grapevine — Grapevine, TX  Layout: detailed
2) colleyville — Colleyville, TX  Layout: comparison
3) hurst — Hurst, TX  Layout: market
4) north-richland-hills — North Richland Hills, TX  Layout: map-first
5) watauga — Watauga, TX  Layout: overview
6) halton-city — Haltom City, TX  Layout: focused
7) saginaw — Saginaw, TX  Layout: detailed

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

## Output Format  TypeScript  write to /data/batches/locations/batch-04.ts
export const locationsBatch04 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}

