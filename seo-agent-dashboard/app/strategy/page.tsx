// layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'SEO Analytics Dashboard',
  description: 'Agentic SEO engine control + data UI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden antialiased text-gray-900">
        <div className="flex h-full">
          <aside className="basis-[30%] max-w-[420px] min-w-[280px] border-r bg-white">
            <Sidebar />
          </aside>
          <main className="basis-[70%] overflow-auto bg-gray-50">
            <div className="mx-auto max-w-6xl p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}

// dashboard/page.tsx
import { SummaryCard } from '@/components/SummaryCard'
import { GraphWidget } from '@/components/GraphWidget'
import { InsightTable } from '@/components/InsightTable'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">SEO Dashboard</h1>
        <p className="text-sm text-gray-600">Snapshot of traffic, coverage, rankings, and operational queue.</p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard title="Total Clicks (GSC, 28d)" value="124,219" caption="+8% vs prev" />
        <SummaryCard title="Avg CTR (28d)" value="3.7%" caption="+0.2pp vs prev" />
        <SummaryCard title="Indexed Pages" value="12,406" caption="Coverage healthy" />
        <SummaryCard title="Open Issues" value="37" caption="12 P1, 15 P2, 10 P3" />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <GraphWidget title="GSC Clicks & Impressions (28d)" />
        <GraphWidget title="GA4 Conversions (28d)" />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InsightTable
          title="Audit Queue (Unresolved)"
          columns={["URL", "Type", "Severity", "First Seen"]}
          rows={[
            { URL: '/pricing', Type: 'LCP > 4s', Severity: 'P1', 'First Seen': '2025-07-20' },
            { URL: '/blog/x', Type: '404', Severity: 'P1', 'First Seen': '2025-07-29' },
            { URL: '/collections', Type: 'Duplicate title', Severity: 'P2', 'First Seen': '2025-08-02' },
          ]}
        />
        <InsightTable
          title="Brief Pipeline"
          columns={["Title", "Stage", "Owner", "ETA"]}
          rows={[
            { Title: 'Cluster: commuter benefits', Stage: 'Draft', Owner: 'Strategist', ETA: 'Aug 12' },
            { Title: 'EV shuttle FAQ', Stage: 'Review', Owner: 'Editor', ETA: 'Aug 10' },
          ]}
        />
      </section>

      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">Triggers</div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Run Technical Audit
          </button>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Generate Strategy Brief
          </button>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Crawl Now
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">Wire these to n8n webhooks when you’re ready.</p>
      </section>
    </div>
  )
}

// configuration/page.tsx
export default function ConfigurationPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Configuration</h1>
      <p className="mt-2 text-gray-600">Keys, thresholds, and routing to GA/GSC/BigQuery. (Stub)</p>
    </div>
  )
}

// strategy/page.tsx
export default function StrategyPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Strategy</h1>
      <p className="mt-2 text-gray-600">Clusters, briefs, prioritization logic. (Stub)</p>
    </div>
  )
}