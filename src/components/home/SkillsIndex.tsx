import { SKILL_GROUPS } from '@/lib/portfolio-config'

/**
 * Skills as grouped plain text ("Backend: Laravel, PHP, ..."), the way a resume
 * lists them, so keyword matching works and nothing looks like a badge cloud.
 */
export default function SkillsIndex() {
  return (
    <section aria-labelledby="skills-title" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">Index</p>
        <h2 id="skills-title" className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl">
          Skills
        </h2>

        <dl className="mt-8">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.group}
              className="grid gap-x-6 gap-y-1 border-t border-rule py-3 sm:grid-cols-[8rem_1fr]"
            >
              <dt className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft sm:pt-1">{group.group}</dt>
              <dd className="text-base leading-relaxed text-ink">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <div className="rule-double" aria-hidden="true" />
      </div>
    </section>
  )
}
