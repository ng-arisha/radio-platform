"use client";

import Input from "@/components/shared/input";
import ReusableLoader from "@/components/shared/reusable-loader";
import Select from "@/components/shared/reusable-select-input";
import { setStationRevenueByCodes } from "@/lib/commission/commission";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, range } from "@/utils/utils";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function RevenueDistributionByShowCode() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeRange, setActiveRange] = useState("1d");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const loading = useSelector(
    (state: RootState) => state.commission.loadingRevenueByCodes
  );
  const data = useSelector(
    (state: RootState) => state.commission.revenueByStationCodes
  );

  const fetchRevenueDistributionByStationCodes = async (
    range: string,
    startDate: string,
    toDate: string
  ) => {
    await dispatch(
      setStationRevenueByCodes({ range: range, startDate, endDate: toDate })
    );
  };

  useEffect(() => {
    if (fromDate && toDate) {
      
      fetchRevenueDistributionByStationCodes("", fromDate, toDate);
    } else if (!fromDate && !toDate) {
      fetchRevenueDistributionByStationCodes(activeRange, "", "");
    }
    
  }, [activeRange, fromDate, toDate]);

  const colorPalette = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
  return (
    <div className="mt-8">
      {loading === "pending" ? (
        <ReusableLoader />
      ) : (
        <div>
          <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Revenue Distribution by Paybill
              </h3>
              <div className="flex gap-3 items-center">
                <Input value={fromDate} onChange={setFromDate} type="date" />
                <div>
                  <p>To</p>
                </div>
                <Input value={toDate} onChange={setToDate} type="date" />
                <Select
                  value={activeRange}
                  onChange={(value) => setActiveRange(value)}
                  options={range}
                  Icon={Filter}
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) =>
                    `${entry.name}: ${((Number(entry.value) / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colorPalette[index % colorPalette.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f3f4f6" }}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueDistributionByShowCode;
