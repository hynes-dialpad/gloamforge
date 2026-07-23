# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary learner is a 15-year-old exploring 3D rendering as a possible creative career. He is interested in realistic cinematic fantasy characters, worlds, and storyboards, and is motivated by visible creative progress more than by abstract software instruction.

He currently works in Blender on an M1 MacBook Air with a trackpad and no second monitor. Video-based instruction creates frequent pausing, scrubbing, and window switching, and unclear or version-mismatched tutorials can cause him to abandon an exercise.

## Product Purpose

Gloamforge is a self-guided sequence of short Blender missions. Each mission turns a focused 15–30 minute exercise into a visible part of a larger original fantasy character project, helping the learner discover both what 3D production involves and whether he enjoys sustained practice.

Success means the learner can enter a mission quickly, understand the next action without interpreting a video timeline, finish a meaningful phase in one sitting, and return later with progress intact.

## Positioning

Gloamforge teaches one original character through an accumulating production journey rather than presenting unrelated tutorials. The Gatewarden becomes the learner’s evidence: blockout, silhouette, materials, staging, and story decisions remain connected to one evolving world.

## Operating Context

- Blender 4.5 is the authoritative version for the current lesson instructions.
- Sessions happen on one laptop screen, often with Blender and the tutorial visible in separate windows or tabs.
- The learner uses a trackpad today; the field kit must teach trackpad equivalents without assuming a three-button mouse.
- A parent can discuss progress directly with the learner; the product does not need reporting or supervision features.
- The first release contains three missions with four phases each.

## Capabilities and Constraints

- The site is a static export hosted on GitHub Pages.
- Progress is stored only in the browser under `gloamforge-progress-v1`.
- One mission is visible as the working area at a time.
- One phase is expanded at a time. Completing it collapses it and opens the next incomplete phase.
- Completed phases remain reopenable and can be marked incomplete.
- All mission summaries remain selectable; later missions are not locked.
- The product has no accounts, uploads, gallery, database, backend, cross-device sync, or progress report.

## Brand Commitments

- The product name is Gloamforge.
- The course world centers on the Gatewarden, an original fantasy character.
- The voice is concise, serious, encouraging, and craft-focused. It treats the learner as an apprentice artist rather than a child.
- The atmosphere may evoke the scale and gravity of cinematic fantasy, but it must not copy franchise characters, heraldry, quotations, logos, or story facts.
- `public/og.png` is the approved social-preview asset and reference point for Gatewarden artwork; `public/gatewarden-hero.png` is its text-free live-hero companion.

## Evidence on Hand

- Three complete Blender missions and twelve phase instructions live in `app/course-data.ts`; `app/components/gloamforge-course.tsx` and `app/components/mission-workspace.tsx` present them.
- The static-export test covers course content, originality, GitHub Pages paths, the text-free live hero, and `public/og.png` social metadata.
- `public/og.png` provides the Gatewarden subject, palette, and social-preview composition; `public/gatewarden-hero.png` carries that world into the interface without embedded copy.
- There are no learner testimonials, outcomes, portfolio examples, or usage analytics; future work must not fabricate them.

## Product Principles

1. **Progress before breadth.** Every sitting should create a visible improvement to the Gatewarden.
2. **The next action is obvious.** Atmosphere supports the instruction and never competes with it.
3. **Teach the actual setup.** Trackpad and single-screen guidance are first-class, not fallback notes.
4. **Preserve agency.** Learners may revisit phases, reverse completion, or choose another mission without a gate.
5. **Earn expansion.** Add lessons or platform features only after the learner uses the first missions.

## Accessibility & Inclusion

The interface must be keyboard operable, usable by touch and trackpad, readable at laptop and 390×844 viewports, and respectful of reduced-motion preferences. Body text is at least 16px, interactive targets are at least 44×44px, and text contrast meets WCAG AA thresholds on every surface where the token appears.
