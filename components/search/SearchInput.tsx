'use client';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
};

export default function SearchInput({ value, onChange, placeholder, label }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.15em] text-primary/70">{label}</label>
      <div className="flex items-center gap-2 border border-outline/60 bg-panel px-4 py-3">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onChange("");
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          aria-label={label}
        />
        {value && (
          <button
            type="button"
            className="text-xs font-medium uppercase tracking-[0.1em] text-accent hover:text-primary"
            onClick={() => onChange("")}
          >
            CLEAR
          </button>
        )}
      </div>
    </div>
  );
}
