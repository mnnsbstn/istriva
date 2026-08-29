window.ISTRIVA = window.ISTRIVA || {};

(function initI18n() {
  const { CONSTANTS } = window.ISTRIVA;
  let currentLang = CONSTANTS.DEFAULT_LANG;
  let listeners = [];

  function getNested(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function interpolate(text, vars = {}) {
    return String(text).replace(/\{(\w+)\}/g, (_, key) => (
      vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : `{${key}}`
    ));
  }

  function detectBrowserLang() {
    const lang = (navigator.language || "de").slice(0, 2).toLowerCase();
    return CONSTANTS.SUPPORTED_LANGS.includes(lang) ? lang : CONSTANTS.DEFAULT_LANG;
  }

  function readStoredLang() {
    try {
      const stored = localStorage.getItem(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.LANG);
      if (stored && CONSTANTS.SUPPORTED_LANGS.includes(stored)) return stored;
    } catch {
      // ignore
    }
    return null;
  }

  function readUrlLang() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    return lang && CONSTANTS.SUPPORTED_LANGS.includes(lang) ? lang : null;
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(CONSTANTS.STORAGE_PREFIX + CONSTANTS.KEYS.LANG, lang);
    } catch {
      // ignore
    }
  }

  function allKeys(obj, prefix = "") {
    const keys = [];
    Object.entries(obj || {}).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        keys.push(...allKeys(value, path));
      } else {
        keys.push(path);
      }
    });
    return keys;
  }

  window.ISTRIVA.i18n = {
    get lang() {
      return currentLang;
    },

    init() {
      currentLang = readUrlLang() || readStoredLang() || detectBrowserLang();
      document.documentElement.lang = currentLang;
      return currentLang;
    },

    setLang(lang, { persist = true, updateUrl = true } = {}) {
      if (!CONSTANTS.SUPPORTED_LANGS.includes(lang)) return;
      currentLang = lang;
      document.documentElement.lang = lang;
      if (persist) saveLang(lang);
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.replaceState({}, "", url);
      }
      listeners.forEach((fn) => fn(lang));
    },

    t(key, vars) {
      const dict = window.ISTRIVA.translations[currentLang] || window.ISTRIVA.translations.de;
      const fallback = window.ISTRIVA.translations.de;
      const value = getNested(dict, key) ?? getNested(fallback, key) ?? key;
      return interpolate(value, vars);
    },

    formatDate(date, options = {}) {
      const locale = currentLang === "en" ? "en-GB" : "de-DE";
      return new Intl.DateTimeFormat(locale, options).format(date);
    },

    formatNumber(value, options = {}) {
      const locale = currentLang === "en" ? "en-GB" : "de-DE";
      return new Intl.NumberFormat(locale, options).format(value);
    },

    formatTime(value) {
      if (!value) return "--:--";
      const slice = String(value).slice(11, 16);
      if (slice) return slice;
      return String(value).slice(0, 5);
    },

    regionName(key) {
      return this.t(`regions.${key}`, { region: key }) || key;
    },

    onChange(fn) {
      listeners.push(fn);
      return () => {
        listeners = listeners.filter((item) => item !== fn);
      };
    },

    applyToDOM(root = document) {
      root.querySelectorAll("[data-i18n]").forEach((el) => {
        if (el.closest("#welcome-title") || el.id === "hero-eyebrow") return;
        if (el.children.length > 0 && el.tagName !== "OPTION") return;
        const key = el.dataset.i18n;
        const text = this.t(key);
        if (el.dataset.i18nAttr) {
          el.setAttribute(el.dataset.i18nAttr, text);
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      });
      document.title = this.t("meta.title");
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.content = this.t("meta.description");
    },

    updateDynamicContent() {
      const regionKey = window.ISTRIVA.storage?.getDestination?.() || "pula";
      const regionName = this.regionName(regionKey);
      const eyebrow = document.querySelector("#hero-eyebrow");
      const heroDestination = document.querySelector("#hero-destination");
      if (eyebrow) eyebrow.textContent = this.t("hero.eyebrow");
      if (heroDestination) heroDestination.textContent = `${regionName}.`;
    },

    validateTranslations() {
      const deKeys = new Set(allKeys(window.ISTRIVA.translations.de));
      const enKeys = new Set(allKeys(window.ISTRIVA.translations.en));
      const missingInEn = [...deKeys].filter((k) => !enKeys.has(k));
      const missingInDe = [...enKeys].filter((k) => !deKeys.has(k));
      return { missingInEn, missingInDe, ok: missingInEn.length === 0 && missingInDe.length === 0 };
    }
  };
})();
