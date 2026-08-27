## 2026-08-27 - Added ARIA labels to inline icon-only buttons
**Learning:** Found that inline icon-only buttons like those for delete or close were lacking accessible labels for screen readers.
**Action:** Added `aria-label` and `title` to these elements in `frontend/src/main.tsx` to provide proper descriptions. Next time, always check for missing semantic attributes on icon-only interactive elements in the frontend.
