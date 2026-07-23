# Gloamforge

Gloamforge is a short-session Blender field guide for a beginning CGI artist
interested in cinematic fantasy characters and visual storytelling.

The first campaign contains three missions:

1. Ready the Forge - navigation, transforms, and reliable saving.
2. Shape the Warden - primitive blockout, proportion, silhouette, and pose.
3. Light the Oath - camera placement, two-light staging, and a first Eevee render.

The course targets Blender 4.5 LTS. Progress and the learner's installed
version are stored only in the browser on the current device.

## Local development

The project requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Run the complete build and rendered-output test suite with:

```bash
npm test
```

## GitHub Pages

The included workflow builds and deploys the site from `main` or `master`.
After pushing the repository, open **Settings > Pages** on GitHub and select
**GitHub Actions** as the publishing source.

GitHub Pages supports public repositories on GitHub Free. Hosting from a
private repository requires a GitHub plan that includes private Pages sites.

The static artifact can also be built locally:

```bash
npm run build:pages
```

The deployable files will be in `dist/client`.

## Content direction

Keep new lessons between 15 and 30 minutes and end each one with a visible
artifact or safe stopping point. Use original names, characters, artwork, and
lore. Genre references may guide the tone, but the course should not copy an
existing franchise.
