"use client";

import { getShowRevenue, getShowTransactionsdata } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function RevenueGraph() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ showId: string }>();
  const loading = useSelector((state: RootState) => state.shows.loadingRevenue);
  const revenueData = useSelector(
    (state: RootState) => state.shows.showRevenue
  );
  const loadingTransactionsdata = useSelector((state:RootState) => state.shows.loadingShosTransactionsdata);
  const transactionsData = useSelector((state:RootState) => state.shows.showTransactionsdata);

  useEffect(() => {
    dispatch(getShowRevenue({ id: params.showId }));
    dispatch(getShowTransactionsdata({ id: params.showId }));
  }, [dispatch, params.showId]);
  return (
    <div className="my-4">
      {(loading === "pending" || loadingTransactionsdata ==='pending') ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-200">
          <SunIcon className="animate-spin" size={32} />
          <p className="mt-2">Loading  Data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* revenue graph */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 className="text-xl font-bold text-white mb-4">
              Revenue Growth
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* transactions graph */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h3 className="text-xl font-bold text-white mb-4">Payments per Hour</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transactionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
      )}
    </div>
  );
}

export default RevenueGraph;
