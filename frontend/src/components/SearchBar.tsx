import { useState } from "react";

export default function SearchBar({
  onSubmit,
  placeholder = "Search items like milk, maggi...",
  defaultValue = "",
  helper = "Tip: try “milk”, “maggi”, “bread”",
}: {
  onSubmit: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  helper?: string;
}) {
  const [q, setQ] = useState(defaultValue);

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="input pl-10"
            onKeyDown={(e) => e.key === "Enter" && onSubmit(q)}
          />
          <div className="mt-2 text-xs text-slate-500">{helper}</div>
        </div>

        <button onClick={() => onSubmit(q)} className="btn btn-primary w-full sm:w-auto">
          Search
        </button>
      </div>
    </div>
  );
}