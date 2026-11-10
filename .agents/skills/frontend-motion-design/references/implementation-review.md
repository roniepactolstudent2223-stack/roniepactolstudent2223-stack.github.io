# Implement and inspect motion

## Select from the design

- CSS transitions/keyframes: local states and predictable sequences. Avoid `transition: all` on complex controls.
- Web Animations API: native playback and cancellation where no library is needed.
- Native View Transitions: snapshot continuity across DOM/route changes. Feature-detect; the update must still run without animation. Assign unique participating names and clean up temporary names.
- FLIP/layout projection: animate reflow with the final DOM authoritative. Use existing GSAP Flip or compatible tooling when its geometry and lifetime handling justify it.
- Scroll/view timelines: tie progress to real scrolling. Use ScrollTrigger for features the scene needs, not to justify intercepting scroll.
- SVG/canvas/WebGL: use when a meaningful illustration or scene requires it. Budget assets, loading, GPU cost, and a static fallback.

Check installed versions and official docs. Framework and vanilla APIs differ; online examples do not establish licensing. Do not add a framework or smooth-scroll engine for a local effect.

## Geometry and continuity

For FLIP, capture initial geometry, apply the final layout once, measure destinations, then animate the visual difference. Batch reads and writes. Account for scroll offsets, transformed ancestors, border boxes, and nesting; DOM rectangles and snapshot layers may use different coordinate systems.

Avoid distorting text and controls with container scaling. Consider inner content, size correction, or position-only transitions. Maintain image crops deliberately. Wait for necessary image decoding or font readiness before measurement without blocking unrelated usable content.

Temporary clones should be decorative, noninteractive, and free of duplicate IDs. Preserve the real item's semantics and focus. Check native dialog top-layer behavior, stacking contexts, fixed headers, clipping, and snapshot overlays; high `z-index` is not a universal fix.

Use transforms/opacity where suitable, but do not assume every transform is cheap or every layout animation forbidden. Profile the scene. Large filters, shadows, masks, high-resolution layers, and permanent `will-change` can be expensive. Remove compositor hints when no longer justified.

## Interruption and lifetime

Input and semantic state are authoritative. Prefer retargeting, reversing, or finishing motion over queuing stale intentions. If a mechanism briefly cannot accept another transition, coalesce to the latest valid request and preserve escape/navigation. Do not force ordinary actions to wait through decoration.

Define repeated click, opposite input, route change, Escape, resize, and late asset behavior. Cancellation must clean up overlays, transforms, locks, styles, and listeners even without normal completion. Handle promises that reject on cancellation; do not attach focus restoration solely to an unguarded completion promise.

Remeasure responsive geometry when necessary. Do not replay intros or reset user data/disclosures on every resize. In Astro, respect the router: initialize new DOM after its relevant navigation event and clean up replaced scenes before swaps. Persistent headers/dialogs must not accumulate listeners or competing animation owners.

## Responsive and reduced motion

Plan phone composition with shorter paths, fewer simultaneous moving regions, no hover dependency, and space for the keyboard. Keep moving touch controls operable. Drag/pointer-only effects need direct equivalents.

Reduced motion must preserve content and state changes. Remove long travel, parallax, repeated zooms, and compulsory pins; use immediate updates or restrained opacity when appropriate. Handle the preference in JavaScript as well as CSS for JS scenes. Globally forcing near-zero duration can break sequencing; test the actual alternative.

Unsupported APIs and disabled JavaScript should leave meaningful content and ordinary navigation. Essential information must not remain invisible awaiting a failed timeline or observer.

## Verification proportional to the scene

Inspect playback/recordings and intermediate frames where geometry matters. Final screenshots verify composition, not timing. Check entry, settled, exit, reverse, and interrupted states. Include rapid input, Back navigation, resizing while open, slow assets, and long text when relevant.

Sample phone, tablet, desktop, changed breakpoints, short screens, and enlarged text. Confirm focus order/visibility, Escape, focus return, native scrolling, anchor offsets, and disclosure state. Check reduced motion and unsupported APIs. These checks are not full accessibility certification.

For heavy scenes use browser performance tools to inspect frame work, long tasks, layout/paint, and layer cost. Do not claim 60 fps or physical-device performance from headless screenshots or viewport emulation. Run relevant build/checks. Recheck changed or unresolved areas after fixes.

Report observed behavior, environment, remaining limits, and sources informing the design. Remove temporary testing tools without touching user assets.
