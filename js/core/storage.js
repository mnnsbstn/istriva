window.ISTRIVA = window.ISTRIVA || {};

(function initStorage() {
  const { CONSTANTS } = window.ISTRIVA;

  function readJSON(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function migrateLegacyFamily() {
    const newKey = CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.FAMILY;
    if (readJSON(newKey)) return readJSON(newKey);

    const legacy = readJSON(CONSTANTS.LEGACY_PREFIX + "family-settings-v1");
    if (!legacy) return null;

    const migrated = {
      version: 2,
      adults: legacy.adults ?? 2,
      children: legacy.children ?? 0,
      childAges: legacy.childAges ?? [],
      startTime: "09:00",
      endTime: "19:00",
      transport: "mixed",
      pace: "balanced",
      budget: "medium",
      interests: ["beach", "culture", "food"],
      requirements: [],
      startPoint: null,
      onboardingCompleted: true
    };
    writeJSON(newKey, migrated);
    return migrated;
  }

  function defaultFamily() {
    return {
      version: 2,
      adults: 2,
      children: 2,
      childAges: [null, null],
      startTime: "09:00",
      endTime: "19:00",
      transport: "mixed",
      pace: "balanced",
      budget: "medium",
      interests: ["beach", "culture", "food"],
      requirements: [],
      startPoint: null,
      onboardingCompleted: false
    };
  }

  function normalizeFamily(raw) {
    const base = defaultFamily();
    if (!raw || typeof raw !== "object") return base;
    const children = Math.min(8, Math.max(0, Number.parseInt(raw.children, 10) || 0));
    const childAges = Array.from({ length: children }, (_, i) => {
      const age = raw.childAges?.[i];
      if (age === null || age === undefined || age === "") return null;
      const parsed = Number.parseInt(age, 10);
      return Number.isFinite(parsed) ? Math.min(17, Math.max(0, parsed)) : null;
    });
    return {
      ...base,
      ...raw,
      version: 2,
      adults: Math.min(8, Math.max(1, Number.parseInt(raw.adults, 10) || 2)),
      children,
      childAges,
      interests: Array.isArray(raw.interests) ? raw.interests.filter(Boolean) : base.interests,
      requirements: Array.isArray(raw.requirements) ? raw.requirements.filter(Boolean) : base.requirements
    };
  }

  function getFamily() {
    return normalizeFamily(migrateLegacyFamily() || readJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.FAMILY) || defaultFamily());
  }

  function saveFamily(family) {
    writeJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.FAMILY, normalizeFamily(family));
  }

  function getDestination() {
    const key = CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.DESTINATION;
    const val = localStorage.getItem(key) || localStorage.getItem(CONSTANTS.LEGACY_PREFIX + "selected-destination");
    return val && CONSTANTS.REGIONS.includes(val) ? val : "pula";
  }

  function saveDestination(region) {
    localStorage.setItem(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.DESTINATION, region);
    localStorage.setItem(CONSTANTS.LEGACY_PREFIX + "selected-destination", region);
  }

  function getFavorites() {
    const key = CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.FAVORITES;
    const legacy = readJSON(CONSTANTS.LEGACY_PREFIX + "favorites", []);
    const current = readJSON(key, null);
    if (current) return current;
    if (Array.isArray(legacy)) {
      writeJSON(key, legacy);
      return legacy;
    }
    return [];
  }

  function saveFavorites(items) {
    writeJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.FAVORITES, items);
    writeJSON(CONSTANTS.LEGACY_PREFIX + "favorites", items);
  }

  function getSavedPlans() {
    return readJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.SAVED_PLANS, []);
  }

  function saveSavedPlans(plans) {
    writeJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.SAVED_PLANS, plans);
  }

  function getPlanState() {
    return readJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.PLAN_STATE, null);
  }

  function savePlanState(state) {
    writeJSON(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.PLAN_STATE, state);
  }

  window.ISTRIVA.storage = {
    readJSON,
    writeJSON,
    getFamily,
    saveFamily,
    defaultFamily,
    normalizeFamily,
    getDestination,
    saveDestination,
    getFavorites,
    saveFavorites,
    getSavedPlans,
    saveSavedPlans,
    getPlanState,
    savePlanState
  };
})();
