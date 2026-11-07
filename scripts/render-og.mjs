#!/usr/bin/env node
// Renders og.html to public/kip-social-preview.jpg (1200×630, captured at 2×).
// Usage: npm run og   (set CHROME_PATH if Chrome is not in a standard spot)
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public", "kip-social-preview.jpg");
const WIDTH = 1200;
const HEIGHT = 630;

const chromePath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((candidate) => candidate && existsSync(candidate));
if (!chromePath) throw new Error("Chrome not found. Set CHROME_PATH.");

const server = await createServer({
  root,
  logLevel: "error",
  server: { host: "127.0.0.1", port: 0 },
});
await server.listen();
const { port } = server.httpServer.address();

const profile = mkdtempSync(path.join(tmpdir(), "kip-og-"));
const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "--hide-scrollbars",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

try {
  const endpoint = await new Promise((resolve, reject) => {
    let log = "";
    chrome.stderr.on("data", (chunk) => {
      log += chunk;
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) resolve(match[1]);
    });
    chrome.on("exit", () => reject(new Error(`Chrome exited:\n${log}`)));
  });

  const { origin } = new URL(endpoint.replace("ws://", "http://"));
  const target = await fetch(`${origin}/json/new?about:blank`, {
    method: "PUT",
  }).then((response) => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve));

  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    const handler = pending.get(message.id);
    if (!handler) return;
    pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send("Page.navigate", { url: `http://127.0.0.1:${port}/og.html` });

  const deadline = Date.now() + 30_000;
  for (;;) {
    const { result } = await send("Runtime.evaluate", {
      expression: "document.documentElement.dataset.ready === 'true'",
      returnByValue: true,
    });
    if (result.value) break;
    if (Date.now() > deadline) throw new Error("Scene never became ready.");
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const { data } = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 90,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
  });
  writeFileSync(output, Buffer.from(data, "base64"));
  console.log(`Wrote ${path.relative(root, output)}`);
  socket.close();
} finally {
  chrome.kill();
  await server.close();
  setTimeout(() => rmSync(profile, { recursive: true, force: true }), 500);
}
