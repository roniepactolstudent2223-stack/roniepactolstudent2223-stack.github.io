import { CAREER_LOG } from '@/lib/portfolio-config'

/**
 * Experience written as an audit log: newest first, one fact per line.
 * The kicker keeps the concept; the H2 uses the word "Experience" because
 * that is the heading applicant-tracking parsers look for.
 * Weight rule: only the role is medium; place, dates and notes are regular.
 */
export default function AuditLog() {
  return (
    <section aria-labelledby="experience-title" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">Audit log · newest first</p>
        <h2 id="experience-title" className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl">
          Experience and education
        </h2>

        <ol className="mt-8">
          {CAREER_LOG.map((entry) => (
            <li
              key={`${entry.when}-${entry.what}`}
              className="grid gap-x-6 gap-y-1 border-t border-rule py-4 sm:grid-cols-[11rem_1fr]"
            >
              <span className="ledger-figures text-[13px] text-ink-soft sm:pt-1">{entry.when}</span>
              <div>
                <p className="text-[17px] font-medium leading-snug text-ink">{entry.what}</p>
                <p className="mt-0.5 text-[15px] leading-relaxed text-ink-soft">
                  {entry.where}
                  {entry.note ? ` · ${entry.note}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rule-single" aria-hidden="true" />
      </div>
    </section>
  )
}
