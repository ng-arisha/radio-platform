"use client";

import { getPlatformPerformancedata } from "@/lib/master/master";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ReusableLoader from "../shared/reusable-loader";
import MediaHouseSummary from "./media-house-summary";

function MediaHousePerformance() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.master.loadingMediaPerformanceData
  );
  const data = useSelector((state: RootState) => state.master.performancedata);

  useEffect(() => {
    dispatch(getPlatformPerformancedata());
  }, [dispatch]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <ReusableLoader />
      ) : (
        <div>
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4">
              Media House Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#374151",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" />
                {/* <Bar dataKey="totalShows" fill="#3c28f6" /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <MediaHouseSummary data={data} />
        </div>
      )}
    </div>
  );
}

export default MediaHousePerformance;
