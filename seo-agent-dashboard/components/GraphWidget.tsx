export function GraphWidget({ title }: { title: string }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="h-48 w-full rounded-md bg-gray-100" />
    </div>
  )
}