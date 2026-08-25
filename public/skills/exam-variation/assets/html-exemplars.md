# HTML Exemplar Process

Use these files as the canonical HTML structures for exam variations:

- `exemplar-question-paper.html` - student-facing question paper.
- `exemplar-mark-scheme.html` - teacher-facing OCR-style mark scheme.
- `exemplar-quality-assurance-notes.html` - internal QA notes.

They were validated against OCR H446/02 print-to-PDF output. Copy their CSS and structural patterns exactly unless the user explicitly asks for a different format.

## Required Output

Produce three separate HTML documents per variation, in this order:

1. Question Paper
2. Mark Scheme
3. Quality Assurance Notes

Do not combine the three documents into one HTML file.

## Question Paper Rules

- Use `exemplar-question-paper.html`.
- Marks sit at the right end of the final dotted answer line via `<span class="endmark">[n]</span>` inside the last `.aline`.
- Questions without answer lines use `<p class="markrow">[n]</p>` right-aligned after the answer area.
- Do not bold variated keywords in the QP. Keep `class="changed"` for traceability only; it must render as normal weight.
- Preserve OCR-style headers, instructions, answer lines, code blocks, blank lines, tables, and print rules.

## Mark Scheme Rules

- Use `exemplar-mark-scheme.html`.
- Use OCR table format: one table per question.
- The Question column must be split into number, letter, and roman columns.
- Include Answer/Indicative content, Marks, and Guidance columns.
- Guidance notes use `.red`.
- Each question table ends with a grey `.totalrow`.
- Banded questions put band descriptors in the Answer column and AO indicative points in Guidance.
- Changed terms are bolded in the MS.
- Yellow `.verify` boxes hold re-computed answer checks.

## Quality Assurance Rules

- Use `exemplar-quality-assurance-notes.html`.
- Include a per-subquestion terminology mapping table with columns:
  - Question
  - Original term
  - Variation term
  - Quality notes - does it sufficiently variate?
- Each mapping row must include one verdict badge:
  - `STRONG`
  - `PARTIAL`
  - `UNCHANGED`
- Follow the mapping table with mark total verification and computational verification boxes.
- This document is internal only and must never be given to students.

## Generation Workflow

1. Read the relevant exemplar file before writing that document.
2. Replace exemplar content with the varied paper content while preserving classes, table structures, and print CSS.
3. Verify marks, AOs, calculations, code traces, and terminology mappings.
4. Confirm that the three HTML outputs are separate and that the paper total matches the original.
