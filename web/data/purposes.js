export const purposes = [
  {
    name: "build",
    description: "Implement a task and verify it",
    detail:
      "Implement the requested change, verify it, and record useful project notes after review.",
  },
  {
    name: "fix",
    description: "Investigate and resolve an issue",
    detail:
      "Find the cause, make a focused fix, and verify the resulting behavior.",
  },
  {
    name: "plan",
    description: "Outline work before implementation",
    detail:
      "Investigate and return a plan in chat. Leave source and project notes unchanged.",
  },
  {
    name: "review",
    description: "Review code and report findings",
    detail:
      "Inspect the code and report actionable findings in chat. Leave source and project notes unchanged.",
  },
  {
    name: "ask",
    description: "Answer questions without edits",
    detail:
      "Answer using relevant notes and source inspection. No edits, reports, note writes, profile saves, or commands that generate files.",
  },
  {
    name: "deslop",
    description: "Improve an existing website",
    detail:
      "Use Kip’s bundled design skills to improve an existing site while preserving its brand, features, and stack. Inspect before and after in the browser.",
  },
  {
    name: "audit",
    description: "Audit security and report evidence",
    detail:
      "Use the bundled Cloudflare security-audit workflow. Leave target source and project notes unchanged; write separate audit reports with evidence and coverage gaps.",
  },
];

export const purposeNames = purposes.map(({ name }) => name);
