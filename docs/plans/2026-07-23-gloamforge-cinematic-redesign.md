# Gloamforge Cinematic Redesign Implementation Plan

Created: 2026-07-23
Agent: Codex
Status: VERIFIED
Approved: Yes
Iterations: 1
Worktree: No
Type: Feature

## Summary

**Goal:** Redesign Gloamforge as an ashen, mythic-realism Blender course with original Gatewarden artwork, one visible mission at a time, and completed phases that collapse but remain reopenable, while retaining static GitHub Pages hosting and device-local progress.

## Out of Scope

- Uploads, a learner gallery, sharing, accounts, a database, or any other backend service.
- Moving the site from GitHub Pages to Vercel or another dynamic host.
- Adding lessons beyond the three existing missions or rewriting their Blender 4.5 instructions.
- Locking later missions behind completion of earlier missions.
- Franchise-specific characters, heraldry, logos, quotations, or other Warhammer, Mistborn, Lord of the Rings, or Game of Thrones intellectual property.
- Cross-device progress synchronization or multi-user progress reporting.

## Approach

**Chosen:** Focused extraction of `Home` in `app/page.tsx` followed by a progressive mission workspace.
**Why:** Preserve the existing mission content, `gloamforge-progress-v1` storage contract, and GitHub Pages export while separating course data and the active mission interaction from the visual shell. This costs a bounded component split, but avoids both a risky rewrite and further growth of the current 750-line client component.

## Context for Implementer

The primary learner is 15, uses Blender on an M1 MacBook Air with a trackpad and no second monitor, and benefits from visible progress within 15–30 minutes. The experience should feel like an original cinematic fantasy field manual: serious and aspirational without copying a named franchise, and clear enough that art direction never obscures the next Blender action.

## Runtime Environment

- **Build:** `npm run build:pages`
- **Serve static export:** `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist/client`
- **Port:** `4173`
- **Health check:** `curl -I http://127.0.0.1:4173/`
- **Restart:** stop the current preview process, run `npm run build:pages`, then start the static server again so browser checks use the latest export.

## File Structure

- `PRODUCT.md` (create) — durable product purpose, audience, learning constraints, and hosting boundaries.
- `DESIGN.md` (create) — ashen mythic-realism visual language, interaction rules, responsive behavior, and accessibility contract.
- `app/course-data.ts` (create) — mission and phase types, existing Blender instructions, and static artwork metadata.
- `app/components/gloamforge-course.tsx` (create) — client-side course shell, active mission state, local progress persistence, hero, mission selector, and footer.
- `app/components/mission-workspace.tsx` (create) — one active mission, controlled phase disclosure, version check, completion state, and field kit.
- `app/page.tsx` (modify) — thin page entry that renders the course shell.
- `app/layout.tsx` (modify) — metadata and self-hosted build output for the display and body typefaces.
- `app/globals.css` (modify) — design tokens, page atmosphere, masthead, hero, course map, footer, and responsive foundation.
- `app/lesson.css` (modify) — active mission, phase disclosure, progress, version warning, and completion styling.
- `app/field-guide.css` (modify) — compact responsive trackpad and field-kit reference styling.
- `public/gatewarden-ready.png` (create) — original Gatewarden course-entry render.
- `public/gatewarden-shape.png` (create) — original Gatewarden blockout and silhouette render.
- `public/gatewarden-oath.png` (create) — original Gatewarden cinematic-story render.
- `tests/rendered-html.test.mjs` (modify) — static export, semantic structure, artwork, and GitHub Pages path regression coverage.

## Feature Inventory

