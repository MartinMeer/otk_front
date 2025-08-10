Great—React (SPA) is easy to automate. You don’t need to touch the sitemap by hand after this setup.

What you’ll do
- Keep a small “routes manifest” that marks which pages are indexable.
- Auto-generate sitemap.xml during build (or serve it dynamically).
- Add noindex to any “under construction” pages so they don’t get indexed even if someone finds them.

Option A: Build-time sitemap (works for CRA, Vite, etc.)
1) Create a routes manifest your build can read
- Put this at scripts/routes.manifest.json:
[
  { "path": "/", "indexable": true,  "lastmod": "2025-08-10" },
  { "path": "/about", "indexable": true },
  { "path": "/contact", "indexable": false } // under construction
]

2) Add a generator script (Node, no transpile)
- Install: npm i -D sitemap
- scripts/generate-sitemap.mjs:
import { createWriteStream } from 'node:fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import routes from './routes.manifest.json' assert { type: 'json' };

const hostname = process.env.SITE_HOSTNAME || 'https://example.com'; // set in CI

async function run() {
  const sm = new SitemapStream({ hostname });
  // For CRA/Vite, writing to public/ means it gets copied into the build
  const ws = createWriteStream('public/sitemap.xml');
  sm.pipe(ws);

  routes
    .filter(r => r.indexable !== false)
    .forEach(r => {
      sm.write({
        url: r.canonical || r.path,
        lastmod: r.lastmod || new Date().toISOString().slice(0, 10),
      });
    });

  sm.end();
  await streamToPromise(sm);
  console.log('sitemap.xml generated');
}
run().catch(err => { console.error(err); process.exit(1); });

3) Hook it into your build
- package.json (CRA):
  - "build:sitemap": "node scripts/generate-sitemap.mjs"
  - "build": "npm run build:sitemap && react-scripts build"
- package.json (Vite):
  - "build": "node scripts/generate-sitemap.mjs && vite build"
- Ensure public/ is included in your build output (CRA and Vite do this by default).

Tip: If you prefer writing directly into the final folder, change the output path to build/sitemap.xml (CRA) or dist/sitemap.xml (Vite) and run it as a postbuild step.

Option B: Dynamic sitemap (if you have a Node/Express server or serverless)
- Use the same routes.manifest.json and stream XML on demand.

Example (Express):
import express from 'express';
import { SitemapStream } from 'sitemap';
import routes from './scripts/routes.manifest.json' assert { type: 'json' };

const app = express();
app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  const sm = new SitemapStream({ hostname: 'https://example.com' });
  routes.filter(r => r.indexable !== false).forEach(r => {
    sm.write({ url: r.canonical || r.path, lastmod: r.lastmod });
  });
  sm.end();
  sm.pipe(res);
});

Under-construction pages: add noindex
- Keep them out of the sitemap and add a meta robots tag so they aren’t indexed if they leak.
- With react-helmet-async:
  - npm i react-helmet-async
  - Wrap your app once:
    import { HelmetProvider } from 'react-helmet-async';
    <HelmetProvider><App /></HelmetProvider>
  - On the page:
    import { Helmet } from 'react-helmet-async';
    function ContactPage() {
      return (
        <>
          <Helmet>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          {/* page content */}
        </>
      );
    }

Robots.txt
- Place in public/robots.txt:
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml

Notes and best practices
- Only include URLs that return 200 and are indexable. For SPAs, make sure your host rewrites route requests to index.html so each route returns 200.
- Keep trailing slashes/canonicals consistent between your app and sitemap.
- lastmod helps; changefreq/priority are optional and mostly ignored.
- Submit the sitemap once in Google Search Console and Bing Webmaster Tools; they’ll re-fetch it automatically after each deploy.
- If you later add content-driven pages (e.g., blog posts), have the generator read from your content folder or CMS and add entries where published === true.