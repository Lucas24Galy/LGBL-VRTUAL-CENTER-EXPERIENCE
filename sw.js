/* sw.js — LGBL Virtual Experience (offline + PWA)
   Scope prévu pour GitHub Pages: /LGBL-VRTUAL-CENTER-EXPERIENCE/
*/
const VERSION = 'v1-' + (self.crypto?.randomUUID?.() || Date.now());
const CACHE_STATIC = `lgbl-static-${VERSION}`;
const CACHE_RUNTIME = `lgbl-runtime-${VERSION}`;

// ⚠️ Modifie ce chemin si tu changes de dépôt/sous-dossier
const BASE = self.registration.scope.replace(/\/+$/, ''); // .../LGBL-VRTUAL-CENTER-EXPERIENCE

// Fichiers “app shell” mis en cache à l’installation
const ASSETS = [
  '/',                 // redirigé par GitHub vers index.html
  '/index.html',
  '/tarifs.html',
  '/evenements.html',
  '/communaute.html',
  '/contact.html',
  '/assets/css/styles.css',
  '/assets/img/logo-lgbl.png',
  '/site.webmanifest',
].map(p => BASE + (p.startsWith('/') ? p : '/' + p));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => ![CACHE_STATIC, CACHE_RUNTIME].includes(k))
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Réponse de secours offline pour les pages
const offlineHTML = `
<!doctype html><meta charset="utf-8">
<title>Hors ligne — LGBL</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<body style="margin:0;font-family:system-ui;background:#0a0b0d;color:#e9ecef;display:grid;place-items:center;height:100vh">
  <main style="text-align:center;padding:24px">
    <h1 style="margin:0 0 8px">Vous êtes hors ligne</h1>
    <p style="color:#a9b3bb">Le contenu peut ne pas être à jour. Réessayez quand vous serez connecté.</p>
    <p style="margin-top:12px"><a href="${BASE}/" style="color:#00aaff;text-decoration:none">Retour à l’accueil</a></p>
  </main>
</body>`.trim();

self.addEventListener('fetch', event => {
  const req = event.request;

  // 1) Pages HTML : network-first, fallback cache, sinon mini page offline
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        // met en cache la dernière version
        const cache = await caches.open(CACHE_RUNTIME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        const cache = await caches.open(CACHE_RUNTIME);
        const cached = await cache.match(req) || await caches.match(req);
        return cached || new Response(offlineHTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    })());
    return;
  }

  // 2) Assets (CSS/JS/images): stale-while-revalidate
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_RUNTIME);
    const cached = await cache.match(req);
    const fetchPromise = fetch(req).then(resp => {
      if (resp && resp.status === 200 && req.method === 'GET') {
        cache.put(req, resp.clone());
      }
      return resp;
    }).catch(() => cached); // offline: on rend le cache si dispo
    return cached || fetchPromise;
  })());
});

// Mise à jour immédiate possible via postMessage
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
