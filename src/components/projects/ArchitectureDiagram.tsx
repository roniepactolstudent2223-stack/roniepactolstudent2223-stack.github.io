'use client'

import { useState } from 'react'

export interface ArchitectureNode {
  id: string
  title: string
  subtitle: string
  category: 'source' | 'backend' | 'database' | 'client' | 'qa'
  tech: string[]
  description: string
  specifications: { label: string; value: string }[]
}

const WOH_ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'church-website',
    title: 'Church Website & Member DB',
    subtitle: 'Source of Truth',
    category: 'source',
    tech: ['WordPress / CMS', 'Member DB', 'HTTPS'],
    description: 'Word of Hope Caloocan maintains its primary member registration on wohcaloocan.org. Instead of duplicate data entry, our attendance system queries this source directly.',
    specifications: [
      { label: 'Integration Protocol', value: 'REST API via HTTPS' },
      { label: 'Authentication', value: 'Bearer Token / HMAC Signature' },
      { label: 'Data Exchanged', value: 'Member UUID, Full Name, Ministry, Status' },
      { label: 'Sync Strategy', value: 'Incremental Delta Polling & Webhooks' },
    ],
  },
  {
    id: 'laravel-core',
    title: 'Laravel Backend Core',
    subtitle: 'Business & Validation Logic',
    category: 'backend',
    tech: ['Laravel', 'PHP', 'Eloquent ORM', 'REST Controller'],
    description: 'The central engine handling verification, duplicate scan prevention, pastoral absentee alerting, and service session scheduling.',
    specifications: [
      { label: 'Architecture Pattern', value: 'MVC with Service Layer & DTOs' },
      { label: 'Session Management', value: 'Auto-detect active Sunday / Midweek service' },
      { label: 'Deduplication Rule', value: 'Unique (member_id, service_id, date) constraint' },
      { label: 'Absentee Engine', value: 'Flags members missing 2+ consecutive weeks' },
    ],
  },
  {
    id: 'mysql-db',
    title: 'MySQL Relational Database',
    subtitle: 'Indexed High-Speed Storage',
    category: 'database',
    tech: ['MySQL', 'InnoDB', 'B-Tree Indexes', 'Transactions'],
    description: 'Optimized schema structured to handle rapid check-in spikes when hundreds of attendees scan their badges prior to worship service.',
    specifications: [
      { label: 'Primary Tables', value: 'members, service_sessions, attendance_logs' },
      { label: 'Key Indexes', value: 'INDEX(qr_code_hash), INDEX(scanned_at)' },
      { label: 'Transaction Safety', value: 'ACID Transactions on multi-table log updates' },
      { label: 'Query Performance', value: 'Sub-50ms attendance logging latency' },
    ],
  },
  {
    id: 'vue-kiosk',
    title: 'Vue.js Kiosk & Live Dashboard',
    subtitle: 'Client Check-in & Analytics',
    category: 'client',
    tech: ['Vue.js', 'HTML5 Camera QR', 'Tailwind CSS', 'Vite'],
    description: 'Runs on touch kiosks at the church entrance. Camera decodes QR codes locally in the browser and flashes instant feedback in under 1.2 seconds.',
    specifications: [
      { label: 'QR Processing', value: 'Client-side camera canvas decoding (Zero server upload lag)' },
      { label: 'User Feedback', value: 'Audible chime + Green visual card confirmation' },
      { label: 'Live Metrics', value: 'Real-time service attendance count for coordinators' },
      { label: 'Network Resilience', value: 'Offline cache queue with auto-retry on reconnect' },
    ],
  },
]