| Existing file / feature | Current symbol or selector group | Planned disposition |
|---|---|---|
| `app/page.tsx` | `LessonStep`, `Mission`, `missions` | Move as-is to `app/course-data.ts` in Task 3; add only artwork metadata needed by Task 4. |
| `app/page.tsx` | `SavedProgress`, `STORAGE_KEY`, `parseSavedProgress`, `readProgressSnapshot`, `subscribeToProgress`, `writeProgress` | Preserve the `gloamforge-progress-v1` schema and move the helpers into `app/components/gloamforge-course.tsx` in Task 3. |
| `app/page.tsx` | `Home`, `selectMission`, `resetProgress` | Extract into `GloamforgeCourse` in Task 3, then harden anchor, focus, and malformed-storage behavior in Task 6. |
| `app/page.tsx` | `toggleStep` | Replace in Task 4 with separate completion and expansion actions so a completed phase can collapse, reopen, and be marked incomplete. |
| `app/page.tsx` | Hero mannequin, version dock, course map, active mission, field kit, future path, footer | Split between the course shell and mission workspace in Tasks 3–4; version check moves into Mission I, and the standalone dock is removed. |
| `app/globals.css` | Tokens, masthead, hero, course map, progress bar, future path, footer, responsive and reduced-motion rules | Redesign in Task 5 while retaining the established global-CSS methodology. |
| `app/lesson.css` | Mission brief, expanded steps, completion states, prompts, warning states | Redesign for controlled progressive disclosure in Task 5. |
| `app/field-guide.css` | Trackpad schematic, legend, field-kit layout | Restyle as an in-lesson responsive reference in Task 5. |
| `app/layout.tsx` | Metadata and global document shell | Retain existing metadata intent, add the selected type system, and continue using `public/og.png` for social metadata in Task 5. |
| `tests/rendered-html.test.mjs` | Course content, originality, relative asset paths, live-hero, and `og.png` social-metadata assertions | Extend rather than replace across Tasks 3, 4, and 6. |

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Cinematic PNGs make the static page slow on a laptop connection. | Medium | Medium | Keep the 1200×630 live hero below 1.5 MB, normalize mission images to 1200×800 and at most 1.5 MB, eager-load only `public/gatewarden-hero.png`, lazy-load mission artwork, and set intrinsic dimensions. |
| Component extraction changes or loses saved learner progress. | Medium | High | Keep the exact storage key and saved JSON fields, retain defensive parsing, and verify saved, empty, all-complete, and malformed states in TS-003 and TS-006. |
| New imagery or font output breaks GitHub Pages relative paths. | Medium | High | Exercise the built `dist/client` site, assert relative paths in `tests/rendered-html.test.mjs`, and require every rendered image to report a non-zero natural width in TS-005. |
| The redesign becomes atmospheric but harder to use on a single laptop screen. | Medium | High | Keep one mission and one expanded phase visible, preserve 16px minimum body text and 44px controls, and verify the 390×844 flow in TS-004. |
| Generated artwork drifts into recognizable franchise imagery. | Low | High | Use one original Gatewarden brief for all three renders and reject images containing franchise marks, named characters, text, or recognizable heraldry before integration. |

## E2E Test Scenarios

### TS-001: Enter the First Mission from the Cinematic Hero
**Priority:** Critical
**Preconditions:** The latest static export is served at `http://127.0.0.1:4173/` and `gloamforge-progress-v1` is absent.
**Mapped Tasks:** Task 2, Task 3, Task 4, Task 5, Task 6

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `http://127.0.0.1:4173/` and take a browser snapshot. | A single Gloamforge `<h1>`, the text-free `gatewarden-hero.png` artwork, and a visible “Begin Mission” link render without broken artwork or horizontal overflow. |
| 2 | Click “Begin Mission” and take a second snapshot. | The URL includes `#active-mission`, Mission I is the only mission workspace, its heading owns focus, Phase 1 is expanded, and Phases 2–4 are collapsed. |
| 3 | Read the active phase and mission selector. | The learner can see the current Blender action, mission progress, and all three selectable mission summaries without an unrelated page section interrupting the workflow. |

### TS-002: Complete, Reopen, and Reverse a Phase
**Priority:** Critical
**Preconditions:** Mission I is active with no completed phases.
**Mapped Tasks:** Task 4, Task 5, Task 6

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click the Phase 1 completion control and take a snapshot. | Phase 1 is marked complete and collapses, Phase 2 opens, and mission progress shows one of four phases complete. |
| 2 | Click the completed Phase 1 header. | Phase 1 reopens without losing completion, and the previously open phase collapses so only one phase body remains visible. |
| 3 | Click “Mark incomplete” inside Phase 1. | Phase 1 becomes incomplete and remains open as the current phase; progress returns to zero of four. |

### TS-003: Switch Missions and Resume Saved Completion
**Priority:** High
**Preconditions:** `gloamforge-progress-v1` is absent and the course page is open.
**Mapped Tasks:** Task 3, Task 4, Task 6

| Step | Action | Expected Result |
|---|---|---|
| 1 | Select Mission II from the mission map. | Mission II replaces Mission I in the single workspace and opens its first incomplete phase. |
| 2 | Complete each of Mission II’s four phases in order. | Each completed phase collapses and opens the next; after Phase 4, no phase body is open and a Mission II completion panel appears. |
| 3 | Reload the page. | Mission II remains active, all four phases remain complete, and the completion panel returns from device-local progress. |
| 4 | Click the completion panel’s next-mission action. | Mission III becomes the only active workspace and opens its first incomplete phase. |

