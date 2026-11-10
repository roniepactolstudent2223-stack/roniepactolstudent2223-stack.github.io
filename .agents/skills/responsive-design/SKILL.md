---
name: responsive-design
description: Adapt an existing desktop interface into intentional mobile and tablet layouts. Use for responsive redesign, compact mobile UX, breakpoint problems, mobile navigation, content disclosure, and deciding between inline content, accordions, dialogs, or icon actions. Starts with information hierarchy and interaction layout before changing sizes. Preserve the established desktop identity; this is not a new branding or desktop redesign skill.
---

# Responsive Design

Design the small-screen experience as a deliberate arrangement of the existing product. Start with what people need to see and do; choose layout and disclosure before adjusting dimensions. Keep desktop behavior and identity unless the requested responsive work requires a shared correction.

## Inspect the actual experience

Read project instructions, the relevant components, tokens, routes, and existing responsive behavior. Inspect rendered desktop and narrow layouts when browser access exists. Review the real content and states, not just ideal sample text. Follow the repository's documentation and server lifecycle requirements.

Identify the primary task, important supporting information, frequent actions, occasional details, and decoration. Check what already works on desktop and what specifically fails on smaller screens: excess scrolling, confusing order, crowded navigation, tall repeated cards, disconnected actions, clipped content, or desktop-only interaction assumptions.

Use the user's current request and conversation to set scope. A contact-modal refinement does not authorize a site-wide overhaul. An analysis request produces findings and recommendations; an implementation request produces verified changes. Ask the user only when an unresolved product choice would materially change the result. Most layout decisions can be reasoned through and implemented without an approval pause.

## Decide the layout first

Before CSS changes, answer these questions for each affected section:

- What must the user understand immediately on a phone?
- What is the primary action, and can it be reached without searching a menu?
- Does this need a new arrangement rather than simply stacked desktop columns?
- Which information belongs together? What should be adjacent to its action?
- Which details can open on demand without hiding the reason to use the page?
- Can repeated cards become compact rows, a useful index, or a summary with details?
- Would a labeled button, shorter label, icon with label, or icon alone make this clearer?
- Does the proposed layout also work on a medium-width tablet, in landscape, and with larger text?

State a short layout plan before implementing. For several affected sections, a compact table is useful:

| Area | Phone layout and reason | Tablet behavior | Desktop impact |
| --- | --- | --- | --- |
| Affected section | Content order, visible essentials, on-demand details, primary action | Composition between phone and desktop | What changes, if anything |

For a complex or ambiguous region, compare two plausible arrangements and recommend one. A small wireframe can clarify placement. Do not generate diagrams, a design file, or a large planning document when a few sentences suffice. Once layout is decided, derive spacing, typography, image sizing, and breakpoints from it.

## Compact through structure

Read [references/layout-decisions.md](references/layout-decisions.md) when choosing a new mobile arrangement or disclosure pattern.

Reduce unnecessary steps and vertical repetition before reducing text size. Group related actions, eliminate duplicated labels where meaning is preserved, reduce oversized decorative media, and replace tall card compositions with shorter rows where the information supports it. Keep readable text, useful image crops, and generous enough hit areas. Compact does not mean every pixel must contain content.

Keep the primary value, relevant evidence, and essential action visible. Move occasional information behind a clearly named control only when the tradeoff improves the task. Do not hide whole sections simply to make a page shorter. Keep disclosed content reachable, discoverable, and usable without a hover interaction.

Decide tablet composition explicitly. It may use a narrow sidebar, two-column summary, or different media proportion. Do not let a tablet inherit either a cramped desktop arrangement or a stretched phone stack by accident.

## Choose disclosure and icons intentionally

Use inline content for essentials. Consider an accordion for supporting details within the reading flow. Consider a dialog or compact sheet for a short self-contained task such as contact options or filtering. Use a separate route for substantial content that benefits from bookmarking, sharing, or lengthy reading. Introduce a pattern only when it improves a concrete interaction; not every section needs a button or modal.

For each on-demand region, specify the trigger label, content, open/close behavior, focus behavior, state persistence, and short-screen behavior. Avoid nested dialogs. Do not force phone users through a modal for information they need to compare with the page underneath.

Prefer a short clear label when an icon would require interpretation. Consider icon-only controls for familiar repeated utility actions such as close or copy, especially beside the content they act on. Keep unfamiliar, consequential, or primary actions labeled. Every icon-only control needs an accessible name and a visible focus state; a tooltip alone is not a touch-friendly label. Reuse the existing icon set or a small consistent SVG; do not install a large library for one icon.

## Implement the chosen arrangement

Use the project's components, tokens, and styling conventions. Reuse existing dialog, menu, disclosure, and icon components before introducing new ones. Prefer native HTML behavior when it meets the interaction needs. Do not add dependencies, routes, or speculative features for responsive work alone.

Use DOM order that makes sense for reading and keyboard use. Avoid visual reordering that disconnects focus from the displayed sequence. Do not duplicate an entire content region for different screens unless a concrete constraint makes it necessary; avoid duplicate IDs and independently drifting copies of state.

Choose breakpoints where the content or arrangement needs to change. Coordinate interacting components so navigation, header, page layout, and overlays agree around the transition. Let columns shrink with their content constraints, allow meaningful wrapping, and use flexible sizing instead of fixed heights around text. Diagnose overflow rather than hiding it at the page level.

Keep actions large enough to operate with a finger even when their icons or text are small. Aim for about 44px hit areas for standalone touch controls where practical, without claiming this alone establishes accessibility compliance. Make hover information available on focus and touch. Preserve browser zoom, safe-area space where relevant, reduced motion, and existing state when the viewport changes. Do not repeatedly reset a user's opened accordion on ordinary resize events.

For dialogs, support an obvious close control, keyboard dismissal, contained focus, and focus return to the visible trigger. Constrain the overlay to the available viewport and allow internal scrolling on short screens while keeping dismissal reachable. Do not promise zero scrolling at every height or under enlarged text. Make backdrop dismissal deliberate, not triggered by a drag that begins inside the content.

## Verify layout and behavior

Check the real rendered result when tools allow it. For a page-wide change, sample narrow phones around 320px and 390px, tablet around 768px, and the existing desktop width; add landscape and the widths immediately before and after changed breakpoints. For a component change, focus on its relevant transitions and states.

Check:

- The primary task is clear and the reading order feels intentional.
- No unintended page or component overflow, clipped text, overlapping controls, or extreme whitespace appears.
- Compact rows remain readable with long labels, larger text, and different content lengths.
- Disclosures reveal everything promised and essential information remains discoverable.
- Icon meanings, accessible names, focus visibility, touch areas, and keyboard access are sensible.
- Menus dismiss appropriately; dialog close, Escape, focus return, and short-screen scrolling work.
- Existing interactions and desktop composition still work after shared CSS changes.

Run the relevant project build or existing checks. Inspect screenshots for hierarchy and composition; numerical overflow checks alone cannot verify visual quality. If browser access is missing, state the limitation and distinguish code review from rendered validation. Do not claim physical-device testing from viewport emulation.

Explain the structural changes and why they help, not merely which font sizes decreased. State the tested widths, relevant interaction results, and any remaining limitations. Remove temporary tooling you created when it is no longer needed, preserving the user's existing tools and files.
