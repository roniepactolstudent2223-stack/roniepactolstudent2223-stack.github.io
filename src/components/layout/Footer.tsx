import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

/**
 * Contact block. Phone is a tap-to-call link because most screeners open the
 * site on a phone. Plain text rows, no buttons-in-boxes, no tagline.
 */
export default function Footer() {
  const { email, phone, phoneTel, resumeDocUrl, externalLinks } = PORTFOLIO_IDENTITY

  const rows = [
    { label: 'Phone / Viber', href: phoneTel, text: phone },
    { label: 'Email', href: `mailto:${email}`, text: email },
    { label: 'Resume', href: resumeDocUrl, text: 'Live Google Doc ↗', external: true },
  ]

  return (
    <footer id="contact" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">Contact</p>
        <h2 className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl">
          Reach Ronie
        </h2>

        <dl className="mt-8">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-x-6 gap-y-1 border-t border-rule py-3.5 sm:grid-cols-[8rem_1fr]">
              <dt className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft sm:pt-1">{row.label}</dt>
              <dd>
                <a
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-base text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
                >
                  {row.text}
                </a>
              </dd>
            </div>
          ))}
          <div className="grid gap-x-6 gap-y-1 border-t border-rule py-3.5 sm:grid-cols-[8rem_1fr]">
            <dt className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft sm:pt-1">Location</dt>
            <dd className="text-base text-ink">Balingasa, Quezon City, Philippines</dd>
          </div>
          <div className="grid gap-x-6 gap-y-1 border-t border-rule py-3.5 sm:grid-cols-[8rem_1fr]">
            <dt className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft sm:pt-1">Profiles</dt>
            <dd className="flex flex-wrap gap-x-5 gap-y-1">
              {externalLinks
                .filter((link) => link.label === 'LinkedIn' || link.label === 'GitHub')
                .map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
                  >
                    {link.label} ↗
                  </a>
                ))}
            </dd>
          </div>
        </dl>
        <div className="rule-double" aria-hidden="true" />

        <p className="ledger-figures mt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} {PORTFOLIO_IDENTITY.name}
        </p>
      </div>
    </footer>
  )
}
