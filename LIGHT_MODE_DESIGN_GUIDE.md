# 1Sat Ordinals Light Mode Design Guide

## Executive Summary

This guide provides a complete light mode design system for the 1Sat Ordinals landing page that maintains the "premium tech" aesthetic while being intentionally designed rather than simply inverted. The design uses a sophisticated color palette based on OKLCH color space for better perceptual consistency across light and dark modes.

---

## 1. Complete Light Mode Color Palette

### Primary Colors

| Purpose | Hex | OKLCH | Usage |
|---------|-----|-------|-------|
| **Background** | #F7F5F0 | oklch(0.97 0.002 96) | Main page background - warm off-white |
| **Foreground** | #1A1410 | oklch(0.1 0.005 96) | Primary text color |
| **Card Background** | #FEFDFB | | Card/elevated surfaces |
| **Border** | #E5DFD5 | oklch(0.88 0.008 96) | Subtle borders and dividers |

### Accent & Interactive Colors

| Purpose | Hex | OKLCH | Usage |
|---------|-----|-------|-------|
| **Primary (Orange)** | #FF8C00 | oklch(0.65 0.21 65) | Button fills, accent text, key elements |
| **Primary-Foreground** | #FFFFFF | oklch(0.98 0.002 96) | Text on primary backgrounds |
| **Primary Light** | #FFD9B3 | oklch(0.85 0.09 70) | Primary backgrounds/highlights |
| **Primary Ultra Light** | #FFF4E6 | oklch(0.95 0.04 75) | Subtle backgrounds, hover states |

### Secondary & Muted Colors

| Purpose | Hex | OKLCH | Usage |
|---------|-----|-------|-------|
| **Secondary** | #F0EBE0 | oklch(0.92 0.02 96) | Secondary backgrounds |
| **Muted Foreground** | #6B6359 | oklch(0.48 0.02 65) | Secondary text, muted content |
| **Muted Medium** | #B8ADA0 | oklch(0.65 0.02 65) | Tertiary text, placeholders |
| **Border Light** | #E8E3DA | oklch(0.89 0.008 96) | Subtle dividers |
| **Border Medium** | #D9CEC1 | oklch(0.85 0.01 96) | Standard borders |

### Status Colors

| Purpose | Hex | OKLCH | Usage |
|---------|-----|-------|-------|
| **Destructive** | #D94A38 | oklch(0.55 0.2 25) | Error states, warnings |
| **Success** | #0D9488 | oklch(0.6 0.15 185) | Success states |
| **Warning** | #EA8C55 | oklch(0.65 0.15 60) | Warning alerts |

---

## 2. CSS Theme Configuration Updates

Replace the `.dark` theme section in `globals.css`:

