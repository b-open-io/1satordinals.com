# Light Mode Implementation Guide - Ready-to-Use Code

This file contains exact code snippets ready to copy/paste into your project files.

---

## Step 1: Update globals.css

**File:** `/.flow/repos/1satordinals.com/app/globals.css`

Replace the entire `@theme` and `.dark` sections with:

```css
@import "tailwindcss";

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
  --color-primary: oklch(0.65 0.21 65);
  --color-primary-foreground: oklch(0.98 0.002 96);
  --color-secondary: oklch(0.92 0.02 96);
  --color-secondary-foreground: oklch(0.1 0.005 96);
  --color-muted: oklch(0.95 0.01 96);
  --color-muted-foreground: oklch(0.48 0.02 65);
  --color-accent: oklch(0.85 0.09 70);
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
    --webkit-stroke-color: rgb(255, 140, 0, 0.25);
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

    --webkit-stroke-color: rgb(255, 140, 0, 0.3);
  }

  body {
    letter-spacing: var(--tracking-normal);
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## Step 2: Update app/page.tsx - Hero Section

Replace the home component with these updates:

### 2A. Update Marquee Component

```tsx
// Marquee Component
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
              WebkitTextStrokeColor: "var(--webkit-stroke-color)",
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

### 2B. Update Main Page Background

Find this section in `app/page.tsx`:
```tsx
return (
  <div className="relative bg-black text-white overflow-hidden">
```

Replace with:
```tsx
return (
  <div className="relative bg-background text-foreground overflow-hidden">
```

### 2C. Update Grid Background

Find:
```tsx
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

Replace with:
```tsx
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

### 2D. Update Decorative Squares

The `DecorSquare` component already uses `text-primary/20` which works perfectly in light mode. No changes needed.

### 2E. Update Partner Card Component

Find:
```tsx
function PartnerCard({ name, displayName }: { name: string; displayName: string }) {
  return (
    <div className="relative group">
      <GraphicBlock className="border border-primary/20 bg-black/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-all duration-300 h-full group-hover:rotate-1 transform">
        {/* Corner accent elements */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />

        <div className="flex flex-col items-center justify-center h-24">
          {/* Stylized text logo */}
          <div className="relative">
            <div className="text-2xl font-black tracking-tight text-white/80 group-hover:text-primary transition-colors">
```

Replace with:
```tsx
function PartnerCard({ name, displayName }: { name: string; displayName: string }) {
  return (
    <div className="relative group">
      <GraphicBlock className="border border-primary/20 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-all duration-300 h-full group-hover:rotate-1 transform">
        {/* Corner accent elements */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />

        <div className="flex flex-col items-center justify-center h-24">
          {/* Stylized text logo */}
          <div className="relative">
            <div className="text-2xl font-black tracking-tight dark:text-white/80 text-gray-900 group-hover:text-primary transition-colors">
```

### 2F. Update Hero Subtitle

Find:
```tsx
<p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12">
  Bitcoin SV Token Protocol for 50MB+ NFTs & Inscriptions
</p>
```

Replace with:
```tsx
<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12">
  Bitcoin SV Token Protocol for 50MB+ NFTs & Inscriptions
</p>
```

### 2G. Update Features Strip

Find:
```tsx
<div className="mt-16 flex flex-wrap gap-8 items-center text-sm font-mono text-gray-500">
```

Replace with:
```tsx
<div className="mt-16 flex flex-wrap gap-8 items-center text-sm font-mono text-muted-foreground dark:text-gray-500">
```

### 2H. Update Feature Blocks

Find all instances of:
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

Replace with:
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

### 2I. Update Loading Screen

Find the `LoadingScreen` component and replace the background:

```tsx
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

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

### 2J. Update Tertiary Button

Find:
```tsx
<Link
  href="/updates"
  className="group relative inline-flex items-center gap-3 border-2 border-gray-600 px-8 py-4 font-bold text-gray-400 hover:border-primary hover:text-primary transition-all duration-300"
