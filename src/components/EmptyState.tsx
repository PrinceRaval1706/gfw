export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow">
      <div className="text-lg font-semibold text-gray-900">{title}</div>
      {subtitle && <div className="mt-2 text-gray-600">{subtitle}</div>}
    </div>
  );
}