// scripts/api-proxy.mjs
import http from 'node:http';
import { request as httpsRequest } from 'node:https';

const TARGET = 'https://api.otk-help.martinmeer.com';
const PORT = 9000;

function proxy(req, res) {
  const options = new URL(req.url, TARGET);
  const out = httpsRequest({
    method: req.method,
    hostname: options.hostname,
    path: options.pathname + options.search,
    headers: {
      ...req.headers,
      host: new URL(TARGET).hostname,
      origin: TARGET,
      referer: TARGET + '/',
    },
  }, r => {
    // CORS headers for browser
    res.writeHead(r.statusCode || 500, {
      ...r.headers,
      'access-control-allow-origin': 'http://localhost:8001',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'content-type',
      'access-control-allow-methods': 'POST,OPTIONS',
    });
    r.pipe(res);
  });

  req.pipe(out);
  out.on('error', err => {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end('Proxy error: ' + err.message);
  });
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-origin': 'http://localhost:8001',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'content-type',
      'access-control-allow-methods': 'POST,OPTIONS',
    });
    res.end();
    return;
  }
  proxy(req, res);
}).listen(PORT, () => {
  console.log(`API proxy running on http://localhost:${PORT} -> ${TARGET}`);
});
