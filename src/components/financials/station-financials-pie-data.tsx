"use client";

import { getStationFinancialPieData } from "@/lib/finance/finance";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function StationFinancialsPiedata() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ stationId: string }>();
  const loading = useSelector((state: RootState) => state.finance.loading);
  const pieData = useSelector(
    (state: RootState) => state.finance.stationFinancialPieData
  );

  useEffect(() => {
    dispatch(getStationFinancialPieData({ id: params.stationId }));
  }, [dispatch, params.stationId]);

  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Budget Allocation
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
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
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-gray-400">
                    ${item.value.toLocaleString()}
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

export default StationFinancialsPiedata;
