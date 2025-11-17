"use client";

import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";

type IdentificationInputs = {
  identifiedCount: string;
  identifiedValue: string;
  relinquishedValue: string;
};

const defaultInputs: IdentificationInputs = {
  identifiedCount: "3",
  identifiedValue: "2400000",
  relinquishedValue: "1200000",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

const parseNumber = (value: string) => {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function IdentificationRulesChecker() {
  const [inputs, setInputs] = useState<IdentificationInputs>(defaultInputs);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsCalculating(true);
    const handle = setTimeout(() => setIsCalculating(false), 240);
    return () => clearTimeout(handle);
  }, [JSON.stringify(inputs)]);

  const parsed = useMemo(() => {
    const identifiedCount = Math.round(parseNumber(inputs.identifiedCount));
    const identifiedValue = parseNumber(inputs.identifiedValue);
    const relinquishedValue = Math.max(parseNumber(inputs.relinquishedValue), 1);
    return { identifiedCount, identifiedValue, relinquishedValue };
  }, [inputs]);

  const rules = useMemo(() => {
    const { identifiedCount, identifiedValue, relinquishedValue } = parsed;
    const ninetyFiveThreshold = relinquishedValue * 0.95;
    return [
      {
        key: "three-property",
        name: "3-property rule",
        satisfied: identifiedCount <= 3 && identifiedCount > 0,
        detail:
          "You may identify up to three properties of any value. Identify fewer to stay compliant.",
        hint: `${identifiedCount} properties selected.`,
      },
      {
        key: "two-hundred-percent",
        name: "200% rule",
        satisfied: identifiedValue <= relinquishedValue * 2,
        detail: "Total identified value must not exceed twice the value of relinquished property.",
        hint: `${formatCurrency(identifiedValue)} of ${formatCurrency(relinquishedValue * 2)} allowed.`,
      },
      {
        key: "ninety-five-percent",
        name: "95% rule",
        satisfied: identifiedValue >= ninetyFiveThreshold,
        detail: "If you identify more than three properties, you must acquire at least 95% of the total value.",
        hint: `${formatCurrency(Math.max(0, ninetyFiveThreshold - identifiedValue))} more required to meet 95%.`,
      },
    ];
  }, [parsed]);

  const warnings = rules.filter((rule) => !rule.satisfied);

  const errors = useMemo(() => {
    const map: Partial<Record<keyof IdentificationInputs, string>> = {};
    if (parseNumber(inputs.identifiedCount) <= 0) {
      map.identifiedCount = "Enter at least 1 property.";
    }
    if (parseNumber(inputs.identifiedValue) < 0) {
      map.identifiedValue = "Value must be positive.";
    }
    if (parseNumber(inputs.relinquishedValue) <= 0) {
      map.relinquishedValue = "Enter the relinquished property value.";
    }
    return map;
  }, [inputs]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-black/10 print:border-black print:bg-white print:text-black print:shadow-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#0B3C5D]">
            <ShieldCheckIcon className="h-5 w-5 text-[#C9A227]" aria-hidden />
            Identification Rules
          </div>
          {isCalculating && <p className="text-sm font-semibold text-[#C9A227]">Checking...</p>}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-[#16486C]">Number of properties identified</span>
            <input
              type="number"
              min={1}
              value={inputs.identifiedCount}
              onChange={(event) =>
                setInputs((prev) => ({ ...prev, identifiedCount: event.target.value }))
              }
              className={`w-full rounded-lg border px-4 py-3 text-base font-medium text-[#16486C] shadow-sm focus:border-[#0B3C5D] focus:ring focus:ring-[#C9A227]/40 ${
                errors.identifiedCount ? "border-red-500/70 bg-red-50" : "border-gray-300 bg-white"
              }`}
              aria-invalid={Boolean(errors.identifiedCount)}
            />
            <p className="text-xs text-ink/70">Enter the total properties you plan to identify.</p>
            {errors.identifiedCount && (
              <p className="text-xs font-semibold text-red-600">{errors.identifiedCount}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-[#16486C]">Total identified value</span>
            <input
              type="number"
              min={0}
              value={inputs.identifiedValue}
              onChange={(event) =>
                setInputs((prev) => ({ ...prev, identifiedValue: event.target.value }))
              }
              className={`w-full rounded-lg border px-4 py-3 text-base font-medium text-[#16486C] shadow-sm focus:border-[#0B3C5D] focus:ring focus:ring-[#C9A227]/40 ${
                errors.identifiedValue ? "border-red-500/70 bg-red-50" : "border-gray-300 bg-white"
              }`}
              aria-invalid={Boolean(errors.identifiedValue)}
            />
            <p className="text-xs text-ink/70">Sum of scheduled replacement property contracts.</p>
            {errors.identifiedValue && (
              <p className="text-xs font-semibold text-red-600">{errors.identifiedValue}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-[#16486C]">Relinquished property value</span>
            <input
              type="number"
              min={0}
              value={inputs.relinquishedValue}
              onChange={(event) =>
                setInputs((prev) => ({ ...prev, relinquishedValue: event.target.value }))
              }
              className={`w-full rounded-lg border px-4 py-3 text-base font-medium text-[#16486C] shadow-sm focus:border-[#0B3C5D] focus:ring focus:ring-[#C9A227]/40 ${
                errors.relinquishedValue ? "border-red-500/70 bg-red-50" : "border-gray-300 bg-white"
              }`}
              aria-invalid={Boolean(errors.relinquishedValue)}
            />
            <p className="text-xs text-ink/70">The sale price you are replacing.</p>
            {errors.relinquishedValue && (
              <p className="text-xs font-semibold text-red-600">{errors.relinquishedValue}</p>
            )}
          </label>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-[#0B3C5D]">Rule status</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {rules.map((rule) => (
              <article
                key={rule.key}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-[#0B3C5D]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{rule.name}</p>
                <dt className="mt-2 text-2xl font-semibold text-[#16486C]">
                  {rule.satisfied ? "Met" : "Needs attention"}
                </dt>
                <p className="mt-2 text-sm text-ink/70">{rule.detail}</p>
                <p className="mt-3 text-xs font-semibold text-[#C9A227]">{rule.hint}</p>
              </article>
            ))}
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700">
            <p className="font-semibold">Warnings</p>
            {warnings.map((rule) => (
              <p key={rule.key}>{rule.name} is not satisfied.</p>
            ))}
          </div>
        )}

        {hasErrors && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
            Fix the highlighted fields to see accurate compliance feedback.
          </p>
        )}

        <div className="mt-6 rounded-xl border border-gray-200 bg-white/70 p-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
          These checks are illustrative. Consult your intermediary and tax advisor before identifying replacement
          property lists.
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-[#F7F9FB] p-6 shadow-lg shadow-black/10 print:border-black print:bg-white">
        <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-ink/70">What each rule means</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm text-ink/80">
          <p className="rounded-xl border border-gray-300/70 bg-white/70 p-4">
            <strong className="text-[#16486C]">3-property:</strong> Identify three or fewer properties of any value.
          </p>
          <p className="rounded-xl border border-gray-300/70 bg-white/70 p-4">
            <strong className="text-[#16486C]">200%:</strong> Total identified value can be no more than 200% of the relinquished contract.
          </p>
          <p className="rounded-xl border border-gray-300/70 bg-white/70 p-4">
            <strong className="text-[#16486C]">95%:</strong> If more than three properties are identified, you must acquire 95% of the total value.
          </p>
        </div>
      </div>
    </div>
  );
}