>
  <span>LATEST UPDATES</span>
</Link>
```

Replace with:
```tsx
<Link
  href="/updates"
  className="group relative inline-flex items-center gap-3 border-2 border-border px-8 py-4 font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 dark:border-gray-600 dark:text-gray-400"
>
  <span>LATEST UPDATES</span>
</Link>
```

---

## Step 3: Update Comparison Table Component

**File:** `/.flow/repos/1satordinals.com/components/comparison-table.tsx`

Find:
```tsx
<tr className="border-b border-primary/30">
  <th className="text-left py-4 px-6 font-semibold text-lg">
    Feature
  </th>
  <th className="text-center py-4 px-6 font-semibold text-lg text-primary">
    1Sat Ordinals (BSV)
  </th>
  <th className="text-center py-4 px-6 font-semibold text-lg text-gray-400">
    BTC Ordinals
  </th>
</tr>
```

Replace with:
```tsx
<tr className="border-b border-primary/30">
  <th className="text-left py-4 px-6 font-semibold text-lg">
    Feature
  </th>
  <th className="text-center py-4 px-6 font-semibold text-lg text-primary">
    1Sat Ordinals (BSV)
  </th>
  <th className="text-center py-4 px-6 font-semibold text-lg text-muted-foreground dark:text-gray-400">
    BTC Ordinals
  </th>
</tr>
```

Also find:
```tsx
className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
```

And make sure it's using `bg-primary/5` which works in both modes. If it says `bg-black` or similar, replace with the above.

---

## Step 4: Update Other Components

### Step 4A: Update comparison-table.tsx content text

Find:
```tsx
<p className="text-xl text-gray-400">
  See why builders choose Bitcoin SV for their ordinals
</p>
```

Replace with:
```tsx
<p className="text-xl text-muted-foreground dark:text-gray-400">
  See why builders choose Bitcoin SV for their ordinals
</p>
```

### Step 4B: Update all component text colors

Run these find/replace operations in your IDE (with Regex):

**Find:** `text-gray-400(?!-)`
**Replace:** `text-muted-foreground dark:text-gray-400`

**Find:** `text-gray-500(?!-)`
**Replace:** `text-muted-foreground dark:text-gray-500`

**Find:** `text-white(?!-)`
**Replace:** `text-foreground`

**Find:** `bg-black(?!-)`
**Replace:** `bg-background`

---

## Step 5: Update Sections Component Files

### Update quick-facts.tsx

Find:
```tsx
<GraphicBlock className="border border-primary/20 bg-black/40 backdrop-blur-sm p-8 h-full">
```

Replace with:
```tsx
<GraphicBlock className="border border-primary/20 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-8 h-full">
```

Also update any `text-gray-400` to `text-muted-foreground dark:text-gray-400`.

### Update ecosystem-stats.tsx

Same replacements as above:
- `bg-black/40` → `bg-white/40 dark:bg-black/40`
- `text-gray-400` → `text-muted-foreground dark:text-gray-400`
- `text-white/80` → `dark:text-white/80 text-gray-900`

### Update success-stories.tsx

Same pattern:
- `bg-black/40` → `bg-white/40 dark:bg-black/40`
- `text-gray-400` → `text-muted-foreground dark:text-gray-400`
- `text-white` → `text-foreground`

### Update developer-quickstart.tsx

Same replacements:
- `bg-black` → `bg-background`
- `text-gray-400` → `text-muted-foreground dark:text-gray-400`

### Update faq-section.tsx

Same replacements for consistency.

---

## Step 6: Update Footer Component

**File:** `/.flow/repos/1satordinals.com/components/footer.tsx`

Find all:
- `bg-black` → `bg-background`
- `text-white` → `text-foreground`
- `text-gray-400` → `text-muted-foreground dark:text-gray-400`
- `text-gray-500` → `text-muted-foreground dark:text-gray-500`
- `border-gray-800` → `border-border`

---

## Step 7: Header Logo Handling (Optional)

**File:** `/.flow/repos/1satordinals.com/components/header.tsx`

If you have separate light/dark logos, update the Image tag:

```tsx
<Image
  src="/images/logo-light.png"
  alt="1Sat Ordinals"
  width={120}
  height={40}
  className="h-10 w-auto hidden dark:block"
  priority
