export function WorkIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export function AboutIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 14C4 11.7909 5.79086 10 8 10C10.2091 10 12 11.7909 12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function ContactIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 4L8 8L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export function TwitterIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14.5 3.5c-0.5 0.2-1 0.4-1.5 0.5c0.5-0.3 0.9-0.8 1.1-1.4c-0.5 0.3-1 0.5-1.6 0.6c-0.5-0.5-1.1-0.8-1.8-0.8c-1.4 0-2.5 1.1-2.5 2.5c0 0.2 0 0.4 0.1 0.6C5.3 5.3 3.4 4.3 2.1 2.8c-0.2 0.4-0.3 0.8-0.3 1.3c0 0.9 0.4 1.6 1.1 2.1c-0.4 0-0.8-0.1-1.1-0.3c0 0 0 0 0 0c0 1.2 0.9 2.2 2 2.4c-0.2 0.1-0.4 0.1-0.6 0.1c-0.2 0-0.3 0-0.5-0.1c0.3 1 1.2 1.7 2.3 1.7c-0.8 0.7-1.9 1.1-3 1.1c-0.2 0-0.4 0-0.6 0c1.1 0.7 2.4 1.1 3.7 1.1c4.4 0 6.9-3.7 6.9-6.9c0-0.1 0-0.2 0-0.3C13.8 4.5 14.2 4 14.5 3.5z"/>
    </svg>
  )
}

export function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3.5 2.5C3.5 3.3 2.8 4 2 4S0.5 3.3 0.5 2.5S1.2 1 2 1S3.5 1.7 3.5 2.5z"/>
      <path d="M0.5 5.5h3v9h-3V5.5z"/>
      <path d="M5.5 5.5h3v1.2h0c0.4-0.8 1.4-1.5 2.9-1.5c3.1 0 3.7 2 3.7 4.7v4.6h-3v-4.1c0-1.1 0-2.6-1.6-2.6s-1.8 1.3-1.8 2.6v4.1h-3V5.5z"/>
    </svg>
  )
}

export function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6c0.4 0.1 0.5-0.2 0.5-0.4c0-0.2 0-0.7 0-1.3c-2.2 0.5-2.7-1.1-2.7-1.1c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5 0.1-0.5 0.1-0.5c0.8 0.1 1.2 0.8 1.2 0.8c0.7 1.2 1.9 0.9 2.4 0.7c0.1-0.5 0.3-0.9 0.5-1.1c-1.8-0.2-3.7-0.9-3.7-4c0-0.9 0.3-1.6 0.8-2.2C3.7 3.3 3.4 2.4 3.8 1.2c0 0 0.7-0.2 2.2 0.8C6.8 1.8 7.4 1.7 8 1.7s1.2 0.1 1.8 0.3c1.5-1 2.2-0.8 2.2-0.8c0.4 1.2 0.1 2.1 0.1 2.4c0.5 0.6 0.8 1.3 0.8 2.2c0 3.1-1.9 3.8-3.7 4c0.3 0.3 0.5 0.7 0.5 1.4c0 1 0 1.8 0 2.1c0 0.2 0.1 0.5 0.5 0.4C13.7 14.5 16 11.5 16 8C16 3.6 12.4 0 8 0z"/>
    </svg>
  )
}

export function ExternalLinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 3h5v2H5v6h6V9h2v5H3V3z" fill="currentColor"/>
      <path d="M10 3h3v3h-2V4.4L9.7 7.7L8.3 6.3L11.6 3H10V3z" fill="currentColor"/>
    </svg>
  )
}

export function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 5L8 8.5L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
