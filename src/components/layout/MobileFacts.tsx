import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

/**
 * Mobile and tablet stand-in for the right-hand panel. Native <details> so it
 * works without JavaScript and is read by ATS parsers as plain text.
 */
export default function MobileFacts() {
  const { orientation, phone, phoneTel, email, resumeDocUrl } = PORTFOLIO_IDENTITY

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Role', value: orientation.role },
    { label: 'Stack', value: orientation.stackLine },
    { label: 'Availability', value: orientation.notice },
    { label: 'Experience', value: 'Wilcon Depot, Inc. · 6 months' },
    { label: 'Education', value: 'BS Information Technology, Access Computer College (2025)' },
    { label: 'Phone', value: <a href={phoneTel} className="underline decoration-rule underline-offset-4">{phone}</a> },
    { label: 'Email', value: <a href={`mailto:${email}`} className="underline decoration-rule underline-offset-4">{email}</a> },
    {
      label: 'Resume',
      value: (
        <a href={resumeDocUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-4">
          Live Google Doc ↗
        </a>
      ),
    },
  ]

  return (
    <details className="group border-t border-rule px-6 xl:hidden">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger [&::-webkit-details-marker]:hidden">
        <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">Quick facts</span>
        <span aria-hidden="true" className="ledger-figures text-ink-soft transition-transform group-open:rotate-45">+</span>
      </summary>
      <dl className="pb-6">
        {facts.map((fact) => (
          <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-rule py-3">
            <dt className="ledger-figures pt-0.5 text-xs uppercase tracking-[0.08em] text-ink-soft">{fact.label}</dt>
            <dd className="text-base text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
