type StatsCardProps = {
  label: string;
  value: number | string;
};

export default function StatsCard({ label, value }: StatsCardProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-medium text-gray-500">{label}</h2>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>
    </section>
  );
}