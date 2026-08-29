window.ISTRIVA = window.ISTRIVA || {};

(function initMapUI() {
  let mapInstance = null;
  let layerGroup = null;
  let mode = "plan";
  let loaded = false;

  function ensureLeaflet() {
    return new Promise((resolve, reject) => {
      if (window.L) return resolve(window.L);
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(css);
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => resolve(window.L);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function initMap() {
    if (loaded) return mapInstance;
    const container = document.querySelector("#leaflet-map");
    if (!container) return null;
    try {
      const L = await ensureLeaflet();
      mapInstance = L.map(container, { scrollWheelZoom: false }).setView([45.1, 13.85], 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: window.ISTRIVA.i18n.t("map.attribution"),
        maxZoom: 18
      }).addTo(mapInstance);
      layerGroup = L.layerGroup().addTo(mapInstance);
      loaded = true;
      window.ISTRIVA.analytics.track("map_opened");
      return mapInstance;
    } catch {
      container.innerHTML = `<p class="map-error">${window.ISTRIVA.i18n.t("map.loading")}</p>`;
      return null;
    }
  }

  function clearLayers() {
    layerGroup?.clearLayers();
  }

  function render(stops = [], options = {}) {
    if (!loaded) return;
    const L = window.L;
    clearLayers();
    const latlngs = [];
    stops.forEach((stop, index) => {
      if (!stop.coordinates) return;
      const { lat, lng } = stop.coordinates;
      latlngs.push([lat, lng]);
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: "plan-marker",
          html: `<span>${index + 1}</span>`,
          iconSize: [28, 28]
        })
      });
      marker.bindPopup(stop.title || stop.name?.de || "");
      marker.on("click", () => options.onSelect?.(stop.id));
      marker.addTo(layerGroup);
    });
    if (latlngs.length > 1) {
      L.polyline(latlngs, { color: "#d4ff00", weight: 3, opacity: 0.85 }).addTo(layerGroup);
    }
    if (latlngs.length) {
      mapInstance.fitBounds(latlngs, { padding: [30, 30], maxZoom: 13 });
    }
  }

  function setMode(next) {
    mode = next;
    document.querySelectorAll("[data-map-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mapMode === next);
    });
  }

  function init() {
    document.querySelectorAll("[data-map-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setMode(btn.dataset.mapMode);
        window.ISTRIVA.app?.renderMap?.();
      });
    });
    document.querySelector("#map-fullscreen")?.addEventListener("click", () => {
      document.querySelector("#map-panel")?.classList.toggle("fullscreen");
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) initMap().then(() => window.ISTRIVA.app?.renderMap?.());
      });
    }, { rootMargin: "200px" });
    const panel = document.querySelector("#map-panel");
    if (panel) observer.observe(panel);
  }

  window.ISTRIVA.mapUI = { init, initMap, render, setMode, get mode() { return mode; } };
})();
