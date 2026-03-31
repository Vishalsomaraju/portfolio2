# Command: Review Code

## Goal
Conduct a premium-grade PR review against the project architecture.

## Requirements
- Validate against all files in `.claude/rules/`.
- Ensure NO random generic layouts leaked into the code.
- Ensure 3D Canvas logic remains encapsulated and off the main UI tree.

## Outputs
- A prioritized checklist of violations (Critical, Moderate, Minor).
- Suggestions for moving hardcoded values into `mcp/tokens/` or `content/`.

## Instruction
Always think: "Would an Awwwards jury accept this code quality?"
