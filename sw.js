const CACHE_NAME = "bura-v41";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=40",
  "./guide-data.js?v=1",
  "./tripadvisor-data.js?v=3",
  "./app.js?v=29",
  "./manifest.webmanifest?v=10",
  "./js/core/constants.js?v=1",
  "./js/core/analytics.js?v=1",
  "./js/core/feature-flags.js?v=1",
  "./js/core/storage.js?v=1",
  "./js/core/share.js?v=1",
  "./js/i18n/de.js?v=1",
  "./js/i18n/en.js?v=1",
  "./js/i18n/index.js?v=1",
  "./js/data/poi-registry.js?v=1",
  "./js/planner/schedule.js?v=1",
  "./js/planner/engine.js?v=1",
  "./js/ui/navigation.js?v=1",
  "./js/ui/profile.js?v=1",
  "./js/ui/onboarding.js?v=1",
  "./js/ui/search.js?v=1",
  "./js/ui/map.js?v=1",
  "./js/bootstrap.js?v=1",
  "./privacy.html",
  "./legal.html",
  "./sources.html",
  "./favicon.ico?v=7",
  "./icon-192.png?v=7",
  "./icon-512.png?v=7",
  "./icon-maskable-512.png?v=7",
  "./icon-1024.png?v=7"
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
