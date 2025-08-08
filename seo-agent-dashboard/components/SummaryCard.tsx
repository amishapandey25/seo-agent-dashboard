export function SummaryCard({
  title,
  value,
  caption,
}: {
  title: string
  value: string | number
  caption?: string
}) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {caption && <div className="mt-1 text-xs text-gray-500">{caption}</div>}
    </div>
  )
}
