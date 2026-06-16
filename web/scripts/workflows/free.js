(function () {
  window.CPD_WORKFLOWS = window.CPD_WORKFLOWS || {};

  window.CPD_WORKFLOWS.free = {
    letter: "A",
    name: "Free Claude workflow",
    shortName: "Free Claude",
    description: "Best for first contact, no paid account, or a short live CPD demonstration.",
    summary: "Start small: compress the exam paper to save tokens, install the skill, then variate only the first two questions.",
    checklist: [
      "Choose exam paper.",
      "Compress exam paper to save tokens at <a href=\"https://www.ilovepdf.com/compress_pdf\" target=\"_blank\" rel=\"noopener noreferrer\">iLovePDF Compress PDF</a>.",
      "Sign up to Claude.",
      "Download <strong>exam-variation.skill</strong> from this page.",
      "Go to Claude sidebar &gt; Customise &gt; Skills &gt; Upload, then upload the skill."
    ],
    prompt: `Use the exam skill to variate the first 2 questions.

Keep the original question structure, command words, mark values, page order, and difficulty as close as possible.

Only change the contextual keywords, data values, names, examples, or surface details needed to create a fresh version.

After the variation, provide:
1. The varied version of questions 1 and 2.
2. A short change log listing what was altered.
3. Any checks I should do before using this with students.`,
    previous: "home",
    next: "pro"
  };
})();
