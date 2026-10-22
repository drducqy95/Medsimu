// MedSim GameYhoc - Service Worker Lifecycle Handler
// Tự động dọn dẹp bộ nhớ đệm cũ (cache) và hủy đăng ký Service Worker tồn dư từ các project localhost trước đó

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      // Thông báo cho các tab mở lại tải sạch không qua cache cũ
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) {
          // No force reload, allow seamless transition
        }
      });
    })
  );
});

// Pass-through fetch handler để không can thiệp vào request của Next.js
self.addEventListener('fetch', (event) => {
  // Let network handle directly
  return;
});
