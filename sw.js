/**
 * Service Worker per Eliza PWA
 * Gestisce caching e funzionalità offline
 */

const CACHE_NAME = 'eliza-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './eliza.js',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installazione in corso...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: File in cache');
                // Prova ad aggiungere tutti i file, ignorando gli errori per file mancanti
                return Promise.all(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(err => {
                            console.log('Service Worker: Impossibile cachare', url);
                        });
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Attivato');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Pulizia vecchia cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Intercettazione delle richieste
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Se trovato nella cache, restituisci dalla cache
                if (response) {
                    return response;
                }
                
                // Altrimenti, fai la richiesta alla rete
                return fetch(event.request).then((response) => {
                    // Verifica se è una risposta valida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clona la risposta
                    const responseToCache = response.clone();
                    
                    // Aggiungi alla cache
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return response;
                });
            })
            .catch(() => {
                // Se fallisce, potresti restituire una pagina offline personalizzata
                console.log('Service Worker: Richiesta fallita, modalità offline');
            })
    );
});
