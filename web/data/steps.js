export const steps = [
  {
    title: "Clone the source.",
    label: "Clone",
    text: "Clone Kip from GitHub. Git and Node.js 22+ are all the installer needs.",
    command: "git clone https://github.com/3stannn/kip.git\ncd kip",
    note: "No npm dependencies, Kip account, or API key needed.",
  },
  {
    title: "Install the skill.",
    label: "Install",
    text: "Install the skill globally for Codex, Claude Code, and Antigravity, then restart your host.",
    command: "node bin/kip.js install",
    note: "Use --host codex, --host claude, or --host antigravity to select one host. Already installed? Use the update guide below to refresh existing copies.",
  },
  {
    title: "Describe one outcome.",
    label: "Invoke",
    text: "Open your project in your coding chat. Use $kip in Codex or /kip in Claude Code and Antigravity, followed by your purpose and instructions.",
    command: "$kip build Create an accessible React login and verify it.",
    note: "You can also say ‘Use Kip to fix mobile overflow.’ The host can select Kip implicitly when its description matches your task.",
  },
  {
    title: "Keep working in your host.",
    label: "Work",
    text: "Kip delegates focused work and reviews the result for the purpose you chose. Plans return a plan; builds continue through implementation and appropriate checks.",
    command:
      "/kip fix Resolve dashboard overflow on mobile and check the layout.",
    note: "This example uses Claude Code or Antigravity. Kip reports what changed, what it verified, and any remaining limitation. Your host keeps its own model, access rules, and permissions.",
  },
];
