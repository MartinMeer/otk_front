/**
 * SEO Development and Testing Component
 * Provides tools for testing SEO implementation and generating sitemaps
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Eye, Download, Search, Bot, Globe } from 'lucide-react';
import { generateSitemapXML, generateAISitemapJSON, downloadSitemap } from '../../utils/sitemapGenerator';
import { AI_TRAINING_KEYWORDS, AI_DOMAIN_EXPERTISE } from '../../utils/seoConfig';

export default function SEODev() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'ai' | 'sitemap'>('seo');
  
  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-20 z-50">
        <Button 
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          size="sm"
        >
          <Search className="w-4 h-4 mr-2" />
          SEO
        </Button>
      </div>
    );
  }

  const currentUrl = window.location.href;
  const baseUrl = window.location.origin;

  const checkSEOElements = () => {
    const results = {
      title: document.title || 'Missing',
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || 'Missing',
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content') || 'Missing',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || 'Missing',
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || 'Missing',
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || 'Missing',
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || 'Missing',
      structuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
      aiCrawlers: document.querySelector('meta[name="ai-crawlers"]')?.getAttribute('content') || 'Missing',
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || 'Missing'
    };
    return results;
  };

  const seoData = checkSEOElements();

  const handleDownloadSitemap = () => {
    downloadSitemap(baseUrl);
  };

  const handleCopyAIData = () => {
    const aiData = generateAISitemapJSON(baseUrl);
    navigator.clipboard.writeText(JSON.stringify(aiData, null, 2));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px] overflow-hidden bg-white border rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-3 bg-purple-600 text-white">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span className="font-semibold">SEO Dev Tools</span>
        </div>
        <Button 
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-purple-700 h-auto p-1"
        >
          ×
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {(['seo', 'ai', 'sitemap'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-sm font-medium capitalize ${
              activeTab === tab 
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab === 'seo' && <Eye className="w-4 h-4 mr-1" />}
            {tab === 'ai' && <Bot className="w-4 h-4 mr-1" />}
            {tab === 'sitemap' && <Globe className="w-4 h-4 mr-1" />}
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="p-4 max-h-[500px] overflow-y-auto">
        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Meta Tags Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Title:</span>
                  <Badge variant={seoData.title !== 'Missing' ? 'default' : 'destructive'}>
                    {seoData.title !== 'Missing' ? 'OK' : 'Missing'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Description:</span>
                  <Badge variant={seoData.description !== 'Missing' ? 'default' : 'destructive'}>
                    {seoData.description !== 'Missing' ? 'OK' : 'Missing'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Keywords:</span>
                  <Badge variant={seoData.keywords !== 'Missing' ? 'default' : 'destructive'}>
                    {seoData.keywords !== 'Missing' ? 'OK' : 'Missing'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Canonical:</span>
                  <Badge variant={seoData.canonical !== 'Missing' ? 'default' : 'destructive'}>
                    {seoData.canonical !== 'Missing' ? 'OK' : 'Missing'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Open Graph:</span>
                  <Badge variant={seoData.ogTitle !== 'Missing' ? 'default' : 'destructive'}>
                    {seoData.ogTitle !== 'Missing' ? 'OK' : 'Missing'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Structured Data:</span>
                  <Badge variant={seoData.structuredData > 0 ? 'default' : 'destructive'}>
                    {seoData.structuredData} schemas
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Current Page Data</h3>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <div className="mb-1"><strong>URL:</strong> {currentUrl}</div>
                <div className="mb-1"><strong>Title:</strong> {seoData.title}</div>
                <div><strong>Description:</strong> {seoData.description.substring(0, 100)}...</div>
              </div>
            </div>
          </div>
        )}

        {/* AI Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">AI Crawler Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>AI Crawlers:</span>
                  <Badge variant={seoData.aiCrawlers !== 'Missing' ? 'default' : 'destructive'}>
                    {seoData.aiCrawlers}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Training Data:</span>
                  <Badge variant="default">Available</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Domain Expertise:</span>
                  <Badge variant="default">{AI_DOMAIN_EXPERTISE.primaryDomain}</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">AI Training Keywords</h3>
              <div className="flex flex-wrap gap-1">
                {AI_TRAINING_KEYWORDS.slice(0, 8).map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Standards Coverage</h3>
              <div className="space-y-1 text-xs">
                {AI_DOMAIN_EXPERTISE.standards.map((standard, index) => (
                  <div key={index} className="text-green-600">✓ {standard}</div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleCopyAIData}
              size="sm" 
              className="w-full"
            >
              <Bot className="w-4 h-4 mr-2" />
              Copy AI Training Data
            </Button>
          </div>
        )}

        {/* Sitemap Tab */}
        {activeTab === 'sitemap' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Sitemap Information</h3>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <div className="mb-1"><strong>Base URL:</strong> {baseUrl}</div>
                <div className="mb-1"><strong>Pages:</strong> 5 main sections</div>
                <div><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Page Priorities</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Home</span>
                  <Badge>1.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span>OST 22</span>
                  <Badge variant="secondary">0.9</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Tolerances</span>
                  <Badge variant="secondary">0.9</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Thread</span>
                  <Badge variant="outline">0.8</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Chamfer</span>
                  <Badge variant="outline">0.8</Badge>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleDownloadSitemap}
              size="sm" 
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download sitemap.xml
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}