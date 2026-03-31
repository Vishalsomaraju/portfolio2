# GSAP Scroll Management Skill Directive

## Purpose
Seamlessly tie chronological DOM storytelling to 3D Camera/Shader states, and build robust scroll-triggered animations.

## Core Techniques
- **Pinned Sections**: Use `ScrollTrigger.create({ pin: true })` for horizontal scroll sections or frozen content areas.
- **Scrub Timelines**: Sync HTML opacity/transforms directly with `use-scene-store.ts` scroll progress values.
- **Easings**: Rely on `power4.out`, `power3.out`, or `expo.out`. Default GSAP easing is `power1.out`.

## Tools
- `gsap`
- `ScrollTrigger` (GSAP plugin)
- `@gsap/react` (Mandatory for React implementations)
- `lenis` (Modern smooth scroll hijacker)

## Strict Rules
1. **React Integration**: ALWAYS use the `useGSAP()` hook from `@gsap/react` instead of standard `useEffect()` for GSAP animations to handle automatic cleanup and context management.
2. **ScrollTriggers**: Kill and cleanup all ScrollTriggers on unmount. `useGSAP()` handles this automatically, but dynamic triggers must be tracked.
3. **Separation of Concerns**: Do NOT use Framer Motion for heavy scroll-bound sequences spanning tall sections. Framer Motion is for UI interactions/mounting; GSAP is for scroll-bound timelines.
4. **Logic Location**: Store complex timeline definitions inside `features/[feature]/logic/` and NOT inline within the React component body to keep the DOM clean.
5. **Lenis Compatibility**: Ensure `ScrollTrigger` updates on Lenis scroll ticks if using custom RAF loops (`ScrollTrigger.update()`).
