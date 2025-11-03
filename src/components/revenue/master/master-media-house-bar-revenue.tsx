"use client";

import ReusableLoader from "@/components/shared/reusable-loader";
import Select from "@/components/shared/reusable-select-input";
import { getMasterMediaHouseevenueBarGraphData } from "@/lib/revenue/revenue";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, timeRanges } from "@/utils/utils";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function MasterMediaHouseBarGhraphRevenue() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.revenue.loadinMasterMediaHouseBardata
  );
  const barGraphData = useSelector(
    (state: RootState) => state.revenue.masterMediaHouseBarGraphData
  );
  const [selectedRange, setSelectedRange] = useState<string>(
    timeRanges[2].value
  );
  const fetchMastrMediaHouseBarData = async (range: string) => {
    dispatch(getMasterMediaHouseevenueBarGraphData({ range }));
  };
  useEffect(() => {
    fetchMastrMediaHouseBarData(selectedRange);
  }, [selectedRange]);
  return (
    <div className="mt-6">
      {loading === "pending" ? (
        <ReusableLoader />
      ) : (
        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
         <div className="flex justify-between items-center mb-4">
         <h3 className="text-lg font-semibold text-white ">
            Revenue by Media House
          </h3>
          <Select
              value={selectedRange}
              onChange={setSelectedRange}
              options={timeRanges}
              Icon={Filter}
            />
         </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barGraphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#9ca3af"
                tickFormatter={(value) => `${value / 1000000}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f3f4f6" }}
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Bar dataKey="value" name="Revenue">
                {barGraphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default MasterMediaHouseBarGhraphRevenue;
