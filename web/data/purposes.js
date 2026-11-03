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
    name: "ask",
    description: "Answer questions without edits",
    detail:
      "Answer using relevant notes and source inspection. No edits, reports, note writes, profile saves, or commands that generate files.",
  },
];

export const purposeNames = purposes.map(({ name }) => name);
