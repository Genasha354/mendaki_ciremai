const CACHE_NAME = 'web-apps-routing-cache-v1';
const urlsToCache = [
  '/',
  './pendakianapuy.html',
  './about.html',
  './download.html',
  './index.html',
  './informasi.html',
  './map.html',
  './panduan.html',
  './pendakian.html',
  './pendakianapuy.html',
  './pendakianpalutungan.html',
  './asset/js/Access_realtime.js',
  './asset/js/basemap.js',
  './asset/js/gefenceapuy.js',
  './asset/js/geojsonapuy.js',
  './asset/js/layer_control.js',
  './asset/js/legenda_waktu.js',
  './asset/js/legenda.js',
  './asset/js/Petunjuk.js',
  './asset/js/scripts.js',
  './asset/js/Slide_Nav.js',
  './asset/js/tools_peta.js',
  './asset/css/footer.css',
  './asset/css/map.css',
  './asset/css/panduan.css',
  './asset/css/Slide_Nav.css',
  './asset/css/styles.css',
  './asset/leaflet/',
  './asset/leaflet/leaflet.css',
  './asset/leaflet/leaflet.js',
  './asset/leaflet/controlLocate/L.Control.Locate.min.css',
  './asset/leaflet/controlLocate/L.Control.Locate.min.js',
  './asset/legend/leaflet.legend.css',
  './asset/legend/leaflet.legend.js',
  './asset/leaflet/leaflet-betterscale-master/L.Control.BetterScale.css',
  './asset/leaflet/leaflet-betterscale-master/L.Control.BetterScale.js',
  './asset/leaflet/ResetView/L.Control.ResetView.min.css',
  './asset/leaflet/ResetView/L.Control.ResetView.min.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request to ensure it's safe to read when responding.
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response to ensure it's safe to read when caching.
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function() {
        // Network request failed, try to get it from the cache.
        return caches.match(event.request);
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Tangani pesan dari aplikasi utama
self.addEventListener('message', function(event) {
  var message = event.data;
  if (message && message.type === 'show_notification') {
      // Tampilkan notifikasi
      self.registration.showNotification('HATI-HATI !!!!', {
          body: message.message,
          icon: 'asset/img/user-icon.png' // Ganti dengan path gambar Anda
      });
  }
});
