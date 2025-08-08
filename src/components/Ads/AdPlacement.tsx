/**
 * Strategic ad placement component with intelligent targeting
 */

import { useEffect } from 'react';
import { useAdStore } from '../../store/adStore';
import AdUnit from './AdUnit';
import { AdPlacement as AdPlacementType } from '../../types/ads';

interface AdPlacementProps {
  placement: AdPlacementType;
  className?: string;
  maxAds?: number;
  title?: string;
}

export default function AdPlacement({ 
  placement, 
  className = '', 
  maxAds = 2,
  title
}: AdPlacementProps) {
  const { getTargetedAds, updateContext, config } = useAdStore();

  // Update context when placement is rendered
  useEffect(() => {
    updateContext({ pageType: placement });
  }, [placement, updateContext]);

  // Get targeted ads for this placement
  const ads = getTargetedAds(placement, maxAds);

  // Don't render if ads are disabled or no ads available
  if (!config.enabled || ads.length === 0) {
    return null;
  }

  const getPlacementStyles = () => {
    switch (placement) {
      case 'sidebar-primary':
        return 'space-y-4 max-w-sm';
      case 'footer-banner':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-4';
      case 'calculator-related':
        return 'grid grid-cols-1 md:grid-cols-2 gap-3';
      case 'content-inline':
        return 'max-w-lg mx-auto my-8';
      case 'welcome-section':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
      case 'mobile-sticky':
        return 'md:hidden fixed bottom-4 left-4 right-4 z-40';
      case 'results-context':
        return 'mt-6 space-y-3';
      default:
        return 'space-y-4';
    }
  };

  const getVariant = () => {
    switch (placement) {
      case 'footer-banner':
      case 'mobile-sticky':
        return 'banner';
      case 'sidebar-primary':
        return 'compact';
      case 'content-inline':
        return 'inline';
      default:
        return 'default';
    }
  };

  return (
    <div className={`ad-placement ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </h3>
          <div className="w-12 h-0.5 bg-blue-200 mt-1"></div>
        </div>
      )}
      
      <div className={getPlacementStyles()}>
        {ads.map((ad) => (
          <AdUnit 
            key={ad.id}
            ad={ad}
            variant={getVariant()}
            className={placement === 'mobile-sticky' ? 'shadow-lg' : ''}
          />
        ))}
      </div>
      
      {/* Subtle privacy notice for first-time users */}
      {placement === 'sidebar-primary' && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          Реклама подобрана по содержанию страницы
        </div>
      )}
    </div>
  );
}
