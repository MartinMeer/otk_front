# Advertisement Integration Guide

## Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Ad System Architecture](#ad-system-architecture)
4. [Mount Points](#mount-points)
5. [Ad Placements](#ad-placements)
6. [Ad Targeting](#ad-targeting)
7. [Customization](#customization)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Overview

The advertisement system is built with a modular architecture that allows easy integration of ads throughout the application. It provides intelligent targeting, user preference management, and responsive design support.

### Key Features
- **Responsive Design**: Different ad layouts for desktop and mobile
- **Intelligent Targeting**: Context-aware ad selection based on page content
- **User Preferences**: Respects user ad preferences and blocking
- **Analytics**: Tracks impressions, clicks, and performance metrics
- **Professional Styling**: Consistent design with the application theme

## Quick Start

### Basic Ad Integration

To add ads to any component, simply import and use the `AdPlacement` component:

```tsx
import AdPlacement from '../Ads/AdPlacement';

// In your component
<AdPlacement 
  placement="sidebar-primary" 
  title="Рекомендуемые инструменты"
  maxAds={2}
/>
```

### Mobile Floating Ad

For mobile-specific floating ads with close functionality:

```tsx
import { useState } from 'react';
import { X } from 'lucide-react';

const [showMobileAd, setShowMobileAd] = useState(true);

{showMobileAd && (
  <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
    <div className="relative">
      <button
        onClick={() => setShowMobileAd(false)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
        title="Закрыть рекламу"
      >
        <X className="w-4 h-4" />
      </button>
      <AdPlacement 
        placement="mobile-sticky" 
        maxAds={1}
      />
    </div>
  </div>
)}
```

## Ad System Architecture

### Core Components

```
src/components/Ads/
├── AdPlacement.tsx    # Main ad placement component
├── AdUnit.tsx         # Individual ad unit renderer
└── AdSettings.tsx     # Ad configuration interface

src/store/
└── adStore.ts         # Ad state management and targeting logic

src/types/
└── ads.ts            # TypeScript interfaces for ads
```

### Data Flow

1. **Component** → `AdPlacement` → `adStore.getTargetedAds()`
2. **adStore** → Filters ads based on targeting rules
3. **AdPlacement** → Renders selected ads using `AdUnit`
4. **User Interaction** → Analytics tracked in `adStore`

## Mount Points

### 1. Desktop Sidebar
```tsx
{/* Desktop Sidebar - 1 column */}
<div className="lg:col-span-1 space-y-6">
  <div className="sticky top-6">
    <AdPlacement 
      placement="sidebar-primary" 
      title="Рекомендуемые инструменты"
      maxAds={2}
    />
  </div>
</div>
```

### 2. Mobile Floating Ad
```tsx
{/* Mobile Floating Ad */}
{showMobileAd && (
  <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
    <div className="relative">
      <button onClick={() => setShowMobileAd(false)}>
        <X className="w-4 h-4" />
      </button>
      <AdPlacement 
        placement="mobile-sticky" 
        maxAds={1}
      />
    </div>
  </div>
)}
```

### 3. Content Inline
```tsx
{/* Inline content ad */}
<AdPlacement 
  placement="content-inline" 
  maxAds={1}
/>
```

### 4. Footer Banner
```tsx
{/* Footer banner ad */}
<AdPlacement 
  placement="footer-banner" 
  maxAds={2}
/>
```

## Ad Placements

### Available Placement Types

| Placement | Description | Best Use Case |
|-----------|-------------|---------------|
| `sidebar-primary` | Desktop sidebar ads | Calculator pages, technical content |
| `mobile-sticky` | Mobile floating ads | Mobile-first content |
| `content-inline` | Inline content ads | Article pages, documentation |
| `footer-banner` | Footer banner ads | General pages |
| `calculator-related` | Calculator-specific ads | Technical calculators |
| `results-context` | Results page ads | After calculations |
| `welcome-section` | Welcome page ads | Homepage, landing pages |

### Placement Styling

Each placement has predefined styling:

```tsx
const getPlacementStyles = () => {
  switch (placement) {
    case 'sidebar-primary':
      return 'space-y-4 max-w-sm';
    case 'footer-banner':
      return 'grid grid-cols-1 lg:grid-cols-2 gap-4';
    case 'mobile-sticky':
      return 'md:hidden fixed bottom-4 left-4 right-4 z-40';
    case 'content-inline':
      return 'max-w-lg mx-auto my-8';
    default:
      return 'space-y-4';
  }
};
```

## Ad Targeting

### Targeting Rules

Ads are targeted based on multiple criteria:

```tsx
// In adStore.ts
const targeting = {
  calculatorTypes: ['ost-22', 'esdp'],
  keywords: ['measurement', 'precision', 'quality control'],
  industry: ['manufacturing', 'automotive', 'aerospace'],
  userRoles: ['controller', 'admin']
};
```

### Context Updates

Update the ad context when the page loads:

```tsx
import { useAdStore } from '../../store/adStore';

const { updateContext } = useAdStore();

// Update context when component mounts
useEffect(() => {
  updateContext({ 
    pageType: 'ost-22-calculator',
    calculatorType: 'ost-22'
  });
}, [updateContext]);
```

### Relevance Scoring

Ads are scored based on:
- **Priority** (1-10): Base importance
- **Context Match** (+20): Matches current page/calculator
- **User Preferences** (+15): User's preferred categories
- **Performance** (+10): High CTR ads get boost

## Customization

### Custom Ad Variants

Create custom ad variants in `AdUnit.tsx`:

```tsx
interface AdUnitProps {
  variant?: 'default' | 'compact' | 'banner' | 'inline' | 'custom';
}

const getVariantStyles = () => {
  switch (variant) {
    case 'custom':
      return 'p-6 bg-gradient-to-r from-blue-50 to-indigo-50';
    // ... other variants
  }
};
```

### Custom Ad Categories

Add new ad categories in `adStore.ts`:

```tsx
const defaultAdUnits: AdUnit[] = [
  {
    id: 'custom-ad',
    title: 'Custom Ad Title',
    description: 'Custom ad description',
    imageUrl: '/path/to/image.jpg',
    targetUrl: '#custom-ad',
    category: 'custom-category',
    placement: 'sidebar-primary',
    priority: 8,
    active: true,
    targeting: {
      calculatorTypes: ['custom-calculator'],
      keywords: ['custom', 'keywords']
    },
    metrics: { impressions: 0, clicks: 0, ctr: 0, lastShown: new Date() }
  }
];
```

### Custom Styling

Override default styles:

```tsx
<AdPlacement 
  placement="sidebar-primary" 
  className="custom-ad-styles"
  maxAds={2}
/>
```

## Best Practices

### 1. Responsive Design
- Always test on both desktop and mobile
- Use appropriate placement types for each device
- Ensure ads don't interfere with content

### 2. User Experience
- Provide close buttons for intrusive ads
- Respect user preferences
- Don't overload pages with too many ads

### 3. Performance
- Limit ads per page (recommended: 2-3)
- Use lazy loading for ad images
- Monitor ad performance metrics

### 4. Content Relevance
- Target ads to page content
- Use appropriate keywords
- Match user intent

### 5. Accessibility
- Provide alt text for ad images
- Ensure keyboard navigation
- Use proper ARIA labels

## Implementation Examples

### Calculator Page Integration

```tsx
export default function CalculatorPage() {
  const { updateContext } = useAdStore();
  const [showMobileAd, setShowMobileAd] = useState(true);

  useEffect(() => {
    updateContext({ 
      pageType: 'calculator',
      calculatorType: 'ost-22'
    });
  }, [updateContext]);

  return (
    <div className="space-y-6">
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Content - 3 columns */}
        <div className="lg:col-span-3">
          {/* Your calculator content */}
        </div>
        
        {/* Desktop Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <AdPlacement 
              placement="sidebar-primary" 
              title="Рекомендуемые инструменты"
              maxAds={2}
            />
          </div>
        </div>
      </div>

      {/* Mobile Floating Ad */}
      {showMobileAd && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="relative">
            <button
              onClick={() => setShowMobileAd(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
              title="Закрыть рекламу"
            >
              <X className="w-4 h-4" />
            </button>
            <AdPlacement 
              placement="mobile-sticky" 
              maxAds={1}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

### Article Page Integration

```tsx
export default function ArticlePage() {
  const { updateContext } = useAdStore();

  useEffect(() => {
    updateContext({ 
      pageType: 'article',
      keywords: ['technical', 'engineering']
    });
  }, [updateContext]);

  return (
    <article className="max-w-4xl mx-auto">
      <h1>Article Title</h1>
      
      <p>Article content...</p>
      
      {/* Inline ad */}
      <AdPlacement 
        placement="content-inline" 
        maxAds={1}
      />
      
      <p>More article content...</p>
      
      {/* Footer banner */}
      <AdPlacement 
        placement="footer-banner" 
        maxAds={2}
      />
    </article>
  );
}
```

## Troubleshooting

### Common Issues

#### 1. Ads Not Showing
- Check if ads are enabled in `adStore.config.enabled`
- Verify user preferences allow ads
- Ensure ad units are active and have valid targeting

#### 2. Poor Ad Performance
- Review targeting rules
- Check ad relevance to page content
- Monitor CTR and adjust accordingly

#### 3. Mobile Ad Issues
- Verify `lg:hidden` class is applied
- Check z-index values
- Ensure proper positioning

#### 4. Styling Problems
- Check CSS class conflicts
- Verify responsive breakpoints
- Test on different screen sizes

### Debug Mode

Enable debug mode to see ad targeting information:

```tsx
// In adStore.ts
const config = {
  enabled: true,
  debug: true, // Add this line
  maxAdsPerPage: 3,
  // ... other config
};
```

### Performance Monitoring

Track ad performance:

```tsx
const { recordImpression, recordClick } = useAdStore();

// Monitor ad performance
useEffect(() => {
  console.log('Ad impressions:', adStore.adUnits.map(ad => ({
    id: ad.id,
    impressions: ad.metrics.impressions,
    clicks: ad.metrics.clicks,
    ctr: ad.metrics.ctr
  })));
}, []);
```

## Configuration Reference

### Ad Store Configuration

```tsx
const config = {
  enabled: true,                    // Enable/disable ads
  maxAdsPerPage: 3,                // Maximum ads per page
  minTimeBetweenSameAd: 30,        // Minutes between same ad
  respectUserPreferences: true,     // Respect user blocking
  fallbackToGeneric: true,         // Show generic ads if no targeted
  debug: false                     // Debug mode
};
```

### User Preferences

```tsx
const userPreferences = {
  allowAds: true,                  // User allows ads
  preferredCategories: [],          // Preferred ad categories
  blockedCategories: []            // Blocked ad categories
};
```

### Ad Unit Structure

```tsx
interface AdUnit {
  id: string;                      // Unique ad ID
  title: string;                   // Ad title
  description: string;             // Ad description
  imageUrl: string;               // Ad image URL
  targetUrl: string;              // Click destination
  category: string;               // Ad category
  placement: string;              // Preferred placement
  priority: number;               // Priority (1-10)
  active: boolean;                // Ad active status
  targeting: AdTargeting;         // Targeting rules
  metrics: AdMetrics;             // Performance metrics
}
```

This comprehensive guide provides everything needed to successfully integrate advertisements into the application while maintaining a professional user experience. 