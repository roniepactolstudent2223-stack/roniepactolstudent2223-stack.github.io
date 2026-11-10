---
name: frontend-motion-design
description: Research and design refined frontend animation, especially layout transformations, shared elements, spatial navigation, and coordinated motion. Use for motion concepts, advanced animation ideas, or implementing a purposeful animation system. Preserve the existing visual identity; this is not a general page-building or branding skill.
---

# Frontend Motion Design

Treat motion as a change in composition and meaning. Design the relationship between states before choosing effects or a library. Advanced craft means coherent geometry, timing, interruption, and restraint; it does not mean adding more movement.

## Establish the assignment

Read repository instructions and inspect the affected layout, navigation, assets, animation dependencies, and lifecycle. Identify what the visitor is doing and which change needs explanation: choosing, opening, comparing, rearranging, navigating, or progressing through a story.

Match the deliverable to the request. An ideas request produces researched concepts and a recommendation. An implementation request also produces working, verified motion. This skill does not authorize unrelated layout changes or automatically animating the entire site. Preserve established typography, content, and identity; explain any geometry change needed for the chosen transition.

## Research relationships, not an effect list

Read [references/research-sources.md](references/research-sources.md) when researching ideas. Search the actual subject and transition problem, not just “cool website animations.” Follow primary creators, concrete demos, and official engineering documentation. Use galleries as leads, then inspect the specific example.

Seek complementary principles: an object maintaining identity across layouts, a control changing function, a spatial navigation relationship, or a story becoming clearer through rearrangement. Include sources beyond the same popular gallery. The library is a starting map, not the entire search space.

For each useful reference record its URL/creator, trigger, start/end composition, persistent element, choreography, proposed adaptation, and what should not transfer. Label the evidence: observed playback, author description, source-code inspection, or still-image inference. Do not claim to have seen motion from a screenshot. If a source is blocked, use its documented principle cautiously or find another accessible example.

Stop when references resolve the design choices. Search again for a concrete gap rather than collecting links indefinitely. Verify current API availability, browser support, and licensing before implementation. Do not install reference code or copy another site's assets as a research step.

## Design states and choreography

Read [references/motion-patterns.md](references/motion-patterns.md) for layout-driven directions. For a substantial motion request, compare two or three genuinely different spatial ideas. A small refinement can use one focused plan. Recommend the strongest fit and continue when implementation is already authorized.

Make the proposed motion concrete in a short state table or storyboard:

| Decision | Specify |
| --- | --- |
| Trigger and purpose | What starts it and what becomes clearer |
| Before and after | Real layout, content order, dimensions, and destination |
| Continuity | Which item, title, image, control, or edge remains recognizable |
| Choreography | What leads, follows, overlaps, and settles; approximate timing/easing |
| Interruption | Repeated input, reversal, navigation away, and resize behavior |
| Alternatives | Phone/tablet arrangement, reduced motion, and unsupported-browser result |

Choose one dominant motion idea with quiet supporting feedback. Develop variation through spatial relationships and content, not a stock sequence of fade-ups. Basic transitions remain appropriate for utility controls. Do not replace every useful interaction with an elaborate performance.

Use rhythm deliberately: immediate input acknowledgment, purposeful travel, then settling. Keep text legible; do not scale paragraphs or delay content access for a decorative reveal. Avoid competing transitions, excessive stagger, gratuitous blur, cursor replacement, compulsory loaders, or scroll interception unless the brief specifically warrants them.

## Implement with a suitable mechanism

Read [references/implementation-review.md](references/implementation-review.md) before implementation. Prefer existing tooling and native capabilities where they meet the design. Do not add React to an Astro page just to animate it, or WebGL for an ordinary layout transition. A sophisticated composition can use CSS, WAAPI, native View Transitions, or an existing animation library.

Build correct static end states first. Preserve DOM reading order, real navigation, focus, and state. Separate layout measurement from mutation. Keep temporary overlays noninteractive and out of the accessibility tree. Every cancellation path must leave the interface usable.

Recompose motion for touch and small screens instead of merely shortening desktop travel. Replace long pins or multi-panel journeys with direct expansion or ordinary reading when that serves the task. Preserve data and disclosure state across resizing. Design reduced motion as an intentional alternative that reveals the same content and completes the same action.

## Verify the moving interface

Inspect actual playback, not only final screenshots. Check entry, intermediate frames, completion, reversal, rapid input, route changes, Back navigation, late images/fonts, and breakpoint transitions as relevant. Test keyboard/touch paths, reduced motion, narrow phones, tablet, desktop, and short screens.

Use browser timing/rendering evidence for performance claims; a screenshot cannot establish smooth frame delivery. Fix concrete failures and stop once relevant checks pass. If playback or device testing is unavailable, state what was inspected and what remains a hypothesis.

Deliver the concept and rationale, the sources that materially influenced it, what was built when requested, and verification limits. Never promise unprecedented originality or universally smooth performance.
