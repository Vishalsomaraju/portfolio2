# Three.js Skill Directive

## Purpose
Build performant and minimal 3D experiences integrated with DOM scroll.

## Techniques
- Instanced meshes for particle arrays
- Custom shaders (glsl) mapped to `RawShaderMaterial` for performance
- Using `useFrame` effectively without triggering React state updates

## Tools
- `@react-three/fiber`
- `@react-three/drei`
- `three`

## Rules
- When generating Three.js components ALWAYS check `lib/three/config.ts` for camera/perf constraints.
- Separate scene orchestration (`components/three/scenes/`) from primitives (`components/three/primitives/`).
- Never pass rapidly changing scroll values through React state; bind refs directly in `useFrame` or uniform updates.
