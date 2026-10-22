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
  'Request for System Demo',
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
      <div className="bg-paper-deep/55 p-8 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center bg-ledger text-paper">
          <MailIcon className="h-5 w-5" />
        </div>
        <p className="font-serif text-xl font-medium text-ink">Message sent</p>
        <p className="mt-1.5 text-sm text-ink-soft">
          Thanks for reaching out. I will reply via email or phone shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="ledger-figures mt-5 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-paper-deep/45 p-5 sm:p-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Quick-fill subject chips */}
        <div className="flex flex-wrap gap-1.5">
          {QUICK_SUBJECTS.map((preset) => {
            const active = subject === preset
            return (
              <button
                key={preset}
                type="button"
                onClick={() => setSubject(preset)}
                className={`ledger-figures cursor-pointer px-2.5 py-1 text-xs transition-colors ${
                  active
                    ? 'bg-ink text-paper font-medium'
                    : 'bg-paper text-ink-soft hover:text-ink'
                }`}
              >
                {preset}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-email"
              className="ledger-figures mb-1.5 block text-xs font-medium text-ink"
            >
              Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hiring@company.com"
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink-muted transition-colors focus:outline-none ${
                errors.email ? 'border-stamp' : 'border-rule/80 focus:border-ink'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-stamp">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="ledger-figures mb-1.5 block text-xs font-medium text-ink"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Junior System Developer Role"
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink-muted transition-colors focus:outline-none ${
                errors.subject ? 'border-stamp' : 'border-rule/80 focus:border-ink'
              }`}
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-stamp">{errors.subject}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="ledger-figures mb-1.5 block text-xs font-medium text-ink"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share interview schedule, role details, or questions..."
            rows={4}
            className={`w-full resize-none border bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink-muted transition-colors focus:outline-none ${
              errors.message ? 'border-stamp' : 'border-rule/80 focus:border-ink'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-stamp">{errors.message}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="ledger-figures inline-flex cursor-pointer items-center gap-2 bg-ink px-5 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              'Sending...'
            ) : (
              <>
                <MailIcon className="h-3.5 w-3.5" />
                Send Message
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="text-xs text-stamp">
              Could not send right now. Please email roniepactol@gmail.com directly.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
