type Row = Record<string, string | number>

export function InsightTable({ title, columns, rows }: { title: string; columns: string[]; rows: Row[] }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold">{title}</div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              {columns.map(col => (
                <th key={col} className="border-b px-3 py-2 font-medium">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="odd:bg-gray-50/50">
                {columns.map(c => (
                  <td key={c} className="px-3 py-2">{String(r[c] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}