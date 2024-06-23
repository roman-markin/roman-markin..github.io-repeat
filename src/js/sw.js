self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open('store')
      .then((cache) =>
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/index.js',
          '/src/css/app.css',
        ])
      )
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
