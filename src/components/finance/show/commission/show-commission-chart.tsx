"use client";

import { formatCurrency } from "@/utils/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function ShowCommissionChart({
  commissionData,
}: {
  commissionData: { level: string; commission: number; color: string }[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-4">
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h3 className="text-xl font-bold text-white mb-4">
            Commission Split
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={commissionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="commission"
              >
                {commissionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {commissionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full`}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-300 text-sm">
                  {item.level}: {formatCurrency(item.commission)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCommissionChart;
