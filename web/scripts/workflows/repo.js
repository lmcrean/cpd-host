(function () {
  window.CPD_WORKFLOWS = window.CPD_WORKFLOWS || {};

  window.CPD_WORKFLOWS.repo = {
    letter: "C",
    name: "Repository workflow",
    shortName: "Repository",
    description: "Best when you want repeatable outputs, visible validation, and tighter page-level control.",
    summary: "Use Codex or Claude Code to make the variation in files, then generate validation HTML that compares original and varied pages.",
    checklist: [
      "Add the original exam paper, mark scheme, and source files to the repository.",
      "Download <strong>exam-variation.skill</strong> from this page and keep it with the project notes.",
      "Ask Codex or Claude Code to variate the entire paper.",
      "Generate validation HTML that compares original and varied pages.",
      "Use the keyword highlight toggle to inspect changes and fix any page drift before publishing."
    ],
    prompt: `Use the exam skill to variate the entire paper, and produce a validation HTML to ensure each page is near identical other than altered keywords.

Provide a toggle option to highlight keywords.

Keep the original question structure, command words, mark values, page order, pagination, and difficulty as close as possible.

Only change contextual keywords, data values, names, examples, diagrams, scenarios, or surface details where a fresh version is needed.

In the repository, produce:
1. The varied paper output.
2. A validation HTML file comparing original and varied pages.
3. A keyword highlight toggle for changed terms.
4. A question-by-question change log.
5. A short QA summary covering layout match, marks, command words, and question intent.`,
    previous: "pro",
    next: "home"
  };
})();
