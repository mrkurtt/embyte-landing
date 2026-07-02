# Embyte — Brand Design System
**Version 1.0 · 2026**
*Modular event infrastructure for gate security, RSVPs, and collaborative media.*

---

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Logo & Wordmark](#2-logo--wordmark)
3. [Colour Palette](#3-colour-palette)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Visual Hierarchy](#6-visual-hierarchy)
7. [Components](#7-components)
   - [Buttons](#buttons)
   - [Cards](#cards)
   - [Chips & Tags](#chips--tags)
   - [Input Fields](#input-fields)
   - [Navigation Bar](#navigation-bar)
   - [Section Heading](#section-heading)
   - [Toast / Notification](#toast--notification)
   - [Dashboard Mockup](#dashboard-mockup)
8. [Iconography](#8-iconography)
9. [Motion & Animation](#9-motion--animation)
10. [Photography & Visual Direction](#10-photography--visual-direction)
11. [Voice & Tone](#11-voice--tone)
12. [CSS Custom Properties (Variables)](#12-css-custom-properties-variables)
13. [Do's and Don'ts](#13-dos-and-donts)

---

## 1. Brand Foundation

### Mission
Embyte exists to give event coordinators a modular, reliable digital infrastructure — eliminating friction at the gate, automating RSVPs, and unifying media sharing into a single collaborative vault.

### Vision
To become the default infrastructure layer for live events worldwide. A future where every coordinator — from university homecomings to premium weddings — runs their event on Embyte with flawless execution and zero technical debt.

### Brand Positioning
> **Embyte is event infrastructure.**
> We are not a ticketing platform. We are not a photo app.
> We are the modular backbone that handles gate security, RSVPs, and media — so coordinators can focus on the experience.

### Brand Pillars

| Pillar | Description |
|--------|-------------|
| **Modular** | Every component — scanner, RSVP, analytics, vault — works independently or together. The system adapts to the event, not the other way around. |
| **Reliable** | Gate security cannot fail. RSVPs cannot duplicate. Media cannot corrupt. Embyte is built for zero-downtime, high-throughput event operations. |
| **Effortless** | No app downloads for guests. No hardware lock-in for staff. Mobile web scanners, QR tickets, and link-based uploads — everything works in any browser. |
| **Collaborative** | Events are shared experiences. The Memory Vault lets guests contribute photos and videos without accounts, creating a living archive of the event. |

### Taglines

**Primary**
> *"Empower your events."*

**Brand story line**
> *"From the gate to the gallery — flawless execution."*

**Campaign/Secondary**
> *"Three verticals. One platform."*

---

## 2. Logo & Wordmark

### Primary Wordmark
- Font: **Geist Semibold (weight 600)**
- Text: `embyte`
- Letter spacing: `-0.02em`
- Always set in all-lowercase
- Minimum size: `18px` on screen, `6mm` in print

### Wordmark Variants

| Variant | Background | Wordmark Colour | Use Case |
|---------|------------|-----------------|----------|
| Primary | Dark Navy `#121824` | Light `#F4F6FA` | Default — dark surfaces, app chrome, splash screens |
| Reversed | Light `#F4F6FA` | Dark Navy `#121824` | Light backgrounds, documentation, print |
| Ghost | Transparent | Light `#F4F6FA` at 60% opacity | Overlays, busy backgrounds, hero images |

### Tagline Lockup
Positioned below the wordmark, always in Geist Medium (weight 500):
```
embyte
empower your events · EST. 2026
```
- Tagline font size: exactly `24%` of the wordmark font size
- Letter spacing: `0.20em`
- Colour: Coral `#FF7E5F`

### Symbol Mark (Companion to Wordmark)
A minimal abstract mark suggesting connectivity and modularity — two interlocking chevron-like shapes that form a forward-pointing arrow. The mark conveys momentum, precision, and the seamless integration of event components. Used as a favicon, app icon base, and standalone brand mark when the wordmark would be too small to render legibly.

- Stroke weight: `1.5px` at standard scale, `1px` at small scale
- Stroke colour: always Coral `#FF7E5F` or brand gradient
- Never filled
- Never distorted or rotated

### Clear Space
Maintain clear space equal to the full cap-height of the wordmark on all four sides. Nothing enters this zone: no other text, imagery, or UI element.

### What Never Changes
- Never stretch or distort the wordmark
- Never add a drop shadow to the wordmark
- Never use a colour outside the brand palette for the wordmark
- Never use a font weight other than Semibold 600 for the wordmark
- Never place on a busy photographic background without a solid colour overlay
- Never capitalise any letter of the wordmark — `embyte` is always lowercase
- Never pair the symbol mark and the wordmark at the same visual weight; one must lead

---

## 3. Colour Palette

### Primary Palette

```
Dark Navy      #121824   rgb(18, 24, 36)        — Primary background, dark surfaces, brand anchor
Light          #F4F6FA   rgb(244, 246, 250)     — Primary text, headings, high-contrast elements
Coral          #FF7E5F   rgb(255, 126, 95)      — Gradient start, accent, CTAs, active states
Magenta        #ED1E79   rgb(237, 30, 121)      — Gradient end, accent depth, hover states
Muted          #8B95A8   rgb(139, 149, 168)     — Secondary text, timestamps, metadata
Surface        #1A2233   rgb(26, 34, 51)        — Card surfaces, elevated panels
```

### Usage Rules

| Token | Hex | Role | Never Use For |
|-------|-----|------|---------------|
| Dark Navy | `#121824` | Primary background, dark surfaces, brand anchor | Decorative illustrations or large background fills on light themes |
| Light | `#F4F6FA` | Primary text on dark, headings, key information | Background colour on dark surfaces |
| Coral | `#FF7E5F` | CTAs, active states, highlights, gradient start | Body copy, long-form text, error states, large backgrounds |
| Magenta | `#ED1E79` | Gradient end, hover states, accent depth | Body copy, standalone text, large backgrounds |
| Muted | `#8B95A8` | Timestamps, secondary labels, captions, metadata | Primary actions, headings, or any text requiring high contrast |
| Surface | `#1A2233` | Card surfaces, elevated panels, modals | Text colour, decorative elements |

### Contrast Ratios (WCAG)

| Pair | Ratio | Passes AA |
|------|-------|-----------|
| Light on Dark Navy | 12.8:1 | ✅ AAA |
| Dark Navy on Light | 12.8:1 | ✅ AAA |
| Coral on Dark Navy | 4.6:1 | ✅ AA |
| Muted on Dark Navy | 4.2:1 | ✅ AA Large (18px+ only) |
| Light on Surface | 11.2:1 | ✅ AAA |
| Coral on Light | 2.8:1 | ❌ Decorative only — never for readable text |

> **Note:** Muted must never be used for functional text below 18px. It exists exclusively for decorative UI elements, faded states, and visual texture. Any text element requiring comprehension must meet AA minimum.

### Brand Gradient

The signature gradient is the core visual identity of Embyte — used across CTAs, active states, accents, and decorative elements:

```
Coral → Magenta    #FF7E5F → #ED1E79    135deg
```

### Functional Colours (UI Only)

```
Success   #10B981   — Confirmation states, form submitted, sync complete
Warning   #F59E0B   — Low capacity, approaching limit, attention needed
Error     #EF4444   — Failed actions, validation errors, critical system states
Info      #3B82F6   — Informational surfaces, onboarding tips, system hints
```

---

## 4. Typography

### Typeface Stack

| Role | Family | Weight | Where to Load |
|------|--------|--------|---------------|
| Display / Headings | Geist | 500 Medium, 600 Semibold, 700 Bold | Next.js font (next/font) |
| Body / UI | Geist | 400 Regular, 500 Medium | Next.js font (next/font) |
| Monospace / Data & Counts | Geist Mono | 400 Regular | Next.js font (next/font) |

### Type Scale

```
Display XL    Geist Bold             48px / -0.02em / lh 1.1    — Hero headings, splash titles
Display L     Geist Bold             36px / -0.01em / lh 1.2    — Section headings
Display M     Geist Semibold         30px /  0.00em / lh 1.3    — Card titles, feature headings
Display S     Geist Semibold         24px /  0.00em / lh 1.3    — Subheadings, modal titles
Body L        Geist Regular          18px /  0.01em / lh 1.6    — Lead messages, descriptions
Body M        Geist Regular          16px /  0.01em / lh 1.6    — Standard body text
Body S        Geist Regular          14px /  0.01em / lh 1.5    — Card descriptions, secondary content
Caption       Geist Regular          12px /  0.02em / lh 1.4    — Captions, metadata, helper text
Label         Geist Medium           12px /  0.10em / lh 1.4    — ALL CAPS UI labels, badges, chips
Eyebrow       Geist Medium           14px /  0.10em / lh 1.4    — Section eyebrows, uppercase accent text
Button        Geist Medium           14px /  0.02em / lh 1.0    — CTAs, action labels
Mono          Geist Mono Regular     12px /  0.04em / lh 1.4    — Dashboard data, stat values
```

### Type Rules

- **Headings:** Geist Bold or Semibold. Never use Light or Regular for headings.
- **Body:** Always Geist Regular. No fallback to system fonts in any user-facing surface.
- **Labels and tags:** Geist Medium, uppercase or sentence case, minimum `0.08em` letter spacing. This applies to badges, chips, and system state labels.
- **Eyebrow text:** Geist Medium, uppercase, `0.10em` letter spacing, brand gradient applied as text fill. This is the signature section identifier.
- **Dashboard data:** Geist Mono Regular for any stat value, count, or metric inline with prose. Geist Regular acceptable in running body copy.
- **Line length:** Maximum 68 characters per line for Body M and larger. Use `max-width` to enforce.
- **Brevity is brand:** Embyte copy is direct. If a sentence can be shorter, it should be.

### Typographic Pairing Example

```
PLATFORM CAPABILITIES                              ← Geist Medium ALL CAPS, 14px, 0.10em (eyebrow)
──────────────────────────────────────────────────
Everything you need to run flawless events         ← Geist Bold, 36px, -0.01em (section heading)

From the gate to the gallery, Embyte handles       ← Geist Regular, 18px, lh 1.6 (lead description)
the infrastructure so you can focus on the
experience.
```

---

## 5. Spacing & Layout

### Spacing Scale (8px base grid)

```
space-1      4px
space-2      8px
space-3     12px
space-4     16px
space-5     24px
space-6     32px
space-7     48px
space-8     64px
space-9     96px
space-10   128px
space-11   160px
space-12   240px
```

> **Rule:** All margins, paddings, gaps, and positioning values must use a value from this scale. No arbitrary values. No half-pixel or percentage values in component-level spacing.

### Layout Grid

| Breakpoint | Columns | Gutter | Margin | Max Width |
|------------|---------|--------|--------|-----------|
| Mobile (`< 640px`) | 4 | 16px | 16px | — |
| Tablet (`640px – 1023px`) | 8 | 24px | 24px | — |
| Desktop (`> 1024px`) | 12 | 32px | 32px | 1280px |

### Section Rhythm

```
Hero section                   padding-top: space-10   padding-bottom: space-10
Standard section               padding-top: space-9    padding-bottom: space-9
Compact / inline section       padding-top: space-7    padding-bottom: space-7
Component internal (cards)     padding: space-5
Footer internal                padding: space-6
```

### Border Radius

```
radius-sm     8px    — Tags, chips, badges, small elements
radius-md    12px    — Buttons, input fields, compact cards
radius-lg    16px    — Content cards, feature panels
radius-xl    24px    — Hero panels, modals, large surfaces
radius-full  999px   — Buttons (pill shape), avatar rings, notification dots
```

> **Aesthetic note:** Embyte is clean and modern, with generous rounding. `radius-md` is the default for interactive elements. `radius-lg` is reserved for cards and panels. `radius-xl` is for hero surfaces and modals. `radius-full` is exclusively for pill-shaped buttons and circular elements.

---

## 6. Visual Hierarchy

### Scale Hierarchy (Size = Importance)

| Level | Element | Size | Weight |
|-------|---------|------|--------|
| **1st** | Hero heading | 48–60px | Bold |
| **2nd** | Primary action (CTA) | Full-width or prominent, pill shape | Medium, brand gradient |
| **3rd** | Section headings | 30–36px | Bold |
| **4th** | Card titles | 20–24px | Semibold |
| **5th** | Body text | 16–18px | Regular |
| **6th** | Metadata/labels | 12–14px | Medium, uppercase |

### Colour Hierarchy

| Level | Colour | Purpose |
|-------|--------|---------|
| **Attention** | Coral→Magenta gradient | CTAs, active states, highlights, eyebrow text |
| **Focus** | Light `#F4F6FA` | Headings, key information on dark |
| **Support** | Surface `#1A2233` | Cards, elevated panels |
| **Background** | Dark Navy `#121824` | Overall canvas |

### Spatial Hierarchy

- **Top**: Navigation bar (sticky, glass blur)
- **Center-top**: Hero section with headline + dashboard mockup
- **Center**: Feature cards, product verticals, roadmap
- **Bottom**: CTA banner, contact form, footer

### Reading Pattern

The design follows **F-pattern** for scanning:
1. Start top-left (logo)
2. Scan right (nav links, CTA)
3. Drop down (hero headline)
4. Scan right again (dashboard mockup)
5. Move down (feature cards, product tabs)

---

## 7. Components

### Buttons

**Primary Button (CTA — Main Action)**
```
Background:       Brand gradient (Coral #FF7E5F → Magenta #ED1E79)
Text:             White #FFFFFF
Font:             Geist Medium, 14px, letter-spacing 0.02em
Padding:          10px 24px
Border-radius:    radius-full (999px)
Border:           none
Shadow:           0 4px 14px rgba(237, 30, 121, 0.20)
Hover state:      filter brightness(1.10), transform scale(1.02), transition 200ms ease
Active state:     transform scale(0.97), transition 100ms ease
Disabled state:   opacity 0.5, cursor not-allowed
Focus state:      ring 2px Coral #FF7E5F, ring-offset 2px Dark Navy
```

**Secondary Button (Ghost)**
```
Background:       rgba(255, 255, 255, 0.05)
Text:             Light #F4F6FA
Font:             Geist Medium, 14px, letter-spacing 0.02em
Padding:          10px 24px
Border-radius:    radius-full (999px)
Border:           1px solid rgba(255, 255, 255, 0.08)
Hover state:      background rgba(255, 255, 255, 0.10), border-color rgba(255, 255, 255, 0.20), transition 200ms ease
```

**Text Link**
```
Font:             Geist Regular, inherit size
Color:            Coral #FF7E5F
Text-decoration:  none
Hover:            text-decoration underline, underline-offset 3px
Letter-spacing:   0.02em
Transition:       color 200ms ease
```

**Danger Button (Destructive Actions)**
```
Background:       #EF4444
Text:             White #FFFFFF
Font:             Geist Medium, 14px, letter-spacing 0.02em
Padding:          10px 24px
Border-radius:    radius-full (999px)
Hover state:      filter brightness(0.90), transition 200ms ease
```

### Cards

**Standard Feature Card**
```
Background:       Surface #1A2233
Border:           1px solid rgba(255, 255, 255, 0.08)
Border-radius:    radius-lg (16px)
Padding:          space-5 (24px)

Content layout:
  Icon container: h-12 w-12, rounded-xl, bg-white/5
  Icon:           h-6 w-6, Coral #FF7E5F
  Title:          Geist Semibold, 20px, Light #F4F6FA
  Description:    Geist Regular, 14px, Muted #8B95A8

Hover state:
  Border:         1px solid rgba(255, 126, 95, 0.30)
  Shadow:         0 8px 32px rgba(237, 30, 121, 0.05)
  Transform:      scale(1.02)
  Icon container: bg-brand-gradient, icon colour → White
```

**Product Tab Card**
```
Background:       Surface #1A2233 with gradient border
Border:           Gradient border (Coral → Magenta) via mask technique
Border-radius:    radius-xl (24px)
Padding:          space-8 (32px) to space-10 (48px)

Content layout:
  Left:           Image (16:10 aspect, object-cover)
  Right:          Title, description, highlight list

Highlight items:
  Border:         1px solid rgba(255, 255, 255, 0.08)
  Background:     rgba(255, 255, 255, 0.03)
  Border-radius:  radius-lg (16px)
  Padding:        14px
  Check icon:     6x6 rounded-md, brand gradient bg, white check

Hover state:
  Border:         1px solid rgba(255, 126, 95, 0.20)
  Background:     rgba(255, 255, 255, 0.05)
```

**Roadmap Card**
```
Background:       Surface #1A2233 (current) / Surface at 50% opacity (upcoming)
Border:           Gradient border (current) / 1px solid rgba(255, 255, 255, 0.08) (upcoming)
Border-radius:    radius-lg (16px)
Padding:          space-5 (24px)

Content layout:
  Period badge:   Geist Medium, 14px, Muted
  Title:          Geist Semibold, 18px, Light
  Description:    Geist Regular, 14px, Muted

Current indicator:
  Badge:          "Current" — brand gradient bg, white text, radius-full, 12px font
  Dot:            12px circle, brand gradient, ring 4px rgba(255, 126, 95, 0.20)
```

### Chips & Tags

**Badge / Tag (Informational)**
```
Background:       rgba(255, 126, 95, 0.10)
Text:             Coral #FF7E5F
Font:             Geist Medium, 12px
Padding:          2px 10px
Border-radius:    radius-full (999px)
Border:           1px solid rgba(255, 126, 95, 0.25)
```

**Active Tab Chip**
```
Background:       Brand gradient (Coral → Magenta)
Text:             White #FFFFFF
Font:             Geist Medium, 14px
Padding:          10px 20px
Border-radius:    radius-xl (16px)
Shadow:           0 4px 14px rgba(237, 30, 121, 0.20)
```

**Inactive Tab Chip**
```
Background:       transparent
Text:             Muted #8B95A8
Font:             Geist Medium, 14px
Padding:          10px 20px
Border-radius:    radius-xl (16px)
Hover:            background rgba(255, 255, 255, 0.05), text Light
```

**Trust Badge**
```
Background:       rgba(255, 126, 95, 0.10)
Text:             Coral #FF7E5F
Font:             Geist Medium, 12px
Padding:          6px 14px
Border-radius:    radius-full (999px)
Border:           1px solid rgba(255, 126, 95, 0.25)
Icon:             Check, 14px, Coral
```

### Input Fields

**Text Input**
```
Background:       rgba(255, 255, 255, 0.03)
Border:           1px solid rgba(255, 255, 255, 0.08)
Border-radius:    radius-lg (12px)
Padding:          12px 16px
Font:             Geist Regular, 14px, Light #F4F6FA
Placeholder:      Muted #8B95A8 at 60% opacity
Focus:            border-color rgba(255, 126, 95, 0.50), ring 2px rgba(255, 126, 95, 0.20), outline none
```

**Select Input**
```
Same as text input with:
Appearance:       none
Custom arrow:     via background SVG or pseudo-element
```

**Textarea**
```
Same as text input with:
Resize:           none
Min-height:       96px (4 rows)
```

**Error State**
```
Border:           1px solid #EF4444
Helper text:      Geist Regular, 12px, #EF4444, below input, margin-top 4px
```

**Label**
```
Font:             Geist Medium, 14px
Color:            Light #F4F6FA
Margin-bottom:    6px
Display:          block
```

### Navigation Bar

```
Height:           56px
Background:       rgba(18, 24, 36, 0.70) with backdrop-blur-xl
Border-bottom:    1px solid rgba(255, 255, 255, 0.08)
Position:         sticky, top 0
z-index:          50

Logo:
  Image:          embyte-icon, h-8 w-auto
  Text:           Geist Semibold, 18px, Light, lowercase
  Gap:            10px between icon and text

Nav links (desktop):
  Font:           Geist Medium, 14px
  Color:          Muted #8B95A8
  Hover:          color Light #F4F6FA, transition 200ms
  Gap:            32px between links

Action buttons (desktop):
  Gap:            12px between buttons

Mobile menu button:
  Size:           44px min-touch target
  Border-radius:  radius-md (12px)
  Icon:           Menu / X, 24px, Light

Mobile menu:
  Background:     rgba(18, 24, 36, 0.95) with backdrop-blur-xl
  Border-top:     1px solid rgba(255, 255, 255, 0.08)
  Overlay:        rgba(18, 24, 36, 0.50) with backdrop-blur-xl
  Link padding:   12px 16px, min-height 44px
  Link radius:    radius-md (12px)
  Link hover:     background rgba(255, 255, 255, 0.05)
```

### Section Heading

```
Container:        max-w-2xl, mx-auto
Alignment:        center (default) or left

Eyebrow:
  Font:           Geist Medium, 14px, uppercase, 0.10em spacing
  Color:          Brand gradient (text fill)
  Margin-bottom:  12px

Title:
  Font:           Geist Bold, 30–36px, tracking-tight
  Color:          Light #F4F6FA
  Line-height:    1.2

Description:
  Font:           Geist Regular, 18px, lh 1.6
  Color:          Muted #8B95A8
  Margin-top:     16px
```

### Toast / Notification

```
Position:         fixed bottom-right, margin 24px
Width:            max 360px
Background:       Surface #1A2233
Color:            Light #F4F6FA
Border:           1px solid rgba(255, 255, 255, 0.08)
Border-radius:    radius-lg (16px)
Padding:          16px 24px
Font:             Geist Regular, 14px, lh 1.5
Box-shadow:       0 8px 32px rgba(0, 0, 0, 0.24)
Entrance:         translateY(16px) opacity 0 → translateY(0) opacity 1, 300ms ease-out
Auto-dismiss:     4000ms

Variants:
  Success:        left border 3px solid Success #10B981
  Submission:     left border 3px solid Coral #FF7E5F
  Warning:        left border 3px solid Warning #F59E0B
  Error:          left border 3px solid Error #EF4444
```

### Dashboard Mockup

A visual representation of the Embyte dashboard used in the Hero section. Not a live component — a static marketing asset.

```
Container:        gradient-border, rounded-2xl, bg-surface/80, p-1, shadow-2xl
Inner:            rounded-[calc(1rem-1px)], bg-[#0f1520], p-5

Header:
  Title:          Geist Regular, 12px, uppercase, tracking-wider, Muted
  Event name:     Geist Semibold, 14px, Light
  Live badge:     rounded-full, bg-emerald-500/10, text-emerald-400, 12px font
  Pulse dot:      h-1.5 w-1.5, rounded-full, bg-emerald-400, animate-pulse

Stat cards:
  Grid:           3 columns, gap-3
  Card:           rounded-xl, border, bg-white/[0.03], p-3
  Icon:           h-4 w-4, Coral #FF7E5F
  Value:          Geist Bold, 18px, Light
  Label:          Geist Regular, 10px, Muted

Chart:
  Container:      rounded-xl, border, bg-white/[0.03], p-4
  Bars:           brand gradient, opacity-80, rounded-t-sm
  Label:          Geist Regular, 12px, Muted

Scanner status:
  Container:      rounded-xl, border, bg-white/[0.03], p-3
  Icon container: h-10 w-10, rounded-lg, brand gradient
  Icon:           h-5 w-5, White
  Title:          Geist Medium, 12px, Light
  Subtitle:       Geist Regular, 10px, Muted
  Status:         Geist Medium, 12px, emerald-400
```

---

## 8. Iconography

### Icon Style
- **Stroke-based only.** Stroke weight `1.5px` at 20px size; scale proportionally.
- Style: Geometric, clean, minimal — consistent with Lucide icon set.
- Recommended library: **Lucide Icons** (MIT licensed, consistent stroke weight, extensive set)
- Custom icons follow the same 1.5px stroke rule and are designed at 20×20px on a 24×24px artboard.

### Core Icon Set

```
Shield / Security     shield-check (Lucide)           — Gate security, secure entry
Analytics             bar-chart-3 (Lucide)            — Real-time analytics, dashboards
Media / Vault         image (Lucide)                  — Memory Vault, photo/video uploads
Ticket                ticket (Lucide)                 — Nexus product, ticketing
Graduation            graduation-cap (Lucide)         — Campus product, university events
Heart                 heart (Lucide)                  — Weddings product, premium events
Sparkles              sparkles (Lucide)               — Launch Partner, special features
QR Code               qr-code (Lucide)                — Scanner, QR ticket validation
Users                 users (Lucide)                  — Attendance, guest count
Check                 check (Lucide)                  — Confirmation, highlights
Close / Dismiss       x (Lucide)                      — Modal dismiss, toast close
Menu                  menu (Lucide)                   — Mobile navigation
Arrow                 arrow-right (Lucide)            — Navigation forward, CTAs
```

### Sizing

| Context | Size |
|---------|------|
| Navigation bar | 24px |
| Feature cards | 24px |
| Inline with text | 16px |
| Dashboard mockup | 16–20px |
| Feature / illustrative (empty states) | 48px |
| Badge dot indicator | 6px (custom circle, not Lucide) |
| Maximum standard size | 48px |

---

## 9. Motion & Animation

### Principles
- **Precision is the product.** Embyte must feel engineered. Transitions are smooth, purposeful, and predictable. No playful bounces, no organic easing.
- **Gradient flows.** The brand gradient is animated through CTAs and highlights — it shifts, glows, and moves to signal interactivity.
- **Performance is non-negotiable.** All animations use hardware-accelerated CSS properties: `transform`, `opacity`, `filter`. Never animate `height`, `width`, `top`, `left`, or layout-affecting properties.
- **Restraint is sophistication.** One well-timed entrance reads as polished design. Twelve competing animations read as noise. Earn every effect.

### Timing Scale

```
instant       0ms     — Toggle switches, icon state swaps (no perceivable delay)
fast        100ms     — Button press feedback, hover state changes
base        200ms     — All standard hover transitions, border colour, scale
medium      300ms     — Card reveals, modal entrance, toast slide-in
slow        500ms     — Page transitions, section reveals
deliberate  600ms     — Hero entrance, onboarding sequence beats
```

### Easing Curves

```css
--ease-default:   cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-in:        cubic-bezier(0.4, 0, 1, 1);
--ease-out:       cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
--ease-snap:      cubic-bezier(0.16, 1, 0.3, 1);   /* Primary curve — fast snap, smooth land */
--ease-gradient:  cubic-bezier(0.4, 0, 0.2, 1);    /* Gradient flow animations */
```

### Standard Transitions

```css
/* Standard hover transitions — colour and border only */
transition: color var(--duration-base) var(--ease-default),
            background-color var(--duration-base) var(--ease-default),
            border-color var(--duration-base) var(--ease-default),
            opacity var(--duration-base) var(--ease-default);

/* Card entrance — slides up from bottom */
opacity: 0;
transform: translateY(16px);
transition: opacity var(--duration-slow) var(--ease-snap),
            transform var(--duration-slow) var(--ease-snap);

.card-entered {
  opacity: 1;
  transform: translateY(0);
}

/* Scale entrance — dashboard mockup */
opacity: 0;
transform: scale(0.96);
transition: opacity var(--duration-medium) var(--ease-snap),
            transform var(--duration-medium) var(--ease-snap);

.scale-entered {
  opacity: 1;
  transform: scale(1);
}
```

### Keyframe Animations

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Page Load Sequence (Landing Entrance)

```
0ms          Dark Navy background renders instantly
100ms        Navbar fades in — opacity 0 → 1, 300ms ease-out
200ms        Hero eyebrow text slides up — translateY(16px) → 0, 400ms ease-snap
300ms        Hero heading slides up — translateY(16px) → 0, 500ms ease-snap
400ms        Hero description slides up — translateY(16px) → 0, 500ms ease-snap
500ms        CTA buttons slide up — translateY(16px) → 0, 400ms ease-snap
600ms        Dashboard mockup scales in — scale(0.96) → 1, 400ms ease-snap
```

---

## 10. Photography & Visual Direction

### Art Direction Principles

Embyte is a professional event infrastructure brand. Its visual world should feel like a high-end production environment — clean, controlled, and technically precise. Every image should feel like it was captured during a flawlessly executed event.

**Do:**
- Clean, well-lit event environments — venues, stages, entrances, registration desks.
- Cool-to-neutral colour temperatures (5000K–6500K range). Images feel professional, not warm or intimate.
- Modern architectural surfaces as backdrops — glass, steel, concrete, clean lines.
- Moderate depth of field that isolates subjects from busy event environments.
- Candid operational shots — staff scanning, guests entering, coordinators monitoring dashboards.
- High contrast with clean shadows that harmonise with the Dark Navy palette.

**Don't:**
- No warm, intimate, or cozy settings. This is infrastructure, not a lifestyle brand.
- No flat, even studio lighting. Light should have direction and precision.
- No oversaturated lifestyle stock photography — people posing, smiling at camera.
- No dark, moody, or dramatic lighting. The brand is clear and confident.
- No stock photography of people looking at phones — this is an event operations brand.

### Image Ratios

| Use Case | Aspect Ratio |
|----------|-------------|
| Hero / Feature editorial | 16 : 9 |
| Product showcase | 16 : 10 |
| Onboarding illustrations | 4 : 3 |
| Card thumbnails | 3 : 2 |
| Social / Open Graph | 1200 × 630px (fixed) |

### Colour Grading & Tone
All assets should be graded to feel cohesive with the brand palette. Shadows should lean cool-navy (aligned to Dark Navy's undertone). Highlights should be crisp and clean — never soft or blown out. Saturation should be natural, with the exception of coral/orange tones which should be preserved or slightly boosted to echo the brand accent. Contrast should be pushed — deep navies, clean whites, no muddy midtones.

### Visual Overlay / Typography Treatment
When text is placed over photographic assets: always apply a Dark Navy `#121826` scrim overlay at 60–75% opacity before placing text. Text must be Light `#F4F6FA`. Run a WCAG contrast check on every photographic text treatment before shipping — the scrim opacity is a starting point, not a guarantee.

---

## 11. Voice & Tone

### Brand Personality

| Trait | Means | Never |
|-------|-------|-------|
| **Precise** | Gets to the point in as few words as possible. Every sentence is actionable. Technical when needed, accessible always. | Never verbose, never "Welcome to!", never "Let me help you with" |
| **Confident** | Speaks with authority about event infrastructure. Knows what it does and does it well. No hedging, no qualifiers. | Never uncertain, never "we try to", never "hopefully" |
| **Modular** | Communicates in components. Features are discrete, clear, and independent. The language mirrors the product architecture. | Never monolithic descriptions, never run-on explanations |
| **Professional** | Maintains a polished, business-appropriate tone. Suitable for coordinators, institutions, and enterprise clients. | Never casual slang, never "hey!", never "what's up" |

### Tone by Channel

| Channel | Tone | Example |
|---------|------|---------|
| Landing page hero | Bold, minimal, direct | *"embyte: Empower your events."* |
| Feature description | Clear, benefit-focused | *"Mobile web scanner framework that works in any browser."* |
| Product tab | Confident, specific | *"Three verticals. One platform."* |
| Launch Partner CTA | Exclusive, inviting | *"Join our Launch Partner program."* |
| Contact form | Professional, helpful | *"Tell us about your event and we'll reach out with next steps."* |
| Success state | Brief, reassuring | *"Thanks — we'll be in touch shortly."* |
| Error message | Calm, actionable | *"Failed to send message. Please try again."* |
| Roadmap | Transparent, forward-looking | *"Built in the open with our partners."* |

### Writing Rules

- **Always lowercase for Embyte's voice.** Embyte speaks in lowercase in-product and on the landing page. It is a deliberate aesthetic choice that signals modernity and confidence. This applies to product dialogue only — UI labels, legal copy, and formal communications follow standard sentence case.
- **One idea per message.** Embyte never writes paragraphs. It does not explain itself. It states facts and gets out of the way.
- **No exclamation marks in Embyte's voice.** Confidence is conveyed through brevity and precision, not enthusiasm.
- **Avoid filler phrases:** "Welcome to", "Great job", "You're all set", "Let's get started", "Thanks for using" — none of these belong in Embyte's vocabulary.
- **Timestamps and system copy** use sentence case. Only UI labels (badges, nav items, field labels) use ALL CAPS.
- **Product name** is always lowercase `embyte` in all contexts. Never: `Embyte`, `EMBYTE`, `Embyte App`, `Embyte Platform`.
- **Contractions are required.** "you're" not "you are." "don't" not "do not." Natural speech always.
- **Event types are proper nouns when referring to products:** "Embyte Nexus", "Embyte Campus", "Embyte Weddings" — these are product names, not generic descriptors.

### Sample Micro-copy

```
Standard send CTA        →  "send"  (lowercase, no icon needed if space is tight)
Input placeholder        →  "Your name" / "you@organization.com"
Empty state              →  "No events yet. Create your first."
Form submitted           →  "Thanks — we'll be in touch shortly."
Error generic            →  "Something went wrong. Try again."
Error network            →  "No connection. Check your signal."
Live indicator           →  "Live"  (with pulse dot)
Scanner status           →  "Online" / "Offline"
Capacity label           →  "Capacity" + percentage
```

---

## 12. CSS Custom Properties (Variables)

```css
:root {

  /* ─── Colour Palette ─── */
  --color-dark-navy:    #121824;
  --color-light:        #F4F6FA;
  --color-coral:        #FF7E5F;
  --color-magenta:      #ED1E79;
  --color-muted:        #8B95A8;
  --color-surface:      #1A2233;

  /* ─── Semantic Tokens ─── */
  --color-bg:               var(--color-dark-navy);
  --color-surface-raised:   rgba(26, 34, 51, 0.80);
  --color-text-primary:     var(--color-light);
  --color-text-secondary:   var(--color-muted);
  --color-text-muted:       var(--color-muted);
  --color-border:           rgba(255, 255, 255, 0.08);
  --color-border-strong:    rgba(255, 255, 255, 0.15);
  --color-accent:           var(--color-coral);

  /* Functional Status Colours */
  --color-success:  #10B981;
  --color-warning:  #F59E0B;
  --color-error:    #EF4444;
  --color-info:     #3B82F6;

  /* ─── Brand Gradient ─── */
  --gradient-start: #FF7E5F;
  --gradient-end:   #ED1E79;
  --gradient-brand: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));

  /* ─── Typography ─── */
  --font-display:  var(--font-geist-sans), system-ui, sans-serif;
  --font-body:     var(--font-geist-sans), system-ui, sans-serif;
  --font-mono:     var(--font-geist-mono), 'Courier New', monospace;

  /* Font Weights */
  --fw-regular:   400;
  --fw-medium:    500;
  --fw-semibold:  600;
  --fw-bold:      700;

  /* Font Sizes */
  --text-display-xl:   48px;
  --text-display-l:    36px;
  --text-display-m:    30px;
  --text-display-s:    24px;
  --text-body-l:       18px;
  --text-body-m:       16px;
  --text-body-s:       14px;
  --text-caption:      12px;
  --text-label:        12px;
  --text-eyebrow:      14px;
  --text-mono:         12px;

  /* Line Heights */
  --leading-tight:    1.0;
  --leading-snug:     1.2;
  --leading-normal:   1.4;
  --leading-relaxed:  1.5;
  --leading-loose:    1.6;

  /* Letter Spacing (Tracking) */
  --tracking-tight:    -0.02em;
  --tracking-normal:    0.01em;
  --tracking-wide:      0.02em;
  --tracking-wider:     0.08em;
  --tracking-widest:    0.10em;
  --tracking-brand:    0.20em;

  /* ─── Spacing (8px Grid Scale) ─── */
  --space-1:    4px;
  --space-2:    8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   24px;
  --space-6:   32px;
  --space-7:   48px;
  --space-8:   64px;
  --space-9:   96px;
  --space-10: 128px;
  --space-11: 160px;
  --space-12: 240px;

  /* ─── Border Radius ─── */
  --radius-sm:     8px;
  --radius-md:    12px;
  --radius-lg:    16px;
  --radius-xl:    24px;
  --radius-full: 999px;

  /* ─── Motion & Timings ─── */
  --duration-instant:    0ms;
  --duration-fast:      100ms;
  --duration-base:      200ms;
  --duration-medium:    300ms;
  --duration-slow:      500ms;
  --duration-deliberate: 600ms;

  --ease-default:  cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-snap:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-gradient: cubic-bezier(0.4, 0, 0.2, 1);

  /* ─── Layout Dimensions ─── */
  --container-max:      1280px;
  --container-prose:     680px;
  --nav-height:           56px;
  --input-min-height:     44px;

  /* ─── Elevation / Shadow ─── */
  --shadow-sm:   0 2px 8px rgba(0, 0, 0, 0.12);
  --shadow-md:   0 4px 16px rgba(0, 0, 0, 0.16);
  --shadow-lg:   0 8px 32px rgba(0, 0, 0, 0.20);
  --shadow-xl:   0 16px 64px rgba(0, 0, 0, 0.28);
  --shadow-glow: 0 4px 14px rgba(237, 30, 121, 0.20);
}
```

### Utility Classes

```css
/* Typography Utilities */
.display-xl { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-display-xl); letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); }
.display-l  { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-display-l);  letter-spacing: var(--tracking-tight); line-height: var(--leading-snug); }
.display-m  { font-family: var(--font-display); font-weight: var(--fw-semibold); font-size: var(--text-display-m); line-height: var(--leading-snug); }
.display-s  { font-family: var(--font-display); font-weight: var(--fw-semibold); font-size: var(--text-display-s); line-height: var(--leading-snug); }
.body-l     { font-family: var(--font-body); font-weight: var(--fw-regular); font-size: var(--text-body-l); line-height: var(--leading-loose); }
.body-m     { font-family: var(--font-body); font-weight: var(--fw-regular); font-size: var(--text-body-m); line-height: var(--leading-relaxed); }
.body-s     { font-family: var(--font-body); font-weight: var(--fw-regular); font-size: var(--text-body-s); line-height: var(--leading-relaxed); }
.caption    { font-family: var(--font-body); font-weight: var(--fw-regular); font-size: var(--text-caption); line-height: var(--leading-normal); }
.label      { font-family: var(--font-body); font-weight: var(--fw-medium); font-size: var(--text-label); letter-spacing: var(--tracking-wider); text-transform: uppercase; }
.eyebrow    { font-family: var(--font-body); font-weight: var(--fw-medium); font-size: var(--text-eyebrow); letter-spacing: var(--tracking-widest); text-transform: uppercase; }
.mono       { font-family: var(--font-mono); font-weight: var(--fw-regular); font-size: var(--text-mono); letter-spacing: var(--tracking-normal); }

/* Colour Utilities */
.text-primary   { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-muted     { color: var(--color-text-muted); }
.text-accent    { color: var(--color-accent); }
.bg-base        { background-color: var(--color-bg); }
.bg-surface     { background-color: var(--color-surface); }
.bg-accent      { background-color: var(--color-accent); }

/* Gradient Utilities */
.bg-brand-gradient { background-image: var(--gradient-brand); }
.text-brand-gradient {
  background-image: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Layout Utilities */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-8);
}
.prose {
  max-width: var(--container-prose);
  margin-inline: auto;
}

/* Transitions */
.transition-colors    { transition: color var(--duration-base) var(--ease-default), background-color var(--duration-base) var(--ease-default), border-color var(--duration-base) var(--ease-default), opacity var(--duration-base) var(--ease-default); }
.transition-transform { transition: transform var(--duration-medium) var(--ease-snap); }

/* Animations */
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
.animate-scale-in   { animation: scale-in 0.4s ease-out both; }
```

---

## 13. Do's and Don'ts

### Colour

| ✅ Do | ❌ Don't |
|-------|---------|
| Use brand gradient for CTAs and active states | Use flat Coral or flat Magenta alone for CTAs |
| Use Dark Navy as the primary background | Use pure black `#000000` for backgrounds |
| Use Surface for elevated panels and cards | Use Dark Navy for card backgrounds |
| Use Muted for secondary text and metadata | Use Muted for body text or headings |
| Maintain WCAG AA contrast ratios | Place Coral text on Light backgrounds |

### Typography

| ✅ Do | ❌ Don't |
|-------|---------|
| Use Geist for all text surfaces | Fall back to system fonts in production |
| Use Bold for headings, Regular for body | Use Bold for body text |
| Use uppercase with tracking for labels | Use uppercase for body copy |
| Keep line length under 68 characters | Allow unbounded line lengths |
| Use Geist Mono for dashboard data | Use Geist Mono for headings or body |

### Components

| ✅ Do | ❌ Don't |
|-------|---------|
| Use pill-shaped buttons (radius-full) | Use rectangular buttons for CTAs |
| Use gradient border via mask technique | Use `border-image` or solid border for gradient effect |
| Use backdrop-blur for navigation glass | Use solid background without blur for nav |
| Use `prefers-reduced-motion` fallback | Force animations on users who prefer reduced motion |
| Maintain 44px minimum touch targets | Create interactive elements smaller than 44px |

### Layout

| ✅ Do | ❌ Don't |
|-------|---------|
| Use the 8px spacing grid consistently | Use arbitrary spacing values |
| Use `max-w-7xl` for content containers | Allow content to stretch full viewport width |
| Use responsive grid (4 → 8 → 12 columns) | Use fixed-width layouts |
| Use `px-4 sm:px-6 lg:px-8` for horizontal padding | Use inconsistent padding across breakpoints |
| Use `py-20 sm:py-28` for section rhythm | Use random vertical spacing between sections |

### Motion

| ✅ Do | ❌ Don't |
|-------|---------|
| Use `transform` and `opacity` for animations | Animate `height`, `width`, `top`, or `left` |
| Use `ease-snap` for most transitions | Use linear easing for interactive elements |
| Stagger card entrances with delays | Animate all elements simultaneously |
| Respect `prefers-reduced-motion: reduce` | Ignore accessibility motion preferences |
| Keep animations under 600ms | Create lingering or slow transitions |