```css
@theme {
  --font-sans:
    "Space Grotesk", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    sans-serif;
  --font-serif: "Spectral", ui-serif, Georgia, Cambria, Times New Roman, serif;
  --font-mono:
    "JetBrains Mono", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    monospace;

  /* Light mode (default) */
  --color-background: oklch(0.97 0.002 96);
  --color-foreground: oklch(0.1 0.005 96);
  --color-card: oklch(0.99 0 0);
  --color-card-foreground: oklch(0.1 0.005 96);
  --color-popover: oklch(0.99 0 0);
  --color-popover-foreground: oklch(0.1 0.005 96);
  --color-primary: oklch(0.65 0.21 65);      /* Orange #FF8C00 */
  --color-primary-foreground: oklch(0.98 0.002 96);
  --color-secondary: oklch(0.92 0.02 96);
  --color-secondary-foreground: oklch(0.1 0.005 96);
  --color-muted: oklch(0.95 0.01 96);
  --color-muted-foreground: oklch(0.48 0.02 65);
  --color-accent: oklch(0.85 0.09 70);       /* Light orange */
  --color-accent-foreground: oklch(0.1 0.005 96);
  --color-destructive: oklch(0.55 0.2 25);
  --color-destructive-foreground: oklch(0.98 0.002 96);
  --color-border: oklch(0.88 0.008 96);
  --color-input: oklch(0.88 0.008 96);
  --color-ring: oklch(0.65 0.21 65);

  --radius: 0rem;
  --radius-sm: 0rem;
  --radius-md: 0rem;
  --radius-lg: 0rem;
}

@layer base {
  :root {
    --tracking-normal: 0em;
  }

  .dark {
    --color-background: oklch(0.12 0.01 96);
    --color-foreground: oklch(0.98 0.002 96);
    --color-card: oklch(0.15 0.015 96);
    --color-card-foreground: oklch(0.98 0.002 96);
    --color-popover: oklch(0.14 0.015 96);
    --color-popover-foreground: oklch(0.98 0.002 96);
    --color-primary: oklch(0.82 0.22 96);
    --color-primary-foreground: oklch(0.1 0.01 96);
    --color-secondary: oklch(0.25 0.03 96);
    --color-secondary-foreground: oklch(0.95 0.05 96);
    --color-muted: oklch(0.2 0.02 96);
    --color-muted-foreground: oklch(0.65 0.02 96);
    --color-accent: oklch(0.25 0.03 96);
    --color-accent-foreground: oklch(0.82 0.22 96);
    --color-destructive: oklch(0.55 0.22 25);
    --color-destructive-foreground: oklch(0.98 0.005 25);
    --color-border: oklch(0.22 0.01 96);
    --color-input: oklch(0.22 0.01 96);
    --color-ring: oklch(0.82 0.22 96);
  }
}
```

---

## 3. Component-Specific Light Mode Replacements

### A. Page Background & Grid Pattern

**Current (Dark Mode):**
```tsx
// app/page.tsx
<div className="relative bg-black text-white overflow-hidden">
  {/* Grid Background */}
  <div
    className="fixed inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `
        linear-gradient(rgb(255, 140, 0) 1px, transparent 1px),
        linear-gradient(90deg, rgb(255, 140, 0) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
    }}
  />
```

**Light Mode Replacement:**
```tsx
// Key changes for light mode
<div className="relative bg-background text-foreground overflow-hidden">
  {/* Grid Background - More subtle in light mode */}
  <div
    className="fixed inset-0 opacity-[0.02]"
    style={{
      backgroundImage: `
        linear-gradient(rgb(255, 140, 0) 0.5px, transparent 0.5px),
        linear-gradient(90deg, rgb(255, 140, 0) 0.5px, transparent 0.5px)
      `,
      backgroundSize: "60px 60px",
    }}
  />
```

**Rationale:**
- Grid opacity reduced from 3% to 2% - the orange grid is more visible on light backgrounds
- Grid size increased from 50px to 60px for less visual noise
- Line width reduced to 0.5px for subtlety
- Uses Tailwind classes (`bg-background`, `text-foreground`) for automatic theme switching

### B. Architectural Borders (Vertical Dividers)

**Current (Dark Mode):**
```tsx
<div className="fixed inset-y-0 left-[10%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
<div className="fixed inset-y-0 left-[30%] w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
```

**Light Mode Adjustment:**
For light mode, we recommend increasing the opacity slightly because the orange color is darker in OKLCH space on light backgrounds. However, the current primary/20 and primary/15 should work fine. Test and adjust:

```tsx
// If borders are too faint in light mode, increase opacity:
<div className="fixed inset-y-0 left-[10%] w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent dark:via-primary/20" />
<div className="fixed inset-y-0 left-[30%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent dark:via-primary/15" />
```

### C. GraphicBlock Component (Angled Corners)

**Current:**
```tsx
function GraphicBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}>
      <CornerDecor className="top-0 left-0" />
      {/* Corner decorations */}
      {children}
    </div>
  );
}
```

**Light Mode Enhancement:**
```tsx
function GraphicBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
      }}
    >
      <CornerDecor className="top-0 left-0" />
      <CornerDecor className="top-0 right-0 rotate-90" />
      <CornerDecor className="bottom-0 right-0 rotate-180" />
      <CornerDecor className="bottom-0 left-0 -rotate-90" />
      {children}
    </div>
  );
}

