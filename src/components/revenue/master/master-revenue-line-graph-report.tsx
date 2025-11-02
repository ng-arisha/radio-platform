"use client";

import ReusableLoader from "@/components/shared/reusable-loader";
import Select from "@/components/shared/reusable-select-input";
import { getMasterLineRevenueData } from "@/lib/revenue/revenue";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const timeRanges = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
];

function MasterrevenueLineGraphReport() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRange, setSelectedRange] = useState<string>(
    timeRanges[2].value
  );
  const loading = useSelector(
    (state: RootState) => state.revenue.loadMasterLineRevenueData
  );
  const lineData = useSelector(
    (state: RootState) => state.revenue.masterLineRevenueData
  );
  const handleFetchNasterRevenueLineData = async (range: string) => {
    dispatch(getMasterLineRevenueData({ range }));
  };
  useEffect(() => {
    handleFetchNasterRevenueLineData(selectedRange);
  }, [selectedRange]);
  return (
    <div>
      {loading === "pending" ? (
        <ReusableLoader />
      ) : (
        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white ">
              Revenue Trends Over Time
            </h3>
            <Select
              value={selectedRange}
              onChange={setSelectedRange}
              options={timeRanges}
              Icon={Filter}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="label" stroke="#9ca3af" />
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
              <Legend />
              <Line
                type="monotone"
                dataKey="deposits"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Deposits"
              />
              <Line
                type="monotone"
                dataKey="payouts"
                stroke="#ef4444"
                strokeWidth={2}
                name="Payouts"
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#10b981"
                strokeWidth={2}
                name="Net Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default MasterrevenueLineGraphReport;
