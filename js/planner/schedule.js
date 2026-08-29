window.ISTRIVA = window.ISTRIVA || {};

(function initSchedule() {
  function parseTime(value) {
    const [h, m] = String(value || "09:00").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  function formatTime(minutes) {
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  function haversineKm(a, b) {
    if (!a?.lat || !b?.lat) return 0.5;
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }

  function transportSpeedKmh(transport) {
    return { walk: 4, bike: 12, car: 35, transit: 25, mixed: 20 }[transport] || 20;
  }

  function buildSchedule(stops, family) {
    let cursor = parseTime(family.startTime || "09:00");
    const end = parseTime(family.endTime || "19:00");
    const buffer = family.pace === "relaxed" ? 25 : family.pace === "active" ? 10 : 15;
    const speed = transportSpeedKmh(family.transport);

    return stops.map((stop, index) => {
      const start = cursor;
      const duration = stop.durationMinutes || 60;
      const next = stops[index + 1];
      let travelKm = 0;
      let travelMin = 0;
      if (next) {
        travelKm = haversineKm(stop.coordinates, next.coordinates);
        travelMin = Math.max(5, Math.round((travelKm / speed) * 60));
      }
      cursor = start + duration + (next ? travelMin + buffer : 0);
      return {
        ...stop,
        startTime: formatTime(start),
        endTime: formatTime(start + duration),
        durationMinutes: duration,
        travelKm,
        travelMin,
        fitsWindow: cursor <= end
      };
    });
  }

  function summarize(schedule, family) {
    const walkKm = schedule.reduce((sum, s, i) => {
      if (family.transport === "walk") return sum + (s.travelKm || 0);
      return sum + (s.travelKm || 0) * 0.3;
    }, 0);
    const driveMin = schedule.reduce((sum, s) => sum + (s.travelMin || 0), 0);
    const durationMin = schedule.reduce((sum, s) => sum + (s.durationMinutes || 0) + (s.travelMin || 0), 0);
    const fitsWindow = schedule.every((s) => s.fitsWindow !== false);
    return {
      stopCount: schedule.length,
      walkKm: Math.round(walkKm * 10) / 10,
      driveMin,
      durationHours: Math.round((durationMin / 60) * 10) / 10,
      fitsWindow,
      budget: family.budget,
      weatherFit: "good"
    };
  }

  window.ISTRIVA.schedule = {
    parseTime,
    formatTime,
    haversineKm,
    buildSchedule,
    summarize
  };
})();
