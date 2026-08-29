window.ISTRIVA = window.ISTRIVA || {};

(function initNavigation() {
  const SECTIONS = ["today", "explore", "map", "saved"];

  function setActive(section) {
    if (!SECTIONS.includes(section)) section = "today";
    document.body.dataset.section = section;
    document.querySelectorAll("[data-nav-section]").forEach((el) => {
      const active = el.dataset.navSection === section;
      el.classList.toggle("active", active);
      if (el.tagName === "A" || el.tagName === "BUTTON") {
        el.setAttribute("aria-current", active ? "page" : "false");
      }
    });
    document.querySelectorAll("[data-section-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.sectionPanel !== section;
    });
    window.ISTRIVA.analytics.track("section_changed", { section });
  }

  function init() {
    document.querySelectorAll("[data-nav-section]").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(el.dataset.navSection);
      });
    });

    const hash = window.location.hash.replace("#", "");
    if (SECTIONS.includes(hash)) setActive(hash);
    else setActive("today");

    window.addEventListener("hashchange", () => {
      const next = window.location.hash.replace("#", "");
      if (SECTIONS.includes(next)) setActive(next);
    });
  }

  window.ISTRIVA.navigation = { init, setActive, SECTIONS };
})();
