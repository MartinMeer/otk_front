# Ad Integration Quick Reference

## 🚀 Quick Start

### Basic Ad Placement
```tsx
import AdPlacement from '../Ads/AdPlacement';

<AdPlacement 
  placement="sidebar-primary" 
  title="Рекомендуемые инструменты"
  maxAds={2}
/>
```

### Mobile Floating Ad
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
      <AdPlacement placement="mobile-sticky" maxAds={1} />
    </div>
  </div>
)}
```

## 📍 Mount Points

| Location | Code | Use Case |
|----------|------|----------|
| **Desktop Sidebar** | `placement="sidebar-primary"` | Calculator pages |
| **Mobile Floating** | `placement="mobile-sticky"` | Mobile-first content |
| **Content Inline** | `placement="content-inline"` | Article pages |
| **Footer Banner** | `placement="footer-banner"` | General pages |
| **Results Context** | `placement="results-context"` | After calculations |

## 🎯 Targeting

### Update Context
```tsx
import { useAdStore } from '../../store/adStore';

const { updateContext } = useAdStore();

useEffect(() => {
  updateContext({ 
    pageType: 'ost-22-calculator',
    calculatorType: 'ost-22'
  });
}, [updateContext]);
```

### Available Context Properties
- `pageType`: Page identifier
- `calculatorType`: Calculator type
- `userRole`: User role
- `keywords`: Page keywords

## 📱 Responsive Layouts

### Desktop (4-column grid)
```tsx
<div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
  {/* Main Content - 3 columns */}
  <div className="lg:col-span-3">
    {/* Your content */}
  </div>
  
  {/* Desktop Sidebar - 1 column */}
  <div className="lg:col-span-1">
    <div className="sticky top-6">
      <AdPlacement placement="sidebar-primary" maxAds={2} />
    </div>
  </div>
</div>
```

### Mobile (Stacked layout)
```tsx
<div className="lg:hidden space-y-6">
  {/* Your content */}
  
  {/* Mobile floating ad */}
  {showMobileAd && (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <AdPlacement placement="mobile-sticky" maxAds={1} />
    </div>
  )}
</div>
```

## ⚙️ Configuration

### Ad Store Settings
```tsx
const config = {
  enabled: true,                    // Enable/disable ads
  maxAdsPerPage: 3,                // Max ads per page
  minTimeBetweenSameAd: 30,        // Minutes between same ad
  respectUserPreferences: true,     // Respect user blocking
  fallbackToGeneric: true          // Show generic ads if no targeted
};
```

### User Preferences
```tsx
const userPreferences = {
  allowAds: true,                  // User allows ads
  preferredCategories: [],          // Preferred categories
  blockedCategories: []            // Blocked categories
};
```

## 🎨 Customization

### Custom Styling
```tsx
<AdPlacement 
  placement="sidebar-primary" 
  className="custom-ad-styles"
  maxAds={2}
/>
```

### Custom Ad Variants
```tsx
// In AdUnit.tsx
const getVariantStyles = () => {
  switch (variant) {
    case 'custom':
      return 'p-6 bg-gradient-to-r from-blue-50 to-indigo-50';
    // ... other variants
  }
};
```

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Ads not showing | Check `adStore.config.enabled` |
| Poor performance | Review targeting rules |
| Mobile ad issues | Verify `lg:hidden` class |
| Styling problems | Check CSS conflicts |

### Debug Mode
```tsx
// In adStore.ts
const config = {
  enabled: true,
  debug: true,  // Enable debug mode
  // ... other config
};
```

## 📊 Performance Monitoring

### Track Ad Performance
```tsx
const { recordImpression, recordClick } = useAdStore();

// Monitor performance
useEffect(() => {
  console.log('Ad metrics:', adStore.adUnits.map(ad => ({
    id: ad.id,
    impressions: ad.metrics.impressions,
    clicks: ad.metrics.clicks,
    ctr: ad.metrics.ctr
  })));
}, []);
```

## 🏗️ Complete Example

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
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          {/* Calculator content */}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <AdPlacement 
              placement="sidebar-primary" 
              title="Рекомендуемые инструменты"
              maxAds={2}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {/* Calculator content */}
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

## 📚 Additional Resources

- **Full Documentation**: `doc/advertisement-integration-guide.md`
- **Ad Store**: `src/store/adStore.ts`
- **Ad Components**: `src/components/Ads/`
- **Type Definitions**: `src/types/ads.ts`

---

**💡 Pro Tip**: Always test ads on both desktop and mobile devices to ensure proper responsive behavior and user experience. 