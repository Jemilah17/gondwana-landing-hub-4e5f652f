import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/minutes")({
  head: () => ({
    meta: [
      { title: "Minutes — Gondwana Governance" },
      {
        name: "description",
        content:
          "Board and committee minutes registry for Gondwana Governance engagements.",
      },
    ],
  }),
  component: MinutesPage,
});

type MinutesEntry = {
  id: string;
  date: string;
  body: string;
  title: string;
  status: "Draft" | "Ratified" | "Circulated";
};

const entries: MinutesEntry[] = [
  {
    id: "GG-2026-014",
    date: "12 Jul 2026",
    body: "Board of Directors",
    title: "Q3 Governance Review & Succession Cadence",
    status: "Ratified",
  },
  {
    id: "GG-2026-013",
    date: "28 Jun 2026",
    body: "Ethics Sub-committee",
    title: "Framework Alignment: Stated Values vs. Operational Reality",
    status: "Circulated",
  },
  {
    id: "GG-2026-012",
    date: "14 Jun 2026",
    body: "Audit & Risk",
    title: "Structural Resilience Assessment — Southern Portfolio",
    status: "Draft",
  },
];

function MinutesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            Registry
          </span>
          <h1 className="font-display text-4xl font-medium leading-tight text-balance md:text-5xl">
            Minutes
          </h1>
          <p className="mt-3 max-w-[56ch] text-sm text-muted-foreground">
            An indexed record of governance deliberations. Filed by body,
            preserved for succession.
          </p>
        </div>
        <button className="hidden shrink-0 rounded-full bg-mineral px-5 py-2.5 text-sm font-medium text-stone-bg ring-1 ring-mineral transition-transform active:scale-[0.98] sm:inline-flex">
          New minute
        </button>
      </div>

      <ul className="divide-y divide-border">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6"
          >
            <div className="w-28 shrink-0">
              <div className="font-display text-lg font-medium">{entry.date}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {entry.id}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-clay">
                {entry.body}
              </div>
              <div className="mt-1 truncate text-base font-medium">
                {entry.title}
              </div>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {entry.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}