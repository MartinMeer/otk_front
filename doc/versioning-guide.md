# Page Versioning System

This document explains the automatic page versioning system implemented to prevent users from needing to manually clear browser caches when the site updates.

## Overview

The versioning system consists of several components working together:

1. **Build-time versioning** - Adds content hashes to file names
2. **Service Worker** - Manages caching and updates
3. **Version detection** - Checks for new versions automatically
4. **Update notifications** - Notifies users when updates are available

## How It Works

### 1. Build Process

When you run `npm run build` or `npm run deploy`:

- A unique version hash is generated based on timestamp
- CSS and JS files are renamed with the hash (e.g., `main.abc12345.css`)
- A `version.json` file is created with version information
- The `index.html` is updated to reference the versioned files

### 2. Service Worker

The service worker (`public/sw.js`) handles:

- **Caching strategy**: Static files cached immediately, dynamic files cached on first access
- **Update detection**: Always fetches fresh version information
- **Cache invalidation**: Automatically cleans up old caches
- **Offline support**: Serves cached content when offline

### 3. Version Detection

The `useVersion` hook (`src/hooks/use-version.ts`):

- Checks for updates every 5 minutes
- Compares current version with latest version
- Stores version information in localStorage
- Triggers update notifications when new versions are detected

### 4. Update Notifications

The `UpdateNotification` component:

- Shows a notification when updates are available
- Provides a one-click update button
- Automatically reloads the page to apply updates

## Usage

### Development

```bash
npm run dev
```

In development mode, files are not versioned and hot reloading works normally.

### Production Build

```bash
npm run build
```

Creates a production build with versioned files in the `dist/` folder.

### Deployment

```bash
npm run deploy
```

Builds the project and generates deployment files including cache headers.

## File Structure

```
dist/
├── index.html              # Updated with versioned asset references
├── main.abc12345.css      # Versioned CSS file
├── main.abc12345.js       # Versioned JS file
├── version.json           # Version information
├── deployment.json        # Deployment manifest
├── _headers              # Cache control headers
├── sw.js                 # Service worker
└── images/               # Static assets
```

## Cache Control

The system uses different caching strategies:

- **Versioned assets** (CSS, JS): Long-term cache (1 year)
- **Static assets** (images): Long-term cache (1 year)
- **Version files**: No cache (always fresh)
- **Service worker**: No cache (always fresh)

## Browser Support

The versioning system works in all modern browsers that support:

- Service Workers
- Fetch API
- localStorage

For older browsers, the system gracefully degrades to standard caching behavior.

## Configuration

### Update Check Interval

To change how often updates are checked, modify the interval in `src/hooks/use-version.ts`:

```typescript
// Check every 5 minutes (default)
const interval = setInterval(checkForUpdates, 5 * 60 * 1000)
```

### Cache Duration

To modify cache durations, update the `_headers` file generated during deployment.

### Service Worker Scope

The service worker is registered at the root scope (`/`) to control all pages on your domain.

## Troubleshooting

### Users Still See Old Content

1. Check that the service worker is registered (check browser dev tools)
2. Verify that `version.json` is being fetched correctly
3. Ensure cache headers are properly configured on your web server

### Update Notifications Not Showing

1. Check browser console for errors
2. Verify that the `useVersion` hook is working
3. Check that `localStorage` is available and not blocked

### Service Worker Not Updating

1. Clear browser cache and reload
2. Check that the service worker file is being served correctly
3. Verify that the service worker has the correct scope

## Best Practices

1. **Always use `npm run deploy`** for production deployments
2. **Test the versioning system** in a staging environment first
3. **Monitor service worker registration** in production
4. **Keep version files small** to minimize network requests
5. **Use appropriate cache headers** for your hosting environment

## Advanced Configuration

### Custom Version Generation

To use a different versioning strategy, modify the `generateVersionHash` function in `scripts/build.mjs`:

```javascript
function generateVersionHash() {
  // Use git commit hash instead of timestamp
  const gitHash = execSync('git rev-parse --short HEAD').toString().trim()
  return gitHash
}
```

### Custom Update Intervals

To implement different update check intervals for different user activities:

```typescript
// Check on page focus
window.addEventListener('focus', checkForUpdates)

// Check on network reconnection
window.addEventListener('online', checkForUpdates)
```

This versioning system ensures that users always get the latest version of your application without manual intervention, while maintaining good performance through intelligent caching. 