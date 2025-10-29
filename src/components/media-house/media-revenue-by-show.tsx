"use client";

import { getMediaRevenueByShow } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, timeFilters } from "@/utils/utils";
import { Filter, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Select from "../shared/reusable-select-input";

function MediaRevenueByShow({ param }: { param: string }) {
  const [activeRange, setActiveRange] = useState(timeFilters[3].value);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.media.loadingRevenueByShow
  );
  const showRevenueData = useSelector(
    (state: RootState) => state.media.mediaRevenueByShow
  );

  const fetchMediaRevenueByShow = async (range: string) => {
    await dispatch(getMediaRevenueByShow({ range: range, id: param }));
  }

  useEffect(() => {
    fetchMediaRevenueByShow(activeRange);
  }, [activeRange]);
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
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Top Performing Shows
              </h3>
              <Select
                onChange={setActiveRange}
                value={activeRange}
                options={timeFilters}
                Icon={Filter}
              />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={showRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  stroke="#9ca3af"
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaRevenueByShow;
