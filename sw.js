const CACHE_VERSION = 'v120'; // sube versión para borrar caché vieja
const CACHE_NAME = `rpg-croniques-catalunya-${CACHE_VERSION}`;

const urlsToCache = [
  './',
  './index.html',
  './main.js',
  './styles.css',
  './manifest.json',
  
  // Iconos - clave para que instale con icono
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  
  // Data del juego
  './data/items.json',
  './data/capitols.json',
  './data/capitol_01_bcn_born.json',
  './data/capitol_02_girona.json',
  './data/capitol_03_fires_valencia.json',
  './data/ruta_rave_port_olympic.json',
  './data/ruta_girona_muralla_viva.json',
  './data/ruta_valencia_ciutat_vella.json',
  './data/biblioteca_emojis.json',
  './data/botiga_emojis.json',
  './data/categories_emoji.json',
  './data/minijoc_frases.json',
  
  // Leyendas
  './data/llegendes_barcelona.json',
  './data/llegendes_girona.json',
  './data/llegendes_valencia.json',
  
  // Assets
  './camisa_cenguera.png',
  './ram_roses_girona.png',
  './fuet_fires.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
