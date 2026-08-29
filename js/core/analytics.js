window.ISTRIVA = window.ISTRIVA || {};

window.ISTRIVA.analytics = {
  provider: null,

  configure(provider) {
    this.provider = typeof provider === "function" ? provider : null;
  },

  track(eventName, payload = {}) {
    const event = {
      name: eventName,
      payload,
      timestamp: new Date().toISOString()
    };
    if (this.provider) {
      try {
        this.provider(event);
      } catch {
        // Analytics must never break the app.
      }
    }
    if (window.ISTRIVA?.featureFlags?.isEnabled("debugAnalytics")) {
      console.info("[ISTRIVA analytics]", event);
    }
  }
};
