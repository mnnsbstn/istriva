window.ISTRIVA = window.ISTRIVA || {};

(function initSearch() {
  let query = "";
  let filters = {
    category: "",
    maxDuration: 240,
    budget: "",
    minAge: null,
    familyFriendly: false,
    interests: []
  };

  function getFilteredPois(region) {
    const i18n = window.ISTRIVA.i18n;
    const lang = i18n.lang;
    const q = query.trim().toLowerCase();
    return window.ISTRIVA.poi.forRegion(region).filter((poi) => {
      const loc = window.ISTRIVA.poi.localized(poi, lang);
      const hay = [loc.title, loc.description, poi.category, poi.region, ...(poi.properties || [])].join(" ").toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (filters.category && poi.category !== filters.category) return false;
      if (filters.budget && poi.budget !== filters.budget) return false;
      if (filters.maxDuration && poi.durationMinutes > filters.maxDuration) return false;
      if (filters.minAge !== null && poi.minAge > filters.minAge) return false;
      if (filters.familyFriendly && !poi.tags.includes("familyFriendly")) return false;
      if (filters.interests.length && !filters.interests.some((i) => {
        const map = { beach: "beach", nature: "trip", culture: "trip", food: "food" };
        return map[i] === poi.category;
      })) return false;
      return true;
    });
  }

  function activeFilterCount() {
    let n = 0;
    if (query.trim()) n += 1;
    if (filters.category) n += 1;
    if (filters.budget) n += 1;
    if (filters.familyFriendly) n += 1;
    if (filters.interests.length) n += 1;
    return n;
  }

  function reset() {
    query = "";
    filters = { category: "", maxDuration: 240, budget: "", minAge: null, familyFriendly: false, interests: [] };
    syncUI();
  }

  function syncUI() {
    const searchInput = document.querySelector("#explore-search");
    if (searchInput) searchInput.value = query;
    const countEl = document.querySelector("#filter-count");
    if (countEl) countEl.textContent = String(activeFilterCount());
    document.querySelectorAll(".filter-chip[data-filter-key]").forEach((chip) => {
      chip.hidden = !chip.dataset.filterKey || !filters[chip.dataset.filterKey];
    });
  }

  function init() {
    document.querySelector("#explore-search")?.addEventListener("input", (e) => {
      query = e.target.value;
      window.ISTRIVA.app?.renderExplore?.();
      syncUI();
    });
    document.querySelector("#filter-reset")?.addEventListener("click", () => {
      reset();
      window.ISTRIVA.app?.renderExplore?.();
    });
    document.querySelector("#filter-drawer-open")?.addEventListener("click", () => {
      document.querySelector("#filter-drawer")?.showModal();
    });
    document.querySelector("#filter-apply")?.addEventListener("click", () => {
      const fd = new FormData(document.querySelector("#filter-form"));
      filters.category = fd.get("category") || "";
      filters.budget = fd.get("budget") || "";
      filters.familyFriendly = fd.get("familyFriendly") === "on";
      filters.interests = fd.getAll("interests");
      document.querySelector("#filter-drawer")?.close();
      window.ISTRIVA.app?.renderExplore?.();
      syncUI();
    });
  }

  window.ISTRIVA.search = {
    get query() { return query; },
    get filters() { return { ...filters }; },
    getFilteredPois,
    activeFilterCount,
    reset,
    syncUI,
    init
  };
})();
