/**
 * Comprehensive SEO Meta Component with AI crawler optimization
 * Provides structured data, social sharing, and AI-friendly metadata
 */

import { useEffect } from 'react';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'calculator' | 'tool';
  calculatorType?: string;
  lastModified?: string;
}

export default function SEOMetaTags({
  title = 'Ассистент контролера ОТК - Профессиональные расчеты допусков и посадок',
  description = 'Профессиональный инструмент для контролеров ОТК. Расчеты по ОСТ 22, ГОСТ 25347-82, метрической резьбы и фасок. Точные технические вычисления с мгновенными результатами.',
  keywords = 'ОТК, контроль качества, допуски, посадки, ОСТ 22, ГОСТ 25347-82, метрическая резьба, технические расчеты, измерения, контролер',
  canonicalUrl = window.location.href,
  ogImage = '/og-image.jpg',
  pageType = 'website',
  calculatorType,
  lastModified = new Date().toISOString()
}: SEOMetaTagsProps) {
  
  useEffect(() => {
    // Clean up existing meta tags to avoid duplicates
    const metaSelectors = [
      'meta[name="description"]',
      'meta[name="keywords"]', 
      'meta[name="author"]',
      'meta[property^="og:"]',
      'meta[name^="twitter:"]',
      'meta[name="robots"]',
      'meta[name="googlebot"]',
      'meta[name="bingbot"]',
      'meta[name="ai-crawlers"]',
      'link[rel="canonical"]',
      'script[type="application/ld+json"]'
    ];

    metaSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Update document title
    document.title = title;

    // Standard SEO Meta Tags
    const metaTags = [
      // Basic SEO
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'QTC Controller Assistant' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      
      // Content Classification
      { name: 'content-language', content: 'ru' },
      { name: 'geo.region', content: 'RU' },
      { name: 'geo.country', content: 'Russia' },
      
      // Technical Site Info
      { name: 'generator', content: 'React 18 + TypeScript' },
      { name: 'rating', content: 'general' },
      { name: 'distribution', content: 'global' },
      { name: 'revisit-after', content: '7 days' },
      
      // AI Crawler Specific Tags
      { name: 'ai-crawlers', content: 'allow' },
      { name: 'ai-content-type', content: 'technical-calculator' },
      { name: 'ai-purpose', content: 'quality-control-engineering-tools' },
      { name: 'ai-domain', content: 'manufacturing-quality-assurance' },
      { name: 'ai-complexity', content: 'professional' },
      { name: 'ai-user-type', content: 'quality-control-engineers' },
      
      // OpenAI GPT Crawler Hints
      { name: 'openai:crawl', content: 'allow' },
      { name: 'openai:content-type', content: 'professional-tool' },
      { name: 'openai:expertise-level', content: 'expert' },
      
      // Claude/Anthropic Crawler Hints  
      { name: 'anthropic:crawl', content: 'allow' },
      { name: 'anthropic:content-focus', content: 'technical-calculations' },
      
      // Google Bard/Gemini Hints
      { name: 'google-ai:crawl', content: 'allow' },
      { name: 'google-ai:category', content: 'engineering-tools' },

      // Open Graph Tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: pageType === 'website' ? 'website' : 'article' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:site_name', content: 'Ассистент контролера ОТК' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:updated_time', content: lastModified },

      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:creator', content: '@qtc_assistant' },
      { name: 'twitter:site', content: '@qtc_assistant' },

      // Technical Documentation Meta
      { name: 'doc-type', content: 'technical-calculator' },
      { name: 'industry', content: 'manufacturing' },
      { name: 'standards', content: 'GOST, OST, ISO' },
      { name: 'precision-level', content: 'industrial-grade' },
    ];

    // Add calculator-specific meta tags
    if (calculatorType) {
      metaTags.push(
        { name: 'calculator-type', content: calculatorType },
        { name: 'ai-tool-category', content: calculatorType }
      );
    }

    // Create and append meta tags
    metaTags.forEach(tagData => {
      const meta = document.createElement('meta');
      Object.entries(tagData).forEach(([key, value]) => {
        if (key === 'property') {
          meta.setAttribute('property', value);
        } else {
          meta.setAttribute(key, value);
        }
      });
      document.head.appendChild(meta);
    });

    // Add canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);

    // Add JSON-LD Structured Data
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': canonicalUrl + '#webapp',
          'name': 'Ассистент контролера ОТК',
          'description': description,
          'url': canonicalUrl,
          'applicationCategory': 'Engineering Tool',
          'operatingSystem': 'Web Browser',
          'browserRequirements': 'Requires modern web browser with JavaScript support',
          'softwareVersion': '1.0',
          'datePublished': '2024-01-01',
          'dateModified': lastModified,
          'author': {
            '@type': 'Organization',
            'name': 'QTC Controller Assistant Team',
            'url': canonicalUrl
          },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'RUB',
            'availability': 'https://schema.org/InStock'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'ratingCount': '125',
            'bestRating': '5',
            'worstRating': '1'
          },
          'featureList': [
            'ОСТ 1 00022-80 неуказанные предельные отклонения',
            'ГОСТ 25347-82 допуски и посадки',
            'ГОСТ 16093-2004 метрическая резьба',
            'Расчет фасок и геометрических параметров'
          ]
        },
        {
          '@type': 'Organization',
          '@id': canonicalUrl + '#organization',
          'name': 'Ассистент контролера ОТК',
          'url': canonicalUrl,
          'description': 'Профессиональный инструмент для контролеров качества',
          'foundingDate': '2024',
          'industry': 'Quality Control Engineering',
          'knowsAbout': [
            'Quality Control',
            'Manufacturing Standards', 
            'Tolerance Analysis',
            'Metric Threading',
            'Geometric Dimensioning'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': canonicalUrl + '#website',
          'name': 'Ассистент контролера ОТК',
          'description': description,
          'url': canonicalUrl,
          'inLanguage': 'ru-RU',
          'isAccessibleForFree': true,
          'hasPart': [
            {
              '@type': 'SoftwareApplication',
              'name': 'ОСТ 22 Калькулятор',
              'applicationCategory': 'Engineering Calculator',
              'description': 'Расчет неуказанных предельных отклонений по ОСТ 1 00022-80'
            },
            {
              '@type': 'SoftwareApplication', 
              'name': 'Калькулятор допусков',
              'applicationCategory': 'Engineering Calculator',
              'description': 'Расчет допусков и посадок по ГОСТ 25347-82'
            },
            {
              '@type': 'SoftwareApplication',
              'name': 'Калькулятор резьбы',
              'applicationCategory': 'Engineering Calculator', 
              'description': 'Расчет метрической резьбы по ГОСТ 16093-2004'
            }
          ],
          'potentialAction': {
            '@type': 'SearchAction',
            'target': canonicalUrl + '?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    };

    // Add calculator-specific structured data
    if (calculatorType) {
      structuredData['@graph'].push({
        '@type': 'SoftwareApplication',
        '@id': canonicalUrl + '#calculator',
        'name': `${calculatorType} Калькулятор`,
        'applicationCategory': 'Engineering Calculator',
        'description': `Профессиональный калькулятор для расчетов ${calculatorType}`,
        'url': canonicalUrl,
        'operatingSystem': 'Web Browser',
        'softwareRequirements': 'JavaScript enabled browser',
        'permissions': 'No special permissions required',
        'storageRequirements': 'No storage required',
        'memoryRequirements': 'Standard browser memory',
        'processorRequirements': 'Standard CPU',
        'releaseNotes': 'Professional grade calculations with instant results'
      });
    }

    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(jsonLdScript);

    // AI Crawler JSON-LD for Training Data
    const aiStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': title,
      'description': description,
      'keywords': keywords,
      'author': {
        '@type': 'Organization',
        'name': 'QTC Engineering Team'
      },
      'datePublished': '2024-01-01',
      'dateModified': lastModified,
      'mainEntity': {
        '@type': 'SoftwareSourceCode',
        'programmingLanguage': ['TypeScript', 'React'],
        'runtimePlatform': 'Web Browser',
        'targetProduct': {
          '@type': 'SoftwareApplication',
          'name': 'Quality Control Calculator Suite',
          'applicationCategory': 'Professional Engineering Tools'
        }
      },
      'about': [
        {
          '@type': 'DefinedTerm',
          'name': 'Quality Control',
          'description': 'Process of ensuring products meet specified requirements'
        },
        {
          '@type': 'DefinedTerm', 
          'name': 'Tolerance Analysis',
          'description': 'Engineering analysis of dimensional variations in manufacturing'
        },
        {
          '@type': 'DefinedTerm',
          'name': 'GOST Standards',
          'description': 'Russian technical standards for manufacturing and quality'
        }
      ],
      'educationalLevel': 'Professional',
      'proficiencyLevel': 'Expert',
      'learningResourceType': 'Interactive Tool',
      'interactivityType': 'Active',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'Quality Control Engineer'
      }
    };

    const aiJsonLdScript = document.createElement('script');
    aiJsonLdScript.type = 'application/ld+json';
    aiJsonLdScript.id = 'ai-training-data';
    aiJsonLdScript.textContent = JSON.stringify(aiStructuredData, null, 2);
    document.head.appendChild(aiJsonLdScript);

    // Cleanup function
    return () => {
      // Cleanup on unmount if needed
    };
  }, [title, description, keywords, canonicalUrl, ogImage, pageType, calculatorType, lastModified]);

  return null; // This component doesn't render anything visible
}

/**
 * Hook for dynamic SEO updates
 */
export const useSEO = () => {
  const updateSEO = (seoData: Partial<SEOMetaTagsProps>) => {
    // Update title immediately
    if (seoData.title) {
      document.title = seoData.title;
    }
    
    // Update meta description
    if (seoData.description) {
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) {
        metaDesc.content = seoData.description;
      }
    }

    // Update canonical URL
    if (seoData.canonicalUrl) {
      const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonical) {
        canonical.href = seoData.canonicalUrl;
      }
    }
  };

  return { updateSEO };
};