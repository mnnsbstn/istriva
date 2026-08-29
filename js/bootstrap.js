window.ISTRIVA = window.ISTRIVA || {};

(function initApp() {
  let planState = {
    region: "pula",
    variantIndex: 0,
    weatherMode: "sun",
    readOnly: false
  };

  function t(key, vars) {
    return window.ISTRIVA.i18n.t(key, vars);
  }

  function getFamily() {
    return window.ISTRIVA.storage.getFamily();
  }

  function renderContextBar() {
    const family = getFamily();
    const regionName = t(`regions.${planState.region}`);
    const date = window.ISTRIVA.i18n.formatDate(new Date(), { day: "numeric", month: "long" });
    const eyebrow = document.querySelector("#hero-eyebrow");
    const heroDestination = document.querySelector("#hero-destination");
    const welcomeTitle = document.querySelector("#welcome-title");

    if (eyebrow) eyebrow.textContent = t("hero.eyebrow");
    if (heroDestination) heroDestination.textContent = `${regionName}.`;
    if (welcomeTitle && window.ISTRIVA.i18n.lang === "en") {
      welcomeTitle.innerHTML = `Your perfect day<br>in <em id="hero-destination">${regionName}.</em>`;
    } else if (welcomeTitle) {
      welcomeTitle.innerHTML = `Euer perfekter Tag<br>in <em id="hero-destination">${regionName}.</em>`;
    }

    const setText = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = val;
    };
    setText("#context-region", regionName);
    setText("#context-date", date);
    setText("#context-family", familySummary(family));
    setText("#profile-destination", regionName);
    setText("#party-size", String(family.adults + family.children));

    const replanLabel = document.querySelector("#replan-button-label");
    if (replanLabel) replanLabel.textContent = t("plan.replan");

    updateSelectLabels();
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

  function updateSelectLabels() {
    const weatherSelect = document.querySelector("#weather-select");
    const paceSelect = document.querySelector("#pace-select");
    if (weatherSelect) {
      weatherSelect.options[0].textContent = t("plan.weatherSun");
      weatherSelect.options[1].textContent = t("plan.weatherRain");
    }
    if (paceSelect) {
      paceSelect.options[0].textContent = t("plan.paceBalanced");
      paceSelect.options[1].textContent = t("plan.paceRelaxed");
      paceSelect.options[2].textContent = t("plan.paceActive");
    }
  }

  function refreshPlan() {
    if (typeof renderPlan === "function") {
      renderPlan(true);
    }
    if (typeof renderDiscoveryGuides === "function") {
      renderDiscoveryGuides();
    }
    if (typeof initStaticTripAdvisorBadges === "function") {
      initStaticTripAdvisorBadges();
    }
    if (typeof syncFavoriteButtons === "function") {
      syncFavoriteButtons();
    }
    renderContextBar();
    window.ISTRIVA.app.renderMap?.();
  }

  function renderExplore() {
    if (typeof renderDiscoveryGuides === "function") {
      renderDiscoveryGuides();
    }
    if (typeof initStaticTripAdvisorBadges === "function") {
      initStaticTripAdvisorBadges();
    }
    if (typeof syncFavoriteButtons === "function") {
      syncFavoriteButtons();
    }
  }

  async function sharePlan() {
    window.ISTRIVA.analytics.track("share_started");
    const regionName = t(`regions.${planState.region}`);
    const planName = document.querySelector("#plan-name")?.textContent || "";
    const state = window.ISTRIVA.share.buildShareState({
      lang: window.ISTRIVA.i18n.lang,
      region: planState.region,
      date: new Date().toISOString().slice(0, 10),
      family: getFamily(),
      weatherMode: document.querySelector("#weather-select")?.value || "sun",
      variantIndex: typeof planIndex !== "undefined" ? planIndex : 0,
      stopIds: [],
      lockedIds: [],
      planName
    });
    const url = window.ISTRIVA.share.buildShareUrl(state);
    const payload = {
      title: t("share.title", { region: regionName }),
      text: t("share.text", { region: regionName, family: familySummary(getFamily()), plan: planName }),
      url
    };
    try {
      if (navigator.share) await navigator.share(payload);
      else {
        await navigator.clipboard.writeText(url);
        if (typeof showToast === "function") showToast(t("share.copied"));
      }
      window.ISTRIVA.analytics.track("share_succeeded");
    } catch (error) {
      if (error.name !== "AbortError" && typeof showToast === "function") showToast(t("share.failed"));
    }
  }

  function applySharedState(shared) {
    if (!shared) return;
    if (shared.lang) window.ISTRIVA.i18n.setLang(shared.lang, { updateUrl: true });
    planState.region = shared.region || planState.region;
    planState.readOnly = true;
    if (shared.family) {
      window.ISTRIVA.storage.saveFamily(window.ISTRIVA.storage.normalizeFamily({ ...getFamily(), ...shared.family }));
    }
    const destSelect = document.querySelector("#destination-select");
    if (destSelect) destSelect.value = planState.region;
    window.ISTRIVA.storage.saveDestination(planState.region);
    if (typeof planIndex !== "undefined" && shared.variantIndex != null) {
      planIndex = shared.variantIndex;
    }
    if (shared.weatherMode) {
      const weatherSelect = document.querySelector("#weather-select");
      if (weatherSelect) weatherSelect.value = shared.weatherMode;
    }
    refreshPlan();
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
        renderExplore();
        if (typeof renderPlan === "function") renderPlan(false);
      });
    });
  }

  function bindEvents() {
    document.querySelector("#destination-select")?.addEventListener("change", (e) => {
      planState.region = e.target.value;
      window.ISTRIVA.storage.saveDestination(planState.region);
      if (typeof planIndex !== "undefined") planIndex = 0;
      if (typeof updateDestinationUI === "function") updateDestinationUI();
      refreshPlan();
      if (typeof showToast === "function") {
        showToast(t("toast.destinationReady", { region: t(`regions.${planState.region}`) }));
      }
    });

    document.querySelector("#share-button")?.addEventListener("click", sharePlan);

    document.querySelector("#save-plan-button")?.addEventListener("click", () => {
      const name = prompt(t("saved.planName"), document.querySelector("#plan-name")?.textContent || t("plan.title"));
      if (!name) return;
      const plans = window.ISTRIVA.storage.getSavedPlans();
      plans.unshift({
        id: `plan-${Date.now()}`,
        name,
        createdAt: new Date().toISOString(),
        region: planState.region,
        planName: document.querySelector("#plan-name")?.textContent || ""
      });
      window.ISTRIVA.storage.saveSavedPlans(plans);
      window.ISTRIVA.analytics.track("saved_plan_created");
      if (typeof showToast === "function") showToast(t("toast.planSaved"));
      renderSaved();
    });

    document.querySelector("#weather-forecast-toggle")?.addEventListener("click", () => {
      const forecast = document.querySelector(".weather-forecast");
      forecast?.classList.toggle("collapsed");
      const btn = document.querySelector("#weather-forecast-toggle");
      if (btn) {
        btn.textContent = forecast?.classList.contains("collapsed")
          ? t("weather.forecastToggle")
          : t("weather.forecastHide");
      }
    });
  }

  function renderSaved() {
    if (typeof renderFavorites === "function") renderFavorites();
    const plansGrid = document.querySelector("#saved-plans-grid");
    if (!plansGrid) return;
    const plans = window.ISTRIVA.storage.getSavedPlans();
    plansGrid.innerHTML = plans.length ? plans.map((p) => `
      <article class="saved-plan-card"><h3>${p.name}</h3><p>${p.planName || ""}</p></article>`).join("")
      : `<p class="empty-state">${t("saved.emptyPlans")}</p>`;
  }

  function renderMap() {
    if (typeof updateDestinationMap === "function") updateDestinationMap();
    const stops = typeof getPlans === "function" ? getPlans()[typeof planIndex !== "undefined" ? planIndex % getPlans().length : 0]?.stops : [];
    if (!stops?.length || !window.ISTRIVA.mapUI?.render) return;
    const mapped = stops.map((stop, index) => ({
      id: `stop-${index}`,
      title: stop.title,
      coordinates: window.ISTRIVA.poi?.buildStopPoi?.(stop, planState.region, index)?.coordinates
    })).filter((s) => s.coordinates);
    window.ISTRIVA.mapUI.render(mapped);
  }

  function init() {
    window.ISTRIVA.i18n.init();
    planState.region = window.ISTRIVA.storage.getDestination();
    const stored = window.ISTRIVA.storage.getPlanState();
    if (stored?.region) planState = { ...planState, ...stored, readOnly: false };

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

    renderContextBar();
    refreshPlan();
    renderSaved();

    const family2 = window.ISTRIVA.storage.getFamily();
    if (!family2.onboardingCompleted) {
      window.ISTRIVA.onboarding.init();
    }
  }

  window.ISTRIVA.app = {
    init,
    refreshPlan,
    renderExplore,
    renderMap,
    renderSaved,
    onProfileSaved(family) {
      const paceSelect = document.querySelector("#pace-select");
      if (paceSelect) paceSelect.value = family.pace;
      refreshPlan();
      if (typeof showToast === "function") showToast(t("profile.updated"));
    }
  };
})();
