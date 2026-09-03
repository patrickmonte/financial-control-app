## 2026-09-02 - Async Button Feedback
**Learning:** Adding immediate visual feedback (spinner and disabled state) to primary buttons during async operations significantly improves user confidence and prevents duplicate submissions.
**Action:** When implementing async form submissions, always use a `disabled` state with an opacity reduction and `not-allowed` cursor, alongside a spinning icon, to indicate progress.
