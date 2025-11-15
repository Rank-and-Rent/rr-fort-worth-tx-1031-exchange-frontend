import { chromium } from 'playwright';

const cities = ['houston-tx', 'austin-tx', 'dallas-tx'];

interface ImageResult {
  city: string;
  imageUrl: string | null;
}

async function fetchCityImageFromUnsplash(city: string): Promise<string | null> {
  try {
    // Use Unsplash API (no key required for basic usage)
    const searchTerm = city.replace('-tx', ' Texas').replace('-', ' ');
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=1&client_id=YOUR_ACCESS_KEY`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular || data.results[0].urls.full;
      }
    }
  } catch (e) {
    // Fall back to Google Images
  }
  return null;
}

async function fetchCityImage(city: string): Promise<string | null> {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(city)}&udm=2&source=lnt&tbs=isz:l`;
    
    await page.goto(searchUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for images to load
    await page.waitForTimeout(4000);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if we got blocked or redirected
    const currentUrl = page.url();
    if (currentUrl.includes('sorry') || currentUrl.includes('captcha')) {
      console.log(`  Warning: May have been blocked by Google for ${city}`);
    }
    
    // Try multiple selectors to find image links
    let imageUrl: string | null = null;
    
    // Method 1: Use evaluate to find image URLs - simpler approach
    imageUrl = await page.evaluate(() => {
      // Find all links that might contain image URLs
      const links = Array.from(document.querySelectorAll('a'));
      for (const link of links) {
        const href = link.getAttribute('href');
        if (href && href.includes('imgurl=')) {
          const match = href.match(/imgurl=([^&]+)/);
          if (match) {
            try {
              const decoded = decodeURIComponent(match[1]);
              if (decoded.startsWith('http')) {
                return decoded;
              }
            } catch (e) {
              const raw = match[1].replace(/%2F/g, '/').replace(/%3A/g, ':').replace(/%3F/g, '?').replace(/%3D/g, '=').replace(/%26/g, '&');
              if (raw.startsWith('http')) {
                return raw;
              }
            }
          }
        }
      }
      
      // Fallback: find images with googleusercontent
      const imgs = Array.from(document.querySelectorAll('img'));
      for (const img of imgs) {
        const src = img.getAttribute('src') || img.getAttribute('data-src');
        if (src && src.includes('googleusercontent.com') && src.startsWith('http')) {
          if (!src.includes('logo') && !src.includes('icon')) {
            return src;
          }
        }
      }
      
      return null;
    });
    
    // If still no image, try clicking on first image link to get URL
    if (!imageUrl) {
      try {
        const firstImageLink = page.locator('a[data-ved]').first();
        await firstImageLink.click({ timeout: 5000 });
        await page.waitForTimeout(2000);
        
        // Try to extract URL from the new page
        const newUrl = page.url();
        if (newUrl.includes('imgurl=')) {
          const match = newUrl.match(/imgurl=([^&]+)/);
          if (match) {
            try {
              imageUrl = decodeURIComponent(match[1]);
            } catch (e) {
              imageUrl = match[1].replace(/%2F/g, '/').replace(/%3A/g, ':').replace(/%3F/g, '?').replace(/%3D/g, '=').replace(/%26/g, '&');
            }
          }
        }
      } catch (e) {
        // Ignore click errors
      }
    }
    
    await context.close();
    await browser.close();
    return imageUrl;
    
  } catch (error) {
    console.error(`Error fetching image for ${city}:`, error);
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
    return null;
  }
}

async function main() {
  console.log('Fetching images for cities...\n');
  
  const results: ImageResult[] = [];
  
  for (const city of cities) {
    console.log(`Fetching image for ${city}...`);
    const imageUrl = await fetchCityImage(city);
    results.push({ city, imageUrl });
    
    if (imageUrl) {
      console.log(`✓ Found image for ${city}`);
    } else {
      console.log(`✗ No image found for ${city}`);
    }
    
    // Small delay between requests to be respectful
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n=== Results ===\n');
  results.forEach(({ city, imageUrl }) => {
    console.log(`${city}:`);
    console.log(imageUrl || 'No image found');
    console.log('');
  });
  
  // Also output just the URLs for easy copy-paste
  console.log('=== Image URLs ===');
  results.forEach(({ city, imageUrl }) => {
    if (imageUrl) {
      console.log(imageUrl);
    }
  });
}

main().catch(console.error);