### TS-004: Use a Mission on a Laptop-Sized Mobile View
**Priority:** High
**Preconditions:** Browser viewport is 390×844 and saved progress is cleared.
**Mapped Tasks:** Task 4, Task 5, Task 6

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to the course, snapshot the hero, and evaluate the body font size, primary-control rectangle, heading rectangle, and document scroll width. | The title and artwork remain inside the viewport, body text is at least 16px, the primary control is at least 44px tall, and document width does not exceed viewport width. |
| 2 | Enter Mission I, complete Phase 1, and snapshot the workspace. | The next phase opens in place without horizontal overflow or an excessive scroll jump. |
| 3 | Toggle the compact field-kit disclosure, interact with one completed phase header, and measure the visible interactive-control rectangles. | The reference opens and closes from its summary, every visible control is at least 44px in both dimensions, and reopening a phase does not obscure its heading. |
| 4 | Evaluate computed foreground and background colors for body text, phase controls, warning, success, and primary-action surfaces. | Body and control text reaches at least 4.5:1 contrast and large display text reaches at least 3:1 on each actual surface. |

### TS-005: Load the GitHub Pages Static Export Without Broken Assets
**Priority:** Critical
**Preconditions:** `npm run build:pages` has completed and `dist/client` is served on port 4173.
**Mapped Tasks:** Task 2, Task 5, Task 6

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to the served export and inspect every stylesheet, script, font, and image request. | All required requests return successfully and exported paths are relative to the GitHub Pages project root. |
| 2 | Evaluate every rendered `<img>` after load. | Each image is complete with a natural width greater than zero; the hero is eager and mission artwork is lazy. |
| 3 | Click “Begin Mission” and then select Mission III. | Both interactions work from the static export and Mission III artwork appears without a network-path error. |

### TS-006: Recover from Corrupted Local Progress with Reduced Motion
**Priority:** Medium
**Preconditions:** Browser media emulation prefers reduced motion and `gloamforge-progress-v1` contains malformed JSON.
**Mapped Tasks:** Task 3, Task 5, Task 6

| Step | Action | Expected Result |
|---|---|---|
| 1 | Reload the course and take a snapshot. | The page renders Mission I at zero progress with Phase 1 open; no error screen or blank course appears. |
| 2 | Click the Phase 1 completion control. | The next state appears without a reveal, scroll, or progress animation. |
| 3 | Cancel the reset confirmation, then reopen the reset control and confirm it. | Cancel preserves current progress; confirm returns the course to Mission I with no completed phases. |

## Progress Tracking

- [x] Task 1: Establish the product and design contracts.
- [x] Task 2: Create the original Gatewarden artwork set.
- [x] Task 3: Extract the course data and client shell without changing saved progress.
- [x] Task 4: Build the one-mission progressive phase workspace.
- [x] Task 5: Apply the cinematic visual system across desktop and mobile.
- [x] Task 6: Harden navigation, persistence, and the static export.

## Implementation Tasks

### Task 1: Establish the product and design contracts

**Objective:** Record the learner, teaching constraints, static-hosting boundary, and ashen mythic-realism direction before implementation begins. These documents provide a stable product and visual test for all later choices without expanding the course into a platform.

**Files:**

- Create: `PRODUCT.md`
- Create: `DESIGN.md`

**Key Decisions / Notes:**

- `PRODUCT.md` defines the 15–30 minute learning cadence, 15-year-old Blender learner, M1 MacBook Air and trackpad constraints, three-mission initial scope, browser-local progress, and GitHub Pages boundary.
- `DESIGN.md` answers purpose, audience, tone, and differentiator; it also defines palette, typography roles, original Gatewarden imagery, phase states, mobile behavior, focus, contrast, motion, and forbidden franchise imitation.
- Treat the current Blender 4.5 lesson instructions as authoritative course content; this task documents presentation and scope rather than rewriting lessons.

**Definition of Done:**

- [x] A new contributor can identify the learner, session length, device constraints, hosting model, and definition of course success from `PRODUCT.md`.
- [x] `DESIGN.md` specifies implementable tokens and component states for hero, mission selector, phase disclosure, progress, warnings, completion, and field kit, including reduced motion and minimum touch targets.
- [x] Verify: `rg -n "15.?30|M1 MacBook Air|GitHub Pages|browser-local|ashen mythic|Gatewarden|reduced motion|44" PRODUCT.md DESIGN.md`

