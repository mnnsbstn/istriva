const CACHE_NAME = "bura-v39";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=28",
  "./guide-data.js?v=1",
  "./tripadvisor-data.js?v=2",
  "./app.js?v=26",
  "./manifest.webmanifest?v=9",
  "./favicon.ico?v=6",
  "./icon-192.png?v=6",
  "./icon-512.png?v=6",
  "./icon-maskable-512.png?v=6",
  "./icon-1024.png?v=6"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => (key.startsWith("bura-v") && key !== CACHE_NAME) || key === "bura-user-data-v1")
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((response) => response || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
