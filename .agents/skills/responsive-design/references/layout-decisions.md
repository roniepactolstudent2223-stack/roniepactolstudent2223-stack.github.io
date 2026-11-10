# Choosing a compact responsive layout

Use this reference when the mobile structure needs to change. These are decision aids, not a mandatory pattern library or a list of features to add.

## Choose by the user's task

| Situation | Candidate arrangement | Reason to choose it | Reason to keep another arrangement |
| --- | --- | --- | --- |
| Hero with large decorative image | Concise introduction, adjacent actions, reduced or omitted decoration | The task is understanding the offer and choosing a next step | Keep meaningful product evidence or work samples visible when they establish credibility |
| Repeated feature or project cards | Compact rows with title, one useful detail, and a clear destination | Users are scanning and selecting among similar items | Retain larger imagery when visual comparison is the task |
| Long background or specifications | Summary plus inline disclosure | Details support the decision but need not dominate the initial reading | Keep essential eligibility, price, safety, or decision information directly visible |
| Contact methods | Direct trigger opening a short dialog/sheet | The task is self-contained and useful from multiple sections | Inline content may be better when contact is the entire page's primary purpose |
| Several navigation destinations | Visible primary action plus a labeled menu | A frequent action stays easy to find while occasional routes move on demand | Keep simple navigation inline when it fits comfortably |
| Filters beside results | Filter button opening a panel with active-filter summary | Results need most of the available width | Keep common toggles inline if opening a panel adds unnecessary effort |
| Wide comparison or data table | Prioritized columns, a labeled scrolling region, or a true item-detail view | Preserves the relationships people actually need to compare | Do not convert to unrelated cards when row/column comparison is essential |
| Dense toolbars | Keep primary action visible, group secondary utilities in a labeled overflow menu | Reduces competition and preserves task priority | Do not bury frequent or critical actions just to gain a little space |

## Pick the disclosure mechanism

**Accordion / details:** Use when supporting information belongs at its current location and should open without interrupting reading. Give its summary an informative label and a visible open/closed cue. Native `details` is often sufficient. Ensure search, deep links, and required form errors remain reachable when relevant.

**Dialog:** Use for a short focused task that temporarily takes priority. The trigger should describe the task, such as Contact or Filters. Use native modal behavior or the existing accessible component; keep the background inert, handle focus, and provide a visible close action. A modal with an entire long article is often just a harder-to-use page.

**Sheet:** A visual form of a dialog or panel that may suit one-handed reach on phones. Use only if it improves the actual task; a centered compact dialog may already be sufficient. Do not require a drag gesture to dismiss or reveal controls. Safe-area padding and short-screen scrolling still matter.

**Tabs:** Use for peer views that people switch between, not simply to hide an overly long page. Consider whether users need to compare the content or discover all of it. Follow the existing keyboard and selected-state conventions.

**Separate page:** Use for long, shareable, bookmarkable content or a multi-step task. Keep a clear route back. Do not add a route for a few contact methods that already fit an accessible dialog.

## Decide whether text can become an icon

Ask in this order:

1. Can the existing label be shortened without losing meaning?
2. Would an icon beside that short label improve recognition?
3. Is the action sufficiently familiar and close to its subject to work without visible text?
4. Can it keep a useful hit area, accessible name, visible focus, and feedback?

Close, copy, search, and familiar repeated playback controls can work as icons in context. A project title, an unfamiliar workflow action, and a primary call to action usually need text. A generic arrow alone does not explain what a new destination contains. An icon-only button that saves 20px but causes uncertainty is not a useful compacting decision.

Decorative icons should be hidden from assistive technology. Meaningful status needs words or another non-color cue. Keep SVG stroke weights, size, and alignment consistent with the existing UI.

## Avoid common structural mistakes

- **Stacking everything unchanged:** Can produce a long sequence of headings, repeated labels, and large media. Reconsider groups and priority first.
- **Shrinking everything:** Produces small type and fiddly actions while retaining the same hierarchy problem.
- **Moving everything into overlays:** Adds discovery and dismissal work and makes comparison harder.
- **Icons everywhere:** Creates a compact but ambiguous toolbar. Preserve labels where they carry meaning.
- **One breakpoint for every component:** Different content fails at different widths; coordinate related transitions rather than imposing unrelated device labels.
- **Phone-only testing:** Misses awkward tablet proportions and large jumps at breakpoints.
- **Fixed viewport-height panels:** Can clip content under mobile browser chrome, larger text, or landscape. Constrain available space and permit needed scrolling.
- **Resize resets:** Can close details the user opened or discard task state. Initialize defaults thoughtfully and preserve interaction state where possible.

## Example reasoning

For a desktop portfolio with a two-column biography, lengthy background list, project cards, and a contact block:

- On phones, show the identity and concise bio first. Let project summaries become scan-friendly rows only if images are not essential for evaluating the work.
- Keep the skills summary visible if it helps the target recruiter assess fit; put detailed background behind an explicitly labeled disclosure if it dominates the page.
- Keep Contact readily reachable. A short contact dialog can expose email, phone, and resume without taking readers away from their current work sample.
- On tablets, compare a modest media column with a one-column narrative rather than assuming a stretched phone layout.

This is an example of reasoning, not a portfolio template. The actual audience, content, and requested scope determine which changes are appropriate.
