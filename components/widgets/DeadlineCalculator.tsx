'use client';

import { addDays, format } from "date-fns";
import { useMemo, useState } from "react";
import { DATE_LOCALE, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

export default function DeadlineCalculator() {
  const [saleDate, setSaleDate] = useState<string>("");
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const deadlines = useMemo(() => {
    if (!saleDate) return null;
    const base = new Date(saleDate);
    return {
      identification: addDays(base, 45),
      closing: addDays(base, 180),
    };
  }, [saleDate]);

  const formatDateValue = (value: Date) =>
    format(value, "MMMM dd, yyyy", { locale: undefined }) + ` (${timezone})`;

  return (
    <section className="rounded-2xl border border-outline bg-panel p-6 shadow-glow">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-ink/60">Deadline calculator</p>
        <h3 className="text-2xl font-semibold text-heading">45 day and 180 day tracker</h3>
        <p className="text-sm text-ink/80">
          Enter the date you closed on the relinquished property. We show the last day you can deliver an identification letter
          and the last day you can close in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
        </p>
      </header>

      <div className="mt-6 space-y-4">
        <label className="text-sm font-semibold text-heading">
          Closing date
          <input
            type="date"
            className="mt-2 w-full rounded-xl border border-outline bg-secondary/40 px-3 py-2 text-heading focus:border-primary focus:outline-none"
            value={saleDate}
            onChange={(event) => setSaleDate(event.target.value)}
          />
        </label>

        {deadlines ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-outline/50 bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink/60">45 day deadline</p>
              <p className="mt-2 text-lg font-semibold text-heading">{formatDateValue(deadlines.identification)}</p>
              <p className="mt-1 text-sm text-ink/70">Identification letter must be received by your Qualified Intermediary.</p>
            </div>
            <div className="rounded-xl border border-outline/50 bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink/60">180 day deadline</p>
              <p className="mt-2 text-lg font-semibold text-heading">{formatDateValue(deadlines.closing)}</p>
              <p className="mt-1 text-sm text-ink/70">Closing must fund before the clock expires even if the 45th day is met.</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink/70">Pick a date to calculate your deadlines.</p>
        )}
      </div>
    </section>
  );
}

