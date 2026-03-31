# Modify: Animate Section Command

## Goal
To implement functional, smooth, and premium animation passes over an existing section.

## Requirements
- Must read `animation-guidelines.md` first.
- Must read the specific tokens in `mcp/tokens/motion.json`.
- Strictly use Framer Motion for Micro-interactions (hovers, clicks) and GSAP for Medium/Macro sequences (ScrollTrigger).

## Output
- `motion/` wrappers or `useRef` based GSAP timelines in `features/[name]/logic/`.
- No inline styles for animation unless strictly bound to `useFrame` or `Lenis` interpolations.

## Instruction
Always think: "Does this motion feel intentional and justify its presence?"
