---
name: exam-variation
description: Produce a variation of an exam paper (question paper and mark scheme) where contexts, names, and values are changed but mark allocations, assessment objectives, and mark scheme logic stay identical to the original. Use this skill whenever the user uploads an exam paper PDF or screenshot and asks for a variation, a scrambled version, a re-contexted paper, or a practice paper based on a real past paper. Triggers include "make a variation", "vary this paper", "change the context", "scramble this exam", "students keep googling the answers", or any mention of OCR J277, H446, QP/MS variation work. Works for any exam board or subject, one question at a time.
---

# Exam Variation Skill

Create a parallel version of a real exam paper that students cannot find online, while preserving everything that makes it a valid assessment.

## Core rules (non-negotiable)

1. **Change the surface, never the logic.** Swap contexts, names, company names, variable names, and numeric values. The mark scheme structure, mark allocations, assessment objectives (AOs), levels-of-response band descriptors, and the cognitive demand of every question must remain identical.
2. **Marks are fixed.** Every question and sub-question carries exactly the same marks as the original. Verify the paper total at the end and state it explicitly.
3. **Code questions:** rename all variables, functions, classes, and identifiers consistently across QP and MS. The algorithm and its trace behaviour must be unchanged unless values are deliberately varied, in which case re-trace and verify.
4. **Numeric questions:** choose new values of the same difficulty class (same bit lengths, same number of carries/borrows where feasible, same magnitude). Compute every answer before writing it into the mark scheme. Show working in the MS verification notes.
5. **Recallability audit:** verbatim passages are high risk even after relabelling. Rewrite sentence structure for cloze texts, word banks, tick-box options, and scenario preambles, not just the nouns.
6. **Original mark schemes can contain errors.** Verify traces, calculations, and data structure answers independently rather than copying them on trust.

## Workflow

Work one question at a time (including all sub-questions) to avoid context overload, then combine.

For each question:
1. Read the original question and its mark scheme from the uploaded PDF.
2. Choose a replacement context of equivalent familiarity and complexity.
3. Rewrite the question with the new context. Bold the changed keywords.
4. Rewrite the mark scheme: same mark points, same AO tags, same band descriptors, with context terms swapped and context-specific acceptable answers added where the original had them.
5. Verify: marks match, AOs match, any calculations or traces re-computed and confirmed.

After all questions:
- Build a terminology mapping table (original term to variation term).
- Build an AO grid and confirm the paper total matches the original.
- Run the recallability audit on the full variation.

## Output format

Produce **three separate HTML documents** per variation, in this order:

1. **Question Paper** - student-facing. Marks placed OCR-style at the right end of the final answer line (`<span class="endmark">` in the last `.aline`, or a right-aligned `markrow` after tables/code/blanks). Variated keywords are NOT bolded (keep `class="changed"` for traceability only).
2. **Mark Scheme** - teacher-facing. OCR table format: one table per question with a split Question column (number / letter / roman), Answer/Indicative content, Marks, Guidance columns; guidance notes in red; grey Total row per question. Banded (asterisk) questions put band descriptors in the Answer column and AO indicative points in Guidance. Changed terms ARE bolded here. Include yellow verify boxes with re-computed answers.
3. **Quality Assurance Notes** - internal only, never given to students. Contains: (a) a per-subquestion terminology mapping table with columns Question | Original | Variation | Quality notes, where each row carries a verdict badge: STRONG (variation defeats search and answer reuse), PARTIAL (some surface unchanged, with justification and mitigation), or UNCHANGED (generic theory that cannot be varied without changing the assessment); (b) a mark total verification table against the original; (c) computational verification boxes showing all re-derived answers; (d) a recallability audit summary.

**Read `assets/html-exemplars.md` before generating any HTML**, then read the matching standalone exemplar file for each document: `assets/exemplar-question-paper.html`, `assets/exemplar-mark-scheme.html`, and `assets/exemplar-quality-assurance-notes.html`. Copy their CSS and structural patterns exactly; they are teacher-validated against real OCR layout. Do not invent new CSS.

Each document prints to PDF via the browser (A4-friendly, `@media print` rules included in the exemplar CSS).

Only produce DOCX if the user explicitly asks for Word output and has file creation available. In that case read `/mnt/skills/user/docx-exam-paper-styling/SKILL.md` first if present.

If the paper is long and the response is at risk of truncating, complete as many full questions as possible and tell the user to reply "continue" to extend the current document.

## Verification checklist (run before declaring done)

- [ ] Per-question marks identical to original
- [ ] Paper total identical and stated
- [ ] AO allocations identical per sub-question
- [ ] All numeric answers computed and verified, working shown
- [ ] All code traces re-verified against renamed code
- [ ] No verbatim sentences surviving from the original scenario text
- [ ] Terminology mapping table complete
- [ ] Changed keywords bolded in MS only (QP unbolded)
- [ ] Three documents produced: QP, MS, QA notes
- [ ] QA table has per-subquestion rows each with a STRONG/PARTIAL/UNCHANGED verdict

## Future prompts

the user may iterate the variation further, the safest method is to do this gradually.