// The CornerDecor component will automatically use the primary color
// which is orange in both light and dark modes
```

**Note:** The angled corners component uses `text-primary` and works beautifully in light mode already since orange (#FF8C00) pops perfectly on light backgrounds.

### D. Partner Cards

**Current:**
```tsx
function PartnerCard({ name, displayName }: { name: string; displayName: string }) {
  return (
    <div className="relative group">
      <GraphicBlock className="border border-primary/20 bg-black/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-all duration-300 h-full group-hover:rotate-1 transform">
        {/* Dark mode styling */}
      </GraphicBlock>
    </div>
  );
}
```

**Light Mode Update:**
```tsx
function PartnerCard({ name, displayName }: { name: string; displayName: string }) {
  return (
    <div className="relative group">
      <GraphicBlock className="border border-primary/20 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-all duration-300 h-full group-hover:rotate-1 transform">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />

        <div className="flex flex-col items-center justify-center h-24">
          <div className="relative">
            <div className="text-2xl font-black tracking-tight dark:text-white/80 text-gray-900 group-hover:text-primary transition-colors">
              {displayName.split('').map((char, i) => (
                <span key={i} className="inline-block group-hover:animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                  {char}
                </span>
              ))}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="w-2 h-[2px] bg-primary/50 group-hover:w-4 transition-all" />
              <div className="w-1 h-1 rotate-45 bg-primary/30" />
              <div className="w-2 h-[2px] bg-primary/50 group-hover:w-4 transition-all" />
            </div>
          </div>
        </div>
      </GraphicBlock>
    </div>
  );
}
```

**Key Changes:**
- `bg-white/40` for light mode with `dark:bg-black/40` for dark mode
- Text color updated to `dark:text-white/80 text-gray-900` for proper contrast
- The orange accents remain unchanged - they look great in both modes

### E. Marquee Component

**Current:**
```tsx
function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(10)].map((_, i) => (
          <h1
            key={i}
            className="text-[120px] md:text-[180px] font-black tracking-tighter text-transparent"
            style={{
              WebkitTextStroke: "2px rgb(255, 140, 0, 0.3)",
            }}
          >
            {text}
          </h1>
        ))}
      </motion.div>
    </div>
  );
}
```

**Light Mode Update:**
```tsx
function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(10)].map((_, i) => (
          <h1
            key={i}
            className="text-[120px] md:text-[180px] font-black tracking-tighter text-transparent"
            style={{
              WebkitTextStroke: "2px",
              WebkitTextStrokeColor: "var(--webkit-stroke-color, rgb(255, 140, 0, 0.3))",
            }}
          >
            {text}
          </h1>
        ))}
      </motion.div>
    </div>
  );
}
```

**Better approach with CSS variables:**
Add to globals.css:
```css
@layer base {
  :root {
    --webkit-stroke-color: rgb(255, 140, 0, 0.25);  /* Light mode - slightly darker */
  }

  .dark {
    --webkit-stroke-color: rgb(255, 140, 0, 0.3);   /* Dark mode */
  }
}
```

Then update marquee:
```tsx
style={{
  WebkitTextStroke: "2px",
  WebkitTextStrokeColor: "var(--webkit-stroke-color)",
}}
```

### F. Loading Screen

**Current:**
```tsx
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Loading content */}
    </motion.div>
  );
}
```

**Light Mode Update:**
```tsx
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-black text-primary mb-4">1SAT</h1>
          <p className="text-sm font-mono text-primary/60">ORDINALS</p>
        </motion.div>

        <div className="relative h-1 bg-primary/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm font-mono text-primary/60">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
