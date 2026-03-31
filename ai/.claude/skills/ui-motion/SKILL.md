# UI Motion Skill Directive

## Purpose
Enhance UI using fluid, physically-based motion without degrading UX. Motion should serve a functional purpose: directing attention, confirming interactions, or smoothing state changes. 

## Core Techniques
- **Hover Transitions**: Use subtle scale-ups (e.g. `1.02` - `1.05`) and background color/opacity shifts.
- **Spring Animations**: Avoid linear or simple CSS easings for complex UI. Use Framer Motion's `spring` physics (stiffness, damping, mass) for a premium, non-robotic feel.
- **Staggered Entrances**: When lists or grids mount, stagger their children's appearance by `0.05s` to `0.1s`.
- **Micro-interactions**: Animate SVG paths (e.g., hamburger to close icon), button borders, and magnetic cursor effects.

## Tools
- `framer-motion` (Primary for React UI state transitions, variants, layout animations)
- `gsap` (For complex sequencing, scroll-linked UI, and heavy DOM manipulation)

## Strict Rules
1. **Never impede the user**: Exit animations must be fast. Entrance animations should not block the user from clicking a button.
2. **Accessible Motion**: Respect `prefers-reduced-motion`. Use Framer Motion's `useReducedMotion` hook.
3. **Hardware Acceleration**: Always animate `transform` (translate, scale, rotate) and `opacity`. NEVER animate `width`, `height`, `top`, `left`, or `box-shadow` unless absolutely necessary, as they trigger expensive layout repaints.
4. **Layout Animations**: Use `<motion.div layout>` for seamless DOM reflows when items are added/removed from lists, but keep it constrained to small sub-trees to avoid perf hits.
