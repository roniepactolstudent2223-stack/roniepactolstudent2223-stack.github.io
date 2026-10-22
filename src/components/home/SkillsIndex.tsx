import { SKILL_GROUPS } from '@/lib/portfolio-config'

const PRIMARY_SKILLS = new Set(['Laravel', 'PHP', 'Vue.js', 'MySQL', 'REST APIs', 'Tailwind CSS', 'Git'])

/**
 * Skills displayed as structured ledger groups with primary stack items
 * highlighted for rapid HR and ATS scanning.
 */
export default function SkillsIndex() {
  return (
    <section aria-labelledby="skills-title" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-4xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
          Technical Index
        </p>
        <h2
          id="skills-title"
          className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl"
        >
          Skills &amp; Tools
        </h2>

        <dl className="mt-8">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.group}
              className="grid gap-x-6 gap-y-2.5 border-t border-rule py-4 sm:grid-cols-[8.5rem_1fr] sm:items-center"
            >
              <dt className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                {group.group}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const isPrimary = PRIMARY_SKILLS.has(skill)
                  return (
                    <span
                      key={skill}
                      className={`ledger-figures border px-2.5 py-1 text-xs ${
                        isPrimary
                          ? 'border-ledger/45 bg-ledger/10 font-medium text-ink'
                          : 'border-rule bg-paper-deep/40 text-ink-soft'
                      }`}
                    >
                      {isPrimary && (
                        <span className="mr-1.5 text-ledger" aria-hidden="true">
                          ●
                        </span>
                      )}
                      {skill}
                    </span>
                  )
                })}
              </dd>
            </div>
          ))}
        </dl>

        <div className="rule-double" aria-hidden="true" />
      </div>
    </section>
  )
}
