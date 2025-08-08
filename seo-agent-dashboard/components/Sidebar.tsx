// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo } from 'react'
import clsx from 'clsx'

type NavItem = { label: string; href?: string; disabled?: boolean }
type NavSection = { title: string; clickable: boolean; items?: NavItem[] }

const NAV: NavSection[] = [
  {
    title: 'Account Setup',
    clickable: true,
    items: [{ label: 'Onboarding', href: '/onboarding' }],
  },
  {
    title: 'SEO',
    clickable: true,
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Configuration', href: '/configuration' },
      { label: 'Strategy', href: '/strategy' },
      { label: 'Technical Audit', href: '/audit' },
      { label: 'Off Page Calendar', href: '/calendar' },
    ],
  },
  {
    title: 'ABM',
    clickable: false,
    items: [{ label: 'Lead Enrichment', href: '/lead-enrichment' }],
  },
  {
    title: 'Social Media',
    clickable: false,
    items: [],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<Record<string, boolean>>({
    'Account Setup': true,
    'SEO': true,
    'ABM': true,
    'Social Media': true,
  })

  const sectionActive = useMemo(() => {
    const map: Record<string, boolean> = {}
    NAV.forEach(sec => {
      map[sec.title] =
        !!sec.items?.some(i => i.href && pathname.startsWith(i.href))
    })
    return map
  }, [pathname])

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-4">
        <div className="text-lg font-semibold tracking-tight">SEO Engine</div>
        <div className="text-xs text-gray-500">Control & Data</div>
      </div>

      <nav className="flex-1 overflow-auto px-2 pb-6">
        {NAV.map(sec => (
          <div key={sec.title} className="mb-2">
            <button
              type="button"
              className={clsx(
                'flex w-full items-center justify-between rounded-md px-3 py-2 text-left',
                sectionActive[sec.title] ? 'bg-gray-100' : 'hover:bg-gray-50'
              )}
              onClick={() => setOpen(o => ({ ...o, [sec.title]: !o[sec.title] }))}
              aria-label={`${sec.title} section`}
            >
              <span
                className={clsx(
                  'text-xs font-semibold uppercase tracking-wider',
                  sec.clickable ? 'text-gray-800' : 'text-gray-500'
                )}
              >
                {sec.title}
              </span>
              <span className="text-gray-400">{open[sec.title] ? '▾' : '▸'}</span>
            </button>

            {open[sec.title] && !!sec.items?.length && (
              <ul className="mt-1 space-y-1 pl-2">
                {sec.items.map(item => {
                  const active =
                    item.href && (pathname === item.href || pathname.startsWith(item.href))
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={clsx(
                            'block rounded-md px-3 py-2 text-sm',
                            active
                              ? 'bg-indigo-50 font-medium text-indigo-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="block cursor-not-allowed rounded-md px-3 py-2 text-sm text-gray-400">
                          {item.label}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t px-5 py-3 text-xs text-gray-500">
        v0.1 • Next.js + Tailwind
      </div>
    </div>
  )
}