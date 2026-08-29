window.ISTRIVA = window.ISTRIVA || {};

(function initPoiRegistry() {
  const REGION_CENTERS = {
    pula: { lat: 44.8666, lng: 13.8496 },
    fazana: { lat: 44.927, lng: 13.803 },
    medulin: { lat: 44.822, lng: 13.936 },
    rovinj: { lat: 45.081, lng: 13.638 },
    porec: { lat: 45.225, lng: 13.595 },
    vrsar: { lat: 45.149, lng: 13.606 },
    novigrad: { lat: 45.315, lng: 13.560 },
    umag: { lat: 45.431, lng: 13.522 },
    labin: { lat: 45.095, lng: 14.124 },
    motovun: { lat: 45.337, lng: 13.828 },
    buzet: { lat: 45.409, lng: 13.966 }
  };

  const CATEGORY_MAP = { beaches: "beach", trips: "trip", food: "food" };

  const INTEREST_MAP = {
    beach: ["beach"],
    nature: ["trip"],
    culture: ["trip", "history"],
    animals: ["trip"],
    food: ["food"],
    adventure: ["trip", "activity"],
    shopping: ["food", "market"]
  };

  const TAG_KEYWORDS = {
    stroller: ["kinderwagen", "zugänglich", "barrierefrei", "accessible", "wheelchair"],
    accessible: ["zugänglich", "barrierefrei", "accessible"],
    lowSlope: ["flach", "sanft", "ebene"],
    shade: ["schatten", "pinien", "schattig", "shade"],
    rainSafe: ["drinnen", "museum", "höhle", "indoor", "regen"],
    dog: ["hund", "dog"]
  };

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function approxCoords(region, id) {
    const center = REGION_CENTERS[region] || REGION_CENTERS.pula;
    const h = hashString(`${region}:${id}`);
    const latOffset = ((h % 200) - 100) / 8000;
    const lngOffset = (((h >> 8) % 200) - 100) / 8000;
    return { lat: center.lat + latOffset, lng: center.lng + lngOffset };
  }

  function parseDurationMinutes(text) {
    if (!text) return 60;
    const hours = /(\d+)\s*Std/.exec(text);
    const mins = /(\d+)\s*Min/.exec(text);
    return (hours ? Number(hours[1]) * 60 : 0) + (mins ? Number(mins[1]) : 0) || 60;
  }

  function inferBudget(meta = []) {
    const joined = meta.join(" ").toLowerCase();
    if (joined.includes("€€€") || joined.includes("premium")) return "flexible";
    if (joined.includes("€ günstig") || joined.includes("budget")) return "low";
    return "medium";
  }

  function inferTags(meta = [], description = "") {
    const text = `${meta.join(" ")} ${description}`.toLowerCase();
    const tags = [];
    Object.entries(TAG_KEYWORDS).forEach(([tag, words]) => {
      if (words.some((w) => text.includes(w))) tags.push(tag);
    });
    if (text.includes("familie") || text.includes("family")) tags.push("familyFriendly");
    if (text.includes("flacher") || text.includes("flach")) tags.push("shallowWater");
    if (text.includes("parkplatz") || text.includes("parking")) tags.push("parking");
    if (text.includes("reserv") || text.includes("buchen")) tags.push("reservation");
    return [...new Set(tags)];
  }

  function buildGuidePois() {
    const pois = {};
    if (typeof guidePlaces === "undefined" || typeof guideCatalog === "undefined") return pois;

    Object.entries(guideCatalog).forEach(([region, categories]) => {
      Object.entries(categories).forEach(([category, keys]) => {
        keys.forEach((key) => {
          const item = guidePlaces[category]?.[key];
          if (!item) return;
          const id = `guide:${category}:${key}`;
          const coords = approxCoords(region, id);
          pois[id] = {
            id,
            slug: key,
            region,
            category: CATEGORY_MAP[category] || category,
            name: { de: item.title, en: item.title },
            description: { de: item.description, en: item.description },
            coordinates: coords,
            mapTarget: item.map,
            icon: item.icon,
            durationMinutes: category === "food" ? 75 : category === "beaches" ? 150 : 90,
            minAge: item.suitability?.minAge ?? 0,
            budget: inferBudget(item.meta),
            tags: inferTags(item.meta, item.description),
            properties: item.meta || [],
            tripAdvisorKey: `${category}:${key}`,
            rating: null,
            reviews: null,
            ratingVerifiedAt: null,
            openingHours: null,
            openingHoursVerifiedAt: null,
            sponsored: false,
            affiliateLink: null,
            sources: ["guide-data.js"],
            lastReviewedAt: "2026-08-01"
          };
        });
      });
    });
    return pois;
  }

  function buildStopPoi(stop, region, index) {
    const id = `stop:${region}:${hashString(stop.map || stop.title)}`;
    return {
      id,
      slug: id,
      region,
      category: "activity",
      name: { de: stop.title, en: stop.title },
      description: { de: stop.description, en: stop.description },
      coordinates: approxCoords(region, id),
      mapTarget: stop.map,
      icon: stop.icon || "📍",
      durationMinutes: parseDurationMinutes(stop.duration),
      minAge: 0,
      budget: inferBudget(stop.meta),
      tags: inferTags(stop.meta, stop.description),
      properties: stop.meta || [],
      type: stop.type,
      scene: stop.scene,
      tripAdvisorKey: null,
      rating: null,
      reviews: null,
      sources: ["app.js"],
      lastReviewedAt: "2026-08-01",
      _legacyStop: stop
    };
  }

  function collectCatalogStops() {
    const pois = {};
    if (typeof istriaDestinations === "undefined") return pois;
    Object.entries(istriaDestinations).forEach(([region, dest]) => {
      [...(dest.stops || []), ...(dest.rainStops || [])].forEach((stop, index) => {
        const poi = buildStopPoi(stop, region, index);
        pois[poi.id] = poi;
      });
    });
    if (typeof pulaPlanCatalog !== "undefined") {
      Object.values(pulaPlanCatalog).forEach((weatherGroup) => {
        Object.values(weatherGroup).forEach((plans) => {
          plans.forEach((plan) => {
            plan.stops.forEach((stop, index) => {
              const poi = buildStopPoi(stop, "pula", index);
              pois[poi.id] = poi;
            });
          });
        });
      });
    }
    return pois;
  }

  const registry = {
    ...buildGuidePois(),
    ...collectCatalogStops()
  };

  function get(id) {
    return registry[id] || null;
  }

  function all() {
    return Object.values(registry);
  }

  function forRegion(region) {
    return all().filter((poi) => poi.region === region);
  }

  function localized(poi, lang = "de") {
    if (!poi) return null;
    return {
      ...poi,
      title: poi.name?.[lang] || poi.name?.de || "",
      description: poi.description?.[lang] || poi.description?.de || ""
    };
  }

  function validate() {
    const errors = [];
    const ids = new Set();
    all().forEach((poi) => {
      if (ids.has(poi.id)) errors.push(`duplicate id: ${poi.id}`);
      ids.add(poi.id);
      if (!poi.region || !CONSTANTS.REGIONS.includes(poi.region)) errors.push(`invalid region: ${poi.id}`);
      if (!poi.coordinates?.lat || !poi.coordinates?.lng) errors.push(`missing coords: ${poi.id}`);
      if (!poi.mapTarget) errors.push(`missing mapTarget: ${poi.id}`);
    });
    return errors;
  }

  const { CONSTANTS } = window.ISTRIVA;

  window.ISTRIVA.poi = {
    REGION_CENTERS,
    get,
    all,
    forRegion,
    localized,
    validate,
    parseDurationMinutes,
    inferTags,
    buildStopPoi
  };
})();