### Task 2: Create the original Gatewarden artwork set

**Objective:** Generate three consistent, original cinematic renders that turn the existing Gatewarden concept into a visual progression across the course. The images support the atmosphere and lesson flow without reproducing characters or marks from the user’s inspiration franchises, and their use is verified by TS-001 and TS-005.

**Files:**

- Create: `public/gatewarden-ready.png`
- Create: `public/gatewarden-shape.png`
- Create: `public/gatewarden-oath.png`

**Key Decisions / Notes:**

- Use the image-generation workflow with one shared brief: an original armored Gatewarden apprentice, charred iron and weathered leather, pale ash fog, restrained brass and ember light, cinematic realism, no text, logos, named characters, or recognizable heraldry.
- Give each render a distinct course purpose: readiness and invitation, readable blockout silhouette, and story-driven cinematic staging.
- Normalize each image to 1200×800, preserve a consistent subject and palette, and keep each file at or below 1.5 MB.

**Definition of Done:**

- [x] All three images depict the same original Gatewarden world while remaining visually distinct enough to orient three course moments.
- [x] Images contain no embedded text, franchise marks, named characters, or recognizable heraldry, and each remains legible behind or beside interface copy at desktop and mobile crops.
- [x] Compare `public/og.png` and the three generated images in the image viewer; confirm the shared charred-iron, ash, restrained-brass, and ember palette and reject any franchise-specific mark or inconsistent character treatment.
- [x] Verify: `node -e "const fs=require('node:fs'); for (const f of ['public/gatewarden-ready.png','public/gatewarden-shape.png','public/gatewarden-oath.png']) { const b=fs.readFileSync(f); if (b.length>1500000 || b.readUInt32BE(16)!==1200 || b.readUInt32BE(20)!==800) throw new Error(f+' must be a 1200x800 PNG at or below 1.5 MB'); }"`

### Task 3: Extract the course data and client shell

**Objective:** Move mission content and the client-side course shell out of the monolithic `Home` component while preserving all current rendered lessons and device-local progress behavior. This creates focused seams for the new workspace without changing what saved learners see.

**Files:**

- Create: `app/course-data.ts`
- Create: `app/components/gloamforge-course.tsx`
- Modify: `app/page.tsx`
- Test: `tests/rendered-html.test.mjs`

**Key Decisions / Notes:**

- Move `LessonStep`, `Mission`, and the three mission records from `app/page.tsx` to `app/course-data.ts` without rewriting Blender 4.5 instructions.
- Keep `SavedProgress`, defensive parsing, external-store subscription, reset behavior, and the exact `gloamforge-progress-v1` key in the client shell; do not persist phase expansion state.
- Reduce `app/page.tsx` to the server entry that renders `GloamforgeCourse`, with no duplicate mission data or storage logic.
- Strengthen the existing rendered-HTML regression test before extraction to cover all three mission titles, reset copy, and the current social image reference.

**Definition of Done:**

- [x] The static render still contains all three mission summaries, the active mission’s four phase titles, the field-kit content, and the reset control; all twelve phase records remain in `app/course-data.ts`.
- [x] Existing valid saved progress restores the same active mission and completed phase IDs; empty or malformed saved progress falls back to Mission I with no completed phases.
- [x] `app/page.tsx` contains only page composition, while mission content and client persistence have one source of truth.
- [x] Verify: `npm test`

### Task 4: Build the progressive mission workspace

**Objective:** Replace the always-expanded lesson stack with one active mission and one controlled phase body at a time. Completing a phase collapses it and opens the next incomplete phase, while completed phases remain reopenable and reversible; TS-002 and TS-003 are the behavioral contract.

**Files:**

- Create: `app/components/mission-workspace.tsx`
- Modify: `app/components/gloamforge-course.tsx`
- Modify: `app/course-data.ts`
- Test: `tests/rendered-html.test.mjs`

**Key Decisions / Notes:**

