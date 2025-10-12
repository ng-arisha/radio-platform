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

        {/* recent activities */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent User Activity</h2>
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="presenter">Presenters</option>
            <option value="station">Station Admins</option>
            <option value="media">Media House Admins</option>
          </select>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: activity.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {activity.name}
                </p>
                <p className="text-xs text-gray-400">{activity.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
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
