import React, { useMemo, useState } from "react";

/**
 * SEO Analytics Dashboard – Single-file React app
 * - Single sidebar (30%) with grouped nav items
 * - Main panel (70%) with module views
 * - "ABM" and "Social Media" are non-clickable group headers
 * - Under SEO, each item is a route target including "Dashboard"
 * - Onboarding view renders a Typeform-like, JSON-driven form with dynamic visibility
 * - No naming conflicts: one SidebarNavigation component used across the app
 * - TailwindCSS classes assumed to be available by host environment
 */

// -----------------------------
// Nav model
// -----------------------------
const NAV = [
  {
    type: "group",
    label: "Account Setup",
    items: [
      { key: "onboarding", label: "Onboarding", icon: "📝" },
    ],
  },
  {
    type: "group",
    label: "SEO",
    items: [
      { key: "seo/configuration", label: "Configuration", icon: "⚙️" },
      { key: "seo/strategy", label: "Strategy", icon: "🧭" },
      { key: "seo/technical-audit", label: "Technical Audit", icon: "🔍" },
      { key: "seo/off-page-calendar", label: "Off Page Calendar", icon: "📅" },
      { key: "seo/dashboard", label: "Dashboard", icon: "📊" },
    ],
  },
  { type: "header", label: "ABM" },
  {
    type: "group",
    label: " ", // spacer group so we can keep consistent rendering
    items: [{ key: "abm/lead-enrichment", label: "Lead Enrichment", icon: "👤" }],
  },
  { type: "header", label: "Social Media" },
];

// -----------------------------
// Onboarding JSON schema (simplified)
// -----------------------------
const onboardingSchema = {
  steps: [
    {
      step: 1,
      name: "Organization Info",
      fields: [
        {
          id: "industry",
          label: "Industry",
          type: "dropdown",
          required: true,
          helperText: "Select your industry",
          options: [
            "D2C",
            "SaaS",
            "EdTech",
            "Real Estate",
            "Insurance",
            "B2B Services",
          ],
        },
        {
          id: "company_name",
          label: "Company Name",
          type: "text",
          required: true,
          helperText: "Full legal name of your company",
        },
        {
          id: "website_url",
          label: "Website URL",
          type: "url",
          required: true,
          helperText: "e.g., https://brand.com",
        },
        {
          id: "hq_location",
          label: "Headquarters Location",
          type: "text",
          required: false,
          helperText: "City & Country",
        },
        {
          id: "description",
          label: "Company Description",
          type: "textarea",
          required: false,
          helperText: "Short description of what you do",
        },
      ],
    },
    {
      step: 2,
      name: "Content Inventory (Dynamic)",
      fields: [
        {
          id: "product_catalog",
          label: "Product Catalog Upload",
          type: "file",
          required: true,
          helperText: "Upload CSV with SKU, Name, Category, URL, Description",
          visibleIf: { industry: "D2C" },
        },
        {
          id: "marketplace_listings",
          label: "Marketplace Listings",
          type: "file",
          required: false,
          helperText: "Upload marketplace CSV (Amazon, Flipkart, etc.)",
          visibleIf: { industry: "D2C" },
        },
        {
          id: "programs_courses",
          label: "Programs / Courses",
          type: "file",
          required: true,
          helperText: "Upload CSV of academic programs/courses",
          visibleIf: { industry: "EdTech" },
        },
        {
          id: "features_modules",
          label: "Features / Modules",
          type: "textarea",
          required: true,
          helperText: "List features of your platform or app",
          visibleIf: { industry: ["SaaS", "EdTech"] },
        },
        {
          id: "service_list",
          label: "Service List",
          type: "file",
          required: true,
          helperText: "Upload CSV of services you offer (Name, Desc, URL)",
          visibleIf: { industry: ["B2B Services", "Insurance"] },
        },
        {
          id: "service_areas",
          label: "Service Areas",
          type: "textarea",
          required: true,
          helperText: "List of cities/regions you operate in",
          visibleIf: { industry: ["Real Estate", "Insurance"] },
        },
        {
          id: "case_studies",
          label: "Case Studies / Portfolio",
          type: "textarea",
          required: false,
          helperText: "Links to case studies or notable clients",
          visibleIf: { industry: ["SaaS", "B2B Services"] },
        },
      ],
    },
  ],
};

