import React from "react";
import { Copy } from "./Copy.jsx";
import { WindowChrome } from "./WindowChrome.jsx";

export function CodeBlock({ text, title = "your-project — zsh" }) {
  return (
    <div className="code-block">
      <WindowChrome title={title}>
        <Copy text={text} />
      </WindowChrome>
      <pre className="px-5 py-5">
        <code>{text}</code>
      </pre>
    </div>
  );
}
