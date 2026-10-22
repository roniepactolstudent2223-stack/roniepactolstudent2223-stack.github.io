'use client'

import { useState, type FormEvent } from 'react'
import { MailIcon } from '@/components/ui/Icons'

interface ContactFormProps {
  formspreeId?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const QUICK_SUBJECTS = [
  'Junior System Developer Interview',
  'Full-Stack / Laravel Role Inquiry',
  'Request for System Demo / Walkthrough',
]

export default function ContactForm({ formspreeId = 'mppwevqd' }: ContactFormProps) {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<{ email?: string; subject?: string; message?: string }>({})

  function validate(): boolean {
    const next: typeof errors = {}

    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = 'Please enter a valid email address.'
    }

    if (!subject.trim()) {
      next.subject = 'Subject is required.'
    }

    if (!message.trim()) {
      next.message = 'Message is required.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!validate()) return
    if (!formspreeId) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-ledger bg-ledger-Faint/60 p-8 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center bg-ledger text-paper">
          <MailIcon className="h-5 w-5" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ledger font-semibold">
          DISPATCH CONFIRMED
        </p>
        <p className="mt-1 font-serif text-xl font-medium text-ink">Message received</p>
        <p className="mt-1.5 text-sm text-ink-soft">
          Thanks for reaching out. I respond promptly via email or phone within a few hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 border border-ink bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="border border-rule bg-white shadow-sm">
      {/* Window Header Bar */}
      <div className="flex items-center justify-between border-b border-rule bg-paper-deep px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="h-2 w-2 rounded-full bg-ledger/60" />
          <span className="ml-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink">
            Direct Message Dispatch
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ledger">
          ● Active Inbox
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-6 space-y-5">
        {/* Quick-fill subject chips for recruiters */}
        <div>
          <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Quick Topic Preset (Optional)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_SUBJECTS.map((preset) => {
              const active = subject === preset
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSubject(preset)}
                  className={`border px-2.5 py-1 font-mono text-[10px] transition-colors ${
                    active
                      ? 'border-ledger bg-ledger text-paper font-semibold'
                      : 'border-rule bg-paper/60 text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {preset}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ledger"
            >
              01 · Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hiring@company.com"
              className={`w-full border bg-paper/30 px-3.5 py-2.5 text-sm text-ink placeholder-ink-muted transition-colors focus:bg-white focus:outline-none ${
                errors.email ? 'border-stamp' : 'border-rule focus:border-ink'
              }`}
            />
            {errors.email && (
              <p className="mt-1 font-mono text-[11px] text-stamp">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ledger"
            >
              02 · Subject / Role
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Junior System Developer Role"
              className={`w-full border bg-paper/30 px-3.5 py-2.5 text-sm text-ink placeholder-ink-muted transition-colors focus:bg-white focus:outline-none ${
                errors.subject ? 'border-stamp' : 'border-rule focus:border-ink'
              }`}
            />
            {errors.subject && (
              <p className="mt-1 font-mono text-[11px] text-stamp">{errors.subject}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ledger"
          >
            03 · Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share interview schedule, role details, or questions..."
            rows={4}
            className={`w-full resize-none border bg-paper/30 px-3.5 py-2.5 text-sm text-ink placeholder-ink-muted transition-colors focus:bg-white focus:outline-none ${
              errors.message ? 'border-stamp' : 'border-rule focus:border-ink'
            }`}
          />
          {errors.message && (
            <p className="mt-1 font-mono text-[11px] text-stamp">{errors.message}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.1em] text-paper transition-colors hover:bg-ledger hover:border-ledger disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                Sending Dispatch...
              </>
            ) : (
              <>
                <MailIcon className="h-3.5 w-3.5" />
                Send Message →
              </>
            )}
          </button>

          {status === 'error' ? (
            <p className="font-mono text-[11px] text-stamp">
              {formspreeId
                ? 'Could not send right now. Please email roniepactol@gmail.com directly.'
                : 'Form not configured yet. Email me directly.'}
            </p>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
              Delivered directly to roniepactol@gmail.com
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