// -----------------------------
// Utilities
// -----------------------------
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function isVisible(field, values) {
  const cond = field.visibleIf;
  if (!cond) return true;
  const [key, expected] = Object.entries(cond)[0];
  const v = values[key];
  if (Array.isArray(expected)) return expected.includes(v);
  return v === expected;
}

// -----------------------------
// Sidebar
// -----------------------------
function SidebarNavigation({ current, onSelect }) {
  return (
    <aside className="w-[28%] xl:w-[30%] min-w-[280px] max-w-[360px] h-full border-r bg-white/80 backdrop-blur-sm">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold tracking-tight">SEO Analytics</h1>
        <p className="text-sm text-gray-500">Agentic Control & Insights</p>
      </div>

      <nav className="p-3 space-y-4">
        {NAV.map((block, idx) => {
          if (block.type === "header") {
            return (
              <div key={idx} className="px-2 pt-2 text-xs font-semibold uppercase text-gray-500">
                {block.label}
              </div>
            );
          }
          if (block.type === "group") {
            return (
              <div key={idx} className="space-y-1">
                {block.label.trim() && (
                  <div className="px-2 text-[13px] font-medium text-gray-700">{block.label}</div>
                )}
                <ul className="mt-1">
                  {block.items.map((item) => {
                    const active = current === item.key;
                    return (
                      <li key={item.key}>
                        <button
                          onClick={() => onSelect(item.key)}
                          className={classNames(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                            active
                              ? "bg-gray-900 text-white"
                              : "hover:bg-gray-100 text-gray-800"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="text-base leading-none">{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </nav>
    </aside>
  );
}

// -----------------------------
// Main Views
// -----------------------------
function DashboardView() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">SEO Dashboard</h2>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm">Run Audit</button>
          <button className="px-3 py-2 rounded-lg border text-sm">Generate Brief</button>
        </div>
      </header>

      {/* KPI cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Clicks (GSC)", value: "124,560" },
          { label: "Avg CTR", value: "2.8%" },
          { label: "Indexed Pages", value: "6,214" },
          { label: "Open Issues", value: "27" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border p-4">
            <div className="text-xs text-gray-500">{c.label}</div>
            <div className="text-xl font-semibold">{c.value}</div>
          </div>
        ))}
      </section>

      {/* Charts placeholders */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4 h-60 flex items-center justify-center text-gray-500">GSC Traffic (chart)</div>
        <div className="rounded-xl border p-4 h-60 flex items-center justify-center text-gray-500">GA4 Conversions (chart)</div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border overflow-hidden">
          <div className="p-4 border-b font-medium">Audit Queue</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Severity</th>
                <th className="text-left p-3">URL</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "CWV: LCP", sev: "High", url: "/blog/cloud-migration", status: "Open" },
                { type: "404", sev: "Medium", url: "/careers/qa", status: "Queued" },
                { type: "Redirect Chain", sev: "Low", url: "/pricing", status: "Open" },
              ].map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{r.type}</td>
                  <td className="p-3">{r.sev}</td>
                  <td className="p-3 text-blue-600">{r.url}</td>
                  <td className="p-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border overflow-hidden">
          <div className="p-4 border-b font-medium">Brief Pipeline</div>
          <ul className="p-3 space-y-2 text-sm">
            <li className="p-3 rounded-lg bg-gray-50">Security posture for fintech SaaS — <span className="text-gray-600">Draft</span></li>
            <li className="p-3 rounded-lg bg-gray-50">Cloud costs explainer — <span className="text-gray-600">In Review</span></li>
            <li className="p-3 rounded-lg bg-gray-50">Vendor risk checklist — <span className="text-gray-600">Final</span></li>
          </ul>
        </div>
      </section>

      <section className="rounded-xl border overflow-hidden">
        <div className="p-4 border-b font-medium">Recent Actions</div>
        <ul className="p-4 space-y-2 text-sm text-gray-700">
          <li>Slack: Weekly digest sent to outreach team</li>
          <li>Ops_Log: Technical audit started for 1,120 URLs</li>
          <li>CMS: Auto-published 2 articles to WordPress</li>
        </ul>
      </section>
    </div>
  );
}

function PlaceholderView({ title, description }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="mt-6 rounded-xl border p-6 text-gray-500">Module UI to be implemented.</div>
    </div>
  );
}

function OnboardingView() {
  const [values, setValues] = useState({});
  const [stepIndex, setStepIndex] = useState(0);

  const step = onboardingSchema.steps[stepIndex];
  const atFirst = stepIndex === 0;
  const atLast = stepIndex === onboardingSchema.steps.length - 1;

  const visibleFields = useMemo(() => {
    return step.fields.filter((f) => isVisible(f, values));
  }, [step, values]);

  const setValue = (id, v) => setValues((prev) => ({ ...prev, [id]: v }));

  const submit = () => {
    // This is where you would POST to the webhook that triggers n8n onboarding handler
    console.log("Onboarding submitted", values);
    alert("Submitted. Master flow will start from the webhook.");
  };

  return (
    <div className="p-6">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold">Client Onboarding – Start SEO Engine</h2>
        <p className="text-gray-600">Dynamic form that adapts to the selected industry.</p>
      </header>

      <div className="mb-4 flex items-center gap-2">
        {onboardingSchema.steps.map((s, i) => (
          <div
            key={s.step}
            className={classNames(
              "px-3 py-1 rounded-full text-sm border",
              i === stepIndex ? "bg-gray-900 text-white border-gray-900" : "bg-white"
            )}
          >
            {s.name}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {visibleFields.map((f) => (
          <Field key={f.id} field={f} value={values[f.id]} onChange={(v) => setValue(f.id, v)} />
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          disabled={atFirst}
        >
          Back
        </button>
        {atLast ? (
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white" onClick={submit}>
            Submit & Start Flow
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-lg bg-gray-900 text-white"
            onClick={() => setStepIndex((i) => Math.min(onboardingSchema.steps.length - 1, i + 1))}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ field, value, onChange }) {
  const base = "w-full rounded-lg border px-3 py-2";
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{field.label}{field.required && <span className="text-red-500"> *</span>}</label>
      {field.type === "text" && (
        <input className={base} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "url" && (
        <input type="url" className={base} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="https://" />
      )}
      {field.type === "textarea" && (
        <textarea className={classNames(base, "min-h-[96px]")} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "dropdown" && (
        <select className={base} value={value || ""} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>
            Select
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      {field.type === "file" && (
        <input type="file" className={base} onChange={(e) => onChange(e.target.files?.[0] || null)} />
      )}
      {field.helperText && <div className="text-xs text-gray-500">{field.helperText}</div>}
    </div>
  );
}

// -----------------------------
// Router
// -----------------------------
function MainRouter({ routeKey }) {
  switch (routeKey) {
    case "onboarding":
      return <OnboardingView />;
    case "seo/configuration":
      return (
        <PlaceholderView
          title="SEO – Configuration"
          description="Manage crawl settings, content sources, and environment keys."
        />
      );
    case "seo/strategy":
      return (
        <PlaceholderView
          title="SEO – Strategy"
          description="North-star goals, topic clusters, and prioritization logic."
        />
      );
    case "seo/technical-audit":
      return (
        <PlaceholderView
          title="SEO – Technical Audit"
          description="Live audit queue, severity scoring, and fix suggestions."
        />
      );
    case "seo/off-page-calendar":
      return (
        <PlaceholderView
          title="SEO – Off Page Calendar"
          description="Backlink sprints, outreach windows, and content syndication."
        />
      );
    case "seo/dashboard":
      return <DashboardView />;
    case "abm/lead-enrichment":
      return (
        <PlaceholderView
          title="ABM – Lead Enrichment"
          description="Upload CRM extracts, enrich via Clearbit/DataforSEO, and score."
        />
      );
    default:
      return <DashboardView />;
  }
}

// -----------------------------
// App Shell
// -----------------------------
export default function SeoAnalyticsApp() {
  const [route, setRoute] = useState("seo/dashboard");
  return (
    <div className="h-screen w-full flex bg-gray-50 text-gray-900">
      <SidebarNavigation current={route} onSelect={setRoute} />
      <main className="flex-1 overflow-auto">
        <div className="h-full max-w-6xl mx-auto">
          <MainRouter routeKey={route} />
        </div>
      </main>
    </div>
  );
}
