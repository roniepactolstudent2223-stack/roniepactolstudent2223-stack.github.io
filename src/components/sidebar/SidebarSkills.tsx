import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

export default function SidebarSkills() {
  return (
    <div>
      <p className="sidebar-currently-label mb-2">Tools &amp; skills</p>
      <div className="flex flex-wrap gap-1.5">
        {PORTFOLIO_IDENTITY.skills.map((skill) => (
          <span key={skill} className="sidebar-skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
