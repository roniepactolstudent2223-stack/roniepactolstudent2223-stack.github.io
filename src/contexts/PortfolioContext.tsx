'use client'

import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import type { Project } from '@/lib/types'
import { filterProjectsByDomain } from '@/lib/portfolio-config'

interface PortfolioContextType {
  projects: Project[]
  filteredProjects: Project[]
  selectedDomain: string | null
  setSelectedDomain: (domain: string | null) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

interface PortfolioProviderProps {
  children: ReactNode
  initialProjects: Project[]
}

export function PortfolioProvider({ children, initialProjects }: PortfolioProviderProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

  const filteredProjects = useMemo(
    () => filterProjectsByDomain(initialProjects, selectedDomain),
    [initialProjects, selectedDomain]
  )

  return (
    <PortfolioContext.Provider
      value={{
        projects: initialProjects,
        filteredProjects,
        selectedDomain,
        setSelectedDomain,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
