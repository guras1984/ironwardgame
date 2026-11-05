# IRONWARD · 최후의 방어선

Original browser tower-defense game. Five hand-authored operations, five defensive units, progressive enemy introductions, and a final siege boss. Built with Canvas 2D and native JavaScript modules; no build step.

## Play
Select a unit, then a tile. Enemies move from right to left; turrets fire to the right in their own lane. Start the wave when ready. Select a placed unit to upgrade (also repairs it) or sell at 60% of its original cost. Orbital strike unlocks in operation 02; mortar unlocks in operation 03. Stars and operation unlocks persist in browser storage. Battles themselves restart after reload.

Keyboard: 1–5 selects units, Space pauses, Escape clears selection. Tab into the grid and use arrow keys / Enter to place units. Sound is opt-in. Reduced-motion preferences reduce effects. The game pauses when the browser loses focus.

## Local preview
Run a static HTTP server rooted at `dist/`, e.g. `python3 -m http.server 8793 --directory dist`.

## Validation
- `node tests/engine.test.mjs` — economic rules, attacks, shields, debuffs, defeat, boss attacks, stage data.
- `node tests/balance.mjs` — deterministic strategic simulation through all five operations; verifies all are winnable.

Graphics are original procedural Canvas illustrations. Audio is synthesized with Web Audio. Google Fonts are optional; local font fallbacks are provided. No advertising, analytics, game accounts or purchases.

플레이: https://ironward-base-defense.kjshin841.chatgpt.site
