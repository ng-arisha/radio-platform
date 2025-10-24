"use client";

import { getMediaHousePieData } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function MediaPieChart() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.media.loadingPieData);
  const pieData = useSelector((state: RootState) => state.media.mediaPieData);
  const params = useParams<{ mediaIdd: string }>();
  useEffect(() => {
    dispatch(getMediaHousePieData({ id: params.mediaIdd }));
  }, [dispatch]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Budget Utilization
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* <div className="flex justify-center mt-4 gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-300">Utilized (65%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-600 rounded mr-2"></div>
                <span className="text-sm text-gray-300">Available (35%)</span>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaPieChart;
