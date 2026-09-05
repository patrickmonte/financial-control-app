## 2026-09-02 - Async Button Feedback
**Learning:** Adding immediate visual feedback (spinner and disabled state) to primary buttons during async operations significantly improves user confidence and prevents duplicate submissions.
**Action:** When implementing async form submissions, always use a `disabled` state with an opacity reduction and `not-allowed` cursor, alongside a spinning icon, to indicate progress.

## 2026-09-04 - Inline Action Feedback
**Learning:** Adding immediate visual feedback (spinner and disabled state) to destructive inline actions (like a delete button in a table row) significantly improves user confidence and prevents duplicate API calls from double clicks.
**Action:** When implementing async inline actions, always use a `disabled` state alongside a spinning icon in place of the normal icon to indicate progress without shifting layout.

## 2024-05-24 - Hidden Focus States on Custom Inputs
**Learning:** Custom inputs that use `outline: 0` to remove default browser focus styles (like `.search input`) unintentionally hide focus indicators for keyboard navigation, creating a major accessibility barrier.
**Action:** Always use `:focus-within` on the parent container to restore visible focus when hiding the default outline on the input itself.
