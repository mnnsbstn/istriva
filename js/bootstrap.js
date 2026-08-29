window.ISTRIVA = window.ISTRIVA || {};

(function initApp() {
  let planState = {
    region: "pula",
    variantIndex: 0,
    weatherMode: "sun",
    stopIds: [],
    lockedIds: [],
    customStops: [],
    readOnly: false
  };
  let currentPlan = null;

  function t(key, vars) {
    return window.ISTRIVA.i18n.t(key, vars);
  }

  function getFamily() {
    return window.ISTRIVA.storage.getFamily();
  }

  function plannerContext() {
    return {
      region: planState.region,
      variantIndex: planState.variantIndex,
      weatherMode: planState.weatherMode,
      family: getFamily(),
      lockedIds: planState.lockedIds
    };
  }

  function regeneratePlan() {
    const ctx = plannerContext();
    currentPlan = window.ISTRIVA.planner.createPlan(ctx);
    if (planState.customStops.length) {
      currentPlan.stops = planState.customStops.map((id) => {
        const poi = window.ISTRIVA.poi.get(id);
        return poi ? { ...poi, locked: planState.lockedIds.includes(id) } : null;
      }).filter(Boolean);
      currentPlan.schedule = window.ISTRIVA.schedule.buildSchedule(currentPlan.stops, getFamily());
      currentPlan.summary = window.ISTRIVA.schedule.summarize(currentPlan.schedule, getFamily());
    }
    planState.stopIds = currentPlan.stops.map((s) => s.id);
    window.ISTRIVA.storage.savePlanState(planState);
    renderPlanUI();
    renderContextBar();
    window.ISTRIVA.app.renderExplore();
    window.ISTRIVA.app.renderMap();
    window.ISTRIVA.analytics.track("plan_generated", {
      region: planState.region,
      variantIndex: planState.variantIndex,
      stops: currentPlan.stops.length
    });
  }

  function renderContextBar() {
    const family = getFamily();
    const region = t(`regions.${planState.region}`);
    const date = window.ISTRIVA.i18n.formatDate(new Date(), { day: "numeric", month: "long" });
    document.querySelector("#context-region") && (document.querySelector("#context-region").textContent = region);
    document.querySelector("#context-date") && (document.querySelector("#context-date").textContent = date);
    document.querySelector("#context-family") && (document.querySelector("#context-family").textContent = familySummary(family));
    document.querySelector("#hero-destination") && (document.querySelector("#hero-destination").textContent = `${region}.`);
    document.querySelector("#profile-destination") && (document.querySelector("#profile-destination").textContent = region);
    document.querySelector("#party-size") && (document.querySelector("#party-size").textContent = String(family.adults + family.children));
  }

  function familySummary(family) {
    const adults = family.adults === 1
      ? (window.ISTRIVA.i18n.lang === "en" ? "1 adult" : "1 Erwachsener")
      : (window.ISTRIVA.i18n.lang === "en" ? `${family.adults} adults` : `${family.adults} Erwachsene`);
    const children = family.children === 1
      ? (window.ISTRIVA.i18n.lang === "en" ? "1 child" : "1 Kind")
      : (window.ISTRIVA.i18n.lang === "en" ? `${family.children} children` : `${family.children} Kinder`);
    return `${adults} · ${children}`;
  }

  function renderPlanUI() {
    if (!currentPlan) return;
    const lang = window.ISTRIVA.i18n.lang;
    const nameEl = document.querySelector("#plan-name");
    const summaryEl = document.querySelector("#plan-summary-details");
    const itinerary = document.querySelector("#itinerary");
    if (nameEl) nameEl.textContent = currentPlan.name || t("plan.curatedNote");

    if (summaryEl && currentPlan.summary) {
      const s = currentPlan.summary;
      summaryEl.innerHTML = `
        <span>${t("plan.summaryStops", { count: s.stopCount })}</span>
        <span>${t("plan.summaryWalk", { km: s.walkKm })}</span>
        <span>${t("plan.summaryDrive", { min: s.driveMin })}</span>
        <span>${t("plan.summaryDuration", { hours: s.durationHours })}</span>
        <span>${t("plan.summaryBudget", { budget: currentPlan.budget || s.budget })}</span>`;
    }

    if (!itinerary) return;
    itinerary.innerHTML = currentPlan.schedule.map((stop, index) => {
      const loc = window.ISTRIVA.poi.localized(stop, lang);
      const favId = stop.id;
      if (typeof registerFavorite === "function") {
        registerFavorite({
          id: favId,
          title: loc.title,
          description: loc.description,
          icon: stop.icon,
          map: stop.mapTarget,
          category: stop.category
        });
      }
      return `
        <article class="stop" data-stop-id="${stop.id}">
          <time class="time">${stop.startTime}</time>
          <div class="stop-content">
            <div class="stop-top">
              <span class="stop-type">${stop.type || stop.category || ""}</span>
              <span class="stop-duration">◷ ${stop.durationMinutes} min</span>
              ${stop.locked ? `<span class="stop-locked">${t("plan.locked")}</span>` : ""}
              <div class="stop-actions" ${planState.readOnly ? "hidden" : ""}>
                <button type="button" class="icon-button" data-action="up" data-id="${stop.id}" aria-label="${t("plan.moveUp")}" ${index === 0 ? "disabled" : ""}>↑</button>
                <button type="button" class="icon-button" data-action="down" data-id="${stop.id}" aria-label="${t("plan.moveDown")}" ${index === currentPlan.schedule.length - 1 ? "disabled" : ""}>↓</button>
                <button type="button" class="icon-button" data-action="lock" data-id="${stop.id}" aria-label="${stop.locked ? t("plan.unlock") : t("plan.lock")}">${stop.locked ? "🔒" : "🔓"}</button>
                <button type="button" class="icon-button" data-action="replace" data-id="${stop.id}" aria-label="${t("plan.replace")}">↻</button>
                <button type="button" class="icon-button" data-action="remove" data-id="${stop.id}" aria-label="${t("plan.remove")}">×</button>
              </div>
              <button class="location-favorite stop-favorite" type="button" data-favorite-id="${favId}" aria-label="${t("plan.favorite")}">♡</button>
            </div>
            <h3><a class="place-link" href="${typeof mapUrl === "function" ? mapUrl(stop.mapTarget) : "#"}" target="_blank" rel="noopener noreferrer">${loc.title}<span aria-hidden="true">↗</span></a></h3>
            <p>${loc.description}</p>
            ${typeof renderTripAdvisorBadge === "function" ? renderTripAdvisorBadge({ map: stop.mapTarget, title: loc.title, key: stop.tripAdvisorKey }) : ""}
            <div class="stop-meta">${(stop.properties || []).slice(0, 4).map((m) => `<span>${m}</span>`).join("")}</div>
          </div>
          <div class="stop-image"><span aria-hidden="true">${stop.icon || "📍"}</span>
            <a class="map-link" href="${typeof mapUrl === "function" ? mapUrl(stop.mapTarget) : "#"}" target="_blank" rel="noopener noreferrer">🗺️ ${t("plan.maps")}</a>
          </div>
        </article>`;
    }).join("");

    if (typeof syncFavoriteButtons === "function") syncFavoriteButtons();

    const warn = document.querySelector("#plan-time-warning");
    if (warn) {
      warn.hidden = currentPlan.summary?.fitsWindow !== false;
      warn.textContent = t("plan.timeWarning", { start: getFamily().startTime, end: getFamily().endTime });
    }

    const replanBtn = document.querySelector("#replan-button");
    if (replanBtn) {
      const count = currentPlan.variantCount || 1;
      replanBtn.disabled = count <= 1;
      replanBtn.title = count <= 1 ? t("plan.replanNone") : t("plan.replan");
    }
  }

  function handleStopAction(action, id) {
    if (planState.readOnly) return;
    const ids = planState.customStops.length ? [...planState.customStops] : [...planState.stopIds];
    const idx = ids.indexOf(id);
    if (idx < 0) return;

    if (action === "remove") ids.splice(idx, 1);
    else if (action === "up" && idx > 0) {
      [ids[idx - 1], ids[idx]] = [ids[idx], ids[idx - 1]];
    } else if (action === "down" && idx < ids.length - 1) {
      [ids[idx + 1], ids[idx]] = [ids[idx], ids[idx + 1]];
    } else if (action === "lock") {
      if (planState.lockedIds.includes(id)) planState.lockedIds = planState.lockedIds.filter((x) => x !== id);
      else planState.lockedIds.push(id);
      window.ISTRIVA.analytics.track("stop_locked", { id, locked: planState.lockedIds.includes(id) });
    } else if (action === "replace") {
      const candidates = window.ISTRIVA.search.getFilteredPois(planState.region).filter((p) => !ids.includes(p.id));
      const next = candidates[(idx + planState.variantIndex) % Math.max(1, candidates.length)];
      if (next) {
        ids[idx] = next.id;
        window.ISTRIVA.analytics.track("stop_replaced", { from: id, to: next.id });
      }
    }

    planState.customStops = ids;
    regeneratePlan();
  }

  function renderExplore() {
    const region = planState.region;
    const family = getFamily();
    const lang = window.ISTRIVA.i18n.lang;
    const pois = window.ISTRIVA.search.getFilteredPois(region);
    ["beach", "trip", "food"].forEach((cat) => {
      const grid = document.querySelector(`#explore-grid-${cat}`);
      if (!grid) return;
      const items = pois.filter((p) => p.category === cat || (cat === "trip" && p.category === "activity"));
      grid.innerHTML = items.length ? items.slice(0, 12).map((poi) => {
        const loc = window.ISTRIVA.poi.localized(poi, lang);
        const favId = poi.id;
        if (typeof registerFavorite === "function") {
          registerFavorite({ id: favId, title: loc.title, description: loc.description, icon: poi.icon, map: poi.mapTarget, category: poi.category });
        }
        return `<article class="guide-card" data-poi-id="${poi.id}">
          <button class="location-favorite" type="button" data-favorite-id="${favId}" aria-label="${t("plan.favorite")}">♡</button>
          <div class="guide-card-icon">${poi.icon || "📍"}</div>
          <div class="guide-card-copy">
            <h3>${loc.title}</h3>
            <p>${loc.description}</p>
            ${typeof renderTripAdvisorBadge === "function" ? renderTripAdvisorBadge({ map: poi.mapTarget, title: loc.title, key: poi.tripAdvisorKey }) : ""}
          </div></article>`;
      }).join("") : `<p class="empty-state">${t("explore.noResults")}</p>`;
    });
    if (typeof syncFavoriteButtons === "function") syncFavoriteButtons();
  }

  function renderMap() {
    const mode = window.ISTRIVA.mapUI.mode;
    let stops = [];
    if (mode === "plan" && currentPlan) stops = currentPlan.schedule;
    else stops = window.ISTRIVA.search.getFilteredPois(planState.region).slice(0, 30);
    window.ISTRIVA.mapUI.render(stops, {
      onSelect(id) {
        document.querySelector(`[data-poi-id="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        document.querySelector(`[data-stop-id="${id}"]`)?.classList.add("highlight");
      }
    });
  }

  async function sharePlan() {
    window.ISTRIVA.analytics.track("share_started");
    const state = window.ISTRIVA.share.buildShareState({
      lang: window.ISTRIVA.i18n.lang,
      region: planState.region,
      date: new Date().toISOString().slice(0, 10),
      family: getFamily(),
      weatherMode: planState.weatherMode,
      variantIndex: planState.variantIndex,
      stopIds: planState.customStops.length ? planState.customStops : planState.stopIds,
      lockedIds: planState.lockedIds,
      planName: currentPlan?.name || ""
    });
    const url = window.ISTRIVA.share.buildShareUrl(state);
    const region = t(`regions.${planState.region}`);
    const payload = {
      title: t("share.title", { region }),
      text: t("share.text", { region, family: familySummary(getFamily()), plan: currentPlan?.name || "" }),
      url
    };
    try {
      if (navigator.share) await navigator.share(payload);
      else {
        await navigator.clipboard.writeText(url);
        if (typeof showToast === "function") showToast(t("share.copied"));
      }
      window.ISTRIVA.analytics.track("share_succeeded");
    } catch (e) {
      if (e.name !== "AbortError" && typeof showToast === "function") showToast(t("share.failed"));
    }
  }

  function applySharedState(shared) {
    if (!shared) return;
    if (shared.lang) window.ISTRIVA.i18n.setLang(shared.lang, { updateUrl: true });
    planState.region = shared.region || planState.region;
    planState.weatherMode = shared.weatherMode || "sun";
    planState.variantIndex = shared.variantIndex || 0;
    planState.lockedIds = shared.lockedIds || [];
    planState.customStops = shared.stopIds || [];
    planState.readOnly = true;
    if (shared.family) window.ISTRIVA.storage.saveFamily(window.ISTRIVA.storage.normalizeFamily({ ...getFamily(), ...shared.family }));
    const destSelect = document.querySelector("#destination-select");
    if (destSelect) destSelect.value = planState.region;
    window.ISTRIVA.storage.saveDestination(planState.region);
    regeneratePlan();
    const banner = document.querySelector("#shared-banner");
    if (banner) {
      banner.hidden = false;
      banner.innerHTML = `${t("plan.readOnly")} <button type="button" id="adopt-shared-plan">${t("plan.adoptShared")}</button>`;
      banner.querySelector("#adopt-shared-plan")?.addEventListener("click", () => {
        planState.readOnly = false;
        banner.hidden = true;
      });
    }
  }

  function initLanguageSwitcher() {
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.ISTRIVA.i18n.setLang(btn.dataset.setLang);
        window.ISTRIVA.i18n.applyToDOM();
        renderContextBar();
        renderPlanUI();
        renderExplore();
        document.querySelectorAll("[data-set-lang]").forEach((b) => {
          b.classList.toggle("active", b.dataset.setLang === window.ISTRIVA.i18n.lang);
          b.setAttribute("aria-pressed", String(b.dataset.setLang === window.ISTRIVA.i18n.lang));
        });
      });
    });
  }

  function bindEvents() {
    document.querySelector("#destination-select")?.addEventListener("change", (e) => {
      planState.region = e.target.value;
      planState.variantIndex = 0;
      planState.customStops = [];
      window.ISTRIVA.storage.saveDestination(planState.region);
      if (typeof updateDestinationUI === "function") updateDestinationUI();
      regeneratePlan();
      if (typeof showToast === "function") showToast(t("toast.destinationReady", { region: t(`regions.${planState.region}`) }));
    });

    document.querySelector("#weather-select")?.addEventListener("change", (e) => {
      planState.weatherMode = e.target.value;
      planState.variantIndex = 0;
      regeneratePlan();
    });

    document.querySelector("#pace-select")?.addEventListener("change", (e) => {
      const family = getFamily();
      family.pace = e.target.value;
      window.ISTRIVA.storage.saveFamily(family);
      regeneratePlan();
    });

    document.querySelector("#replan-button")?.addEventListener("click", () => {
      const count = currentPlan?.variantCount || 1;
      if (count <= 1) {
        if (typeof showToast === "function") showToast(t("plan.replanNone"));
        return;
      }
      planState.variantIndex = (planState.variantIndex + 1) % count;
      planState.customStops = [];
      regeneratePlan();
      window.ISTRIVA.analytics.track("plan_alternative_requested", { index: planState.variantIndex });
      if (typeof showToast === "function") showToast(t("plan.replanReady"));
    });

    document.querySelector("#share-button")?.addEventListener("click", sharePlan);
    document.querySelector("#save-plan-button")?.addEventListener("click", () => {
      const name = prompt(t("saved.planName"), currentPlan?.name || t("plan.title"));
      if (!name) return;
      const plans = window.ISTRIVA.storage.getSavedPlans();
      plans.unshift({
        id: `plan-${Date.now()}`,
        name,
        createdAt: new Date().toISOString(),
        state: { ...planState, stopIds: planState.customStops.length ? planState.customStops : planState.stopIds }
      });
      window.ISTRIVA.storage.saveSavedPlans(plans);
      window.ISTRIVA.analytics.track("saved_plan_created");
      if (typeof showToast === "function") showToast(t("toast.planSaved"));
      renderSaved();
    });

    document.querySelector("#itinerary")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      handleStopAction(btn.dataset.action, btn.dataset.id);
    });

    document.querySelector("#weather-forecast-toggle")?.addEventListener("click", () => {
      document.querySelector(".weather-forecast")?.classList.toggle("collapsed");
    });
  }

  function renderSaved() {
    const favGrid = document.querySelector("#favorites-grid");
    const plansGrid = document.querySelector("#saved-plans-grid");
    if (typeof renderFavorites === "function") renderFavorites();
    if (plansGrid) {
      const plans = window.ISTRIVA.storage.getSavedPlans();
      plansGrid.innerHTML = plans.length ? plans.map((p) => `
        <article class="saved-plan-card"><h3>${p.name}</h3>
          <button type="button" data-load-plan="${p.id}">${t("saved.addToDay")}</button>
          <button type="button" data-delete-plan="${p.id}">${t("saved.delete")}</button></article>`).join("")
        : `<p class="empty-state">${t("saved.emptyPlans")}</p>`;
    }
  }

  function init() {
    window.ISTRIVA.i18n.init();
    planState.region = window.ISTRIVA.storage.getDestination();
    const stored = window.ISTRIVA.storage.getPlanState();
    if (stored) planState = { ...planState, ...stored };

    const destSelect = document.querySelector("#destination-select");
    if (destSelect) destSelect.value = planState.region;

    initLanguageSwitcher();
    window.ISTRIVA.navigation.init();
    window.ISTRIVA.profileUI.init();
    window.ISTRIVA.search.init();
    window.ISTRIVA.mapUI.init();
    window.ISTRIVA.i18n.applyToDOM();

    bindEvents();
    applySharedState(window.ISTRIVA.share.parseShareFromUrl());

    const family = getFamily();
    const paceSelect = document.querySelector("#pace-select");
    if (paceSelect) paceSelect.value = family.pace;
    const weatherSelect = document.querySelector("#weather-select");
    if (weatherSelect) weatherSelect.value = planState.weatherMode;

    regeneratePlan();
    renderSaved();
    window.ISTRIVA.onboarding.init();

    window.ISTRIVA.i18n.onChange(() => {
      window.ISTRIVA.i18n.applyToDOM();
      renderContextBar();
      renderPlanUI();
      renderExplore();
    });
  }

  window.ISTRIVA.app = {
    init,
    regeneratePlan,
    renderExplore,
    renderMap,
    renderSaved,
    onProfileSaved(family) {
      const paceSelect = document.querySelector("#pace-select");
      if (paceSelect) paceSelect.value = family.pace;
      regeneratePlan();
      if (typeof showToast === "function") showToast(t("profile.updated"));
    }
  };
})();
