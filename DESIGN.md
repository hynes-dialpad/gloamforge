---
name: Gloamforge
description: An ashen field manual for learning cinematic fantasy character creation.
colors:
  void: "#090b0b"
  soot: "#101312"
  iron: "#181d1a"
  raised-iron: "#222923"
  bone: "#f0e8d8"
  ash: "#b8bcb3"
  quiet-ash: "#8e948c"
  brass: "#d2b66f"
  ember: "#e1733d"
  moss: "#a7b79e"
  warning-surface: "#302617"
  warning-text: "#f2d38d"
  success-surface: "#1d2a22"
  success-text: "#c7d9b6"
typography:
  display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 4rem)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Source Sans 3, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Source Sans 3, Helvetica Neue, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  edge: "2px"
  control: "4px"
  panel: "8px"
  seal: "999px"
spacing:
  hairline: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "72px"
components:
  button-primary:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.soot}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
    height: "48px"
  button-quiet:
    backgroundColor: "{colors.iron}"
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "44px"
  panel:
    backgroundColor: "{colors.iron}"
    textColor: "{colors.bone}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

<!--
THESIS: Gloamforge is an apprentice's field manual made from ash, iron, and hard-won annotations; it refuses the generic glowing fantasy dashboard.
OWN-WORLD: Near-black iron fields, bone text, scarce brass, ember state changes, etched geometry, directional light, and authored Gatewarden renders.
STORY: Enter the forge, read one mission, finish one phase, and see the character gain form.
FIRST VIEWPORT: A cropped Gatewarden occupies the dark field while the title and one brass entry action cut across it; the course begins at the fold.
FORM: Ashen mythic realism, selected by the user from the redesign directions and staged as a cinematic field manual.
-->

# Design System: Gloamforge

## Overview

**Creative North Star: "The Ashen Field Manual"**

Gloamforge feels like a working document recovered from a severe, cinematic world: precise enough to use beside Blender, scarred enough to suggest a story beyond the page. The interface is dark because the learner is shaping forms on a laptop in a dim visual-production context, not because “fantasy” defaults to neon-on-black.

Atmosphere comes from authored Gatewarden imagery, controlled directional light, ash grain, etched diagrams, and changes in scale. Controls remain familiar and explicit. The memorable act is phase advancement: a finished instruction closes like a signed record and exposes the next piece of the build.

**Key Characteristics:**

- Directional, image-led composition rather than centered card stacks.
- Iron and soot own the page; brass appears only where action or achievement warrants it.
- Dense instructional detail alternates with quiet cinematic space.
- Sharp geometry, restrained corners, and fine engraved rules.
- Original worldbuilding without franchise quotation or imitation.

## Colors

The palette moves from void through iron, with warm bone for reading and scarce brass or ember for decisions and state.

### Primary

- **Forge Brass:** the primary action, current progress, and earned emphasis.
- **Live Ember:** active warnings, focus-adjacent warmth, and moments of transition; never a page-wide glow.

### Secondary

- **Weathered Moss:** secondary completion cues and environmental undertones that connect the interface to `public/og.png`.

### Neutral

- **Void:** the outermost scene and image falloff.
- **Soot:** the default page field.
- **Iron:** instructional surfaces and phase bodies.
- **Raised Iron:** hover, selected, and nested surfaces.
- **Bone:** primary text and high-value labels.
- **Ash:** supporting copy that still meets body-text contrast.
- **Quiet Ash:** metadata only, never essential instruction.

### Named Rules

**The Scarce Metal Rule.** Brass belongs to the primary action, the current phase, and completed progress; if everything shines, nothing has been earned.

**The Actual Surface Rule.** Every foreground token is contrast-checked against the surface where it renders, including warning, success, selected, and button fills.

## Typography

**Display Font:** Marcellus, with Georgia fallback
**Body Font:** Source Sans 3, with Helvetica Neue fallback

**Character:** Marcellus carries the measured, inscribed authority of an oath tablet without using ornamental fantasy lettering. Source Sans 3 keeps Blender steps, shortcuts, and warnings clear during repeated laptop reading.

### Hierarchy

