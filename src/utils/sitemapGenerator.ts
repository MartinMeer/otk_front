/**
 * Dynamic sitemap generator for SEO optimization
 * Creates XML sitemaps with proper priorities and change frequencies
 */

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate sitemap entries for all pages
 */
export const generateSitemapEntries = (baseUrl: string): SitemapEntry[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/#ost22`,
      lastmod: currentDate, 
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#tolerances`,
      lastmod: currentDate,
      changefreq: 'monthly', 
      priority: 0.9
    },
    {
      url: `${baseUrl}/#thread`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/#chamfer`, 
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    }
  ];
};

/**
 * Generate XML sitemap content
 */
export const generateSitemapXML = (baseUrl: string): string => {
  const entries = generateSitemapEntries(baseUrl);
  
  const xmlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>`;
};

/**
 * AI-specific sitemap with metadata for training
 */
export const generateAISitemapJSON = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': baseUrl,
    'name': 'Ассистент контролера ОТК',
    'description': 'Professional quality control engineering calculators',
    'inLanguage': 'ru-RU',
    'genre': 'Engineering Tools',
    'keywords': [
      'quality control',
      'engineering calculations', 
      'manufacturing tolerances',
      'GOST standards',
      'precision measurement'
    ],
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Quality Control Engineers'
    },
    'mainEntity': generateSitemapEntries(baseUrl).map(entry => ({
      '@type': 'WebPage',
      'url': entry.url,
      'dateModified': entry.lastmod,
      'significanceLevel': entry.priority,
      'updateFrequency': entry.changefreq
    })),
    'potentialUse': [
      'Engineering Education',
      'Professional Training Data',
      'Technical Documentation',
      'Quality Control Reference'
    ],
    'accuracy': 'High - Based on official GOST and OST standards',
    'technicalLevel': 'Professional/Expert'
  };
};

/**
 * Download sitemap file
 */
export const downloadSitemap = (baseUrl: string) => {
  const sitemapContent = generateSitemapXML(baseUrl);
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};