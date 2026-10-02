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

export function PhoneIcon({ className = '' }: { className?: string }) {
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
      <path
        d="M2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H5.16667C5.55627 2.5 5.89431 2.76632 5.98634 3.14663L6.59473 5.6591C6.67139 5.97576 6.5574 6.30932 6.3045 6.51034L5.2758 7.32789C6.09633 9.07185 7.50289 10.4784 9.24685 11.2989L10.0644 10.2702C10.2654 10.0173 10.599 9.90335 10.9156 9.98001L13.4281 10.5884C13.8084 10.6804 14.0747 11.0185 14.0747 11.4081V13.0747C14.0747 13.627 13.627 14.0747 13.0747 14.0747C7.23438 14.0747 2.5 9.34036 2.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ViberIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.15 0C5.074 0 0 5.176 0 12.383c0 4.148 1.956 7.643 5.165 9.68v4.148l3.968-2.222c1.004.28 2.062.43 3.15.43 7.076 0 12.15-5.176 12.15-12.383C24.433 5.176 19.226 0 12.15 0zm6.54 15.657c-.244.757-1.393 1.488-2.296 1.63-.615.097-1.417.147-4.143-.984-3.486-1.446-5.753-4.996-5.928-5.23-.175-.233-1.419-1.89-1.419-3.606 0-1.716.897-2.562 1.216-2.912.32-.35.698-.437.93-.437.233 0 .466.002.67.012.215.01.503-.082.787.6.29.7.99 2.417 1.077 2.592.087.175.146.38.03.613-.117.233-.175.38-.35.583-.175.204-.368.455-.526.612-.175.175-.357.365-.153.714.204.35 1.026 1.688 2.21 2.742 1.523 1.356 2.808 1.776 3.208 1.97.4.195.633.163.867-.105.233-.268.992-1.156 1.255-1.553.262-.397.525-.333.882-.204.357.129 2.26 1.066 2.648 1.26.388.194.646.291.741.455.094.164.094.945-.15 1.702z"/>
    </svg>
  )
}

export function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}
