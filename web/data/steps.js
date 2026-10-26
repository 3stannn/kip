export const steps = [
  {
    title: "Bring Kip home.",
    label: "Clone",
    text: "Clone Kip from GitHub. Git and Node.js 22+ are all the installer needs.",
    command: "git clone https://github.com/3stannn/kip.git\ncd kip",
    note: "No npm dependencies, Kip account, or API key needed.",
  },
  {
    title: "One install. Every project.",
    label: "Install",
    text: "Install the skill globally for Codex, Claude Code, and Antigravity, then restart your host.",
    command: "node bin/kip.js install",
    note: "Use --host codex, --host claude, or --host antigravity to select one host. Existing skill folders are preserved.",
  },
  {
    title: "A little instruction goes a long way.",
    label: "Invoke",
    text: "Open your project in your coding chat. Use $kip in Codex or /kip in Claude Code and Antigravity, followed by your purpose and instructions.",
    command: "$kip build Create an accessible React login and verify it.",
    note: "You can also say ‘Use Kip to fix mobile overflow.’ The host can select Kip implicitly when its description matches your task.",
  },
  {
    title: "Keep working where you are.",
    label: "Create",
    text: "Kip selects relevant guidance, makes the requested changes, and verifies them with your current chat’s tools.",
    command:
      "/kip fix Resolve dashboard overflow on mobile and check the layout.",
    note: "This example uses Claude Code or Antigravity. Kip adds no sign-in flow; your host keeps its own model, access requirements, and permissions.",
  },
];
