(function initI18n() {
  const STORAGE_KEY = "istriva-lang-v1";
  const SUPPORTED = ["de", "en"];

  const translations = {
    de: {
      meta: {
        title: "ISTRIVA – Mehr erleben. Weniger planen.",
        description: "ISTRIVA plant euren perfekten Familientag in ganz Istrien – entspannt, wetterbewusst und kindgerecht."
      },
      brand: { tagline: "Mehr erleben. Weniger planen." },
      nav: {
        plan: "Tagesplan",
        discover: "Istrien entdecken",
        favorites: "Favoriten",
        ariaMain: "Hauptnavigation"
      },
      lang: { switch: "Sprache", de: "DE", en: "EN" },
      hero: {
        eyebrow: "Dobro jutro, Familie!",
        titleBefore: "Euer perfekter Tag",
        titleAfter: "in",
        intro: "Von Küstenstädten bis zu Bergdörfern – wir planen euren entspannten Familientag überall in Istrien.",
        regionLabel: "AKTUELLEN ORT AUSWÄHLEN",
        regionCount: "11 Regionen",
        coastSouth: "Südküste",
        coastWest: "Westküste",
        coastEast: "Ostküste & Inland"
      },
      profile: {
        family: "Familie",
        in: "in",
        open: "Profil der Familie öffnen"
      },
      notifications: {
        button: "Updates",
        kicker: "ISTRIVA UPDATES",
        title: "Benachrichtigungen",
        close: "Benachrichtigungen schließen",
        intro: "Wählt aus, welche Hinweise ihr für eure aktuelle Urlaubsregion erhalten möchtet.",
        regionLabel: "AKTUELLE REGION",
        optionsLegend: "Gewünschte Benachrichtigungen",
        weatherTitle: "Wetter-Updates",
        weatherDesc: "Regen, Hitze, Wind und Tagesplanung – Updates um 9, 12, 15, 18 und 21 Uhr.",
        newsTitle: "Istrien-News & Hinweise",
        newsDesc: "Relevante Veranstaltungen, Sperrungen und Ausflugstipps.",
        privacy: "Die Zustellung erfolgt über OneSignal. Ihr könnt Benachrichtigungen hier jederzeit wieder deaktivieren.",
        disable: "Deaktivieren",
        cancel: "Abbrechen",
        save: "Speichern",
        enable: "Aktivieren"
      },
      weather: {
        ariaLabel: "Live-Wettervorschau",
        loadingInitial: "LIVE-WETTER WIRD GELADEN",
        loadingUpdate: "LIVE-WETTER WIRD AKTUALISIERT",
        summaryLoading: "Aktuelle Daten werden geladen",
        live: "LIVE",
        cached: "ZWISCHENGESPEICHERT",
        offline: "OFFLINE · KEINE LIVE-DATEN",
        unavailable: "Wetter momentan nicht verfügbar",
        feelsLike: "gefühlt {temp}°",
        rain: "Regen",
        wind: "Wind",
        waterTemp: "Wassertemperatur",
        sunrise: "Sonnenaufgang",
        sunset: "Sonnenuntergang",
        uv: "UV-Index",
        forecastTitle: "7-Tage-Vorschau",
        today: "Heute",
        tipDefault: "Wetterdaten werden live für euren ausgewählten Ort geladen.",
        tipOffline: "Der Tagesplan bleibt nutzbar; Wetter bitte vor dem Start prüfen.",
        clear: "Klar",
        partlyCloudy: "Leicht bewölkt",
        cloudy: "Bedeckt",
        fog: "Nebelig",
        drizzle: "Nieselregen",
        rainLabel: "Regen",
        snow: "Schnee",
        showers: "Regenschauer",
        thunder: "Gewitter",
        variable: "Wechselhaft",
        rainPlan: "Für {region} ist die Regenoption automatisch vorbereitet.",
        hotPlan: "In {region} wird es warm – die längste Pause liegt in der Mittagshitze.",
        windyPlan: "Heute ist es windig – Bootsfahrten und Fährverbindungen bitte nochmals prüfen.",
        goodPlan: "Gute Bedingungen für euren Familientag in {region}.",
        outdoorPlan: "Outdoorplan · {temp}°",
        rainOption: "Regenoption · {pct}%"
      },
      plan: {
        title: "Tagesplan",
        share: "Tagesplan teilen",
        replan: "Neu planen",
        filters: "Plan anpassen",
        withFamily: "UNTERWEGS MIT",
        adults: "Erwachsene",
        children: "Kinder",
        childN: "Kind {n}",
        years: "Jahre",
        agePlaceholder: "Alter",
        childAgeAria: "Alter von Kind {n}",
        childAgeHint: "Alter wird für passende Familienempfehlungen berücksichtigt.",
        childAgeRequired: "Bitte für jedes Kind das Alter angeben.",
        weatherSelect: "Wetter auswählen",
        paceSelect: "Tempo auswählen",
        weatherSun: "Sonne",
        weatherRain: "Regenoption",
        paceBalanced: "Ausgewogen",
        paceRelaxed: "Ganz entspannt",
        paceActive: "Abenteuerlich",
        stops: "Stopps",
        distance: "Wege",
        budget: "Familienbudget",
        favoriteStop: "{title} als Favorit markieren",
        openMaps: "{title} in Google Maps öffnen",
        mapsLink: "Google Maps",
        paceRelaxedRoute: "Ganz entspannt durch {region}",
        paceActiveRoute: "{region} für Entdecker",
        rainRoute: "{region} bei Regen"
      },
      favorites: {
        kicker: "FÜR SPÄTER MERKEN",
        title: "Favoriten",
        desc: "Alle gemerkten Strände, Ausflüge, Lokale und Planstopps an einem Ort.",
        clear: "Alle entfernen",
        empty: "Tippt bei einer Location auf das Herz, um sie hier zu speichern.",
        removed: "Aus Favoriten entfernt",
        saved: "Für später gemerkt ♥",
        cleared: "Favoriten wurden geleert",
        removeItem: "{title} aus Favoriten entfernen"
      },
      guides: {
        beaches: "Strände",
        trips: "Tagesausflüge",
        food: "Essen & Trinken",
        beachesKicker: "BADEN & MEER ·",
        beachesTitle: "Strände",
        beachesDesc: "Von geschützten Familienbuchten bis zu wilden Felsküsten.",
        beachesLink: "Alle Strände",
        tripsKicker: "MEHR ENTDECKEN ·",
        tripsTitle: "Tagesausflüge",
        tripsDesc: "Natur, Geschichte und besondere Erlebnisse in erreichbarer Nähe.",
        tripsLink: "Alle Ausflüge",
        foodKicker: "GENUSS ·",
        foodTitle: "Essen & Trinken",
        foodDesc: "Konobas, Restaurants, Märkte, Cafés und Bars für entspannte Pausen.",
        foodLink: "Alles auf der Karte",
        jumpAria: "Empfehlungskategorien",
        labelBeach: "STRAND",
        labelTrip: "TAGESAUSFLUG",
        labelFood: "ESSEN & TRINKEN",
        sortedFor: "Persönlich sortiert für: {context}",
        adultOne: "1 Erwachsener",
        adultsN: "{n} Erwachsene",
        childOne: "1 Kind",
        childrenN: "{n} Kinder",
        childAgesSuffix: "({ages} J.)",
        addChildAges: "Kinderalter bitte oben ergänzen",
        noChildren: "ohne Kinder"
      },
      discover: {
        kicker: "QUER DURCH ISTRIEN",
        title: "Noch Lust auf mehr?",
        link: "Alles auf der Karte",
        secretTag: "GEHEIMTIPP",
        morningTag: "MORGENS SCHÖN",
        kamenjakTitle: "Sonnenuntergang am Kap Kamenjak",
        kamenjakDesc: "Wilde Küste, kleine Buchten und der schönste Blick aufs Abendrot.",
        kamenjakFavorite: "Kap Kamenjak als Favorit markieren",
        marketTitle: "Tržnica – Pulas Markthalle",
        marketDesc: "Frisches Obst, lokale Snacks und echtes istrisches Lebensgefühl.",
        marketFavorite: "Markthalle als Favorit markieren"
      },
      map: { ariaLabel: "Karte eures aktuellen Ortes", title: "Google Maps: {region}" },
      footer: {
        madeWith: "Mit Liebe für entspannte Urlaubstage gemacht.",
        note: "Routen und Öffnungszeiten vor Besuch prüfen · Wetterdaten:"
      },
      toast: {
        familyUpdated: "Familie angepasst: {family}",
        childAgesRequired: "Bitte noch das Alter aller Kinder angeben",
        destinationReady: "Euer Tagesplan für {region} ist bereit",
        rainPlan: "Regenoption ist eingeplant ☂",
        sunPlan: "Sonnenplan ist zurück ☀",
        paceUpdated: "Tempo auf „{pace}“ angepasst",
        replanReady: "Eine neue Route ist bereit ✦",
        replanBest: "Das ist aktuell unsere beste Route für eure Auswahl",
        shareCopied: "Tagesplan wurde in die Zwischenablage kopiert",
        shareUnavailable: "Teilen ist in diesem Browser nicht verfügbar",
        profileSummary: "{family} · {region}",
        iosStandalone: "Auf iPhone: App zuerst zum Home-Bildschirm hinzufügen und von dort öffnen",
        notifySelect: "Bitte mindestens eine Update-Art auswählen",
        notifyLoading: "Der Benachrichtigungsdienst wird noch geladen",
        notifyBlocked: "Benachrichtigungen sind in den Browser-Einstellungen blockiert",
        notifyDenied: "Benachrichtigungen wurden nicht freigegeben",
        notifySaved: "Benachrichtigungseinstellungen gespeichert",
        notifyEnabled: "Benachrichtigungen aktiviert",
        notifyFailed: "Benachrichtigungen konnten nicht aktiviert werden",
        notifyDisabled: "Benachrichtigungen wurden deaktiviert",
        notifyDisableFailed: "Benachrichtigungen konnten nicht deaktiviert werden",
        offlineFailed: "Offline-Modus konnte nicht aktiviert werden"
      }
    },
    en: {
      meta: {
        title: "ISTRIVA – Experience more. Plan less.",
        description: "ISTRIVA plans your perfect family day across Istria – relaxed, weather-aware, and kid-friendly."
      },
      brand: { tagline: "Experience more. Plan less." },
      nav: {
        plan: "Day plan",
        discover: "Explore Istria",
        favorites: "Saved",
        ariaMain: "Main navigation"
      },
      lang: { switch: "Language", de: "DE", en: "EN" },
      hero: {
        eyebrow: "Dobro jutro, family!",
        titleBefore: "Your perfect day",
        titleAfter: "in",
        intro: "From coastal towns to hill villages – we plan your relaxed family day anywhere in Istria.",
        regionLabel: "CHOOSE YOUR LOCATION",
        regionCount: "11 regions",
        coastSouth: "South coast",
        coastWest: "West coast",
        coastEast: "East coast & inland"
      },
      profile: {
        family: "Family",
        in: "in",
        open: "Open family profile"
      },
      notifications: {
        button: "Updates",
        kicker: "ISTRIVA UPDATES",
        title: "Notifications",
        close: "Close notifications",
        intro: "Choose which updates you want for your current holiday region.",
        regionLabel: "CURRENT REGION",
        optionsLegend: "Notification preferences",
        weatherTitle: "Weather updates",
        weatherDesc: "Rain, heat, wind and day planning – updates at 9, 12, 3, 6 and 9 pm.",
        newsTitle: "Istria news & tips",
        newsDesc: "Relevant events, closures and trip ideas.",
        privacy: "Delivery via OneSignal. You can turn notifications off here anytime.",
        disable: "Turn off",
        cancel: "Cancel",
        save: "Save",
        enable: "Enable"
      },
      weather: {
        ariaLabel: "Live weather",
        loadingInitial: "LOADING LIVE WEATHER",
        loadingUpdate: "UPDATING LIVE WEATHER",
        summaryLoading: "Loading current data",
        live: "LIVE",
        cached: "CACHED",
        offline: "OFFLINE · NO LIVE DATA",
        unavailable: "Weather currently unavailable",
        feelsLike: "feels like {temp}°",
        rain: "Rain",
        wind: "Wind",
        waterTemp: "Water temp.",
        sunrise: "Sunrise",
        sunset: "Sunset",
        uv: "UV index",
        forecastTitle: "7-day forecast",
        today: "Today",
        tipDefault: "Weather data loads live for your selected location.",
        tipOffline: "Your day plan still works; please check the weather before heading out.",
        clear: "Clear",
        partlyCloudy: "Partly cloudy",
        cloudy: "Overcast",
        fog: "Foggy",
        drizzle: "Drizzle",
        rainLabel: "Rain",
        snow: "Snow",
        showers: "Showers",
        thunder: "Thunderstorms",
        variable: "Changeable",
        rainPlan: "Rain option is ready for {region}.",
        hotPlan: "It will be warm in {region} – longest break is at midday heat.",
        windyPlan: "Windy today – double-check boats and ferries.",
        goodPlan: "Good conditions for your family day in {region}.",
        outdoorPlan: "Outdoor plan · {temp}°",
        rainOption: "Rain option · {pct}%"
      },
      plan: {
        title: "Day plan",
        share: "Share day plan",
        replan: "Replan",
        filters: "Adjust plan",
        withFamily: "TRAVELLING WITH",
        adults: "Adults",
        children: "Children",
        childN: "Child {n}",
        years: "years",
        agePlaceholder: "Age",
        childAgeAria: "Age of child {n}",
        childAgeHint: "Age is used for family-friendly recommendations.",
        childAgeRequired: "Please enter each child's age.",
        weatherSelect: "Choose weather",
        paceSelect: "Choose pace",
        weatherSun: "Sun",
        weatherRain: "Rain option",
        paceBalanced: "Balanced",
        paceRelaxed: "Relaxed",
        paceActive: "Adventurous",
        stops: "Stops",
        distance: "Walking",
        budget: "Family budget",
        favoriteStop: "Save {title} as favorite",
        openMaps: "Open {title} in Google Maps",
        mapsLink: "Google Maps",
        paceRelaxedRoute: "Relaxed day in {region}",
        paceActiveRoute: "{region} for explorers",
        rainRoute: "{region} in the rain"
      },
      favorites: {
        kicker: "SAVE FOR LATER",
        title: "Favorites",
        desc: "All saved beaches, trips, places and plan stops in one place.",
        clear: "Remove all",
        empty: "Tap the heart on a place to save it here.",
        removed: "Removed from favorites",
        saved: "Saved for later ♥",
        cleared: "Favorites cleared",
        removeItem: "Remove {title} from favorites"
      },
      guides: {
        beaches: "Beaches",
        trips: "Day trips",
        food: "Food & drink",
        beachesKicker: "SWIM & SEA ·",
        beachesTitle: "Beaches for your day",
        beachesDesc: "From sheltered family coves to wild rocky shores.",
        beachesLink: "All beaches",
        tripsKicker: "EXPLORE MORE ·",
        tripsTitle: "Day trips",
        tripsDesc: "Nature, history and special experiences nearby.",
        tripsLink: "All trips",
        foodKicker: "FOOD & DRINK ·",
        foodTitle: "Food & drink",
        foodDesc: "Konobas, restaurants, markets, cafés and bars for relaxed breaks.",
        foodLink: "View on map",
        jumpAria: "Recommendation categories",
        labelBeach: "BEACH",
        labelTrip: "DAY TRIP",
        labelFood: "FOOD & DRINK",
        sortedFor: "Personalised for: {context}",
        adultOne: "1 adult",
        adultsN: "{n} adults",
        childOne: "1 child",
        childrenN: "{n} children",
        childAgesSuffix: "({ages} yrs)",
        addChildAges: "please add children's ages above",
        noChildren: "no children"
      },
      discover: {
        kicker: "ACROSS ISTRIA",
        title: "Want more?",
        link: "View on map",
        secretTag: "HIDDEN GEM",
        morningTag: "NICE IN THE MORNING",
        kamenjakTitle: "Sunset at Cape Kamenjak",
        kamenjakDesc: "Wild coast, small coves and the best view of the evening sky.",
        kamenjakFavorite: "Save Cape Kamenjak as favorite",
        marketTitle: "Tržnica – Pula market hall",
        marketDesc: "Fresh fruit, local snacks and real Istrian atmosphere.",
        marketFavorite: "Save market hall as favorite"
      },
      map: { ariaLabel: "Map of your current location", title: "Google Maps: {region}" },
      footer: {
        madeWith: "Made with love for relaxed holidays.",
        note: "Check routes and opening hours before visiting · Weather data:"
      },
      toast: {
        familyUpdated: "Family updated: {family}",
        childAgesRequired: "Please enter every child's age",
        destinationReady: "Your day plan for {region} is ready",
        rainPlan: "Rain option is active ☂",
        sunPlan: "Sun plan is back ☀",
        paceUpdated: "Pace set to “{pace}”",
        replanReady: "A new route is ready ✦",
        replanBest: "This is currently our best route for your selection",
        shareCopied: "Day plan copied to clipboard",
        shareUnavailable: "Sharing is not available in this browser",
        profileSummary: "{family} · {region}",
        iosStandalone: "On iPhone: add the app to your home screen first, then open it from there",
        notifySelect: "Please select at least one update type",
        notifyLoading: "Notification service is still loading",
        notifyBlocked: "Notifications are blocked in browser settings",
        notifyDenied: "Notifications were not allowed",
        notifySaved: "Notification settings saved",
        notifyEnabled: "Notifications enabled",
        notifyFailed: "Could not enable notifications",
        notifyDisabled: "Notifications turned off",
        notifyDisableFailed: "Could not turn off notifications",
        offlineFailed: "Could not enable offline mode"
      }
    }
  };

  let currentLang = "de";
  let listeners = [];

  function getNested(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function interpolate(text, vars = {}) {
    return String(text).replace(/\{(\w+)\}/g, (_, key) => (
      vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : `{${key}}`
    ));
  }

  function detectLang() {
    const browser = (navigator.language || "de").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : "de";
  }

  function readStoredLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(stored) ? stored : null;
    } catch {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }

  function updateLangButtons() {
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const active = btn.dataset.setLang === currentLang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  window.I18N = {
    get lang() {
      return currentLang;
    },

    getLocale() {
      return currentLang === "en" ? "en-GB" : "de-DE";
    },

    t(key, vars) {
      const dict = translations[currentLang] || translations.de;
      const fallback = translations.de;
      const value = getNested(dict, key) ?? getNested(fallback, key) ?? key;
      return interpolate(value, vars);
    },

    applyToDOM(root = document) {
      root.querySelectorAll("[data-i18n]").forEach((el) => {
        if (el.id === "welcome-title" || el.closest("#welcome-title")) return;
        if (el.children.length > 0 && el.tagName !== "OPTION") return;
        const text = this.t(el.dataset.i18n);
        if (el.dataset.i18nAttr) {
          el.setAttribute(el.dataset.i18nAttr, text);
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      });

      document.documentElement.lang = currentLang;
      document.title = this.t("meta.title");
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.content = this.t("meta.description");
      updateLangButtons();
    },

    setLang(lang) {
      if (!SUPPORTED.includes(lang) || lang === currentLang) return;
      currentLang = lang;
      saveLang(lang);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url);
      listeners.forEach((fn) => fn(lang));
    },

    onChange(fn) {
      listeners.push(fn);
      return () => {
        listeners = listeners.filter((item) => item !== fn);
      };
    },

    init() {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      currentLang = SUPPORTED.includes(urlLang) ? urlLang : (readStoredLang() || detectLang());
      document.querySelectorAll("[data-set-lang]").forEach((btn) => {
        btn.addEventListener("click", () => this.setLang(btn.dataset.setLang));
      });
      this.applyToDOM();
    }
  };
})();
