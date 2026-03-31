# Three.js (R3F) Skill Directive

## Purpose
Build performant, immersive, and minimal 3D WebGL experiences deeply integrated with the DOM via `@react-three/fiber`.

## Core Techniques
- **RawShaderMaterial**: Use `RawShaderMaterial` or `ShaderMaterial` with concise, tailored GLSL shaders for ultimate performance.
- **Scroll Sync**: Sync 3D scene elements to scroll by driving uniform values (e.g. `material.uniforms.uScroll.value`) inside `useFrame` via `lenis.scroll` or Zustand subscriptions. 
- **View Sync**: Use `@react-three/drei` `<View>` or `<HTML>` to perfectly overlay 3D elements inside standard DOM grid layouts.

## Tools
- `@react-three/fiber` (React reconciler for Three.js)
- `@react-three/drei` (Useful helpers: Environment, Float, Instances, useGLTF)
- `three` (Underlying engine)
- `leva` (For rapid debug GUI scaffolding)

## Strict Rules
1. **Render Loop Architecture**: 
   - Never put expensive math (e.g., iterating a 1000-length array) inside `useFrame`.
   - Never use `setState` inside `useFrame`. Update data directly onto `ref.current`.
2. **Memory Management**: When removing objects from the scene, ensure `.dispose()` is called on their Geometry and Material if they are not re-used. R3F handles JSX unmounting, but dynamic textures/rendertargets may need manual disposal.
3. **Component Structure**: Separate orchestration (`components/three/scenes/`) from visual primitives (`components/three/primitives/`). Keep canvas instantiation isolated so it doesn't re-render entire page wrappers.
4. **Lighting**: Avoid `PointLight` and `DirectionalLight` with deep shadow maps unless strictly required. Instead, use an HDRI environment (`<Environment preset="..." />`) or baked lightmaps for photorealism.
