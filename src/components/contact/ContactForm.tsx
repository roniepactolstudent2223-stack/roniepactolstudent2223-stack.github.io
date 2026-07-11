'use client'

import { useState, type FormEvent } from 'react'
import { MailIcon } from '@/components/ui/Icons'

interface ContactFormProps {
  formspreeId?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm({ formspreeId }: ContactFormProps) {
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
        headers: { 'Content-Type': 'application/json' },
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
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900">
          <MailIcon className="h-5 w-5 text-white" />
        </div>
        <p className="text-sm font-medium text-neutral-900">Message sent</p>
        <p className="mt-1 text-sm text-neutral-500">
          Thanks for reaching out. I typically respond within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-xs font-medium text-neutral-500 underline underline-offset-4 decoration-neutral-300 transition-colors hover:text-neutral-900 hover:decoration-neutral-900"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-neutral-700">
          Your email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1 ${
            errors.email ? 'border-red-400' : 'border-neutral-200'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-neutral-700">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What is this about?"
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1 ${
            errors.subject ? 'border-red-400' : 'border-neutral-200'
          }`}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-neutral-700">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about the role, project, or question..."
          rows={5}
          className={`w-full resize-none rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1 ${
            errors.message ? 'border-red-400' : 'border-neutral-200'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-neutral-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <MailIcon className="h-4 w-4" />
              Send message
            </>
          )}
        </button>

        {status === 'error' && (
          <p className="text-xs text-red-500">
            {formspreeId
              ? 'Something went wrong. Please try again or email me directly.'
              : 'Form not configured yet. Email me directly.'}
          </p>
        )}
      </div>
    </form>
  )
}
