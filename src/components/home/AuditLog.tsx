import { CAREER_LOG } from '@/lib/portfolio-config'

const ORG_LOGOS: Record<string, string> = {
  'Wilcon Depot, Inc.': '/logos/wilcon.png',
  'WordPress Philippines': '/logos/wordpress.png',
  'Jollibee Foods Corp.': '/logos/jollibee.png',
}

const ORG_BADGES: Record<string, string> = {
  'Radiant Force Human Resources': 'RF',
  'Access Computer College': 'BSIT',
  'Word of Hope Caloocan': 'WOH',
}

/**
 * Experience and education timeline with real organization logos,
 * timeline connector, and highlighted recent developer role.
 */
export default function AuditLog() {
  return (
    <section aria-labelledby="experience-title" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-4xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
          Audit log · newest first
        </p>
        <h2
          id="experience-title"
          className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl"
        >
          Experience and education
        </h2>

        <ol className="mt-8">
          {CAREER_LOG.map((entry, idx) => {
            const logo = ORG_LOGOS[entry.where]
            const badge = ORG_BADGES[entry.where]
            const isFeatured = idx === 0

            return (
              <li
                key={`${entry.when}-${entry.what}`}
                className={`grid gap-x-6 gap-y-2 border-t border-rule py-5 sm:grid-cols-[11.5rem_1fr] ${
                  isFeatured ? 'border-l-2 border-l-ledger bg-paper-deep/45 pl-4 pr-3' : ''
                }`}
              >
                <div className="flex items-center gap-2 sm:items-start sm:pt-1">
                  <span className="ledger-figures text-xs text-ink-soft">{entry.when}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[17px] font-medium leading-snug text-ink">{entry.what}</p>
                      {isFeatured && (
                        <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ledger">
                          Most Recent Role
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                      <span className="text-ink">{entry.where}</span>
                      {entry.note ? ` · ${entry.note}` : ''}
                    </p>
                  </div>

                  {/* Organization Visual Logo or Badge */}
                  {logo ? (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-rule bg-white p-1.5">
                      <img
                        src={logo}
                        alt={entry.where}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : badge ? (
                    <div className="ledger-figures flex h-9 w-9 shrink-0 items-center justify-center border border-rule bg-paper-deep text-[10px] font-medium text-ink-soft">
                      {badge}
                    </div>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="rule-single" aria-hidden="true" />
      </div>
    </section>
  )
}
