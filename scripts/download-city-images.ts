import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const cities = ['houston-tx', 'austin-tx', 'dallas-tx'];
const outputDir = path.join(process.cwd(), 'public', 'locations');

interface ImageResult {
  city: string;
  imageUrl: string | null;
  savedPath: string | null;
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.statusText}`);
      return false;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await writeFile(filepath, buffer);
    return true;
  } catch (error) {
    console.error(`Error downloading image ${url}:`, error);
    return false;
  }
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
    await page.waitForTimeout(4000);
    await page.waitForLoadState('networkidle');
    
    const imageUrl = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="imgurl="]'));
      if (links.length > 0) {
        const href = links[0].getAttribute('href');
        if (href) {
          const match = href.match(/imgurl=([^&]+)/);
          if (match) {
            try {
              return decodeURIComponent(match[1]);
            } catch (e) {
              return match[1].replace(/%2F/g, '/').replace(/%3A/g, ':').replace(/%3F/g, '?').replace(/%3D/g, '=').replace(/%26/g, '&');
            }
          }
        }
      }
      const imgs = Array.from(document.querySelectorAll('img[src*="googleusercontent.com"]'));
      for (const img of imgs) {
        const src = img.getAttribute('src') || img.getAttribute('data-src');
        if (src && src.startsWith('http') && !src.includes('logo') && !src.includes('icon')) {
          return src;
        }
      }
      return null;
    });
    
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
  // Ensure output directory exists
  try {
    await mkdir(outputDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  console.log('Fetching and downloading images for cities...\n');
  
  const results: ImageResult[] = [];
  
  for (const city of cities) {
    console.log(`Fetching image for ${city}...`);
    const imageUrl = await fetchCityImage(city);
    
    if (imageUrl) {
      console.log(`✓ Found image: ${imageUrl}`);
      
      // Determine file extension from URL or default to jpg
      const urlPath = new URL(imageUrl).pathname;
      const extension = path.extname(urlPath) || '.jpg';
      const filename = `${city}${extension}`;
      const filepath = path.join(outputDir, filename);
      
      console.log(`Downloading to ${filepath}...`);
      const success = await downloadImage(imageUrl, filepath);
      
      if (success) {
        console.log(`✓ Successfully downloaded ${city}\n`);
        results.push({ 
          city, 
          imageUrl, 
          savedPath: `/locations/${filename}` 
        });
      } else {
        console.log(`✗ Failed to download ${city}\n`);
        results.push({ city, imageUrl, savedPath: null });
      }
    } else {
      console.log(`✗ No image found for ${city}\n`);
      results.push({ city, imageUrl: null, savedPath: null });
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n=== Results ===\n');
  results.forEach(({ city, imageUrl, savedPath }) => {
    console.log(`${city}:`);
    if (imageUrl && savedPath) {
      console.log(`  URL: ${imageUrl}`);
      console.log(`  Saved to: ${savedPath}`);
    } else if (imageUrl) {
      console.log(`  URL: ${imageUrl} (download failed)`);
    } else {
      console.log(`  No image found`);
    }
    console.log('');
  });
}

main().catch(console.error);