- Add a failing rendered-HTML assertion for the default accordion semantics before implementing the workspace.
- Track `expandedPhaseId` as ephemeral UI state: initialize it to the active mission’s first incomplete phase, set it to the next incomplete phase after completion, and set it to `null` when the mission is complete.
- Use semantic phase-heading buttons with `aria-expanded`, `aria-controls`, visible focus, and a labelled content region; only one phase body is visible at a time.
- Separate phase completion from expansion. A reopened completed phase exposes “Mark incomplete,” which clears that completion and keeps the phase open.
- Move the Blender version check and its existing warning logic into Mission I’s first phase, and render the field kit as a native disclosure within the mission workspace.

**Definition of Done:**

- [x] Only the selected mission renders as a workspace, while all three mission summaries remain directly selectable with no completion gate.
- [x] A mission opens its first incomplete phase; completing it advances to the next; a fully completed mission shows no phase body and displays a next-mission completion panel.
- [x] Completed phases can be reopened without losing completion and explicitly marked incomplete, updating progress and the current phase immediately.
- [x] The version warning, reset confirmation, and field-kit content remain available without the standalone top-of-page version dock.
- [x] Verify: execute TS-002 and TS-003 with browser automation against the latest static export at `http://127.0.0.1:4173/`, retaining the post-click snapshots after `npm test` succeeds.

### Task 5: Apply the cinematic visual system

**Objective:** Replace the abstract mannequin and generic card treatment with a cohesive ashen mythic-realism world across the hero, mission map, workspace, completion state, and field kit. The visual system must remain readable and efficient on the learner’s laptop and 390×844 viewport, as verified by TS-001, TS-004, and TS-005.

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/lesson.css`
- Modify: `app/field-guide.css`

**Key Decisions / Notes:**

- Use text-free `public/gatewarden-hero.png` as the live hero artwork, retain `public/og.png` for social metadata, and use the three Gatewarden images as intrinsic-size mission visuals; only the hero loads eagerly and mission visuals load lazily.
- Configure a characterful display serif and readable body sans with `next/font` so emitted font assets remain inside the static build rather than depending on a runtime CDN.
- Build depth with directional light, ash grain, etched geometry, iron, bone, smoke, restrained brass, and ember accents. Remove the generic radial glow, repeated marketing kickers, glass-like cards, gradient text, side-stripe accents, and identical card-grid rhythm.
- Keep body text at least 16px, controls at least 44px, body and control contrast at least 4.5:1, and large display text at least 3:1 on every actual surface.
- Animate only purposeful reveal and progress changes for at most 500ms; use transform-based motion and disable it under `prefers-reduced-motion`.

**Definition of Done:**

- [x] Hero, mission selection, active phase, warning, completion, and field kit read as one original cinematic fantasy field manual rather than separate UI templates.
- [x] Desktop and 390×844 layouts have no clipped headings, horizontal overflow, obscured focus, or artwork that prevents reading the primary action.
- [x] Typography and image assets are emitted in `dist/client`, and all informative images have descriptive alt text while decorative layers are hidden from assistive technology.
- [x] The explicit contrast and touch-target thresholds in `DESIGN.md` are met on base, raised, warning, success, and button surfaces.
- [x] Verify: execute TS-001 and TS-004 with Playwright CLI against the latest static export at `http://127.0.0.1:4173/`, recording computed font size, target rectangles, overflow, and contrast ratios after `npm test` succeeds.

### Task 6: Harden navigation, persistence, and the static export

**Objective:** Make the redesigned flow reliable with JavaScript enhancement, corrupted local data, reduced motion, reloads, and GitHub Pages path rewriting. This task removes timing-dependent navigation and converts the E2E scenarios into a stable release contract.

**Files:**

- Modify: `app/components/gloamforge-course.tsx`
- Modify: `app/components/mission-workspace.tsx`
- Test: `tests/rendered-html.test.mjs`

**Key Decisions / Notes:**

- Make “Begin Mission” a real `href="#active-mission"` link that works before hydration; enhance it by selecting Mission I and focusing the active mission heading after the state commit, without `setTimeout`.
- Preserve defensive local-storage parsing and storage-event updates; invalid mission IDs and completed phase IDs not present in `app/course-data.ts` are ignored.
- Extend static-render tests to require semantic disclosure attributes, all four artwork references, intrinsic image dimensions, loading policy, and relative built asset paths.
- Run TS-001 through TS-006 with an isolated Playwright CLI session against the served static export, including a click followed by a fresh snapshot for every changed interaction.
- Run `impeccable detect --json` only against the three changed CSS files and the rendered course HTML; treat JSON findings as advisory and record any skipped check with its concrete reason.

**Definition of Done:**

