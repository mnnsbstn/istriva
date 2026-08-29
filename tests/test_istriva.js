#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const root = path.join(__dirname, "..");
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
  }
}

function loadInContext(files, extra = {}) {
  const context = {
    window: {},
    console,
    btoa: (str) => Buffer.from(str, "binary").toString("base64"),
    atob: (str) => Buffer.from(str, "base64").toString("binary"),
    navigator: { language: "de-DE" },
    document: { documentElement: { lang: "de" }, querySelector: () => null, querySelectorAll: () => [] },
    localStorage: { store: {}, getItem(k) { return this.store[k] || null; }, setItem(k, v) { this.store[k] = v; } },
    location: { href: "https://example.com/", search: "", origin: "https://example.com", pathname: "/istriva/" },
    history: { replaceState() {} },
    ...extra
  };
  context.window = context;
  context.window.btoa = context.btoa;
  context.window.atob = context.atob;
  vm.createContext(context);
  files.forEach((file) => {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  });
  return context;
}

function extractKeys(filePath) {
  const text = fs.readFileSync(path.join(root, filePath), "utf8");
  const match = text.match(/=\s*\{([\s\S]*)\};\s*$/);
  if (!match) return [];
  const keys = [];
  const walk = (block, prefix = "") => {
    const re = /(\w+):\s*(?:\{|"|\[)/g;
    let m;
    const lines = block.split("\n");
    let depth = 0;
    let currentPrefix = prefix;
    for (const line of lines) {
      const keyMatch = line.match(/^(\s*)(\w+):\s*\{/);
      if (keyMatch && depth === 0) {
        const key = keyMatch[2];
        currentPrefix = prefix ? `${prefix}.${key}` : key;
        keys.push(currentPrefix);
      }
      depth += (line.match(/\{/g) || []).length;
      depth -= (line.match(/\}/g) || []).length;
    }
  };
  // simpler: regex all "key:" at word boundaries within translations
  const re = /^\s{2,}(\w+):\s/mg;
  let depth = 0;
  const stack = [];
  text.split("\n").forEach((line) => {
    const indent = line.match(/^(\s*)/)[1].length;
    const keyMatch = line.match(/^\s*(\w+):\s/);
    if (keyMatch && line.includes("{")) {
      stack[indent] = keyMatch[1];
      const full = stack.filter(Boolean).slice(0, indent / 2 + 1).join(".");
      if (full) keys.push(full.replace(/^\./, ""));
    }
  });
  return [...new Set(keys)].filter((k) => !k.startsWith("window"));
}

test("i18n de/en key parity (major namespaces)", () => {
  const ctx = loadInContext([
    "js/core/constants.js",
    "js/i18n/de.js",
    "js/i18n/en.js",
    "js/i18n/index.js"
  ]);
  const result = ctx.ISTRIVA.i18n.validateTranslations();
  assert.strictEqual(result.ok, true, `missing keys en:${result.missingInEn} de:${result.missingInDe}`);
});

test("share link roundtrip", () => {
  const ctx = loadInContext(["js/core/constants.js", "js/core/share.js"]);
  const state = ctx.ISTRIVA.share.buildShareState({
    lang: "de",
    region: "rovinj",
    date: "2026-08-29",
    family: { adults: 2, children: 2, childAges: [4, 8], pace: "balanced", budget: "medium", interests: ["beach"], requirements: [], startTime: "09:00", endTime: "19:00", transport: "car" },
    weatherMode: "sun",
    variantIndex: 1,
    stopIds: ["guide:beaches:lone", "guide:trips:rovinjOld"],
    lockedIds: ["guide:beaches:lone"],
    planName: "Test"
  });
  const token = ctx.ISTRIVA.share.encodePayload(state);
  const decoded = ctx.ISTRIVA.share.decodePayload(token);
  assert.strictEqual(decoded.region, "rovinj");
  assert.strictEqual(decoded.lang, "de");
  assert.ok(Array.isArray(decoded.lockedIds) && decoded.lockedIds[0] === "guide:beaches:lone");
  assert.strictEqual(decoded.variantIndex, 1);
});

test("storage migration from legacy family key", () => {
  const ctx = loadInContext(["js/core/constants.js", "js/core/storage.js"]);
  ctx.localStorage.store["bura-family-settings-v1"] = JSON.stringify({ adults: 3, children: 1, childAges: [5] });
  const family = ctx.ISTRIVA.storage.getFamily();
  assert.strictEqual(family.adults, 3);
  assert.strictEqual(family.children, 1);
  assert.strictEqual(family.version, 2);
  assert.ok(family.startTime);
});

test("tripadvisor broken map URLs fall back to title search", () => {
  const ctx = loadInContext(["tripadvisor-data.js"]);
  const info = ctx.getTripAdvisorInfo({ map: "Rovinj Aquarium", title: "Aquarium Rovinj" });
  assert.ok(info.url.includes("Aquarium"), "should use title in search URL");
  assert.ok(!info.url.includes("Std."), "must not use duration as query");
});

test("tripadvisor generic group shows no single rating", () => {
  const ctx = loadInContext(["tripadvisor-data.js"]);
  const info = ctx.getTripAdvisorInfo({ title: "Konobas rund ums Forum" });
  assert.strictEqual(info.rating, null);
});

test("planner child age filters POIs", () => {
  const guidePlaces = {
    beaches: { steep: { title: "Steep", description: "x", meta: [], icon: "🏖", map: "Steep Beach", key: "steep", suitability: { minAge: 10, family: 2, adult: 4, groups: 2 } } },
    trips: {}, food: {}
  };
  const guideCatalog = { rovinj: { beaches: ["steep"], trips: [], food: [] } };
  const istriaDestinations = { rovinj: { coordinates: { latitude: 45, longitude: 13 } } };
  const pulaPlanCatalog = {};
  const getPlans = () => [];

  const ctx = loadInContext([
    "js/core/constants.js",
    "js/data/poi-registry.js",
    "js/planner/schedule.js",
    "js/planner/engine.js"
  ], { guidePlaces, guideCatalog, istriaDestinations, pulaPlanCatalog, getPlans });

  const young = ctx.ISTRIVA.planner.scorePoi(
    ctx.ISTRIVA.poi.get("guide:beaches:steep"),
    { family: { children: 1, childAges: [3], interests: [], requirements: [], pace: "balanced", budget: "medium" }, weatherMode: "sun" }
  );
  assert.strictEqual(young, -9999);

  const older = ctx.ISTRIVA.planner.scorePoi(
    ctx.ISTRIVA.poi.get("guide:beaches:steep"),
    { family: { children: 1, childAges: [12], interests: [], requirements: [], pace: "balanced", budget: "medium" }, weatherMode: "sun" }
  );
  assert.ok(older > -9999);
});

test("schedule recalculates times and window fit", () => {
  const ctx = loadInContext(["js/planner/schedule.js"]);
  const stops = [
    { durationMinutes: 60, coordinates: { lat: 45.08, lng: 13.63 } },
    { durationMinutes: 90, coordinates: { lat: 45.09, lng: 13.64 } }
  ];
  const schedule = ctx.ISTRIVA.schedule.buildSchedule(stops, { startTime: "09:00", endTime: "19:00", transport: "walk", pace: "balanced" });
  assert.strictEqual(schedule[0].startTime, "09:00");
  assert.ok(schedule[0].endTime);
  const summary = ctx.ISTRIVA.schedule.summarize(schedule, { transport: "walk", budget: "medium" });
  assert.strictEqual(summary.stopCount, 2);
});

test("POI registry integrity", () => {
  const ctx = loadInContext([
    "guide-data.js",
    "js/core/constants.js",
    "js/data/poi-registry.js"
  ], { istriaDestinations: { pula: { coordinates: { latitude: 44.87, longitude: 13.85 }, stops: [], rainStops: [] } }, pulaPlanCatalog: {}, getPlans: () => [] });
  const errors = ctx.ISTRIVA.poi.validate();
  assert.strictEqual(errors.length, 0, errors.join("; "));
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
