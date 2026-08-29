window.ISTRIVA = window.ISTRIVA || {};

(function initProfileUI() {
  const dialog = () => document.querySelector("#profile-dialog");
  let lastFocus = null;

  function renderForm(family) {
    const root = document.querySelector("#profile-form");
    if (!root) return;
    const i18n = window.ISTRIVA.i18n;
    root.innerHTML = `
      <div class="profile-grid">
        <label><span data-i18n="plan.adults">${i18n.t("plan.adults")}</span>
          <input name="adults" type="number" min="1" max="8" value="${family.adults}"></label>
        <label><span data-i18n="plan.children">${i18n.t("plan.children")}</span>
          <input name="children" type="number" min="0" max="8" value="${family.children}"></label>
        <label><span data-i18n="profile.startTime">${i18n.t("profile.startTime")}</span>
          <input name="startTime" type="time" value="${family.startTime}"></label>
        <label><span data-i18n="profile.endTime">${i18n.t("profile.endTime")}</span>
          <input name="endTime" type="time" value="${family.endTime}"></label>
      </div>
      <div class="child-age-fields" id="profile-child-ages"></div>
      <fieldset class="chip-fieldset">
        <legend data-i18n="profile.transport">${i18n.t("profile.transport")}</legend>
        ${["walk", "car", "bike", "transit", "mixed"].map((v) => `
          <label class="chip"><input type="radio" name="transport" value="${v}" ${family.transport === v ? "checked" : ""}>
          ${i18n.t(`profile.transport${v[0].toUpperCase()}${v.slice(1)}`)}</label>`).join("")}
      </fieldset>
      <fieldset class="chip-fieldset">
        <legend data-i18n="profile.pace">${i18n.t("profile.pace")}</legend>
        ${["relaxed", "balanced", "active"].map((v) => `
          <label class="chip"><input type="radio" name="pace" value="${v}" ${family.pace === v ? "checked" : ""}>
          ${i18n.t(`plan.pace${v[0].toUpperCase()}${v.slice(1)}`)}</label>`).join("")}
      </fieldset>
      <fieldset class="chip-fieldset">
        <legend data-i18n="profile.budget">${i18n.t("profile.budget")}</legend>
        ${["low", "medium", "flexible"].map((v) => `
          <label class="chip"><input type="radio" name="budget" value="${v}" ${family.budget === v ? "checked" : ""}>
          ${i18n.t(`profile.budget${v[0].toUpperCase()}${v.slice(1)}`)}</label>`).join("")}
      </fieldset>
      <fieldset class="chip-fieldset">
        <legend data-i18n="profile.interests">${i18n.t("profile.interests")}</legend>
        ${window.ISTRIVA.CONSTANTS.INTERESTS.map((v) => `
          <label class="chip"><input type="checkbox" name="interests" value="${v}" ${family.interests.includes(v) ? "checked" : ""}>
          ${i18n.t(`profile.interest${v[0].toUpperCase()}${v.slice(1)}`)}</label>`).join("")}
      </fieldset>
      <fieldset class="chip-fieldset">
        <legend data-i18n="profile.requirements">${i18n.t("profile.requirements")}</legend>
        ${window.ISTRIVA.CONSTANTS.REQUIREMENTS.map((v) => `
          <label class="chip"><input type="checkbox" name="requirements" value="${v}" ${family.requirements.includes(v) ? "checked" : ""}>
          ${i18n.t(`profile.req${v[0].toUpperCase()}${v.slice(1)}`)}</label>`).join("")}
      </fieldset>
      <label class="profile-start-point"><span data-i18n="profile.startPoint">${i18n.t("profile.startPoint")}</span>
        <input name="startPoint" type="text" maxlength="80" value="${family.startPoint || ""}" placeholder="${i18n.t("profile.startPointHint")}"></label>
    `;
    renderChildAges(family);
    root.querySelector('[name="children"]')?.addEventListener("change", () => {
      const next = readForm();
      renderChildAges(next);
    });
  }

  function renderChildAges(family) {
    const wrap = document.querySelector("#profile-child-ages");
    if (!wrap) return;
    const i18n = window.ISTRIVA.i18n;
    wrap.innerHTML = Array.from({ length: family.children }, (_, i) => `
      <label><span>${i18n.t("plan.childAge", { n: i + 1 })}</span>
        <input class="child-age-input" type="number" min="0" max="17" value="${family.childAges[i] ?? ""}" data-age-index="${i}">
        <small>${i18n.t("plan.years")}</small></label>`).join("");
  }

  function readForm() {
    const root = document.querySelector("#profile-form");
    const fd = new FormData(root);
    const children = Number.parseInt(fd.get("children"), 10) || 0;
    const ages = [...root.querySelectorAll(".child-age-input")].map((input) => {
      const v = input.value;
      if (v === "") return null;
      const n = Number.parseInt(v, 10);
      return Number.isFinite(n) ? n : null;
    });
    return window.ISTRIVA.storage.normalizeFamily({
      adults: fd.get("adults"),
      children,
      childAges: ages,
      startTime: fd.get("startTime"),
      endTime: fd.get("endTime"),
      transport: fd.get("transport"),
      pace: fd.get("pace"),
      budget: fd.get("budget"),
      interests: fd.getAll("interests"),
      requirements: fd.getAll("requirements"),
      startPoint: fd.get("startPoint") || null,
      onboardingCompleted: true
    });
  }

  function open() {
    const dlg = dialog();
    if (!dlg) return;
    lastFocus = document.activeElement;
    renderForm(window.ISTRIVA.storage.getFamily());
    dlg.showModal();
    dlg.querySelector("input,button,select,textarea")?.focus();
    window.ISTRIVA.analytics.track("profile_opened");
  }

  function close() {
    dialog()?.close();
    lastFocus?.focus?.();
  }

  function save() {
    const family = readForm();
    window.ISTRIVA.storage.saveFamily(family);
    close();
    window.ISTRIVA.app?.onProfileSaved?.(family);
    window.ISTRIVA.analytics.track("profile_saved");
  }

  function init() {
    document.querySelector("#profile-open")?.addEventListener("click", open);
    document.querySelector(".profile")?.addEventListener("click", open);
    document.querySelector("#profile-save")?.addEventListener("click", save);
    document.querySelector("#profile-cancel")?.addEventListener("click", close);
    document.querySelector("#profile-cancel-2")?.addEventListener("click", close);
    dialog()?.addEventListener("cancel", (e) => {
      e.preventDefault();
      close();
    });
  }

  window.ISTRIVA.profileUI = { init, open, close, save, renderForm, readForm };
})();