/>
<Image
  src="/images/logo-dark.png"
  alt="1Sat Ordinals"
  width={120}
  height={40}
  className="h-10 w-auto block dark:hidden"
  priority
/>
```

Or simply use a logo that works in both modes (single image).

---

## Verification Checklist

After making changes, verify these items:

### Visual Elements
- [ ] Hero section looks good in light mode
- [ ] Grid pattern is subtle but visible
- [ ] Orange accents pop nicely
- [ ] Text contrast is readable
- [ ] Buttons have clear hover states
- [ ] Cards have proper depth

### Functionality
- [ ] Theme toggle works (light ↔ dark)
- [ ] Dark mode still looks perfect (regression test)
- [ ] No flash of wrong theme on page load
- [ ] Mobile responsive in both modes

### Performance
- [ ] CSS bundle size increased minimally
- [ ] No layout shifts on theme change
- [ ] Animations smooth in both modes

### Accessibility
- [ ] WCAG AA contrast (4.5:1 for body text)
- [ ] Focus states visible in light mode
- [ ] Color not the only differentiator
- [ ] Keyboard navigation works

---

## Common Issues & Fixes

### Issue: Text Too Light/Dark in Light Mode

**Problem:** Text is hard to read

**Solution:** Check that you're using `text-foreground` for main text, not `text-white`

### Issue: Orange Grid Too Visible

**Problem:** Grid pattern is distracting

**Solution:** Reduce opacity from 3% to 2%, and increase grid size from 50px to 60px

### Issue: Cards Blend Into Background

**Problem:** Feature cards not defined enough

**Solution:** Use `bg-white/40 dark:bg-black/40` instead of `bg-black/40`

### Issue: Borders Not Visible

**Problem:** Architectural borders hard to see

**Solution:** Increase primary opacity: `primary/30` instead of `primary/20`

### Issue: Theme Changes Cause Flash

**Problem:** Flash of wrong colors on load

**Solution:** Already handled by ThemeProvider with `suppressHydrationWarning` in layout.tsx

---

## Testing Command

After all changes, run a visual regression test:

```bash
# Development server
bun dev

# Check both light and dark modes
# Toggle theme using the theme switcher in header
# Verify mobile responsiveness
# Test on different browsers
```

---

## File Summary

| File | Changes | Priority |
|------|---------|----------|
| `/app/globals.css` | Color palette | CRITICAL |
| `/app/page.tsx` | Hero section colors | CRITICAL |
| `/components/comparison-table.tsx` | Text colors | HIGH |
| `/components/quick-facts.tsx` | Background/text colors | HIGH |
| `/components/ecosystem-stats.tsx` | Background/text colors | HIGH |
| `/components/success-stories.tsx` | Background/text colors | HIGH |
| `/components/developer-quickstart.tsx` | Background/text colors | HIGH |
| `/components/faq-section.tsx` | Background/text colors | HIGH |
| `/components/footer.tsx` | Text/border colors | MEDIUM |
| `/components/header.tsx` | Optional logo handling | LOW |

---

## Next Steps

1. **Backup your current code** (commit to git)
2. **Apply changes in priority order** (start with globals.css and page.tsx)
3. **Test after each major change**
4. **Get feedback** from stakeholders
5. **Refine colors** if needed (use the palette guide in LIGHT_MODE_DESIGN_GUIDE.md)
6. **Deploy** with confidence

Good luck! Your light mode is going to look amazing.
