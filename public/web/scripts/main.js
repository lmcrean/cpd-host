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

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#039;");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+?)`/g, "<code>$1</code>");
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    const html = [];
    let inFence = false;
    let listType = null;
    let paragraph = [];

    function flushParagraph() {
      if (paragraph.length) {
        html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    }

    function openList(type) {
      if (listType === type) {
        return;
      }

      closeList();
      html.push(`<${type}>`);
      listType = type;
    }

    function closeList() {
      if (listType) {
        html.push(`</${listType}>`);
        listType = null;
      }
    }

    lines.forEach((line) => {
      if (line.startsWith("```")) {
        flushParagraph();
        closeList();
        html.push(inFence ? "</code></pre>" : "<pre><code>");
        inFence = !inFence;
        return;
      }

      if (inFence) {
        html.push(`${escapeHtml(line)}\n`);
        return;
      }

      if (!line.trim()) {
        flushParagraph();
        closeList();
        return;
      }

      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      const listItem = line.match(/^[-*]\s+(.+)$/);
      const orderedItem = line.match(/^\d+\.\s+(.+)$/);

      if (heading) {
        flushParagraph();
        closeList();
        html.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`);
      } else if (listItem || orderedItem) {
        flushParagraph();
        openList(listItem ? "ul" : "ol");
        html.push(`<li>${inlineMarkdown((listItem || orderedItem)[1])}</li>`);
      } else if (line === "---") {
        flushParagraph();
        closeList();
        html.push("<hr>");
      } else {
        paragraph.push(line.trim());
      }
    });

    flushParagraph();
    closeList();

    return html.join("");
  }

  function renderSkillFile(path, text, content) {
    if (path.endsWith(".html")) {
      content.className = "skill-file-preview html-preview";
      content.innerHTML = "";

      const iframe = document.createElement("iframe");
      iframe.title = `Preview of ${path.split("/").pop()}`;
      iframe.srcdoc = text;
      content.append(iframe);
      return;
    }

    if (path.endsWith(".md")) {
      content.className = "skill-file-preview markdown-preview";
      content.innerHTML = renderMarkdown(text);
      return;
    }

    content.className = "skill-file-preview text-preview";
    content.textContent = text;
  }

  async function loadSkillFile(path, modal) {
    const content = modal.querySelector("[data-skill-content]");
    const fileButtons = [...modal.querySelectorAll("[data-skill-file]")];

    if (!content) {
      return;
    }

    content.textContent = "Loading...";
    fileButtons.forEach((button) => {
      button.setAttribute("aria-current", String(button.dataset.skillFile === path));
    });

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      renderSkillFile(path, await response.text(), content);
    } catch (error) {
      content.className = "skill-file-preview text-preview";
      content.textContent = `Could not load ${path}.`;
    }
  }

  function openModal(button) {
    const modal = document.querySelector(`#${button.dataset.openModal}`);

    if (!modal) {
      return;
    }

    activeModalTrigger = button;
    modal.hidden = false;
    modal.querySelector("[data-close-modal]")?.focus();

    if (button.dataset.loadSkillFile) {
      loadSkillFile(button.dataset.loadSkillFile, modal);
    }
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
    const skillFileButton = event.target.closest("[data-skill-file]");
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

    if (skillFileButton) {
      loadSkillFile(skillFileButton.dataset.skillFile, skillFileButton.closest(".modal-backdrop"));
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
