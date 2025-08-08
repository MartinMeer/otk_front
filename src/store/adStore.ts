/**
 * Advertisement store for managing ad state and targeting
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdUnit, AdConfig, AdTargeting } from '../types/ads';

interface AdState {
  config: AdConfig;
  adUnits: AdUnit[];
  userPreferences: {
    allowAds: boolean;
    preferredCategories: string[];
    blockedCategories: string[];
  };
  currentContext: {
    calculatorType?: string;
    userRole?: string;
    pageType: string;
  };
  
  // Actions
  updateConfig: (config: Partial<AdConfig>) => void;
  setUserPreferences: (prefs: Partial<AdState['userPreferences']>) => void;
  updateContext: (context: Partial<AdState['currentContext']>) => void;
  getTargetedAds: (placement: string, limit?: number) => AdUnit[];
  recordImpression: (adId: string) => void;
  recordClick: (adId: string) => void;
}

// Sample professional ad units for engineering/QTC context
const defaultAdUnits: AdUnit[] = [
  {
    id: 'mitutoyo-calipers',
    title: 'Mitutoyo Digital Calipers',
    description: 'Precision measuring instruments for quality control professionals',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/6894f843f1d36a2a58086997/resource/806850a2-bc4e-41a0-8870-ab1cdd5232c1.jpg',
    targetUrl: '#ad-mitutoyo',
    category: 'measuring-tools',
    placement: 'calculator-related',
    priority: 9,
    active: true,
    targeting: {
      calculatorTypes: ['ost-22', 'tolerances'],
      keywords: ['measurement', 'precision', 'quality control'],
      industry: ['manufacturing', 'automotive', 'aerospace']
    },
    metrics: { impressions: 0, clicks: 0, ctr: 0, lastShown: new Date() }
  },
  {
    id: 'solidworks-cam',
    title: 'SolidWorks CAM Solutions',
    description: 'Integrated CAM software for precision manufacturing',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/6894f843f1d36a2a58086997/resource/da272425-98f4-412f-affd-a4098a8c6f6e.jpg',
    targetUrl: '#ad-solidworks',
    category: 'cad-software',
    placement: 'sidebar-primary',
    priority: 8,
    active: true,
    targeting: {
      calculatorTypes: ['tolerances', 'chamfer'],
      userRoles: ['controller', 'admin'],
      keywords: ['manufacturing', 'design', 'tolerances']
    },
    metrics: { impressions: 0, clicks: 0, ctr: 0, lastShown: new Date() }
  },
  {
    id: 'metrology-course',
    title: 'Advanced Metrology Training',
    description: 'Professional certification courses for quality engineers',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/6894f843f1d36a2a58086997/resource/e555085e-02cf-4aef-a4c5-9111c2733976.jpg',
    targetUrl: '#ad-training',
    category: 'training-courses',
    placement: 'content-inline',
    priority: 7,
    active: true,
    targeting: {
      keywords: ['education', 'certification', 'metrology'],
      industry: ['manufacturing', 'quality-control']
    },
    metrics: { impressions: 0, clicks: 0, ctr: 0, lastShown: new Date() }
  },
  {
    id: 'gd-t-handbook',
    title: 'GD&T Professional Handbook',
    description: 'Complete guide to Geometric Dimensioning & Tolerancing',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/6894f843f1d36a2a58086997/resource/05bffbcd-98f9-4b28-bf35-fbc92ce08353.jpg',
    targetUrl: '#ad-handbook',
    category: 'technical-books',
    placement: 'results-context',
    priority: 6,
    active: true,
    targeting: {
      calculatorTypes: ['tolerances', 'thread'],
      keywords: ['GD&T', 'tolerancing', 'standards']
    },
    metrics: { impressions: 0, clicks: 0, ctr: 0, lastShown: new Date() }
  },
  {
    id: 'zeiss-cmm',
    title: 'ZEISS Coordinate Measuring',
    description: 'High-precision CMM systems for quality inspection',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/6894f843f1d36a2a58086997/resource/35f21c8f-937a-43bb-8b29-54353665f810.jpg',
    targetUrl: '#ad-zeiss',
    category: 'quality-equipment',
    placement: 'footer-banner',
    priority: 8,
    active: true,
    targeting: {
      calculatorTypes: ['ost-22', 'tolerances'],
      keywords: ['inspection', 'measurement', 'precision'],
      industry: ['automotive', 'aerospace', 'medical']
    },
    metrics: { impressions: 0, clicks: 0, ctr: 0, lastShown: new Date() }
  }
];

export const useAdStore = create<AdState>()(
  persist(
    (set, get) => ({
      config: {
        enabled: true,
        maxAdsPerPage: 3,
        minTimeBetweenSameAd: 30,
        respectUserPreferences: true,
        fallbackToGeneric: true
      },
      
      adUnits: defaultAdUnits,
      
      userPreferences: {
        allowAds: true,
        preferredCategories: [],
        blockedCategories: []
      },
      
      currentContext: {
        pageType: 'home'
      },

      updateConfig: (newConfig) => set((state) => ({
        config: { ...state.config, ...newConfig }
      })),

      setUserPreferences: (prefs) => set((state) => ({
        userPreferences: { ...state.userPreferences, ...prefs }
      })),

      updateContext: (context) => set((state) => ({
        currentContext: { ...state.currentContext, ...context }
      })),

      getTargetedAds: (placement, limit = 2) => {
        const state = get();
        if (!state.config.enabled || !state.userPreferences.allowAds) {
          return [];
        }

        const { currentContext, userPreferences, adUnits } = state;
        const now = new Date();
        
        // Filter and score ads
        const candidateAds = adUnits
          .filter(ad => {
            // Basic filters
            if (!ad.active || ad.placement !== placement) return false;
            
            // User preference filters
            if (userPreferences.blockedCategories.includes(ad.category)) return false;
            
            // Time-based filtering
            const timeSinceLastShown = (now.getTime() - ad.metrics.lastShown.getTime()) / (1000 * 60);
            if (timeSinceLastShown < state.config.minTimeBetweenSameAd) return false;
            
            return true;
          })
          .map(ad => ({
            ...ad,
            relevanceScore: calculateRelevanceScore(ad, currentContext, userPreferences)
          }))
          .sort((a, b) => {
            // Sort by relevance score, then priority, then CTR
            if (a.relevanceScore !== b.relevanceScore) {
              return b.relevanceScore - a.relevanceScore;
            }
            if (a.priority !== b.priority) {
              return b.priority - a.priority;
            }
            return b.metrics.ctr - a.metrics.ctr;
          });

        return candidateAds.slice(0, Math.min(limit, state.config.maxAdsPerPage));
      },

      recordImpression: (adId) => set((state) => ({
        adUnits: state.adUnits.map(ad => 
          ad.id === adId 
            ? {
                ...ad, 
                metrics: {
                  ...ad.metrics,
                  impressions: ad.metrics.impressions + 1,
                  lastShown: new Date(),
                  ctr: ad.metrics.clicks / (ad.metrics.impressions + 1)
                }
              }
            : ad
        )
      })),

      recordClick: (adId) => set((state) => ({
        adUnits: state.adUnits.map(ad => 
          ad.id === adId 
            ? {
                ...ad, 
                metrics: {
                  ...ad.metrics,
                  clicks: ad.metrics.clicks + 1,
                  ctr: (ad.metrics.clicks + 1) / ad.metrics.impressions
                }
              }
            : ad
        )
      }))
    }),
    {
      name: 'qtc-ads-storage',
      partialize: (state) => ({
        userPreferences: state.userPreferences,
        config: state.config
      })
    }
  )
);

/**
 * Calculate ad relevance score based on targeting and context
 */
function calculateRelevanceScore(
  ad: AdUnit, 
  context: AdState['currentContext'],
  preferences: AdState['userPreferences']
): number {
  let score = ad.priority;

  // Context matching
  if (context.calculatorType && ad.targeting.calculatorTypes?.includes(context.calculatorType)) {
    score += 20;
  }
  
  if (context.userRole && ad.targeting.userRoles?.includes(context.userRole)) {
    score += 10;
  }

  // User preferences
  if (preferences.preferredCategories.includes(ad.category)) {
    score += 15;
  }

  // Performance boost for well-performing ads
  if (ad.metrics.ctr > 0.05) { // 5% CTR
    score += 10;
  }

  return score;
}
