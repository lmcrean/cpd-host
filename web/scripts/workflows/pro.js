(function () {
  window.CPD_WORKFLOWS = window.CPD_WORKFLOWS || {};

  window.CPD_WORKFLOWS.pro = {
    letter: "B",
    name: "Claude $20 subscription workflow",
    shortName: "Claude $20",
    description: "Best when the whole paper can sit in one conversation with enough room for review.",
    summary: "Use the paid Claude workflow to install the skill, upload the full paper, and variate the whole paper in one guided pass.",
    checklist: [
      "Choose exam paper.",
      "Open Claude with the $20 subscription workflow.",
      "Download <strong>exam-variation.skill</strong> from this page.",
      "Go to Claude sidebar &gt; Customise &gt; Skills &gt; Upload, then upload the skill.",
      "Upload the full paper and ask Claude to variate the entire paper."
    ],
    prompt: `Use the exam skill to variate the entire paper.

Keep the original question structure, command words, mark values, page order, and difficulty as close as possible.

Only change contextual keywords, data values, names, examples, diagrams, scenarios, or surface details where a fresh version is needed.

Work through the paper question by question. After the variation, provide:
1. The full varied paper.
2. A question-by-question change log.
3. Any places where the mark scheme should be checked or lightly adjusted.
4. A final checklist confirming that marks, command words, and question intent have been preserved.`,
    previous: "free",
    next: "repo"
  };
})();
