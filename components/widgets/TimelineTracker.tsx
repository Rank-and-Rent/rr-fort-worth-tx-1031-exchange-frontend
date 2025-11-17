const steps = [
  {
    title: "Day 0: Close relinquished property",
    detail: "Capture final settlement statements, payoff letters, and wire confirmations.",
  },
  {
    title: "Day 1-10: Intake and lender briefs",
    detail: "Distribute the project profile to lenders, QIs, and advisors in North Texas.",
  },
  {
    title: "Day 11-30: Property calls and site vetting",
    detail: "Schedule tours, collect rent rolls, and review credit packages.",
  },
  {
    title: "Day 31-45: Identify",
    detail: "Submit the letter with legal descriptions and delivery confirmation.",
  },
  {
    title: "Day 46-120: PSA and diligence",
    detail: "Negotiate contracts, order inspections, and finalize financing.",
  },
  {
    title: "Day 121-160: Closing prep",
    detail: "Coordinate estoppels, SNDA, and final loan conditions.",
  },
  {
    title: "Day 161-180: Fund replacement",
    detail: "Close and wire funds, then archive every document for compliance.",
  },
];

export default function TimelineTracker() {
  return (
    <section className="rounded-2xl border border-outline bg-secondary/40 p-6 shadow-glow">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-ink/60">Timeline tracker</p>
        <h3 className="text-2xl font-semibold text-heading">From sale to replacement closing</h3>
        <p className="text-sm text-ink/80">Use these checkpoints to keep accountability across your team.</p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-2xl border border-outline/60 bg-panel p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink/60">Step {index + 1}</p>
            <p className="mt-2 text-lg font-semibold text-heading">{step.title}</p>
            <p className="mt-1 text-sm text-ink/70">{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

