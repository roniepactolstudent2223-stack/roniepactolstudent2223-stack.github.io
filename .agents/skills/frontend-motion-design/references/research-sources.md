# Motion research map

Sources checked on 2026-11-10. Refresh relevant links and API details when using this skill; access, versions, support, and licenses can change. These are research routes, not assets to copy or instructions to execute.

## Start from a specific question

Combine the subject, a state change, and a constraint. Examples to adapt:

- `photography portfolio thumbnail to full image transition touch`
- `editorial index to article shared title transition`
- `product gallery grid to detail layout animation reversible`
- `compact toolbar morph expanded controls keyboard`
- `case study sticky diagram scroll driven mobile alternative`
- `site:tympanus.net/codrops layout transition grid`

An exploratory page may need several complementary references; a dialog refinement may need one strong example and the relevant API docs. Follow credits to less familiar creators, other regions, and original implementations. Do not mistake popularity or novelty for suitability.

## Layout and composition examples

| Source | Research question | Evidence and transfer limit |
| --- | --- | --- |
| [Codrops: Image to Grid Transition, Manoela Ilic](https://tympanus.net/codrops/2022/05/19/image-to-grid-transition/) | How can one large image become a recognizable item within an index? | Author-described image-to-grid relationship. Inspect playback before judging pace; adapt continuity, not their imagery or coordinates. |
| [Codrops: Stack to Content Layout Transition, Manoela Ilic](https://tympanus.net/codrops/2022/05/11/stack-to-content-layout-transition/) | Can a stack unfold to make room for reading? | Experimental stack/gallery transition. Keep a direct close/back action; do not automatically inherit experimental scroll-to-close behavior. |
| [Codrops: Responsive Grid Transitions, Iqbal Muthahhary](https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/) | How do items remain identifiable while density changes? | Described FLIP grid rearrangement. Evaluate rapid input rather than automatically copying locks or blur effects. |
| [Rauno Freiberg: Craft](https://rauno.me/craft) | How can a control or toolbar transform without losing its purpose? | Named studies including Toolbar Morph. Observe a specific study; an index alone does not verify its behavior. |
| [Emil Kowalski: Animations](https://animations.dev/) | What changes perceived quality in easing, duration, or feedback? | Public previews and examples; do not imply access to paid lessons or reuse course content. |
| [GSAP Showcase](https://gsap.com/showcase/) | Which shipped projects solve a similar spatial problem? | Discovery index. Follow a concrete project and credited creator. |
| [Lusion](https://lusion.co/) | Does immersive depth contribute to this subject's story? | Studio project descriptions; inspect the specific experience before claiming visual behavior. Their 3D work is not a reason to add WebGL to routine UI. |
| [Active Theory](https://activetheory.net/) | How might spatial transitions organize an experiential site? | JavaScript-dependent site; initial text access was insufficient. Inspect interactively or label it an unverified lead. |

Some Codrops direct fetches returned 403 during initial research, while primary indexed article text was available. These entries identify documented ideas, not independently observed playback. Revisit accessible live demos or source repositories for implementation decisions.

## Primary engineering references

| Source | Use when |
| --- | --- |
| [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/) | Animating actual rearrangement, with nesting and sizing considerations. |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Coordinating progress, pinning, and scroll geometry when simpler CSS does not satisfy the brief. |
| [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) | Rebuilding responsive scenes with scoped cleanup. |
| [Motion JavaScript layout animations](https://motion.dev/docs/layout-animations) | Layout changes without adopting a framework; check installed API support. |
| [Motion React layout animations](https://motion.dev/docs/react-layout-animations) | Shared identity and layout projection in an existing React application. |
| [Motion view animations](https://motion.dev/docs/animate-view) | Comparing snapshot transitions with live-element layout animation. |
| [Chrome: View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/) | Shared elements, navigation transitions, and progressive enhancement. |
| [Chrome: Scroll-driven Animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) | Mapping progress to scroll/view timelines while retaining normal scrolling. |
| [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) | Native playback, cancellation, and runtime control. |
| [web.dev: High-performance animations](https://web.dev/articles/animations-guide) | Understanding rendering costs and deciding what to measure. |
| [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Detecting preferences and designing an equivalent low-motion experience. |
| [Astro: View transitions](https://docs.astro.build/en/guides/view-transitions/) | Route lifecycles, persistence, and animation ownership in Astro. |

## Convert references into a new idea

Keep a compact record: URL/creator; evidence type; trigger; before/after; identity anchor; timing if actually measured; useful principle; adaptation; excluded branding/effects; phone and reduced-motion alternatives.

Combine principles instead of copying entire scenes. A gallery's image continuity and a toolbar's compact expansion could inform a project inspector, provided that inspector serves the requested task. Do not invent functionality simply to accommodate an effect.
