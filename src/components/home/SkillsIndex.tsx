import { SKILL_GROUPS } from '@/lib/portfolio-config'

const PRIMARY_SKILLS = new Set(['Laravel', 'PHP', 'Vue.js', 'MySQL', 'REST APIs', 'Tailwind CSS', 'Git'])

export default function SkillsIndex() {
  return (
    <section aria-labelledby="skills-title" className="border-t border-rule/60 px-6 py-12 sm:py-16">
      <div className="max-w-4xl grid gap-8 md:grid-cols-[13rem_1fr] md:items-start">
        <h2
          id="skills-title"
          className="font-serif text-2xl font-medium leading-tight text-ink sm:text-[1.75rem]"
        >
          Skills &amp; Tools
        </h2>

        <dl className="grid gap-4 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div key={group.group} className="bg-paper-deep/40 p-4">
              <dt className="ledger-figures text-xs font-medium uppercase tracking-[0.08em] text-ink">
                {group.group}
              </dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((skill) => {
                  const isPrimary = PRIMARY_SKILLS.has(skill)
                  return (
                    <span
                      key={skill}
                      className={`ledger-figures px-2.5 py-1 text-xs ${
                        isPrimary
                          ? 'bg-paper font-medium text-ink shadow-2xs'
                          : 'bg-paper/60 text-ink-soft'
                      }`}
                    >
                      {skill}
                    </span>
                  )
                })}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
