# sanath.xyz

Personal portfolio website for Sanath Kumar J S — a Google Antigravity-style interactive resume.

The site loads as a polished static resume. Click the "Try Antigravity" button to break the layout — every section becomes a draggable, bouncing, colliding physics object floating in zero gravity. Click "Read Resume" to smoothly reassemble.

## Tech Stack

- **Next.js 16** (App Router, static export)
- **Matter.js** — 2D physics engine driving the antigravity effect
- **Framer Motion** — entrance animations and transitions
- **Tailwind CSS 4** — gradient/colorful theme
- **TypeScript** — strict mode

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Build

```bash
npm run build
```

Static export is configured in `next.config.ts` (`output: "export"`). The build output goes to the `out/` directory.

## Deployment

Deployed to Vercel and mapped to the `sanath.xyz` domain. Pushing to the connected branch triggers an automatic deploy.

## Project Structure

- `app/` — Next.js App Router pages, layout, global styles
- `components/physics/` — Matter.js engine bridge (`PhysicsEngine`, `PhysicsBody`, `usePhysicsWorld`)
- `components/resume/` — individual resume section components
- `components/layout/` — `ModeToggle`, `CardModal`
- `components/effects/` — `Starfield` background
- `lib/resume-data.ts` — single source of truth for all resume content
- `lib/physics-config.ts` — physics constants

## How the antigravity effect works

Real DOM elements are moved by Matter.js — there is no canvas. The physics engine runs headlessly, and on each tick the body positions are applied to DOM elements via `transform: translate(...) rotate(...)`. This keeps the resume content accessible, selectable, and SEO-indexed even while bouncing around.

On small screens (<768px) the antigravity toggle is hidden and the page renders as a normal static resume. Users with `prefers-reduced-motion` enabled also see the static resume.
