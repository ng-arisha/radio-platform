import { LucideIcon } from "lucide-react";

function RevenueStatCard({
  Icon,
  label,
  value,
  color,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export default RevenueStatCard;
