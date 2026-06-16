/* RePlay service worker.
   Network-first for the app shell so updates show immediately when online,
   with cache fallback so it still works offline. */
const CACHE = 'replay-v51';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Let API / YouTube / GitHub calls go straight to the network.
  if (url.origin !== location.origin) return;
  // For the app shell (page navigations) force a revalidating fetch so a stale HTTP-cached
  // copy (Pages sends max-age=600) can never be served — updates show on the very next load.
  const navlike = e.request.mode === 'navigate' || (e.request.destination === '' && url.pathname.endsWith('/')) || url.pathname.endsWith('.html');
  const req = navlike ? new Request(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }) : e.request;
  // Network-first: always try the live file, fall back to cache when offline.
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
