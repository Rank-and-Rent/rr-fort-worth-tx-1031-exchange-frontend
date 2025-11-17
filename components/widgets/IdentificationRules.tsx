import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

const rules = [
  {
    title: "Three property rule",
    description: "Name up to three properties of any value. Provide full legal descriptions and keep backups of delivery receipts.",
  },
  {
    title: "Two hundred percent rule",
    description: "Name more than three properties as long as aggregate fair market value stays under 200 percent of the relinquished price.",
  },
  {
    title: "Ninety five percent rule",
    description: "Identify any number of assets and close on at least 95 percent of the total value you listed.",
  },
];

export default function IdentificationRules() {
  return (
    <section className="rounded-2xl border border-outline bg-secondary/40 p-6 shadow-glow">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-ink/60">Identification rules</p>
        <h3 className="text-2xl font-semibold text-heading">Plain English guide for IRS safe harbors</h3>
        <p className="text-sm text-ink/80">
          These rules protect exchange buyers in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. Each option is valid when you follow the written
          delivery requirements outlined by your Qualified Intermediary.
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {rules.map((rule) => (
          <article key={rule.title} className="rounded-2xl border border-outline/60 bg-panel p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{rule.title}</p>
            <p className="mt-2 text-sm text-ink/80">{rule.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

