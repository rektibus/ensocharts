import sys

with open('/Users/daviderecupero/.gemini/antigravity/brain/93fb2114-7387-4bf0-ac55-54e79ce5d999/task.md', 'w', newline='') as f:
    f.write("""# Frontend Pane System Overhaul

## Phase 1: Master Deletion Plan 
- [x] Delete `vite.config.ts`
- [x] Clean Vite from `package.json`
- [x] Delete `workspace_hooks.ts`
- [x] Remove `ResizeHandle` logic from `index.ts`

## Phase 2: ensocharts WebGL Integration
- [x] Copy Zenith WebGL renderer to ensocharts/src/webgl
- [x] Inject single global WebGL canvas context into Chart.ts
- [ ] Translate Pane Y-axis ranges to WebGL projection matrices
- [ ] Strip JS candle/heatmap/LOB rendering paths

## Phase 3: Layout & System Fixes
- [ ] Tailwind v4 upgrade and CSS unification
- [ ] Implement LiveView settings persistence
- [ ] Implement Free Pane mode (floating, snapping, overlapping)

## Completed
- [x] Audit all hooks, LiveViews, and rendering paths
- [x] Create architecture reference
- [x] Agree on final layout specs and delete paths
- [x] Fix resize handle cross-axis sizing + stacking contexts
""")
