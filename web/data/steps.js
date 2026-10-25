export const steps = [
  {
    title: "Make yourself at home.",
    label: "Install",
    text: "Install Codex CLI, then install Kip from the downloaded package folder. Move into your project and initialize it.",
    command:
      "npm install --global @openai/codex\nnpm install --global .\ncd /path/to/your-project\nkip install",
    note: "Requires Node.js 22+. Your .kip folder holds config and editable skills. Existing settings are preserved.",
  },
  {
    title: "Bring your account along.",
    label: "Sign in",
    text: "Sign in with your ChatGPT account in the browser, then check your connection. Kip reuses an existing Codex ChatGPT sign-in.",
    command: "kip login\nkip status",
    note: "No API key needed. Your account must have Codex access; workspace policies and usage limits apply.",
  },
  {
    title: "A good plan comes first.",
    label: "Plan",
    text: "Describe a small, concrete task and include only the files it needs. Preview the model selection, relevant skills, and context size.",
    command: 'kip plan "Build an accessible React login" --file src/App.jsx',
    note: "Plan works offline. No sign-in or model usage required.",
  },
  {
    title: "Ready when you are.",
    label: "Run",
    text: "Run your task through Codex using your signed-in ChatGPT account. The response and reported usage are saved locally for review.",
    command: 'kip run "Build an accessible React login" --file src/App.jsx',
    note: "Uses your account’s Codex allowance. Review returned code before applying it. Codex may make multiple model requests during a run.",
  },
];
