// 空的 Service Worker 作为清理工具，确保任何还在更新或挂载的旧 SW 会接管此文件后自杀
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      self.clients.claim();
    }).then(() => {
      self.registration.unregister();
    })
  );
});
