const cacheName = 'pet-censo-animal-v1';
const assets = [
  '/',
  '/index.html',  
  '/etapa1.html',
  '/etapa2.html',
  '/etapa3.html',
  '/etapa4.html',
  '/etapa5.html',
  '/manifest.json',
  '/css/style.css',
  //'/js/router.js',  
  '/js/db.js',
  '/js/app.js',
  // Adicione aqui ícones usados no manifest, se houver
  '/img/icons/icon-192.png',
  '/img/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
