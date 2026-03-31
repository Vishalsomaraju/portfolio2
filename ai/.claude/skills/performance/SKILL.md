# Performance Tuning Skill Directive

## Purpose
Guarantee 60-120fps delivery for all animated and 3D interactions, prioritizing smoothness and low battery usage over visual fidelity when constraints exist.

## Core Techniques
- **DPR Scaling**: Set `@react-three/fiber` Canvas to `<Canvas dpr={[1, 1.5]}>` or dynamically adjust `dpr` via `PerformanceMonitor`. Never use `window.devicePixelRatio` unconditionally.
- **Debouncing / Throttling**: Throttle `resize` events (e.g. 200ms) and debounce rapid state updates.
- **Instancing**: For dense particle arrays or duplicated geometry, use `InstancedMesh` via `@react-three/drei`'s `<Instances>` / `<Instance>`.

## Strict Rules
1. **React Renders vs RAF**: NEVER update React state inside `useFrame`, `window.addEventListener('scroll')`, or `window.addEventListener('mousemove')`. Rely exclusively on mutable `useRef` updates applied directly to DOM/Object3D elements.
2. **Context Fallbacks**: A fallback UI MUST be provided for WebGL context loss or execution environments without hardware acceleration.
3. **Paint / Layout Costs**: Avoid animating `box-shadow`, `filter`, or `backdrop-filter` natively on large DOM elements.
4. **Three.js Geometries & Materials**: NEVER instantiate `new THREE.Material()` or `new THREE.BufferGeometry()` inside a component render pass. Declare them globally or wrap in `useMemo`.
5. **Texture Compression**: Use `.ktx2` or `.webp` for textures, never massive `.png` or `.jpeg`s that lock up the main thread during decode.