```

**Changes:**
- `bg-background` instead of hardcoded `bg-black`
- The primary orange color remains constant and looks great

### G. Feature Blocks & Sections

**Current:**
```tsx
<GraphicBlock className="border border-primary/20 bg-black/40 backdrop-blur-sm p-8 h-full">
  <div className="text-primary/40 font-mono text-sm mb-4">
    {feature.number}
  </div>
  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
  <p className="text-gray-400 leading-relaxed">
    {feature.description}
  </p>
</GraphicBlock>
```

**Light Mode Update:**
```tsx
<GraphicBlock className="border border-primary/20 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-8 h-full">
  <div className="text-primary/40 font-mono text-sm mb-4">
    {feature.number}
  </div>
  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
  <p className="text-muted-foreground leading-relaxed">
    {feature.description}
  </p>
</GraphicBlock>
```

### H. Section Borders & Dividers

**Current:**
```tsx
<div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
```

**Light Mode:**
These work great as-is! Orange dividers on light backgrounds create elegant visual separation. However, you may want to slightly adjust opacity if it's too strong:

```tsx
{/* Use primary/25 in light mode, primary/30 in dark mode */}
<div className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 dark:via-primary/30 to-transparent" />
```

---

## 4. Hero Section Specific Updates

### Badge

**Current:**
```tsx
<div className="border-2 border-primary px-6 py-3 inline-block">
  <span className="text-sm font-mono text-primary tracking-[0.2em]">
    PROTOCOL
  </span>
