# Architecture Rules

## Structure
- `components/` = reusable UI
- `features/` = domain logic
- `lib/` = core systems
- `systems/` = advanced interaction layers

## Separation of Concerns
- UI must not contain business logic
- Animation logic must be isolated
- 3D logic must not leak into UI components

## State Management
- Use context for global UI systems
- Use zustand for cross-system sync

## Performance
- Lazy load 3D
- Avoid unnecessary re-renders
- Optimize scroll-trigger usage

## Scalability
- Code should be extendable without refactor
- Avoid tight coupling

## Rule
If code becomes hard to reason about → structure is wrong.
