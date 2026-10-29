# Website design: Interactive indie craft (Bendy, Clucky, Keeby, Kip)

Use this as Kip's default visual system and interaction specification for new non-portfolio websites, product landing pages, and substantial redesigns. Portfolio websites use `portfolio-design.md`. Explicit briefs and established brand conventions take precedence; small repairs preserve surrounding conventions.

Read [frontend-system.md](frontend-system.md) first. Its single-family typography, readable scale, and shared component rules govern this reference. The patterns below are optional examples for products whose behavior benefits from demonstration, not required sections or decorations. A clear product explanation or real screenshot may be the right hero. Do not add audio, counters, mascots, or bento cards merely to follow this reference.

This reference synthesizes the design and engineering patterns of viral, high-craft interactive indie applications—specifically **Bendy** (`trybendy.app`), **Clucky** (`tryclucky.com`), **Keeby** (`getkeeby.com`), and **Kip**'s own website. It teaches how to build websites that visitors do not just read, but *play with*.

---

## 1. The Core Philosophy: Playable Toy Over Passive Pitch

Standard SaaS and corporate websites treat the landing page as a passive billboard: marketing adjectives, static screenshots, feature grids, and stock illustrations.

**The interactive indie standard inverts this:**
1. **Demonstrate meaningful behavior:** When appropriate, the hero can be an in-browser interaction with the core product. Visitors immediately experience the app's tactile character before reading any sales pitch.
   - *Bendy (`trybendy.app`):* A CSS 3D MacBook whose screen physically folds, tilts, blurs, and shades in real time as the visitor scrolls the page or drags a slider.
   - *Keeby (`getkeeby.com`):* A live mechanical keyboard soundboard. Visitors click switches or press keys on their physical keyboard to trigger authentic spatial mechanical keystroke audio with a reactive camera-notch visualizer.
   - *Clucky (`tryclucky.com`):* An expressive rooster mascot with a "Hey, click me!" callout. Clicking triggers multi-phase SVG flipbook animations (sleeping → shocked → waving → settling), plays randomized authentic rooster cluck audio, and turns interactive alarm dials linked to scroll.
2. **Useful feedback:** Controls respond visibly and consistently. Sound and physical effects are optional product behaviors, never defaults for ordinary navigation.
3. **Evidence:** Use real product output or supplied usage evidence. A community counter is appropriate only when relevant and backed by real data.
4. **Honest Craft:** No stock photography or invented claims. Real looping `<video>` clips, interactive settings sliders, and transparent "Private by design / on-device" security cards.

---

## 2. Visual System & Design Tokens

The visual style is warm and restrained: clean off-white surfaces, deep ink typography, and consistent shared controls. Use tactile treatments only where they help explain the product.

### Color Tokens

| Role | Light Theme (Default) | Dark Theme (When Supported) | Usage |
|---|---|---|---|
| Page Background | `#f5f5f5` | `#0f0f12` | Main page canvas |
| Surface / Cards | `#ffffff` | `#1a1a1f` | Elevated cards, stage panels, bento tiles |
| Primary Ink | `#111111` | `#f0f0f2` | Headings, primary text, dark buttons |
| Body / Charcoal | `#2e2e33` | `#c8c8cc` | Paragraph copy, list items |
| Muted Text | `#6f6f73` | `#8a8a90` | Subtitles, labels, captions, metadata |
| Faint / Hairlines | `#efefef` / `#e5e5e5` | `#26262c` / `#32323a` | Dividers, card borders, subtle outlines |
| Highlight / Tint | `#fafafa` | `#222228` | Hover states, disabled tracks |
| Live / Active Green | `#78907b` / `#2f9e5b` | `#8fa892` / `#5fd08a` | Live counter dot, active status indicator |
| Warm Brand Accent | Contextual (e.g. soft blue `#93b4e8` or amber `#ff9500`) | Contextual | Selective brand highlights and interactive active states |

### Typography & Scale

Use the semantic roles and increment-based scale in [frontend-system.md](frontend-system.md) for all content and controls. Choose one family, Geist by default, and use its different weights, true italics, or supported variable styles for deliberate role-based variation. Keep labels, body, item titles, and headings distinct while reusing tokens across sections. The shared reference owns the default sizes and responsive bounds; no secondary mono, pixel, or serif font and no 11–13px micro-label register.