</div>
```

**Light Mode:** No changes needed! The orange border and text look fantastic on light backgrounds.

### Main Heading

**Current:**
```tsx
<h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
  1SAT{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
    ORDINALS
  </span>
</h1>
```

**Light Mode Enhancement:**
```tsx
<h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 text-foreground">
  1SAT{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
    ORDINALS
  </span>
</h1>
```

**Add:** Explicit `text-foreground` for the "1SAT" part to ensure proper color in light mode.

### Subtitle

**Current:**
```tsx
<p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12">
  Bitcoin SV Token Protocol for 50MB+ NFTs & Inscriptions
</p>
```

**Light Mode Update:**
```tsx
<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12">
  Bitcoin SV Token Protocol for 50MB+ NFTs & Inscriptions
</p>
```

### CTA Buttons

**Current Primary Button:**
```tsx
<Link
  href="/protocol"
  className="group relative inline-flex items-center gap-3 bg-primary px-8 py-4 font-bold text-black hover:bg-primary/90 transition-all duration-300"
>
  <span>EXPLORE PROTOCOL</span>
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
```

**Light Mode:** No changes needed! This button works beautifully in both modes. The orange background with black text has excellent contrast.

**Current Secondary Button:**
```tsx
<Link
  href="/developers"
  className="group relative inline-flex items-center gap-3 border-2 border-primary px-8 py-4 font-bold text-primary hover:bg-primary hover:text-black transition-all duration-300"
>
  <span>START BUILDING</span>
</Link>
```

**Light Mode:** Works perfectly as-is!

**Current Tertiary Button:**
```tsx
<Link
  href="/updates"
  className="group relative inline-flex items-center gap-3 border-2 border-gray-600 px-8 py-4 font-bold text-gray-400 hover:border-primary hover:text-primary transition-all duration-300"
>
  <span>LATEST UPDATES</span>
</Link>
```

**Light Mode Update:**
```tsx
<Link
  href="/updates"
  className="group relative inline-flex items-center gap-3 border-2 border-border px-8 py-4 font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 dark:border-gray-600 dark:text-gray-400"
>
  <span>LATEST UPDATES</span>
</Link>
```

### Features Strip

**Current:**
```tsx
<div className="mt-16 flex flex-wrap gap-8 items-center text-sm font-mono text-gray-500">
  <div className="flex items-center gap-2">
    <Check className="w-4 h-4 text-primary" />
    <span>BSV20</span>
  </div>
  {/* ... */}
</div>
```

**Light Mode Update:**
```tsx
<div className="mt-16 flex flex-wrap gap-8 items-center text-sm font-mono text-muted-foreground dark:text-gray-500">
  <div className="flex items-center gap-2">
    <Check className="w-4 h-4 text-primary" />
    <span>BSV20</span>
  </div>
  {/* ... */}
</div>
```

---

## 5. Global Component Updates

### Header Component

The header already uses semantic classes:
- `bg-background/95` ✓
- `text-primary` for links ✓
- Automatically responsive to theme

**Minimal updates needed:** The logo image path may need adjustment if using a dark-specific logo. Consider:

```tsx
<Image
  src={isDark ? "/images/logo-dark.png" : "/images/logo-light.png"}
  alt="1Sat Ordinals"
  width={120}
  height={40}
  className="h-10 w-auto"
  priority
/>
```

Or use CSS to switch logos:
```css
@media (prefers-color-scheme: light) {
  header img[src*="logo-light"] {
    display: block;
  }
  header img[src*="logo-dark"] {
    display: none;
  }
}
```

### Text Color Mapping

Replace all hardcoded gray colors with Tailwind semantic classes:

| Dark Mode | Light Mode | Tailwind Class |
|-----------|-----------|-----------------|
| `text-white` | `text-foreground` | `text-foreground` |
| `text-gray-400` | `text-muted-foreground` | `text-muted-foreground` |
| `text-gray-500` | `text-muted-foreground` | `text-muted-foreground` |
| `text-gray-600` | `text-border` | (use `border-border` for borders) |
| `bg-black` | `bg-background` | `bg-background` |
| `bg-black/40` | `bg-white/40` | Use dark mode modifier |
| `bg-black/50` | `bg-white/50` | Use dark mode modifier |

---

## 6. Handling Transparency & Backdrops

### Backdrop Blur Patterns

In light mode, semi-transparent white overlays with backdrop blur create the same premium feel as dark mode's black overlays:

**Pattern 1: Card Overlay**
```tsx
{/* Dark mode */}
className="bg-black/40 backdrop-blur-sm"

{/* Light mode equivalent */}
className="bg-white/40 dark:bg-black/40 backdrop-blur-sm"
```

**Pattern 2: Subtle Background**
```tsx
{/* Dark mode */}
className="bg-black/20 backdrop-blur-xs"

{/* Light mode equivalent */}
className="bg-white/30 dark:bg-black/20 backdrop-blur-xs"
```

**Pattern 3: Deep Background**
```tsx
{/* Dark mode */}
className="bg-black/60 backdrop-blur-md"

{/* Light mode equivalent */}
className="bg-white/60 dark:bg-black/60 backdrop-blur-md"
```

---

## 7. Geometric Patterns & Accents

### Decorative Squares

**Current:**
```tsx
function DecorSquare({ className }: { className?: string }) {
  return (
    <div className={`absolute w-32 h-32 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-primary/20">
        <path
          d="M 10,0 L 90,0 L 100,10 L 100,90 L 90,100 L 10,100 L 0,90 L 0,10 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
```

**Light Mode:** No changes needed! The `text-primary/20` class works perfectly in both modes.

### Corner Decorations

**Current:**
```tsx
function CornerDecor({ className }: { className?: string }) {
  return (
    <div className={`absolute w-4 h-4 ${className}`}>
      <svg viewBox="0 0 16 16" className="w-full h-full text-primary">
        <path
          d="M 0,4 L 0,0 L 4,0"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}
```

**Light Mode:** Looks great as-is! The orange (#FF8C00) pops perfectly on light backgrounds.

---

## 8. Recommended Global Text Color Replacements

Run search and replace across the codebase:

### Priority 1: Main Text Colors

```bash
# Search: text-white
# Replace with: text-foreground

# Search: text-gray-400
# Replace with: text-muted-foreground

# Search: text-gray-500
# Replace with: text-muted-foreground
```

### Priority 2: Background Colors

```bash
# Search: bg-black
# Replace with: bg-background

# Search: bg-black/40
# Replace with: bg-white/40 dark:bg-black/40

# Search: bg-black/50
# Replace with: bg-white/50 dark:bg-black/50
```

### Priority 3: Border Colors

```bash
# Search: border-gray-600
# Replace with: border-border

# Search: border-gray-700
# Replace with: border-border/60
```

---

## 9. Testing Checklist

When implementing light mode, verify:

- [ ] **Contrast**: All text meets WCAG AA standards (4.5:1 for body text, 3:1 for large text)
- [ ] **Grid Pattern**: Subtle enough to not distract, visible enough to define architectural space
- [ ] **Borders**: Orange architectural borders visible but not overwhelming
- [ ] **Buttons**: All CTA buttons have clear visibility and hover states
- [ ] **Cards**: Feature blocks, partner cards, and content cards have adequate separation
- [ ] **Text Hierarchy**: Headers, body text, and muted text are clearly distinguishable
- [ ] **Decorative Elements**: Geometric shapes and accents enhance rather than clutter
- [ ] **Dark Mode**: Verify dark mode still looks perfect (regression testing)
- [ ] **Transitions**: Theme switching is smooth (disableTransitionOnChange is set in ThemeProvider)
- [ ] **Images**: Logos and illustrations work in both modes
- [ ] **Loading Screen**: Visible and appropriate for light mode
- [ ] **Animations**: Marquee text strokes visible, no white-on-white issues
- [ ] **Shadows**: Check if any shadows need adjustment (light mode may show different depths)

---

## 10. Advanced Customization Options

### Option A: Warm vs. Cool Aesthetic

The recommended palette leans warm (warm off-white background with warm gray accents). For a cooler light mode:

| Aspect | Warm (Recommended) | Cool Alternative |
|--------|-------------------|------------------|
| Background | #F7F5F0 (warm off-white) | #F5F7FA (cool off-white) |
| Card | #FEFDFB | #FAFBFD |
| Border | #E5DFD5 | #E0E5ED |
| Muted Text | #6B6359 | #64748B |

### Option B: Contrast Levels

**For higher contrast (accessibility):**
```css
--color-primary: oklch(0.58 0.24 65);  /* Darker orange */
--color-muted-foreground: oklch(0.40 0.03 65);  /* Darker gray */
```

**For softer, more subtle design:**
```css
--color-primary: oklch(0.72 0.18 65);  /* Lighter orange */
--color-border: oklch(0.92 0.005 96);  /* Even lighter borders */
```

### Option C: Orange Saturation Adjustment

The current orange (#FF8C00) is already perfect, but you can fine-tune:

| Look | OKLCH | Hex |
|------|-------|-----|
| **More vibrant** | oklch(0.65 0.25 65) | #FF7D00 |
| **Current (balanced)** | oklch(0.65 0.21 65) | #FF8C00 |
| **More muted** | oklch(0.65 0.18 65) | #FF9414 |
| **Peachy** | oklch(0.65 0.15 70) | #FFA040 |

---

## 11. Implementation Timeline

### Phase 1 (Immediate - 2-3 hours)
1. Update `globals.css` with light mode color palette
2. Update main `page.tsx` - backgrounds, text colors, buttons
3. Test hero section in light mode
4. Verify dark mode still works

### Phase 2 (Components - 3-4 hours)
1. Update component backgrounds (header, footer, cards)
2. Replace hardcoded colors with semantic classes
3. Test all interactive states (hover, focus, active)
4. Verify mobile responsiveness

### Phase 3 (Polish - 2-3 hours)
1. Fine-tune contrast ratios
2. Adjust grid/border opacity if needed
3. Test loading screen and animations
4. Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Phase 4 (Optimization - 1-2 hours)
1. Performance optimization (CSS file size)
2. Accessibility audit
3. User testing on real devices
4. Final refinements

---

## 12. File Changes Summary

### Files to Modify:

1. **`/app/globals.css`** - Update theme colors
2. **`/app/page.tsx`** - Update backgrounds, text colors, grid pattern
3. **`/components/header.tsx`** - Logo handling, theme-aware styling
4. **`/components/footer.tsx`** - Check text colors
5. **`/components/*.tsx`** - All component files for color replacements
6. **`components.json`** - Consider theme mode config

### Search & Replace Commands:

Use your IDE's find and replace (with regex enabled):

```
Find: bg-black(?!\w)
Replace: bg-background

Find: text-white(?!\w)
Replace: text-foreground

Find: text-gray-400
Replace: text-muted-foreground

Find: text-gray-500
Replace: text-muted-foreground
```

---

## 13. Final Notes & Best Practices

### Guiding Principles

1. **Consistency Over Innovation**: Use semantic color names throughout
2. **Perceptual Balance**: OKLCH ensures colors appear similarly balanced in light and dark
3. **Accessibility First**: Maintain 4.5:1 contrast for normal text
4. **Intentional Design**: Light mode should feel premium, not like a "dark mode inverted"
5. **Performance**: Minimize class switching, use CSS variables

### Orange Color Strategy

The orange (#FF8C00) is the star of your design:
- **In dark mode**: Pops against black, creates excitement
- **In light mode**: Creates warmth and sophistication
- **Never compromise**: Keep it consistent across both modes

### Testing Tips

1. **Use system preference toggle**: Test with `prefers-color-scheme` media query
2. **Screenshot both modes side-by-side**: Compare visual hierarchy
3. **Mobile first**: Test on actual devices, not just browsers
4. **Accessibility tools**: Use axe DevTools or WAVE to check contrast
5. **Real world usage**: Preview in different lighting conditions

---

## Appendix A: Quick Reference - Color Swatches

```css
/* Light Mode Palette */
:root {
  --bg-primary: #F7F5F0;      /* Main background */
  --bg-card: #FEFDFB;          /* Elevated surfaces */
  --text-primary: #1A1410;     /* Main text */
  --text-secondary: #6B6359;   /* Secondary text */
  --text-muted: #B8ADA0;       /* Muted text */
  --border: #E5DFD5;           /* Borders */
  --accent: #FF8C00;           /* Orange accent */
  --accent-light: #FFD9B3;     /* Light orange */
  --accent-very-light: #FFF4E6; /* Very light orange */
}

/* Dark Mode Palette */
.dark {
  --bg-primary: #1A1815;       /* Main background */
  --bg-card: #262220;          /* Elevated surfaces */
  --text-primary: #FFFFFF;     /* Main text */
  --text-secondary: #E0DCD6;   /* Secondary text */
  --text-muted: #9D9490;       /* Muted text */
  --border: #3A3530;           /* Borders */
  --accent: #FF8C00;           /* Orange accent (unchanged) */
  --accent-light: #FF9D1A;     /* Light orange */
  --accent-very-light: #FFB84D; /* Very light orange */
}
```

---

## Appendix B: Component Color Mapping Reference

| Component | Light Mode | Dark Mode | Notes |
|-----------|-----------|-----------|-------|
| Page Background | bg-background | bg-background | Automatically switches |
| Main Text | text-foreground | text-foreground | Automatically switches |
| Muted Text | text-muted-foreground | text-muted-foreground | Use for secondary content |
| Cards | bg-card | bg-card | Use semantic class |
| Borders | border-border | border-border | Automatic switching |
| Buttons (Primary) | bg-primary text-primary-foreground | bg-primary text-primary-foreground | Stays orange + black text |
| Buttons (Secondary) | border-border text-foreground | border-border text-foreground | Outline style |
| Overlays | bg-white/40 dark:bg-black/40 | bg-black/40 | Must be explicit |
| Grid/Accents | text-primary/20 | text-primary/20 | Orange at low opacity |
| Dividers | border-primary/25 dark:border-primary/30 | border-primary/30 | Slightly different opacity |

---

This guide provides everything needed to create a stunning, intentional light mode that matches the sophistication of your dark mode design while maintaining the premium tech aesthetic of the 1Sat Ordinals brand.

For implementation questions or refinements, refer back to the specific component sections above.
