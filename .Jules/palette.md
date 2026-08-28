## 2026-08-28 - Filter Controls and Icon Buttons Accessibility
**Learning:** Filter controls (search inputs, selects, date pickers) often lack visible text labels in compact UI designs to save space. Without `aria-label`, these inputs become inaccessible to screen readers. Similarly, icon-only buttons (like delete or close) must have `aria-label` (and preferably `title`) attributes.
**Action:** Always verify that inputs without visible `<label>` elements have an explicit `aria-label` describing their purpose. Apply `aria-label` and `title` to all icon-only buttons as a standard practice.
