window.ISTRIVA = window.ISTRIVA || {};

(function initShare() {
  const { CONSTANTS } = window.ISTRIVA;

  function encodePayload(payload) {
    const json = JSON.stringify({ v: CONSTANTS.SHARE_VERSION, ...payload });
    if (typeof TextEncoder !== "undefined") {
      const bytes = new TextEncoder().encode(json);
      let binary = "";
      bytes.forEach((b) => { binary += String.fromCharCode(b); });
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodePayload(token) {
    if (!token) return null;
    try {
      const padded = token.replace(/-/g, "+").replace(/_/g, "/");
      const pad = padded.length % 4 ? "=".repeat(4 - (padded.length % 4)) : "";
      const binary = atob(padded + pad);
      let json;
      if (typeof TextDecoder !== "undefined") {
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        json = new TextDecoder().decode(bytes);
      } else {
        json = decodeURIComponent(escape(binary));
      }
      const data = JSON.parse(json);
      if (data.v !== CONSTANTS.SHARE_VERSION) return null;
      return data;
    } catch {
      return null;
    }
  }

  function buildShareState({
    lang,
    region,
    date,
    family,
    weatherMode,
    variantIndex,
    stopIds,
    lockedIds,
    planName
  }) {
    return {
      lang,
      region,
      date: date || new Date().toISOString().slice(0, 10),
      family: {
        adults: family.adults,
        children: family.children,
        childAges: family.childAges,
        pace: family.pace,
        budget: family.budget,
        interests: family.interests,
        requirements: family.requirements,
        startTime: family.startTime,
        endTime: family.endTime,
        transport: family.transport
      },
      weatherMode,
      variantIndex: variantIndex || 0,
      stopIds: stopIds || [],
      lockedIds: lockedIds || [],
      planName: planName || ""
    };
  }

  function buildShareUrl(state) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("plan", encodePayload(state));
    if (state.lang) url.searchParams.set("lang", state.lang);
    if (state.region) url.searchParams.set("destination", state.region);
    return url.toString();
  }

  function parseShareFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return decodePayload(params.get("plan"));
  }

  window.ISTRIVA.share = {
    encodePayload,
    decodePayload,
    buildShareState,
    buildShareUrl,
    parseShareFromUrl
  };
})();
