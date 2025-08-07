/**
 * Modern cross-device favicon system component
 * Provides comprehensive favicon support for all devices and platforms
 */

import { useEffect } from 'react';

export default function FaviconTags() {
  useEffect(() => {
    // Remove existing favicon links to avoid conflicts
    const existingLinks = document.querySelectorAll('link[rel*="icon"], link[rel*="apple-touch-icon"], link[rel="manifest"]');
    existingLinks.forEach(link => link.remove());

    // Create and append all favicon links
    const faviconLinks = [
      // SVG favicon for modern browsers (vector, scalable)
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      
      // ICO fallback for older browsers
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      
      // Standard PNG favicons for various sizes
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      
      // Apple Touch Icons for iOS devices
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
      
      // Web App Manifest for PWA
      { rel: 'manifest', href: '/site.webmanifest' },
    ];

    faviconLinks.forEach(linkData => {
      const link = document.createElement('link');
      Object.entries(linkData).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      document.head.appendChild(link);
    });

    // Add meta tags for enhanced PWA and platform support
    const metaTags = [
      // iOS Safari specific
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'ОТК Ассистент' },
      
      // Android Chrome specific
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#1e40af' },
      { name: 'msapplication-TileColor', content: '#1e40af' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      
      // SEO and social sharing
      { name: 'application-name', content: 'Ассистент контролера ОТК' },
      { name: 'msapplication-tooltip', content: 'Профессиональные расчеты допусков и посадок' },
      { name: 'msapplication-starturl', content: '/' },
      
      // Security and performance
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    ];

    // Remove existing meta tags to avoid duplicates
    metaTags.forEach(({ name }) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) existing.remove();
    });

    // Add new meta tags
    metaTags.forEach(tagData => {
      const meta = document.createElement('meta');
      Object.entries(tagData).forEach(([key, value]) => {
        meta.setAttribute(key, value);
      });
      document.head.appendChild(meta);
    });

    // Cleanup function
    return () => {
      // Clean up on component unmount if needed
    };
  }, []);

  return null; // This component doesn't render anything visible
}

/**
 * Hook to dynamically update favicon based on app state
 * Useful for notifications, status changes, etc.
 */
export const useDynamicFavicon = () => {
  const updateFavicon = (type: 'default' | 'notification' | 'error' | 'success') => {
    const link = document.querySelector('link[rel*="icon"]:not([rel*="apple"])') as HTMLLinkElement;
    if (!link) return;

    switch (type) {
      case 'notification':
        // Could switch to a notification badge version
        break;
      case 'error':
        // Could switch to an error state version
        break;
      case 'success':
        // Could switch to a success state version
        break;
      default:
        link.href = '/favicon.svg';
    }
  };

  return { updateFavicon };
};