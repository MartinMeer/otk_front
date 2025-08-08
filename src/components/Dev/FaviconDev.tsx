/**
 * Development component for favicon generation and testing
 * Only visible in development mode
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Download, Check, X, Smartphone, Monitor, Tablet } from 'lucide-react';
import { downloadFaviconSet, getFaviconSupport, FAVICON_SIZES } from '../../utils/faviconGenerator.ts';

export default function FaviconDev() {
  const [generating, setGenerating] = useState(false);
  const [support] = useState(() => getFaviconSupport());
  
  // SVG source from our favicon.svg
  const svgSource = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="15" fill="url(#grad1)" stroke="#1e40af" stroke-width="2"/>
    <g fill="white" stroke="white" stroke-width="0.5">
      <rect x="8" y="10" width="2" height="8" rx="0.5"/>
      <rect x="22" y="10" width="2" height="8" rx="0.5"/>
      <rect x="10" y="14" width="12" height="1" rx="0.5"/>
      <rect x="12" y="13.5" width="0.5" height="2"/>
      <rect x="15" y="13.5" width="0.5" height="2"/>
      <rect x="18" y="13.5" width="0.5" height="2"/>
      <rect x="21" y="13.5" width="0.5" height="2"/>
    </g>
    <circle cx="13" cy="20" r="0.8" fill="white" opacity="0.8"/>
    <circle cx="16" cy="21" r="0.8" fill="white" opacity="0.8"/>
    <circle cx="19" cy="20" r="0.8" fill="white" opacity="0.8"/>
  </svg>`;

  const handleGenerateFavicons = async () => {
    setGenerating(true);
    try {
      await downloadFaviconSet(svgSource);
    } catch (error) {
      console.error('Failed to generate favicons:', error);
    } finally {
      setGenerating(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const getDeviceIcon = (filename: string) => {
    if (filename.includes('apple-touch')) return <Smartphone className="w-4 h-4" />;
    if (filename.includes('android')) return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 max-h-96 overflow-y-auto bg-white shadow-lg border-2 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-blue-900 flex items-center gap-2">
            🎨 Favicon Dev Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Browser Support Status */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Browser Support</h4>
            <div className="flex flex-wrap gap-1">
              <Badge variant={support.svg ? "default" : "secondary"} className="text-xs">
                {support.svg ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                SVG
              </Badge>
              <Badge variant={support.canvas ? "default" : "secondary"} className="text-xs">
                {support.canvas ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                Canvas
              </Badge>
              <Badge variant={support.webp ? "default" : "secondary"} className="text-xs">
                {support.webp ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                WebP
              </Badge>
            </div>
          </div>

          {/* Favicon Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Current Favicon</h4>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded border"
                dangerouslySetInnerHTML={{ __html: svgSource }}
              />
              <span className="text-xs text-gray-600">32x32 SVG Preview</span>
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerateFavicons}
            disabled={generating}
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {generating ? 'Generating...' : 'Generate All Sizes'}
          </Button>

          {/* Size List */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Required Sizes ({FAVICON_SIZES.length})</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {FAVICON_SIZES.slice(0, 8).map((size, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-gray-600 py-1">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(size.filename)}
                    <span className="font-mono">{size.width}x{size.height}</span>
                  </div>
                  <span className="text-gray-400 truncate ml-2" title={size.filename}>
                    {size.filename.split('-')[0]}
                  </span>
                </div>
              ))}
              {FAVICON_SIZES.length > 8 && (
                <div className="text-xs text-gray-400 text-center pt-1">
                  ... and {FAVICON_SIZES.length - 8} more sizes
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}