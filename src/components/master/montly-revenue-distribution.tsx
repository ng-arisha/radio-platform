"use client";

import { getPlatformRevenueData } from "@/lib/master/master";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import ReusableLoader from "../shared/reusable-loader";

function MontlyRevenueDistribution() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.master.loadingRevenueData
  );
  const data = useSelector((state: RootState) => state.master.revenueData);

  useEffect(() => {
    dispatch(getPlatformRevenueData());
  }, [dispatch]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
       <ReusableLoader />
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Top Media Houses */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} name="Gross Revenue" />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MontlyRevenueDistribution;
