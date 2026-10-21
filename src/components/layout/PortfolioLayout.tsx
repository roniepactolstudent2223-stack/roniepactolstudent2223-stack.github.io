'use client'

import LeftSidebar from '@/components/sidebar/LeftSidebar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import DetailPanel from '@/components/layout/DetailPanel'
import { PortfolioProvider } from '@/contexts/PortfolioContext'
import type { Project } from '@/lib/types'

interface PortfolioLayoutProps {
  children: React.ReactNode
  projects: Project[]
}

function PortfolioContent({ children, projects }: Omit<PortfolioLayoutProps, 'projects'> & { projects: Project[] }) {
  return (
    <>
      <ScrollToTop />

      <div className="hidden w-[264px] shrink-0 lg:block">
        <LeftSidebar />
      </div>

      <main className="flex-1 overflow-y-auto lg:border-r border-neutral-200">
        {children}
      </main>

      <div className="hidden w-[360px] shrink-0 overflow-y-auto xl:block">
        <DetailPanel projects={projects} />
      </div>
    </>
  )
}

export default function PortfolioLayout(props: PortfolioLayoutProps) {
  return (
    <PortfolioProvider initialProjects={props.projects}>
      <PortfolioContent projects={props.projects}>{props.children}</PortfolioContent>
    </PortfolioProvider>
  )
}
