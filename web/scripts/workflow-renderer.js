(function () {
  const skillHref = "../exam-variation.skill";

  function workflowMarkup(key, workflows) {
    const data = workflows[key];
    const previousLabel = data.previous === "home" ? "Back to choose" : `Back to ${workflows[data.previous].letter}`;
    const nextLabel = data.next === "home" ? "Choose another workflow" : `Next: ${workflows[data.next].letter}`;

    return `
      <div class="shell workflow-page">
        <div class="workflow-hero">
          <div>
            <p class="eyebrow">Workflow ${data.letter}</p>
            <h1>${data.name}</h1>
          </div>
          <aside class="summary-card">
            <h2>${data.shortName}</h2>
            <p>${data.description}</p>
            <a class="button button-primary" href="${skillHref}" download>Download skill</a>
          </aside>
        </div>

        <p class="lede">${data.summary}</p>

        <div class="content-grid">
          <section class="page-panel" aria-labelledby="${key}-checklist-title">
            <h2 id="${key}-checklist-title">Checklist</h2>
            <ol class="checklist">
              ${data.checklist.map((item, index) => {
                const id = `check-${key}-${index + 1}`;
                return `<li><input id="${id}" type="checkbox"><label for="${id}">${item}</label></li>`;
              }).join("")}
            </ol>
          </section>

          <section class="page-panel" aria-labelledby="${key}-prompt-title">
            <h2 id="${key}-prompt-title">Prompt guide</h2>
            <div class="prompt-box">
              <div class="prompt-toolbar">
                <div>
                  <div class="prompt-label">Guide prompt</div>
                  <strong>${data.name}</strong>
                </div>
                <button class="copy-button" type="button" data-copy="${key}">Copy prompt</button>
              </div>
              <textarea readonly spellcheck="false">${data.prompt}</textarea>
            </div>
          </section>
        </div>

        <nav class="pager" aria-label="${data.name} navigation">
          <a class="button" href="#${data.previous}">${previousLabel}</a>
          <a class="button button-primary" href="#${data.next}">${nextLabel}</a>
        </nav>
      </div>`;
  }

  function ensureWorkflowPages() {
    const workflows = window.CPD_WORKFLOWS;

    Object.keys(workflows).forEach((key) => {
      const page = document.querySelector(`[data-page="${key}"]`);

      if (page && !page.innerHTML.trim()) {
        page.innerHTML = workflowMarkup(key, workflows);
      }
    });
  }

  window.CPD_RENDERER = {
    ensureWorkflowPages
  };
})();
