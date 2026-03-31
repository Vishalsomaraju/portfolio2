# GSAP Scroll Management Skill

## Purpose
Seamlessly tie chronological DOM storytelling to 3D Camera/Shader states.

## Techniques
- Pinned sections using `ScrollTrigger.create({ pin: true })`.
- Scrub timelines syncing HTML opacity with `use-scene-store.ts` states.
- Easing with `power4.out` or `power3.out`.

## Tools
- `gsap`
- `ScrollTrigger`
- `@studio-freight/lenis` (as the scroll hijacker)

## Rules
- Do NOT use Framer Motion for heavy scroll-bound sequences spanning tall sections.
- Kill and cleanup all ScrollTriggers on unmount.
- Store timeline logic inside `features/[feature]/logic/` and NOT in the inline component body.