- [x] The primary entry link navigates and focuses reliably without a timing delay, and still reaches the mission workspace when client JavaScript is unavailable.
- [x] Valid progress survives reload, malformed or stale saved IDs recover to a valid course state, reset cancellation preserves state, and confirmed reset clears it.
- [x] The built GitHub Pages export uses relative scripts, styles, fonts, and images; all artwork loads from the served export with non-zero natural dimensions.
- [x] TS-001 through TS-006 pass through browser interaction and fresh snapshots against `http://127.0.0.1:4173/`.
- [x] Verify: `npm run lint`
- [x] Verify: `npm test`

## Implementation Evidence

- `npm test`: 5 tests passed, 0 failed; the static GitHub Pages export rebuilt successfully.
- `npm run lint`: exit 0 with no application warnings; 138 warnings remain inside the installed Impeccable skill bundle.
- Playwright CLI session `gloamforge-019f8b7c`: TS-001 through TS-006 passed at desktop and 390×844, including post-click snapshots, reload persistence, asset requests, malformed storage, reduced motion, and reset confirmation.
- Impeccable detector: completed once against the three changed CSS files and `dist/client/index.html`; findings were advisory design-token documentation drift, with no blocking or banned-pattern finding.

## Verification Fixes

- Fixed: browser-storage write failures now update an in-memory external-store snapshot, so mission selection, completion, version changes, and reset remain interactive when persistence is unavailable.
- Fixed: the masthead now retains a 44px reset action on mobile and desktop, matching `DESIGN.md`.
- Fixed: “Begin Mission I” now selects Mission I even when another zero-progress mission was previously active.
- Fixed: `PRODUCT.md` now points contributors to the extracted course data and presentation files.
- Fixed: the live hero now uses dedicated text-free `public/gatewarden-hero.png`; `public/og.png` remains the social-preview image.
- Fixed: the generic cross glyph and unrelated placeholder favicon now share an original Gatewarden helm rune with brass, bone, and ember construction.

## E2E Results

| Scenario | Priority | Result | Fix Attempts | Notes |
|----------|----------|--------|--------------|-------|
| TS-001 | Critical | PASS | 0 | Text-free live hero, real anchor, focused Mission I heading, one workspace, and one expanded phase verified. |
| TS-002 | Critical | PASS | 0 | Completion, automatic advance, reopen, and mark-incomplete paths verified with fresh snapshots. |
| TS-003 | High | PASS | 0 | Mission II completion persisted through reload and advanced to Mission III. |
| TS-004 | High | PASS | 0 | 390×844 had no overflow; all visible controls were at least 44px tall and contrast thresholds passed. |
| TS-005 | Critical | PASS | 0 | Scripts, styles, fonts, and images returned 200/304; rendered images had non-zero intrinsic dimensions. |
| TS-006 | Medium | PASS | 0 | Malformed storage, reduced motion, reset cancel, and confirmed reset all recovered correctly. |

Extended verification: the Gatewarden helm logo and home-link action at desktop and 390×844, the text-free live hero while retaining `og.png` social metadata, blocked-storage interaction fallback, the zero-progress Mission III → “Begin Mission I” edge case, and the new masthead reset action passed with click-and-snapshot browser checks.

Design Notes: the Impeccable detector pass for the logo correction reported only existing advisory design-token documentation drift; no blocking or banned-pattern finding.

## Verification Report

- Runtime profile: Full.
- Live-target probe: Tier 1 passed through Playwright with HTTP 200 at `http://127.0.0.1:4173/`; the shell `curl` probe was sandbox-blocked and returned `000`.
- Independent changes review: 0 must-fix, 2 should-fix, and 1 suggestion; all three findings were fixed and re-verified.
- Goal achievement: 6 of 6 reviewer truths verified after fixes.
- Final regression: `npm test` passed 5 of 5 and rebuilt the GitHub Pages export; the changed frontend TypeScript surface passed `tsc --noEmit`; lint exited 0 with only 138 warnings inside the installed Impeccable skill bundle.
- Final code-review gate: approved by the user on 2026-07-23.

### Not Verified

| Not Verified | Reason |
|--------------|--------|
| Repository-wide `tsc --noEmit` | Three ambient Cloudflare worker type errors remain in unchanged `db/index.ts` and `worker/index.ts`; the plan-scoped frontend typecheck passes. |
| Updated production GitHub Pages deployment | Commit and push were not authorized in this workflow; the local production export was served and browser-verified. |
