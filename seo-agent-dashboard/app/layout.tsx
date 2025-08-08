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
