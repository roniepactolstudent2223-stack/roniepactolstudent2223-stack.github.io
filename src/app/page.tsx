'use client'

import Masthead from '@/components/home/Masthead'
import FeaturedProject from '@/components/home/FeaturedProject'
import DiscoveryPaths from '@/components/home/DiscoveryPaths'
import ProjectGrid from '@/components/projects/ProjectGrid'
import Footer from '@/components/layout/Footer'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { getWorkDomains, PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

const PLACEHOLDER_IMAGES: Record<string, string> = {
  'design-system-redesign': 'https://picsum.photos/seed/designsystem/800/600',
  'editorial-portfolio': 'https://picsum.photos/seed/editorial/800/600',
  'mobile-banking-app': 'https://picsum.photos/seed/banking/800/600',
}

export default function Home() {
  const { projects, filteredProjects, selectedDomain, setSelectedDomain } = usePortfolio()

  const featured = projects.find((p) => p.slug === PORTFOLIO_IDENTITY.featuredProject.slug)
  const domains = getWorkDomains(projects)

  return (
    <div>
      <MobileNavigation />

      {/* Hero — spacious, large type, editorial energy */}
      <Masthead />

      {/* Featured — dense, full-width, cinematic */}
      {featured && (
        <section className="bg-neutral-50 px-6 py-8">
          <div className="max-w-5xl">
            <FeaturedProject
              project={featured}
              imageUrl={PLACEHOLDER_IMAGES[featured.slug] || `https://picsum.photos/seed/${featured.slug}/800/600`}
            />
          </div>
        </section>
      )}

      {/* Discovery + Projects — spacious → dense */}
      <section id="home" className="px-6 py-10">
        <div className="max-w-4xl">
          <DiscoveryPaths
            domains={domains}
            onSelectDomain={setSelectedDomain}
            activeDomain={selectedDomain}
          />

          <div className="mt-12">
            <div className="mb-6 flex items-baseline justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
                {selectedDomain ? 'Filtered projects' : 'All projects'}
              </p>
              <p className="text-[10px] text-neutral-500">
                {filteredProjects.length} projects
              </p>
            </div>
            <ProjectGrid projects={filteredProjects} />
          </div>
        </div>
      </section>

      {/* Footer — spacious, editorial close */}
      <Footer />
    </div>
  )
}
