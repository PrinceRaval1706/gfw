export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-14 text-gray-700">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        <span>{label}</span>
      </div>
    </div>
  );
}