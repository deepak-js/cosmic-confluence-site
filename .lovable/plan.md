# Cinematic Upgrade — PLASMA 2025

A wow-over-weight pass across the whole page: real WebGL hero, GSAP pin-and-scrub through every major section, persistent atmosphere layer, and a richer micro-interaction vocabulary. Existing palette, type stack and section copy stay locked.

## New dependencies

- `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing` — WebGL scene + bloom/chromatic aberration
- `gsap` (incl. `ScrollTrigger`, `Observer`) — pin & scrub timelines, horizontal acts
- `maath` — easing/lerp helpers for r3f
- `split-type` — per-character/word scroll reveals

Lenis stays; GSAP is wired to Lenis's scroll so smooth-scroll and scrub agree on a single source of truth. Heavy scenes are lazy-loaded with `React.lazy` + Suspense so first paint stays fast.

## 1. Global atmosphere layer

A persistent `<PlasmaAtmosphere />` mounted once in `Layout.tsx`, sitting behind every section at `-z-50`:

- Fullscreen r3f canvas with a custom GLSL nebula shader (FBM noise, scroll-linked hue shift violet → cyan → magenta).
- `EffectComposer` with Bloom + ChromaticAberration + Vignette + subtle Noise grain.
- Scroll progress (0→1) feeds shader uniforms: nebula drift speed, bloom intensity, color temperature.
- Animated SVG scanline + film-grain overlay on top via `mix-blend-mode: overlay`.
- Reduced-motion media query disables shader animation and postprocessing; falls back to today's CSS gradient blobs.

## 2. Hero — real 3D centerpiece

Replace the unsplash backdrop with a r3f scene:

- Central **plasma orb**: `<Icosahedron>` with a custom shader (vertex displacement by 3D simplex noise, fresnel rim in plasma gradient, internal glow). Slowly rotates; reacts to pointer with subtle parallax.
- **Particle field** (~3000 GPU points) drifting around the orb; scroll-linked depth-of-field via `<DepthOfField>` from postprocessing.
- **Energy arcs**: 6 animated SVG bezier "lightning" strokes attached to the orb, drawn with `stroke-dasharray` reveal on mount.
- Choreographed intro timeline (GSAP, 2.4s): scanline sweep → eyebrow underline draw → orb scale-in with chromatic aberration spike → headline character cascade with mask reveal → shimmer pass → countdown digits flip in → CTAs blur-in → stats count up.
- Countdown stays flip-digit but rendered server-side as static "00" placeholders (fixes the current hydration mismatch warning), then takes over on the client.

## 3. Cinematic pin & scrub (GSAP ScrollTrigger)

Each major section becomes a pinned act with a scrubbed timeline:

```text
[About]       pin 1.2x viewport — stats counters scrub, headline mask wipes left→right,
                                  quote card slides in with depth blur falloff
[Topics]      pin 1.5x viewport — topic cards fan out from center on scrub,
                                  active card scales + glows as it crosses the read line
[Speakers]    HORIZONTAL ACT — pin 1 viewport, translate track horizontally on scroll;
                                  cards tilt with scroll velocity; progress dots top-right;
                                  featured speaker portrait morphs between cards
[Schedule]    pin 1.3x viewport — day tabs swap as scroll progresses,
                                  timeline draws a vertical light-trail down the spine,
                                  session cards reveal with staggered clip-path
[Venue]       pin 1x viewport  — map zooms from satellite → street level on scrub,
                                  info cards parallax in from opposite sides
[Register]    pin trigger only — form fields cascade in, CTA pulses on enter
```

Section ghost-numbers (01, 02…) scale + drift on scrub, locking the cinematic register across the whole page.

## 4. Micro-interactions pass

- **Cursor**: existing dot/ring upgraded with cursor states — `magnet` on buttons (ring snaps + label appears: "REGISTER →"), `drag` on horizontal act, `view` on speaker cards (shows portrait peek).
- **Magnetic buttons**: stronger pull radius, distortion on hover, gradient sheen sweep on click.
- **Card tilts**: 3D `rotateX/Y` with glare layer following pointer; spring back on leave.
- **Text reveals**: every section heading uses `split-type` for line-mask reveals; body copy fades word-by-word on enter.
- **Link underlines**: animated gradient underline (violet→cyan) that draws from origin point of hover.
- **Sound toggle** (top-right, optional): mutes/unmutes a soft ambient pad + UI ticks; defaults muted, respects reduced-motion.

## 5. Page transitions & navigation

- Nav links scrub the page to the target section via GSAP (smooth, eased) instead of instant jump; active section indicator follows scroll position with a magnetic underline.
- Scroll progress bar becomes a thin plasma gradient with a leading glow head.
- Side rail (desktop ≥1280px): vertical section dots with hover labels; clicking scrubs.

## 6. Performance & accessibility

- All r3f canvases use `frameloop="demand"` where possible; heavy scenes lazy-loaded behind `<Suspense>`.
- `prefers-reduced-motion`: disables GSAP scrub pins (sections un-pin, content reveals with simple fades), disables postprocessing, replaces orb with static gradient SVG.
- `IntersectionObserver` unmounts off-screen canvases.
- Bundle split: atmosphere chunk, hero-3d chunk, gsap chunk — each ~lazy.
- Fix current hydration mismatch by rendering countdown as `00:00:00:00` on the server and hydrating values in `useEffect`.

## File plan

```text
src/components/three/
  PlasmaAtmosphere.tsx        # global shader background + postprocessing
  HeroScene.tsx               # orb + particles + DOF
  shaders/
    nebula.glsl.ts
    orb.glsl.ts
src/components/fx/
  Cursor.tsx                  # extended with states
  MagneticButton.tsx          # upgraded magnetism
  TiltCard.tsx                # 3D tilt + glare
  SplitReveal.tsx             # split-type wrapper
  SoundToggle.tsx             # ambient audio
src/lib/
  scroll.ts                   # Lenis ⇄ GSAP ScrollTrigger bridge
  gsap-setup.ts               # plugin registration, reduced-motion guard
src/components/sections/
  Hero.tsx                    # rewritten to host HeroScene + GSAP intro
  Speakers.tsx                # horizontal act
  Schedule.tsx                # pinned timeline scrub
  Topics.tsx                  # fan-out scrub
  About.tsx, Venue.tsx, Registration.tsx  # pinned reveals
src/components/Layout.tsx     # mounts PlasmaAtmosphere + scroll bridge
src/styles.css                # new utilities: .glare, .underline-sweep, grain overlay
```

## Out of scope

- No copy or section-structure changes.
- No new sections, no backend, no auth.
- Palette and typography stay exactly as today.
