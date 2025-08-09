# Cache-Control and Versioning

This document explains the production cache-control and versioning strategy used to prevent users from needing to manually clear browser caches after updates.

## Goals
- Ensure users always get the latest code when a new version is released
- Keep assets aggressively cached for performance
- Avoid breaking development workflow

## Components

- Build script: `scripts/build.mjs`
- Service worker: `public/sw.js`
- Version check hook: `src/hooks/use-version.ts`
- Update UI: `src/components/UpdateNotification.tsx`
- Deployment helper: `scripts/deploy.mjs`

## How it works (Production)

1. Build produces static assets in `dist/`:
   - `main.css`, `main.js`
   - `index.html`
   - `version.json` with `{ version, timestamp }`

2. Cache-busting via query params:
   - During prod build, the script appends a version query to asset URLs in `index.html`:
     - `main.css?v=<version>`
     - `main.js?v=<version>`
   - The version is an 8-char md5 of the build timestamp by default.

3. Service worker caching and update:
   - Caches core static files for offline usage
   - Always fetches `version.json` with no-cache headers
   - Cleans up old caches on activate
   - Prefers network for `.js`/`.css` to pick up updates, falls back to cache offline

4. Client update detection:
   - `useVersion` fetches `/version.json` (no-cache) on app load and every 5 minutes
   - If a new version is detected, `UpdateNotification` offers an Update button
   - Clicking Update reloads the page to load the fresh assets

5. Server cache headers:
   - `npm run deploy` generates `dist/_headers` for common hosts/CDNs:
     - `main.css` and `main.js`: cache for 1 year (immutable), cache-busted via `?v=`
     - `images/*`: cache for 1 year (immutable)
     - `version.json`, `deployment.json`, `sw.js`: no-cache

## Development vs Production

- Development (`npm run dev`):
  - No versioning of URLs
  - Hot-reload remains active (EventSource)
- Production (`npm run build` or `npm run deploy`):
  - Adds `?v=<version>` to CSS/JS in `dist/index.html`
  - Removes dev-only hot-reload snippet from `index.html`
  - Generates `version.json`

## Commands

- Development:
  ```bash
  npm run dev
  ```
- Production build:
  ```bash
  npm run build
  ```
- Build + generate headers for hosting/CDN:
  ```bash
  npm run deploy
  ```

## Verifying in Production

- Open DevTools → Application → Service Workers: ensure `sw.js` is active
- Network tab:
  - `version.json` has `Cache-Control: no-cache`
  - `main.css` and `main.js` requests include `?v=<version>` in URL
  - Static assets (images) return long-lived cache headers
- `dist/index.html` contains versioned URLs for CSS/JS
- `dist/version.json` exists and has the latest timestamp

## Hosting notes

- If your host ignores `dist/_headers`, configure your server manually:
  - NGINX example:
    ```nginx
    location = /version.json { add_header Cache-Control "no-cache, no-store, must-revalidate" always; }
    location = /deployment.json { add_header Cache-Control "no-cache, no-store, must-revalidate" always; }
    location = /sw.js { add_header Cache-Control "no-cache, no-store, must-revalidate" always; }
    location ~* ^/(main\.css|main\.js)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location /images/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    ```

## Customization

- Change version generator (e.g., git hash): edit `generateVersionHash()` in `scripts/build.mjs`.
- Update check frequency: change the interval in `src/hooks/use-version.ts`.
- Add more static files to SW pre-cache: edit `STATIC_FILES` in `public/sw.js`.

## FAQ

- Why not hashed filenames? Using `?v=` keeps the dev/prod output consistent and is simpler for static hosts. Browsers and CDNs treat query params as unique URLs, so long-lived caching is safe.
- What if CDN ignores query params? Use server rules to include the query string in cache key or switch to filename hashing. 