'use client';

import { useMemo, useState } from "react";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

export default function IdentificationLetterHelper() {
  const [taxpayer, setTaxpayer] = useState("");
  const [intermediary, setIntermediary] = useState("");
  const [rule, setRule] = useState("Three property rule");
  const [properties, setProperties] = useState("");
  const [copied, setCopied] = useState(false);

  const letter = useMemo(() => {
    const today = new Date().toLocaleDateString("en-US");
    const propertyList = properties
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => `${index + 1}. ${line}`)
      .join("\n");

    return [
      today,
      "",
      `${intermediary || "[Qualified Intermediary Name]"}`,
      "Attn: Exchange Department",
      "",
      "Re: Identification of Replacement Property",
      "",
      `Taxpayer: ${taxpayer || "[Taxpayer Name]"}`,
      `Rule: ${rule}`,
      "",
      "Identified Properties:",
      propertyList || "1. [Property legal description, street address, city, state, zip]",
      "",
      `All properties are intended for acquisition within the 180 day deadline. Please confirm receipt for your records in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    ].join("\n");
  }, [intermediary, properties, rule, taxpayer]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-2xl border border-outline bg-panel p-6 shadow-glow">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-ink/60">Identification helper</p>
        <h3 className="text-2xl font-semibold text-heading">Draft a compliant letter fast</h3>
        <p className="text-sm text-ink/80">
          Fill in the blanks and paste this into your email or secure QI upload. Always confirm delivery by the 45th day.
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          <Input
            label="Taxpayer name"
            value={taxpayer}
            onChange={setTaxpayer}
            placeholder="Example: Lone Star Holdings LLC"
          />
          <Input
            label="Qualified Intermediary"
            value={intermediary}
            onChange={setIntermediary}
            placeholder="Example: QI Services Inc."
          />
          <label className="text-sm font-semibold text-heading">
            Rule
            <select
              className="mt-2 w-full rounded-xl border border-outline bg-secondary/40 px-3 py-2 text-sm text-heading focus:border-primary focus:outline-none"
              value={rule}
              onChange={(event) => setRule(event.target.value)}
            >
              <option>Three property rule</option>
              <option>Two hundred percent rule</option>
              <option>Ninety five percent rule</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-heading">
            Properties (one per line)
            <textarea
              className="mt-2 min-h-[140px] w-full rounded-xl border border-outline bg-secondary/40 px-3 py-2 text-sm text-heading focus:border-primary focus:outline-none"
              value={properties}
              onChange={(event) => setProperties(event.target.value)}
              placeholder={`123 Retail Way, Fort Worth, TX 76102\nABC Medical Plaza, Fort Worth, TX 76104`}
            />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-heading">
            Letter preview
            <textarea
              readOnly
              value={letter}
              className="mt-2 h-[300px] w-full rounded-2xl border border-outline bg-paper/70 p-4 font-mono text-xs text-heading"
            />
          </label>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary hover:bg-primary hover:text-primaryfg"
          >
            {copied ? "Copied" : "Copy letter"}
          </button>
        </div>
      </div>
    </section>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function Input({ label, value, onChange, placeholder }: InputProps) {
  return (
    <label className="text-sm font-semibold text-heading">
      {label}
      <input
        className="mt-2 w-full rounded-xl border border-outline bg-secondary/40 px-3 py-2 text-sm text-heading focus:border-primary focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

