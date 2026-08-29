window.ISTRIVA = window.ISTRIVA || {};

window.ISTRIVA.featureFlags = {
  flags: {
    premiumPlanner: false,
    partnerOffers: false,
    sponsoredPois: false,
    calendarExport: false,
    pdfExport: false,
    debugAnalytics: false
  },

  isEnabled(flag) {
    return Boolean(this.flags[flag]);
  },

  set(flag, value) {
    if (Object.prototype.hasOwnProperty.call(this.flags, flag)) {
      this.flags[flag] = Boolean(value);
    }
  }
};
