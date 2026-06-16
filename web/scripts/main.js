(function () {
  let activeModalTrigger = null;

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

  function openModal(button) {
    const modal = document.querySelector(`#${button.dataset.openModal}`);

    if (!modal) {
      return;
    }

    activeModalTrigger = button;
    modal.hidden = false;
    modal.querySelector("[data-close-modal]")?.focus();
  }

  function closeModal(modal) {
    modal.hidden = true;
    activeModalTrigger?.focus();
    activeModalTrigger = null;
  }

  window.addEventListener("hashchange", window.CPD_ROUTER.route);
  document.addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-copy-prompt]");
    const openButton = event.target.closest("[data-open-modal]");
    const closeButton = event.target.closest("[data-close-modal]");
    const modalBackdrop = event.target.classList.contains("modal-backdrop") ? event.target : null;

    if (copyButton) {
      copyPrompt(copyButton);
    }

    if (openButton) {
      openModal(openButton);
    }

    if (closeButton) {
      closeModal(closeButton.closest(".modal-backdrop"));
    }

    if (modalBackdrop) {
      closeModal(modalBackdrop);
    }
  });
  document.addEventListener("keydown", (event) => {
    const openModalElement = document.querySelector(".modal-backdrop:not([hidden])");

    if (event.key === "Escape" && openModalElement) {
      closeModal(openModalElement);
    }
  });
  window.CPD_ROUTER.route();
})();
