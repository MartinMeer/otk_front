/**
 * Individual advertisement unit component with professional styling
 */

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ExternalLink, X } from 'lucide-react';
import { AdUnit as AdUnitType } from '../../types/ads';
import { useAdStore } from '../../store/adStore';

interface AdUnitProps {
  ad: AdUnitType;
  className?: string;
  variant?: 'default' | 'compact' | 'banner' | 'inline';
}

export default function AdUnit({ ad, className = '', variant = 'default' }: AdUnitProps) {
  const { recordImpression, recordClick, userPreferences, setUserPreferences } = useAdStore();
  const hasRecordedImpression = useRef(false);

  // Record impression when component mounts and becomes visible
  useEffect(() => {
    if (!hasRecordedImpression.current) {
      recordImpression(ad.id);
      hasRecordedImpression.current = true;
    }
  }, [ad.id, recordImpression]);

  const handleClick = (e: React.MouseEvent) => {
    // Don't record click if clicking the dismiss button
    if ((e.target as HTMLElement).closest('[data-dismiss]')) {
      return;
    }
    
    recordClick(ad.id);
    // Open in new tab for external links
    window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDismiss = () => {
    setUserPreferences({
      blockedCategories: [...userPreferences.blockedCategories, ad.category]
    });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-3 max-w-sm';
      case 'banner':
        return 'p-4 w-full flex-row items-center';
      case 'inline':
        return 'p-4 max-w-md mx-auto my-4';
      default:
        return 'p-4';
    }
  };

  return (
    <Card 
      className={`
        relative cursor-pointer transition-all duration-200
        hover:shadow-md hover:scale-[1.02] bg-gradient-to-br from-blue-50 to-white
        border-blue-200/50 ${className}
      `}
      onClick={handleClick}
    >
      {/* Professional "Sponsored" indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
          Реклама
        </Badge>
        <button
          onClick={handleDismiss}
          data-dismiss
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          title="Скрыть подобные объявления"
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      <CardContent className={`space-y-3 ${getVariantStyles()}`}>
        {variant === 'banner' ? (
          // Banner layout
          <div className="flex items-center space-x-4">
            <img 
              src={ad.imageUrl} 
              alt={ad.title}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-blue-900 text-sm leading-tight">
                {ad.title}
              </h3>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                {ad.description}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-500 flex-shrink-0" />
          </div>
        ) : (
          // Standard layout
          <>
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-blue-900 text-sm leading-tight pr-8">
                  {ad.title}
                </h3>
              </div>
              
              <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                {ad.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                  {getCategoryDisplayName(ad.category)}
                </Badge>
                <ExternalLink className="w-3 h-3 text-blue-500" />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Get user-friendly category names
 */
function getCategoryDisplayName(category: string): string {
  const categoryNames = {
    'measuring-tools': 'Измерительные инструменты',
    'cad-software': 'CAD/CAM ПО',
    'quality-equipment': 'Оборудование ОТК',
    'training-courses': 'Обучение',
    'technical-books': 'Техническая литература',
    'manufacturing-software': 'ПО для производства',
    'precision-instruments': 'Точные приборы',
    'engineering-services': 'Инжиниринговые услуги'
  };
  
  return categoryNames[category as keyof typeof categoryNames] || 'Технические товары';
}
