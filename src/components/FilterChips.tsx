export default function FilterChips({
  openNow,
  inStockOnly,
  setOpenNow,
  setInStockOnly,
}: {
  openNow: boolean;
  inStockOnly: boolean;
  setOpenNow: (v: boolean) => void;
  setInStockOnly: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setOpenNow(!openNow)}
        className={`chip ${openNow ? "chip-on" : "chip-off"}`}
      >
        {openNow ? "✓ Open Now" : "Open Now"}
      </button>

      <button
        onClick={() => setInStockOnly(!inStockOnly)}
        className={`chip ${inStockOnly ? "chip-on" : "chip-off"}`}
      >
        {inStockOnly ? "✓ In Stock" : "In Stock"}
      </button>

      <span className="ml-1 inline-flex items-center text-xs text-slate-500">
        Use filters to narrow results
      </span>
    </div>
  );
}