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
  {
    name: "unslop",
    description: "Fix what makes a site read as generated",
    detail:
      "Find invented proof, placeholder content, generic copy, dead controls, and template layouts on an existing site, then fix them in its own brand and stack. Missing real content is flagged, never invented.",
  },
  {
    name: "trim",
    description: "Cut the token cost of agent context",
    detail:
      "Shrink instruction files and skills your chats load, cutting what every session loads first. Every rule stays, and the report shows measured before and after estimates.",
  },
];

export const purposeNames = purposes.map(({ name }) => name);
