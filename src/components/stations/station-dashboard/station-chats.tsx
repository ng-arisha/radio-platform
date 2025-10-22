"use client";

import { getStationPiedata } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function StationCharts() {
  const dispatch = useDispatch<AppDispatch>();
  const pieData = useSelector(
    (state: RootState) => state.stations.stationPiedata
  );
  const loading = useSelector(
    (state: RootState) => state.stations.loadingPieData
  );

  const params = useParams<{ stationId: string }>();

  useEffect(() => {
    dispatch(getStationPiedata({ id: params.stationId }));
  }, [dispatch, params.stationId]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading pie data...</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">
              Budget Utilization
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300 text-sm font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-white font-bold text-sm">
                    TZs {(item.value / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StationCharts;
