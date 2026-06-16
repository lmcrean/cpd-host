(function () {
  async function copyPrompt(button) {
    const promptBox = button.closest(".prompt-box");
    const prompt = promptBox ? promptBox.querySelector("textarea") : null;

    if (!prompt) {
      return;
    }

    await navigator.clipboard.writeText(prompt.value);
    button.textContent = "Copied";

    window.setTimeout(() => {
      button.textContent = "Copy prompt";
    }, 1400);
  }

  window.addEventListener("hashchange", window.CPD_ROUTER.route);
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy-prompt]");

    if (button) {
      copyPrompt(button);
    }
  });
  window.CPD_ROUTER.route();
})();
