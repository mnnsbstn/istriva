window.ISTRIVA = window.ISTRIVA || {};

(function initOnboarding() {
  let step = 0;

  function dialog() {
    return document.querySelector("#onboarding-dialog");
  }

  function show() {
    const family = window.ISTRIVA.storage.getFamily();
    if (family.onboardingCompleted) return;
    step = 0;
    renderStep();
    dialog()?.showModal();
    window.ISTRIVA.analytics.track("onboarding_started");
  }

  function renderStep() {
    const body = document.querySelector("#onboarding-body");
    const i18n = window.ISTRIVA.i18n;
    const titles = ["onboarding.stepRegion", "onboarding.stepFamily", "onboarding.stepPreferences"];
    document.querySelector("#onboarding-step-title").textContent = i18n.t(titles[step] || titles[0]);
    if (step === 0) {
      body.innerHTML = `<p data-i18n="onboarding.stepRegion">${i18n.t("onboarding.stepRegion")}</p>
        <label class="destination-switcher compact">${document.querySelector("#destination-select")?.outerHTML || ""}</label>`;
    } else if (step === 1) {
      body.innerHTML = `<div id="onboarding-family-mount"></div>`;
      window.ISTRIVA.profileUI.renderForm(window.ISTRIVA.storage.getFamily());
      body.querySelector("#onboarding-family-mount").appendChild(document.querySelector("#profile-form"));
    } else {
      body.innerHTML = `<p data-i18n="onboarding.stepPreferences">${i18n.t("onboarding.stepPreferences")}</p>
        <p class="muted">${i18n.t("hero.intro")}</p>`;
    }
    document.querySelector("#onboarding-back").hidden = step === 0;
    document.querySelector("#onboarding-next").textContent = step >= 2
      ? i18n.t("onboarding.finish")
      : i18n.t("onboarding.next");
  }

  function finish(skipped = false) {
    const family = window.ISTRIVA.storage.getFamily();
    family.onboardingCompleted = true;
    window.ISTRIVA.storage.saveFamily(family);
    dialog()?.close();
    window.ISTRIVA.analytics.track(skipped ? "onboarding_skipped" : "onboarding_completed");
    window.ISTRIVA.app?.regeneratePlan?.();
  }

  function init() {
    document.querySelector("#onboarding-skip")?.addEventListener("click", () => finish(true));
    document.querySelector("#onboarding-next")?.addEventListener("click", () => {
      if (step < 2) {
        step += 1;
        renderStep();
        return;
      }
      if (document.querySelector("#profile-form")) {
        window.ISTRIVA.storage.saveFamily(window.ISTRIVA.profileUI.readForm());
      }
      finish(false);
    });
    document.querySelector("#onboarding-back")?.addEventListener("click", () => {
      step = Math.max(0, step - 1);
      renderStep();
    });
    setTimeout(show, 400);
  }

  window.ISTRIVA.onboarding = { init, show, finish };
})();
