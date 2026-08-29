## 2024-12-19 - Adding ARIA labels to icon-only buttons and handling focus rings on custom input wrappers
**Learning:** When using custom input wrappers (like a div containing an icon and an unstyled input), removing the default `outline` from the input creates an accessibility issue for keyboard navigation.
**Action:** Use `:focus-within` on the custom wrapper to restore focus visibility. Always add `aria-label` to icon-only buttons and custom filtering inputs so screen readers can interpret them correctly.
