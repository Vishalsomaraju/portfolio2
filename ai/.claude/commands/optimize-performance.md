# Command: Optimize Performance

## Goal
Profile and resolve jank, stutter, or excessive memory consumption in the 3D scroll experience.

## Requirements
- Analyze GSAP ScrollTrigger computations.
- Analyze `<Canvas />` rendering overhead and shader complexity.
- Introduce `next/dynamic` where chunks are oversized.

## Output
- Refactored components with `useMemo`, unified geometry, or degraded fallbacks.

## Instruction
Always think: "How does this run on a 3-year-old mobile device?"
