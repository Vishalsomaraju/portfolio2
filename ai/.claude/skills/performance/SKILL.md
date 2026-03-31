# Performance Tuning Skill

## Purpose
Guarantee 60fps delivery for all animated and 3D interactions.

## Techniques
- R3F `dpr` scaling based on device capabilities (`maxPixelRatio: 2` limit).
- Throttling resize listeners and heavy calculations.
- Using `next/image` effectively and pre-loading critical font/3D assets.

## Rules
- A fallback MUST be provided for WebGL context loss or extremely slow devices.
- No `box-shadow` animations on large surfaces; rely on `opacity` and `transform` exclusively for DOM.
