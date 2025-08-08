/**
 * Advertisement system type definitions
 */

export interface AdUnit {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  category: AdCategory;
  placement: AdPlacement;
  priority: number;
  active: boolean;
  targeting: AdTargeting;
  metrics: AdMetrics;
}

export interface AdTargeting {
  calculatorTypes?: string[];
  userRoles?: string[];
  keywords?: string[];
  industry?: string[];
  geoTargeting?: string[];
}

export interface AdMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  lastShown: Date;
}

export type AdCategory = 
  | 'measuring-tools'
  | 'cad-software'
  | 'quality-equipment'
  | 'training-courses'
  | 'technical-books'
  | 'manufacturing-software'
  | 'precision-instruments'
  | 'engineering-services';

export type AdPlacement = 
  | 'sidebar-primary'
  | 'content-inline'
  | 'footer-banner'
  | 'calculator-related'
  | 'welcome-section'
  | 'mobile-sticky'
  | 'results-context';

export interface AdConfig {
  enabled: boolean;
  maxAdsPerPage: number;
  minTimeBetweenSameAd: number; // minutes
  respectUserPreferences: boolean;
  fallbackToGeneric: boolean;
}
