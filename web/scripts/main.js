(function () {
  async function copyPrompt(key, button) {
    await navigator.clipboard.writeText(window.CPD_WORKFLOWS[key].prompt);
    button.textContent = "Copied";

    window.setTimeout(() => {
      button.textContent = "Copy prompt";
    }, 1400);
  }

  window.CPD_RENDERER.ensureWorkflowPages();
  window.addEventListener("hashchange", window.CPD_ROUTER.route);
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy]");

    if (button) {
      copyPrompt(button.dataset.copy, button);
    }
  });
  window.CPD_ROUTER.route();
})();
