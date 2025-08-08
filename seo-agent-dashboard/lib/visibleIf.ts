// lib/visibleIf.ts
export function isVisible(field: any, values: Record<string, any>) {
  const cond = field.visibleIf
  if (!cond) return true
  const [key, expected] = Object.entries(cond)[0] as [string, any]
  const current = values[key]
  return Array.isArray(expected) ? expected.includes(current) : current === expected
}
