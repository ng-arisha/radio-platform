"use client";

import { activityData } from "@/utils/utils";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ActivitySummary({
  statusData,
}: {
  statusData: { name: string; value: number }[];
}) {
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const filteredActivity =
    activityFilter === "all"
      ? activityData
      : activityData.filter((a) =>
          a.role.toLowerCase().includes(activityFilter.toLowerCase())
        );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

       
      <div className="space-y-6">
        {/* Active vs Inactive */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">User Status</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={statusData} layout="vertical">
              <XAxis
                type="number"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ActivitySummary;
