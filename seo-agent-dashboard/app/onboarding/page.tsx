// onboarding/page.tsx
'use client'

import { useMemo, useState } from 'react'
import { formSchema } from '@/lib/formSchema'
import { isVisible } from '@/lib/visibleIf'

type Values = Record<string, any>

export default function OnboardingPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<Values>({})
  const step = formSchema.steps[stepIndex]
  const steps = formSchema.steps

  const visibleFields = useMemo(() => {
    return step.fields.filter(f => isVisible(f, values))
  }, [step, values])

  function updateValue(id: string, val: any) {
    setValues(v => ({ ...v, [id]: val }))
  }

  function canContinue() {
    return visibleFields.every(f => !f.required || !!values[f.id])
  }

  async function submit() {
    console.log('Submit onboarding payload', values)
    alert('Submitted. Webhook to n8n would fire here.')
  }

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Client Onboarding</h1>
        <p className="text-sm text-gray-600">
          Dynamic, industry-aware intake. On submit, your n8n onboarding flow starts.
        </p>
      </header>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          {steps.map((s, idx) => {
            const active = idx === stepIndex
            const complete = idx < stepIndex
            return (
              <div key={s.step} className="flex items-center">
                <div
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                    active ? 'bg-indigo-600 text-white' : complete ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700',
                  ].join(' ')}
                >
                  {idx + 1}
                </div>
                <div className="ml-2 mr-4 text-sm font-medium">{s.name}</div>
                {idx < steps.length - 1 && <div className="mx-2 h-px w-10 bg-gray-300" />}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleFields.map((f: any) => {
            const common = 'w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600'
            return (
              <div key={f.id} className="col-span-1">
                <label className="mb-1 block text-sm font-medium text-gray-800">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>
                {f.type === 'text' && (
                  <input
                    className={common}
                    value={values[f.id] ?? ''}
                    onChange={e => updateValue(f.id, e.target.value)}
                  />
                )}
                {f.type === 'url' && (
                  <input
                    type="url"
                    className={common}
                    placeholder="https://example.com"
                    value={values[f.id] ?? ''}
                    onChange={e => updateValue(f.id, e.target.value)}
                  />
                )}
                {f.type === 'textarea' && (
                  <textarea
                    className={common}
                    rows={4}
                    value={values[f.id] ?? ''}
                    onChange={e => updateValue(f.id, e.target.value)}
                  />
                )}
                {f.type === 'dropdown' && (
                  <select
                    className={common}
                    value={values[f.id] ?? ''}
                    onChange={e => updateValue(f.id, e.target.value)}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {f.options.map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
                {f.type === 'file' && (
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700"
                    onChange={e => updateValue(f.id, e.target.files?.[0]?.name ?? '')}
                  />
                )}
                {f.helperText && <p className="mt-1 text-xs text-gray-500">{f.helperText}</p>}
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStepIndex(i => Math.max(0, i - 1))}
            disabled={stepIndex === 0}
            className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          {stepIndex < steps.length - 1 ? (
            <button
              onClick={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))}
              disabled={!canContinue()}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!canContinue()}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit & Start Flow
            </button>
          )}
        </div>
      </div>
    </div>
  )
}