### Shape & Geometry

- **Controls:** Use shared control variants and geometry. Fully rounded pills are reserved for real tags or discrete state; do not turn every CTA, price, link, or status into a pill.
- **Grouped panels:** Use the shared panel radius (16px by default), semantic hairline border, and a soft shadow only when elevation communicates a role. A bento layout is optional, not a reason to box every section.
- **Stage Width:** Focused single-column reading and interactive stage (`max-width: 640px` to `800px` centered), expanding to multi-column bento grids (`max-width: 1040px` to `1200px`) where feature comparisons or media tiles genuinely benefit.

---

## 3. Optional interactive patterns

### Pattern A: The Playable Simulation Hero (CSS 3D / State Machine)

Build a live, interactive CSS-based model or SVG state machine representing the product.

#### Recipe: CSS 3D Laptop / Screen Tilt (Bendy style)
Use container units (`cqw`, `cqh`) or proportional percentages so the device scales seamlessly to any viewport width:
```html
<div class="stage">
  <div class="mac" id="mac">
    <div class="lid" id="lid">
      <div class="screen">
        <div class="screen-art sharp">...</div>
        <div class="screen-art blurred">...</div>
        <div class="screen-shade" id="shade"></div>
        <div class="notch"></div>
      </div>
    </div>
    <div class="deck"><div class="lip"></div></div>
  </div>
  <p class="caption">Scroll. The screen bends, blurs and shades in real time.</p>
</div>
```
```css
.mac {
  width: 100%;
  aspect-ratio: 16 / 10;
  perspective: 1000px;
  position: relative;
}
.lid {
  width: 100%;
  height: 100%;
  transform-origin: 50% 100%;
  transform: rotateX(calc(var(--bend-angle, 0deg)));
  transition: transform 60ms linear;
  will-change: transform;
}
.screen-shade {
  position: absolute; inset: 0;
  background: #000;
  opacity: var(--shade-opacity, 0);
  pointer-events: none;
}
```

#### Recipe: Interactive Mascot / Character Flipbook (Clucky style)
Pair an SVG sprite or frame sequence with state transitions:
```tsx
type MascotPhase = "sleeping" | "shocked" | "waving" | "settling";

export function InteractiveMascot({ onInteract }: { onInteract: () => void }) {
  const [phase, setPhase] = useState<MascotPhase>("sleeping");

  const handleClick = () => {
    onInteract();
    if (phase === "sleeping" || phase === "settling") {
      setPhase("shocked");
    } else if (phase === "shocked") {
      setPhase("waving");
    }
  };

  return (
    <button type="button" className="mascot-button" onClick={handleClick} aria-label="Interact with mascot">
      <div className={`mascot-art is-${phase}`}>
        {/* Flipbook SVG frames or animated vector elements */}
      </div>
      <span className="click-prompt">Hey, click me!</span>
    </button>
  );
}
```

---

### Pattern B: Tactile Audio & Sound Design

Sound turns visual interactions into memorable physical sensations. Follow these strict engineering rules:
1. **User-Gesture Bound:** Never play audio unprompted or on scroll alone. Audio plays on pointer clicks, button presses, or keydown events.
2. **Audio Pooling & Randomization:** Do not replay a single identical audio file. Pool 4–8 variations (e.g. `cluck-01.mp3` through `cluck-08.mp3` or distinct switch keystrokes) to produce natural acoustic variance:
```ts
class SoundPool {
  private audioList: HTMLAudioElement[] = [];
  private lastIndex = -1;

  constructor(sources: string[]) {
    if (typeof window !== "undefined") {
      this.audioList = sources.map((src) => {
        const a = new Audio(src);
        a.preload = "auto";
        return a;
      });
    }
  }

  playRandom() {
    if (!this.audioList.length) return;
    let idx = Math.floor(Math.random() * this.audioList.length);
    if (idx === this.lastIndex && this.audioList.length > 1) {
      idx = (idx + 1) % this.audioList.length;
    }
    this.lastIndex = idx;
    const sound = this.audioList[idx];
    sound.currentTime = 0;
    sound.play().catch(() => {}); // Safely swallow browser policy blocks
  }
}
```
3. **Physical Keystroke Listeners (Keeby style):** For keyboard, audio, or utility apps, attach global or focused `window.addEventListener("keydown", ...)` handlers so visitors typing on their laptop keyboard instantly hear the app's sound design.

