const CACHE_NAME = 'market-v1';
self.addEventListener('install', (e) => {
  console.log('App Installed Successfully');
});
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});