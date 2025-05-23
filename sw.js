const cacheName = 'pet-censo-animal-v2';
const assets = [
  'index.html',  
  'etapa1.html',
  'etapa2.html',
  'etapa3.html',
  'etapa4.html',
  'etapa5.html',
  'manifest.json',
  'css/style.css',
  //'js/router.js',  
  'js/db.js',
  'js/dbindex.js',
  'js/registroFuncional.js',
  'js/dbetapa1.js',
  'js/app.js',
  'js/especie.js',
  'js/especieCampos.js',
  // Adicione aqui ícones usados no manifest, se houver
  'img/icons/icon-192.png',
  'icon-192.png'
  //'img/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            //return cache.addAll(assets);
            const resources = assets;

            // Mapear cada recurso para uma promessa de cache
            return Promise.allSettled(resources.map(url => cache.add(url)))
                .then(results => {
                    results.forEach((result, index) => {
                        if (result.status === "rejected") {
                            console.error(`Erro ao adicionar ${resources[index]} no cache:`, result.reason);
                        } else {
                            console.log(`Recurso ${resources[index]} cacheado com sucesso.`);
                        }
                    });
                });

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
    self.clients.claim();
});


//self.addEventListener('fetch', event => {
//    event.respondWith(
//        caches.match(event.request)
//          .then(cachedResponse => {
//            return cachedResponse || fetch(event.request);
//        })
//    );
//});

self.addEventListener('fetch', event => {
    // Caso a URL contenha o _vs/browserLink, ignore-a ou processe sem customização
    if (event.request.url.includes('/_vs/browserLink')) {
        return event.respondWith(fetch(event.request));
    }

    if (event.request.url.includes('/_framework/aspnetcore-browser-refresh.js')) {
        return event.respondWith(fetch(event.request));
    }

    // Aqui segue sua lógica normal de interceptação
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then(networkResponse => {
                    // Lógica para atualizar o cache, se desejado
                    return networkResponse;
                });
            })
            .catch(err => {
                console.error("Falha ao recuperar recurso:", err);
                // Possível fallback-offline se desejar
            })
    );
});