const WILCON_ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'infor-m3',
    title: 'Infor M3 ERP Master Core',
    subtitle: 'Enterprise Retail Core',
    category: 'source',
    tech: ['Infor M3 APIs', 'SOAP / REST', 'Corporate Ledger'],
    description: 'Wilcon Depot\'s nationwide corporate ERP managing merchandise catalogs, vendor ledger accounts, and retail branch master records.',
    specifications: [
      { label: 'Integration Role', value: 'Enterprise Master Data Synchronization' },
      { label: 'Data Boundaries', value: 'Vendor IDs, Purchase Orders, GL Accounts' },
      { label: 'Security Context', value: 'Corporate VPN & Authorized API Gateway' },
    ],
  },
  {
    id: 'laravel-enterprise',
    title: 'Laravel Enterprise Service Layer',
    subtitle: 'Voucher & Business Rules Engine',
    category: 'backend',
    tech: ['Laravel', 'PHP', 'BCMath Precision', 'Middleware'],
    description: 'Internal business portal built to automate complex financial voucher processing workflows with strict mathematical and financial precision.',
    specifications: [
      { label: 'Financial Precision', value: 'Manual logic with exact decimal calculation' },
      { label: 'Workflow States', value: 'Draft → Pending Audit → Approved → Released' },
      { label: 'Audit Trail', value: 'Immutable logs recording user, action, and timestamp' },
      { label: 'AI Independence', value: '100% hand-authored, verified deterministic code' },
    ],
  },
  {
    id: 'mysql-audit',
    title: 'MySQL Enterprise DB',
    subtitle: 'Normalized Transaction Tables',
    category: 'database',
    tech: ['MySQL', 'InnoDB', 'Foreign Constraints', 'Row Locking'],
    description: 'Normalized corporate schema tracking every voucher line item, approval history, and ERP sync status.',
    specifications: [
      { label: 'Schema Design', value: '3NF Normalized relational tables' },
      { label: 'Concurrency', value: 'Row-level locking during voucher approval' },
      { label: 'Integrity', value: 'Foreign key constraints preventing orphan records' },
    ],
  },
  {
    id: 'vue-portal',
    title: 'Vue.js Internal Web Portal',
    subtitle: 'Accounting & Operations UI',
    category: 'client',
    tech: ['Vue.js', 'Reactive Data Tables', 'RBAC UI Controls'],
    description: 'Corporate interface used by accounting officers and managers to review vouchers, filter records, and approve operational budgets.',
    specifications: [
      { label: 'UI Patterns', value: 'Fast search, multi-column sorting, batch review' },
      { label: 'Access Control', value: 'Role-based UI permission segmentation' },
      { label: 'Error Handling', value: 'Inline validation feedback with clear error states' },
    ],
  },
  {
    id: 'qa-pipeline',
    title: 'SA & QA Validation Pipeline',
    subtitle: 'Quality & Liability Testing',
    category: 'qa',
    tech: ['System Analysts', 'QA Collaboration', 'Test Cases'],
    description: 'Direct daily collaboration with System Analysts and Quality Assurance testers to validate requirements and eliminate edge cases prior to deployment.',
    specifications: [
      { label: 'Verification', value: 'Edge-case boundary testing on accounting workflows' },
      { label: 'Collaboration', value: 'Daily syncs with System Analysts and QA leads' },
      { label: 'Reliability', value: 'High uptime requirement across retail operations' },
    ],
  },
]

const PROJECT_NODES: Record<string, ArchitectureNode[]> = {
  'woh-attendance-system': WOH_ARCHITECTURE_NODES,
  'wilcon-enterprise-systems': WILCON_ARCHITECTURE_NODES,
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  source: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  backend: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
  database: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  client: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  qa: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
}

export default function ArchitectureDiagram({ slug }: { slug: string }) {
  const nodes = PROJECT_NODES[slug]
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes ? nodes[0]?.id : '')

  if (!nodes || nodes.length === 0) return null

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0]
  const colors = CATEGORY_COLORS[activeNode.category] || CATEGORY_COLORS.backend

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-semibold">
              Technical Architecture & System Flow
            </p>
          </div>
          <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
            Interactive Multi-Tier Flow Visualizer
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Click any system stage below to inspect the data contracts, protocols, and architectural rationale.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-mono text-neutral-600">
          {nodes.length} Architecture Nodes
        </span>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.map((node, index) => {
            const isSelected = activeNode.id === node.id
            const nodeCategory = CATEGORY_COLORS[node.category]

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 hover:border-neutral-300 text-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-neutral-800 text-neutral-300'
                        : `${nodeCategory.bg} ${nodeCategory.text}`
                    }`}
                  >
                    Stage 0{index + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isSelected ? 'text-neutral-400' : 'text-neutral-400'
                    }`}
                  >
                    {node.category}
                  </span>
                </div>

                <p className="text-xs font-bold leading-snug line-clamp-1">
                  {node.title}
                </p>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {node.subtitle}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {node.tech.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-white border border-neutral-200 text-neutral-600'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  {node.tech.length > 2 && (
                    <span
                      className={`text-[9px] font-mono px-1 py-0.5 ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-400'
                      }`}
                    >
                      +{node.tech.length - 2}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Deep-Dive Inspection Panel */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50/80 p-5 sm:p-6 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
              {activeNode.category} Layer · Detailed Inspection
            </span>
            <h4 className="mt-2 text-base sm:text-lg font-bold text-neutral-900">
              {activeNode.title}
            </h4>
            <p className="text-xs text-neutral-500">{activeNode.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeNode.tech.map((t) => (
              <span key={t} className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-[11px] font-mono font-medium text-neutral-800">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-neutral-700">
          {activeNode.description}
        </p>

        {/* Technical Specifications */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeNode.specifications.map((spec) => (
            <div key={spec.label} className="rounded-lg border border-neutral-200 bg-white p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                {spec.label}
              </span>
              <span className="mt-1 block text-xs font-semibold text-neutral-900">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
