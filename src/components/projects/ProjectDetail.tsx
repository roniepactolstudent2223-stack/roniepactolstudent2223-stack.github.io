'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'

interface ProjectDetailProps {
  project: Project
}

interface FeatureHighlight {
  number: string
  title: string
  subtitle: string
  description: string
}

const PROJECT_HIGHLIGHTS: Record<string, FeatureHighlight[]> = {
  'woh-attendance-system': [
    {
      number: '01',
      title: 'REST API Member Sync',
      subtitle: 'Church Website Integration',
      description: 'The church maintains its own member registration on wohcaloocan.org. This attendance system uses API integration to seamlessly fetch members, verify registrations, and log attendance without double entry.',
    },
    {
      number: '02',
      title: 'Instant QR Check-In',
      subtitle: 'Zero Paperwork',
      description: 'Members tap/scan their personal QR card at the kiosk. Auto-sign check-in eliminates writing names by hand and prevents long entrance queues.',
    },
    {
      number: '03',
      title: 'Absentee Care & Visiting',
      subtitle: 'Pastoral Follow-Up',
      description: 'Automatically flags members missing consecutive services so pastors and leaders know exactly who to visit, ensuring people feel cared for and truly belong.',
    },
    {
      number: '04',
      title: 'Live Service Analytics',
      subtitle: 'Real-Time Insights',
      description: 'Instant service breakdown for Sunday Worship, Youth Fellowship, and Midweek Prayer with historical trends and active member metrics.',
    },
  ],
  'wordpress-ph-community': [
    {
      number: '01',
      title: 'Attendee to Volunteer',
      subtitle: 'Growth Journey',
      description: 'Attended meetups in 2025 to learn from web engineers. Stepped forward in 2026 to serve as official volunteer photographer.',
    },
    {
      number: '02',
      title: 'Documenting the Community',
      subtitle: 'Event Photography',
      description: 'Capturing moments, speakers, and discussions across tech gatherings and co-working meetups in Metro Manila.',
    },
    {
      number: '03',
      title: 'Open Source Spirit',
      subtitle: 'Learning in Public',
      description: 'Connecting with local PHP and WordPress engineers, discussing CMS architecture, and staying active in the local ecosystem.',
    },
    {
      number: '04',
      title: 'Giving Back',
      subtitle: 'Service Mindset',
      description: 'Volunteering personal time and skills to support community leaders and welcome first-time attendees.',
    },
  ],
  'wilcon-enterprise-systems': [
    {
      number: '01',
      title: 'Infor M3 ERP APIs',
      subtitle: 'Enterprise Data Integration',
      description: 'Integrating internal business software with Infor M3 ERP APIs for data synchronization and system interoperability at Wilcon Depot.',
    },
    {
      number: '02',
      title: 'Financial Voucher Workflows',
      subtitle: 'Internal Accounting',
      description: 'Developing and maintaining financial voucher processing modules supporting corporate accounting workflows with high precision.',
    },
    {
      number: '03',
      title: 'Full-Stack Enterprise Tools',
      subtitle: 'Laravel & Vue.js',
      description: 'Working alongside senior engineers maintaining high-uptime web modules built with Laravel, Vue.js, and MySQL for business operations.',
    },
  ],
}

const TAB_LABELS: Record<string, string[]> = {
  'woh-attendance-system': ['Admin Management Dashboard', 'On-Site Check-in Kiosk'],
  'wordpress-ph-community': ['Meetup & Tech Gathering', 'Community Co-Working Space'],
  'wilcon-enterprise-systems': ['Workstation & Setup at Wilcon', 'Wilcon Depot Building'],
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const highlights = PROJECT_HIGHLIGHTS[project.slug] || []
  const tabLabels = TAB_LABELS[project.slug] || project.images.map((_, i) => `Preview ${i + 1}`)

  return (
    <article className="min-h-screen p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          &larr; Back to all projects
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-neutral-900 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {project.category}
          </span>
          <span className="text-xs font-mono text-neutral-400">
            {project.year}
          </span>
          {project.slug === 'woh-attendance-system' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live in Production · Since March 2025
            </span>
          )}
          {project.slug === 'wordpress-ph-community' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200">
              2025 Attendee &rarr; 2026 Volunteer
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          {project.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500">
          <div>
            <span className="text-neutral-400">Role: </span>
            <span className="font-semibold text-neutral-800">{project.role}</span>
          </div>
          {project.client && (
            <div>
              <span className="text-neutral-400">Client / Org: </span>
              <span className="font-semibold text-neutral-800">{project.client}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
          {project.description}
        </p>

        {/* Live Link CTAs */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk →' : 'Visit Live Link →'}
            </a>
          )}
          {project.slug === 'woh-attendance-system' && (
            <a
              href="https://wohcaloocan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              Church Website &rarr;
            </a>
          )}
        </div>
      </header>

      {/* Interactive Media Showcase */}
      {project.images.length > 0 && (
        <section className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm">
            {/* Tab switchers if multiple images */}
            {project.images.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 bg-neutral-950 px-4 py-2.5">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedImageIndex === index
                        ? 'bg-yellow-400 text-neutral-950 font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {tabLabels[index] || `Photo ${index + 1}`}
                  </button>
                ))}
              </div>
            )}

            {/* Main Visual Preview */}
            <div className="relative aspect-[16/9] w-full bg-neutral-950 flex items-center justify-center p-2">
              <img
                src={project.images[selectedImageIndex] || project.images[0]}
                alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Scannable Feature Headlines */}
      {highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Key Highlights & Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div
                key={h.number}
                className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-5 transition-all hover:bg-neutral-50"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-bold text-neutral-900">
                    {h.number} · {h.title}
                  </span>
                  <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                    {h.subtitle}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack Pills */}
      {project.tags.length > 0 && (
        <section className="mt-10 border-t border-neutral-200 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1 font-mono text-xs text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
