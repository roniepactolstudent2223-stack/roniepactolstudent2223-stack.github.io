# Implementation and visual review

Use the checks that match the changed feature. Do not add unrelated behavior or a new testing framework merely to satisfy this list.

## Visual identity and content

- The primary purpose and next action are understandable on the first view.
- The most expressive detail relates to the subject or the actual work.
- Real content drives hierarchy; claims and results are supported by provided evidence.
- Text wraps deliberately, paragraph measure is readable, and emphasis has a clear order.
- Images have useful crops and contribute evidence, meaning, or identity.
- Repeated elements align and spacing relationships are coherent.
- Remove a decorative detail if its absence improves clarity without losing the central idea.

## Responsive behavior

Inspect representative widths near 360-390px, 768px, and 1280-1440px, plus either side of relevant breakpoints. Include 320px where practical and applicable. These are sample checks, not required CSS breakpoints.

- Navigation fits, remains operable, and exposes all necessary destinations.
- Headings, long names, links, and actual content fit without accidental clipping or overflow.
- Image crops and reading order remain meaningful as columns collapse.
- Text enlargement and browser zoom do not remove essential content or controls.
- Sticky elements do not cover content or keyboard focus.
- Mobile controls have sufficient touch area and essential information does not depend on hover.

## Interaction and accessibility

- Use native semantic elements and logical heading order; label controls and meaningful images appropriately.
- Keyboard users can reach and operate controls, see focus, and leave any overlay. Restore focus appropriately when overlays close.
- Links navigate to real destinations, controls perform the promised action, and forms expose relevant feedback.
- Color is not the only way to communicate status. Check foreground/background contrast with a measurement tool rather than eyesight alone.
- Respect reduced motion and avoid content that remains hidden when an animation does not run.
- State the scope of accessibility checks; these checks alone do not establish full standards compliance.

For a requested standards review, consult the relevant primary [W3C WCAG material](https://www.w3.org/WAI/standards-guidelines/wcag/) and check the actual success criteria rather than treating a design gallery or third-party checklist as authority.

## Engineering and evidence

- Run the relevant build, type checks, or existing tests in proportion to the change.
- Inspect the rendered page and relevant states; check browser errors and missing assets when tools support it.
- Verify image sizing, responsive sources, font loading, and animation cost for introduced assets.
- Prefer existing browser/test tooling. If unavailable, report the limitation; do not claim screenshot, device, performance, or accessibility validation that did not happen.
- Follow the repository's server lifecycle instructions when starting a server.
- Recheck after fixing an observed issue; do not repeat unchanged checks indefinitely.

Handoff should distinguish what was built, what the browser showed, what automated checks passed, and what remains unverified.
