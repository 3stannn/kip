---
name: glisse
description: Build or refine React interfaces with Glisse's Liquid Glass components. Use when the user requests Glisse or invokes /kip glisse or $kip glisse.
---

# Glisse

Use [Glisse](https://glisse.kelvinzhang.com/) for the requested Liquid Glass interface. The npm package is `glisse`; it is a React component library, not an agent runner. This guidance was verified against version 0.4.3.

For `/kip glisse <instructions>`, `$kip glisse <instructions>`, or “use Kip with Glisse to …”, treat the remaining instructions as the task and continue through implementation and relevant verification. If invoked without a task, explain that Glisse mode builds React Liquid Glass interfaces and ask what to build; do not modify a project without an outcome.

## Use in a project

1. Inspect the target project's framework, package manager, and existing components. Glisse requires React and React DOM 18 or later. If the project uses another framework, explain the compatibility constraint and ask before migrating it to React.
2. Check whether `glisse` is already installed in the target project. If needed, run `npm install glisse` from that project's package root, using its existing package manager when different. Installing the package in this skill folder does not make imports resolve in another project. The local `package.json` and lockfile pin the inspected version for reference; they are not application dependencies.
3. Read the installed package's README and `dist/index.d.ts` for the current exports and component props. Use actual Glisse components rather than recreating their appearance with generic blur styles. Styles are included by the component entry point; the package also exports `glisse/styles.css` when explicit style loading is needed. For server-rendered React projects, keep interactive components in a client boundary and verify the framework build.
4. Keep the user's requested layout and behavior. Use semantic controls, accessible names for icon buttons and switches, keyboard operation, and readable contrast over the glass backdrop. Check responsive layouts and focus states. Run the target project's relevant checks and report what was verified.

```tsx
import { Button, Switch } from "glisse";

export function Settings() {
  return (
    <div>
      <Switch aria-label="Wi-Fi" defaultChecked />
      <Button variant="filled">Continue</Button>
    </div>
  );
}
```

For additional examples, consult the [component documentation](https://glisse.kelvinzhang.ca) or [upstream repository](https://github.com/0kzh/glisse). Preserve the target project's existing dependency versions and lockfile conventions.
