'use client'

import { useState } from 'react'

interface CompanyLogoProps {
  company: string
  logoUrl?: string
  size?: number
}

function getInitials(company: string): string {
  return company
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function CompanyLogo({ company, logoUrl, size = 40 }: CompanyLogoProps) {
  const [imgError, setImgError] = useState(false)
  const showLogo = logoUrl && !imgError
  const initials = getInitials(company)

  if (showLogo) {
    return (
      <img
        src={logoUrl}
        alt={`${company} logo`}
        width={size}
        height={size}
        className="rounded-lg object-contain bg-neutral-100"
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg bg-neutral-100 font-mono text-xs font-medium text-neutral-500"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}