---

### Pattern C: Scroll-Linked Scrubbing & Dials

Use smooth scrolling (e.g. `lenis`) and bind the scroll progress to numerical values, rotary dials, or 3D rotations:
```ts
// Calculate normalized scroll progress: 0.0 -> 1.0
const scrollY = window.scrollY;
const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

// Apply to CSS variables without DOM thrashing
element.style.setProperty("--bend-angle", `${progress * 65}deg`);
element.style.setProperty("--shade-opacity", `${progress * 0.7}`);
```
For rotary dials (hours, minutes, angle degrees), render numbers along an arc using trigonometric positioning (`R + M * cos(angle)`, `R + M * sin(angle)`) so the dial physically rotates as users scroll or drag.

---

### Pattern D: Live Community Counter Pill

Place a live global counter pill in the top-right corner (or fixed bottom on phones) to create shared community atmosphere:
```html
<p class="live-counter" title="Total interactions made by visitors">
  <span class="status-dot"></span>
  <strong>48,219</strong>
  <span>bends and counting</span>
</p>
```
- **Batched Persistence:** When a visitor clicks, increment the counter optimistically in the UI. Queue increments and flush every 1–2 seconds via a batched `POST` request with `keepalive: true` (ensuring completion on page navigation or tab close).
- **Graceful Fallback:** Show a cached real value with a clear stale state, or omit the counter if unavailable. Never invent a baseline or imply a local count is global.

---

### Pattern E: Bento Feature Cards & Looping Uncut Media

Use grouped media cards only when the content benefits from that structure:
1. **Uncut Looping Video:** Use silent, looping MP4/WebM videos (`autoplay muted loop playsinline preload="metadata"`) demonstrating real features recorded on real hardware (no fake device mockups, no video cuts).
2. **Interactive Controls in Cards:** Place real working controls inside bento cards: switch style pickers, slider adjustments, sound test buttons.
3. **Privacy & Architecture Callout:** Dedicated bento card for "On-device / No account / Private by design" explaining offline operation, security boundaries, and licensing terms plainly.

---

## 4. Building the Purchase & Action Row

When a purchase flow is actually in scope, use the shared readable action variants. The following are optional content patterns, not required decorations:
- **Purchase action:** A shared high-contrast button variant with a clear action and real price when supplied; do not require an embedded badge or arrow:
  ```html
  <a href="/buy" class="button-cta">
    <span>Buy Bendy</span>
    <span class="amount">$4.99</span>
  </a>
  ```
- **Bonus / Cross-Sell Badge:** A small secondary card beside the button highlighting an indie bundle or bonus perk (e.g., *"Get Keeby for free too! A license code lands in your inbox right after purchase"*).
- **Clear System Requirements:** Single clean note under the button specifying required OS version, compatible chips, and permissions.

---

## 5. Accessibility, Motion & Quality Safeguards

1. **`prefers-reduced-motion` Contract:**
   - Any continuous rotation, 3D device tilt, scroll-scrubbing angle, or flipbook animation must be disabled when `prefers-reduced-motion: reduce` is detected.
   - Fall back to a sharp, beautiful static poster illustration or neutral resting state.
2. **Audio Consideration:**
   - All sound effects must be user-initiated (never autoplay on page load).
   - Audio failures must be caught cleanly (`.catch(() => {})`) to avoid uncaught promise exceptions in browsers with strict audio restrictions.
3. **Responsive Reflow:**
   - On desktop (≥900px): Fixed or absolute live counter in the top-right; centered stage; side-by-side purchase row.
   - On mobile (≤900px): Live counter moves to a floating bottom pill; stage padding scales to 16px–24px; purchase row stacks vertically with full-width tap targets (≥44px height); 3D transforms scale proportionally.
4. **Browser Inspection:**
   - Always verify the interactive website rendered in actual browser viewports at desktop (1280px), tablet (768px), and phone (390px) widths before declaring the implementation complete.
