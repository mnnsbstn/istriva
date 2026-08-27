const CACHE_NAME = "bura-v7";
const USER_DATA_CACHE = "bura-user-data-v1";
const NOTIFICATION_PREFERENCE_URL = "./__bura-notification-preference";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=5",
  "./app.js?v=6",
  "./manifest.webmanifest?v=4",
  "./brand-logo-horizontal.png?v=4",
  "./icon-192.png?v=4",
  "./icon-512.png?v=4",
  "./icon-maskable-512.png?v=4"
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
          .filter((key) => ![CACHE_NAME, USER_DATA_CACHE].includes(key))
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

function weatherLabel(code) {
  if (code === 0) return "klar";
  if (code <= 2) return "leicht bewölkt";
  if (code === 3) return "bedeckt";
  if (code === 45 || code === 48) return "nebelig";
  if (code >= 51 && code <= 67) return "regnerisch";
  if (code >= 71 && code <= 77) return "winterlich";
  if (code >= 80 && code <= 82) return "wechselhaft mit Schauern";
  if (code >= 95) return "gewittrig";
  return "wechselhaft";
}

async function saveNotificationPreference(preference) {
  const cache = await caches.open(USER_DATA_CACHE);
  const response = new Response(JSON.stringify(preference), {
    headers: { "Content-Type": "application/json" }
  });
  await cache.put(NOTIFICATION_PREFERENCE_URL, response);
}

async function readNotificationPreference() {
  const cache = await caches.open(USER_DATA_CACHE);
  const response = await cache.match(NOTIFICATION_PREFERENCE_URL);
  return response ? response.json() : null;
}

async function showWeatherNotification(preference) {
  if (!preference?.coordinates) return;

  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.search = new URLSearchParams({
    latitude: preference.coordinates.latitude,
    longitude: preference.coordinates.longitude,
    current: "temperature_2m,apparent_temperature,weather_code,precipitation",
    daily: "precipitation_probability_max",
    timezone: "auto",
    forecast_days: "1"
  });

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Weather request failed with ${response.status}`);

  const weather = await response.json();
  const temperature = Math.round(weather.current.temperature_2m);
  const rainProbability = Math.round(weather.daily.precipitation_probability_max[0]);
  const condition = weatherLabel(weather.current.weather_code);
  const body = `Aktuell ${temperature}° und ${condition}. Regenwahrscheinlichkeit heute: ${rainProbability}%.`;

  await self.registration.showNotification(`Wetter in ${preference.name}`, {
    body,
    icon: "./icon-192.png?v=4",
    badge: "./icon-192.png?v=4",
    tag: "bura-daily-weather",
    renotify: true,
    data: { url: `./?destination=${encodeURIComponent(preference.key)}` }
  });
}

self.addEventListener("message", (event) => {
  if (event.data?.type === "SAVE_NOTIFICATION_PREFERENCE") {
    event.waitUntil(saveNotificationPreference(event.data.preference));
  }

  if (event.data?.type === "SHOW_WEATHER_NOTIFICATION") {
    event.waitUntil(showWeatherNotification(event.data.preference));
  }
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "bura-daily-weather") return;
  event.waitUntil(
    readNotificationPreference()
      .then((preference) => showWeatherNotification(preference))
      .catch(() => undefined)
  );
});

self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data?.json() || {};
  } catch {
    payload = { body: event.data?.text() };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "Bura Wetter-Update", {
      body: payload.body || "Dein aktueller Istrien-Tagesplan ist bereit.",
      icon: "./icon-192.png?v=4",
      badge: "./icon-192.png?v=4",
      tag: payload.tag || "bura-weather-update",
      renotify: true,
      data: { url: payload.url || "./" }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "./", self.location.href).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      const existingWindow = windows.find((windowClient) => windowClient.url.startsWith(self.location.origin));
      if (existingWindow) {
        existingWindow.navigate(targetUrl);
        return existingWindow.focus();
      }
      return clients.openWindow(targetUrl);
    })
  );
});
