# Design through spatial relationships

These are reasoning prompts, not a mandatory effect menu. Choose patterns supported by real content. Define both layouts before animating between them.

## Changing density or scale

| Relationship | Composition idea | What stays understandable | Phone / reduced-motion alternative |
| --- | --- | --- | --- |
| Grid ↔ list | Items retain identity while labels and images trade emphasis. | Selection, ordering, and filter state; avoid stretching text. | Compact list with immediate rearrangement or brief crossfade. |
| Thumbnail ↔ detail | The selected image becomes the detail's anchor; surrounding content yields space. | Destination, crop, back path, and original scroll position. | Inline expansion or a short route transition preserving title/image identity. |
| Stack ↔ reading layout | An overlapping set separates to reveal one item's content. | Selected item and return path. | Single-item disclosure with explicit browsing controls when needed. |
| Overview ↔ focused workspace | A panel expands while neighbors become a rail or summary. | Retained context and how to restore it. | Direct detail navigation rather than squeezing multiple panels into a phone. |

## Changing interaction state

| Relationship | Composition idea | Failure to prevent | Alternative |
| --- | --- | --- | --- |
| Compact control ↔ toolbar | An anchor expands into related controls; content enters after space exists. | Focus lost to clones or controls moving away from the pointer. | Anchored panel/sheet with labeled controls. |
| Navigation ↔ destination | An image, title, or indicator carries context between views. | Duplicate identity, stale snapshot names, blocked input, and broken Back navigation. | Normal navigation with a readable destination and minimal motion. |
| Filter ↔ new results | Surviving items relocate; removed/added items receive supporting treatment. | Confusing disappearance or a queue trailing rapid selections. | Immediate update preserving focus and appropriate result feedback. |
| Drag ↔ settled order | The item follows input; neighbors make room; release settles it. | Missing keyboard equivalent, accidental activation, and forced precision. | Move-up/down controls or direct selection with identical ordering semantics. |

## Changing narrative emphasis

| Relationship | Composition idea | Useful constraint |
| --- | --- | --- |
| Diagram ↔ explained parts | Scroll or selection rearranges a process into labeled stages. | Keep the full explanation reachable without completing the animation. |
| Photo field ↔ selected evidence | An image mask exposes a relevant detail while a caption takes priority. | Preserve meaningful crops, people, and proportions; avoid distorting evidence. |
| Title ↔ reading hierarchy | A title becomes a smaller persistent label as reading takes priority. | Preserve selectable accessible text; remeasure after font or line-wrap changes. |
| Pinned overview ↔ ordinary reading | A limited scroll sequence connects several explanatory states. | Justify duration; preserve anchors and offer an unpinned phone/reduced-motion layout. |

## Choreography instead of stacked effects

Identify the object whose continuity matters, the space it needs, and the information that can follow. Let the initiating object lead and dependent content enter when its destination exists. Parallel motion can shorten waiting, but not every element needs a separate track.

Utility feedback often begins around 100–250 ms and larger changes around 250–500 ms as prototype starting points, not standards. Tune to distance, frequency, input, and readability. Longer storytelling sequences need a purpose and a way to proceed without waiting. Springs should settle decisively; overshoot is a character choice, not proof of quality.

Specify overlap intentionally: the image travels first, neighboring items make room concurrently, and text appears after its line width stabilizes. Entry/exit may differ in pace; reversal should still preserve spatial logic.

When an idea feels generic, change a relationship: origin, anchoring edge, retained overview, or how an item becomes its destination. Adding blur, stagger, magnetic attraction, or displacement does not itself create a new concept.
