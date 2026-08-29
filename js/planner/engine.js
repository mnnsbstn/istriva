window.ISTRIVA = window.ISTRIVA || {};

(function initPlanner() {
  const { poi } = window.ISTRIVA;

  function hashConfig(config) {
    return [...JSON.stringify(config)].reduce((h, c) => Math.imul(31, h) + c.charCodeAt(0), 0) >>> 0;
  }

  function seededRandom(seed) {
    let s = seed >>> 0;
    return () => {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function youngestAge(family) {
    if (!family.children || !family.childAges?.length) return 99;
    const ages = family.childAges.filter((a) => Number.isInteger(a));
    if (!ages.length) return 99;
    return Math.min(...ages);
  }

  function childAgesComplete(family) {
    return family.children === 0
      || (family.childAges.length === family.children && family.childAges.every((a) => Number.isInteger(a)));
  }

  function scorePoi(poi, ctx) {
    let score = 0;
    const age = youngestAge(ctx.family);
    if (poi.minAge > age) return -9999;

    if (ctx.weatherMode === "rain") {
      if (poi.tags.includes("rainSafe")) score += 40;
      if (poi.category === "beach") score -= 30;
    } else if (poi.category === "beach") score += 20;

    ctx.family.interests?.forEach((interest) => {
      const cats = {
        beach: ["beach"],
        nature: ["trip"],
        culture: ["trip", "history"],
        animals: ["trip"],
        food: ["food"],
        adventure: ["trip", "activity"],
        shopping: ["food", "market"]
      }[interest] || [];
      if (cats.includes(poi.category)) score += 15;
    });

    ctx.family.requirements?.forEach((req) => {
      if (poi.tags.includes(req)) score += 12;
    });

    if (ctx.family.pace === "relaxed") score += poi.durationMinutes <= 90 ? 8 : -5;
    if (ctx.family.pace === "active") score += poi.durationMinutes >= 90 ? 8 : 0;

    if (ctx.family.budget === "low" && poi.budget === "low") score += 10;
    if (ctx.family.budget === "flexible") score += 2;

    if (poi.tags.includes("familyFriendly")) score += 10;

    return score;
  }

  function selectCandidates(ctx) {
    return poi.forRegion(ctx.region)
      .filter((p) => scorePoi(p, ctx) > -1000)
      .sort((a, b) => scorePoi(b, ctx) - scorePoi(a, ctx));
  }

  function buildVariant(ctx, variantIndex) {
    const seed = hashConfig({ ...ctx, variantIndex });
    const rand = seededRandom(seed);
    const candidates = selectCandidates(ctx);
    const used = new Set(ctx.lockedIds || []);
    const stops = [];

    (ctx.lockedIds || []).forEach((id) => {
      const p = poi.get(id);
      if (p) stops.push({ ...p, locked: true });
    });

    const targetCount = ctx.family.pace === "relaxed" ? 3 : ctx.family.pace === "active" ? 5 : 4;
    const categoriesNeeded = ctx.weatherMode === "rain"
      ? ["trip", "food", "trip"]
      : ["trip", "beach", "food", "trip"];

    categoriesNeeded.forEach((cat, idx) => {
      if (stops.length >= targetCount) return;
      const pool = candidates.filter((c) => !used.has(c.id) && (c.category === cat || cat === "trip"));
      pool.sort((a, b) => scorePoi(b, ctx) - scorePoi(a, ctx) + (rand() - 0.5) * (variantIndex + 1) * 5);
      const pick = pool[(variantIndex + idx) % Math.max(1, pool.length)];
      if (pick) {
        used.add(pick.id);
        stops.push({ ...pick, locked: false });
      }
    });

    while (stops.length < targetCount) {
      const pool = candidates.filter((c) => !used.has(c.id));
      if (!pool.length) break;
      const pick = pool[Math.floor(rand() * pool.length)];
      used.add(pick.id);
      stops.push({ ...pick, locked: false });
    }

    return {
      id: `variant-${variantIndex}`,
      nameKey: variantIndex === 0 ? "curated" : "alternative",
      variantIndex,
      stops,
      budget: ctx.family.budget === "low" ? "€" : ctx.family.budget === "flexible" ? "€€€" : "€€"
    };
  }

  function countVariants(ctx) {
    const built = new Set();
    let count = 0;
    for (let i = 0; i < 8; i += 1) {
      const variant = buildVariant(ctx, i);
      const key = variant.stops.map((s) => s.id).join("|");
      if (!key || built.has(key)) break;
      built.add(key);
      count += 1;
    }
    return Math.max(1, count);
  }

  function generatePlan(ctx, variantIndex = 0) {
    const variantCount = countVariants(ctx);
    const idx = variantIndex % variantCount;
    const variant = buildVariant(ctx, idx);
    const schedule = window.ISTRIVA.schedule.buildSchedule(variant.stops, ctx.family);
    return {
      ...variant,
      variantCount,
      schedule,
      summary: window.ISTRIVA.schedule.summarize(schedule, ctx.family)
    };
  }

  function fromLegacyCatalog(ctx) {
    if (typeof getPlans !== "function") return null;
    const weatherSelect = document.querySelector("#weather-select");
    const paceSelect = document.querySelector("#pace-select");
    const destinationSelect = document.querySelector("#destination-select");
    if (!weatherSelect || !paceSelect || !destinationSelect) return null;

    const prevWeather = weatherSelect.value;
    const prevPace = paceSelect.value;
    const prevDest = destinationSelect.value;
    weatherSelect.value = ctx.weatherMode;
    paceSelect.value = ctx.family.pace;
    destinationSelect.value = ctx.region;
    const plans = getPlans();
    weatherSelect.value = prevWeather;
    paceSelect.value = prevPace;
    destinationSelect.value = prevDest;

    const plan = plans[ctx.variantIndex % plans.length];
    if (!plan) return null;

    const stops = plan.stops.map((stop) => {
      const built = poi.buildStopPoi(stop, ctx.region, 0);
      return { ...built, locked: (ctx.lockedIds || []).includes(built.id) };
    });

    const schedule = window.ISTRIVA.schedule.buildSchedule(stops, ctx.family);
    return {
      id: `legacy-${ctx.variantIndex}`,
      name: plan.name,
      variantIndex: ctx.variantIndex,
      variantCount: plans.length,
      stops,
      schedule,
      summary: {
        ...window.ISTRIVA.schedule.summarize(schedule, ctx.family),
        budget: plan.budget,
        distanceLabel: plan.distance
      },
      budget: plan.budget,
      legacy: true
    };
  }

  function createPlan(ctx) {
    const legacy = fromLegacyCatalog(ctx);
    if (legacy && legacy.variantCount > 1) return legacy;
    if (legacy && ctx.variantIndex === 0 && ctx.region === "pula") return legacy;

    const generated = generatePlan(ctx, ctx.variantIndex || 0);
    if (legacy && generated.stops.length < 2) return legacy;
    return generated;
  }

  window.ISTRIVA.planner = {
    hashConfig,
    youngestAge,
    childAgesComplete,
    scorePoi,
    countVariants,
    generatePlan,
    createPlan,
    buildVariant
  };
})();