- **Display** (400, `clamp(3rem, 8vw, 7.5rem)`, 0.88): the single Gloamforge title and rare course-completion statements.
- **Headline** (400, `clamp(2rem, 4vw, 4rem)`, 1): mission and major section headings.
- **Title** (600, `clamp(1.25rem, 2vw, 1.75rem)`, 1.15): phase and field-kit headings.
- **Body** (400, 1rem, 1.65): instructions and explanations, capped near 68 characters per line.
- **Label** (650, 0.8125rem, 0.06em): compact state and tool labels. Sentence case is the default; uppercase is reserved for one masthead mark and keyboard legends.

### Named Rules

**The One Inscription Rule.** The oversized display face appears once per view; instructional hierarchy is carried by spacing, weight, and scale rather than repeated ceremonial labels.

## Layout

The desktop page uses an image-led, asymmetrical opening followed by a single reading column paired with a compact reference rail. The active mission has a maximum readable measure; mission choices remain visible as a horizontal or wrapping index rather than three identical feature cards.

Spacing follows a 4px base with 12, 16, 24, 32, 48, and 72px landmarks. More space precedes a new idea than follows its heading. The field kit stays close to the active instruction on wide screens and becomes a native disclosure below the mission brief on narrow screens.

At 390×844, the composition becomes one column, artwork crops rather than shrinks into a thumbnail, body text stays at least 16px, controls remain at least 44×44px, and no heading or phase body exceeds the viewport width.

## Elevation & Depth

Depth is tonal and directional. Iron surfaces separate through value, fine borders, inset shadow, and image falloff rather than floating glass cards. A restrained long shadow may anchor the mission workspace against the soot field; blur never turns text-bearing panels translucent.

**The Fire Has a Source Rule.** Warm light enters from one consistent direction. Do not scatter independent radial glows behind controls, headings, or cards.

## Shapes

The dominant silhouette is cut metal: mostly straight edges, 2–8px corners, hairline engraved borders, and occasional clipped corners on large decorative frames. Pills are limited to tiny status seals. Phase rows must not use a thick colored side stripe.

Progress uses a thin forged track with a transform-driven fill. Focus uses a clear bone or brass outline with offset; it is never represented by color alone.

## Components

### Buttons

- **Shape:** compact cut-metal rectangle (4px radius), at least 44px tall.
- **Primary:** forge-brass fill with soot text and enough horizontal room to read as an action rather than a tag.
- **Hover / Focus:** small tonal shift and visible 2px outline; no glow bloom or layout-moving lift.
- **Quiet:** iron fill, bone text, and a full hairline border.

### Mission Index

- Uses varied-width horizontal entries with mission name, time, and completion.
- The selected mission gains stronger bone text, raised iron, and a brass state marker that is not a side stripe.
- Entries remain buttons because they change the active workspace without navigating away.

### Phase Disclosure

- The header is a full-width button with phase title, time, and completion state.
- Exactly one phase body is visible while a mission is in progress.
- Completing the current phase closes it and opens the next incomplete phase.
- A completed header remains operable; its open body offers “Mark incomplete.”

### Warnings and Completion

- Warning uses the dedicated warning surface and text, an icon or explicit label, and no color-only meaning.
- Completion uses the success surface plus direct completion language and the next meaningful action.

### Field Kit

- Presented as an engraved trackpad diagram plus a compact legend.
- Stays near the active mission on desktop and uses native disclosure behavior on mobile.
- Labels describe both gesture and Blender result.

### Navigation

- The masthead is sparse: product mark, course-map link, field-kit link, and reset.
- The product mark is an original Gatewarden helm rune: a brass seal, bone helm, and ember visor, reused as the favicon for a consistent small-scale identity.
- Mobile retains the primary course action and reset; less important anchors may condense, but keyboard and touch access remain.

## Do's and Don'ts

### Do:

- **Do** make every viewport show the next learner action before decorative lore.
- **Do** use the text-free `public/gatewarden-hero.png` and the three mission renders as structural composition, not thumbnail decoration; reserve `public/og.png` for social previews.
- **Do** let completion materially change density by closing finished work.
- **Do** use real HTML headings, buttons, links, progress semantics, and labelled regions.
- **Do** disable reveal, scroll, and progress animation under `prefers-reduced-motion`.

### Don't:

- **Don't** copy franchise characters, heraldry, terminology, quotations, or composition.
- **Don't** use gradient text, glass panels, purple gradients, thick side stripes, or identical icon-card grids.
- **Don't** place a tracked uppercase eyebrow above every section.
- **Don't** hide essential instructions in low-contrast ash or over artwork.
- **Don't** add lore, claims, gamification, streaks, scores, or platform features that the product does not support.
