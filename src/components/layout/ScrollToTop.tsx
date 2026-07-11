'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const main = document.querySelector('main')
    if (main) main.scrollTo(0, 0)
  }, [pathname])

  return null
}
