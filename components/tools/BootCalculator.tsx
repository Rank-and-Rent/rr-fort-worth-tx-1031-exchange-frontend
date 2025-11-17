"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";

type BootInputs = {
  relinquished: string;
  replacement: string;
  cashReceived: string;
  oldMortgage: string;
  newMortgage: string;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numericFields: Array<{
  key: keyof BootInputs;
  label: string;
  helper: string;
  placeholder: string;
}> = [
  {
    key: "relinquished",
    label: "Relinquished property value",
    helper: "Sale proceeds that must be replaced to defer gain.",
    placeholder: "1,200,000",
  },
  {
    key: "replacement",
    label: "Replacement property value",
    helper: "The contract price of the property you plan to acquire.",
    placeholder: "1,400,000",
  },
  {
    key: "cashReceived",
    label: "Cash received (boot)",
    helper: "Net cash or non-like-kind debt relief returned at closing.",
    placeholder: "25,000",
  },
  {
    key: "oldMortgage",
    label: "Old mortgage balance",
    helper: "Mortgage your relinquished property carries at closing.",
    placeholder: "950,000",
  },
  {
    key: "newMortgage",
    label: "New mortgage on replacement",
    helper: "Debt assumed on the replacement property.",
    placeholder: "1,000,000",
  },
];

const formatCurrency = (value: number) => formatter.format(value);

const parseNumber = (value: string) => {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const defaultInputs: BootInputs = {
  relinquished: "1200000",
  replacement: "1400000",
  cashReceived: "25000",
  oldMortgage: "950000",
  newMortgage: "1000000",
};

export default function BootCalculator() {
  const [inputs, setInputs] = useState<BootInputs>(defaultInputs);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setIsCalculating(false), 220);
    setIsCalculating(true);
    return () => clearTimeout(handle);
  }, [JSON.stringify(inputs)]);

  const parsedValues = useMemo(() => {
    const parsed = {
      relinquished: parseNumber(inputs.relinquished),
      replacement: parseNumber(inputs.replacement),
      cashReceived: parseNumber(inputs.cashReceived),
      oldMortgage: parseNumber(inputs.oldMortgage),
      newMortgage: parseNumber(inputs.newMortgage),
    };

    const cashBoot = Math.max(0, parsed.cashReceived);
    const mortgageBoot = Math.max(0, parsed.oldMortgage - parsed.newMortgage);
    const totalBoot = cashBoot + mortgageBoot;
    const estimatedTax = totalBoot * 0.2;

    return {
      ...parsed,
      cashBoot,
      mortgageBoot,
      totalBoot,
      estimatedTax,
    };
  }, [inputs]);

  const errors = useMemo(() => {
    const map: Partial<Record<keyof BootInputs, string>> = {};
    numericFields.forEach((field) => {
      const value = parseNumber(inputs[field.key]);
      if (value < 0) {
        map[field.key] = "Enter a positive number.";
      }
    });
    return map;
  }, [inputs]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-black/10 print:border-black print:bg-white print:text-black print:shadow-none">
        <div className="grid gap-6 md:grid-cols-2">
          {numericFields.map((field) => {
            const error = errors[field.key];
            return (
              <label key={field.key} className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-sm font-semibold text-[#0B3C5D]">
                  {field.label}
                  <InformationCircleIcon className="h-4 w-4 text-[#C9A227]" aria-hidden />
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder={field.placeholder}
                  value={inputs[field.key]}
                  onChange={(event) =>
                    setInputs((prev) => ({ ...prev, [field.key]: event.target.value }))
                  }
                  className={`w-full rounded-lg border px-4 py-3 text-base font-medium text-[#16486C] shadow-sm outline-none focus:border-[#0B3C5D] focus:ring focus:ring-[#C9A227]/40 ${
                    error ? "border-red-500/70 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                  aria-invalid={Boolean(error)}
                />
                <p className="text-xs text-ink/70">{field.helper}</p>
                {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
              </label>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-[#F7F9FB] p-6 shadow-lg shadow-black/10 print:border-black print:bg-white print:text-black">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0B3C5D]">Boot Breakdown</h3>
          {isCalculating && (
            <p className="text-sm font-semibold text-[#C9A227]">Calculating...</p>
          )}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Cash Boot</p>
            <p className="mt-2 text-2xl font-semibold text-[#0B3C5D]">
              {formatCurrency(parsedValues.cashBoot)}
            </p>
            <p className="mt-1 text-sm text-ink/70">Amounts of cash or non like-kind proceeds.</p>
          </article>
          <article className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Mortgage Boot</p>
            <p className="mt-2 text-2xl font-semibold text-[#0B3C5D]">
              {formatCurrency(parsedValues.mortgageBoot)}
            </p>
            <p className="mt-1 text-sm text-ink/70">Old debt minus new debt assumed.</p>
          </article>
          <article className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Total Boot</p>
            <p className="mt-2 text-2xl font-semibold text-[#0B3C5D]">
              {formatCurrency(parsedValues.totalBoot)}
            </p>
            <p className="mt-1 text-sm text-ink/70">
              {`Estimated tax:* ${formatCurrency(parsedValues.estimatedTax)} (20% illustrative rate)`}
            </p>
          </article>
        </div>

        {hasErrors && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50/70 px-4 py-3 text-sm text-red-700">
            Correct highlighted fields to see trusted totals.
          </p>
        )}

        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-ink/70">
            Boot explanations
          </h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-ink/80">
              <p className="font-semibold text-[#16486C]">Cash Boot</p>
              <p>Cash, equity, or property received that is not replacement property.</p>
            </div>
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-ink/80">
              <p className="font-semibold text-[#16486C]">Mortgage Boot</p>
              <p>Occurs when debt relief (old &gt; new) is returned to the exchanger.</p>
            </div>
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-ink/80">
              <p className="font-semibold text-[#16486C]">Total Boot</p>
              <p>IRS treats all boot as taxable unless offset or funded with additional value.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white/70 p-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink/70 print:text-black">
          Results are illustrative and assume a 20% tax rate. Consult a qualified intermediary and tax
          advisor before acting.
        </div>
      </div>
    </div>
  );
}

