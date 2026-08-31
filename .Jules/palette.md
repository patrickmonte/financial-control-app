## 2024-05-15 - Missing Accessible Names on Inputs and Icon Buttons
**Learning:** Icon-only buttons (like delete or close) and inputs missing explicit labels (like inline filters) make screen reader navigation very difficult in this app context. The visual context does not automatically translate to structural context for AT users.
**Action:** Always add descriptive `aria-label` and/or `title` attributes to icon-only buttons, and ensure all inputs (including inline filters) have associated `aria-label` attributes if a visible `<label>` is not present.
## 2024-05-18 - Modal UX Enhancements
**Learning:** Adding intuitive interactions like `Escape` key support, click-outside-to-close behavior, auto-focus on load, and `aria-pressed` for screen readers significantly boosts the accessibility and perceived speed of modals.
**Action:** Always verify keyboard workflows (Escape, Tab order) and screen-reader states when building or reviewing custom modal components.
