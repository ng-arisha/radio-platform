"use client";

import { getPlatformPerformancedata } from "@/lib/master/master";
import { AppDispatch, RootState } from "@/lib/store";
import { timeFilters } from "@/utils/utils";
import { Filter } from "lucide-react";
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
import Input from "../shared/input";
import ReusableLoader from "../shared/reusable-loader";
import Select from "../shared/reusable-select-input";
import MediaHouseSummary from "./media-house-summary";

function MediaHousePerformance() {
  const [activeRange, setActiveRange] = useState(timeFilters[2].value);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.master.loadingMediaPerformanceData
  );
  const data = useSelector((state: RootState) => state.master.performancedata);

  const fetchPlatformPerformanceData = async (range: string,fromDate:string, toDate:string) => {
    await dispatch(getPlatformPerformancedata({ range, fromDate, toDate }));
  };

  useEffect(() => {
    if(fromDate  && toDate ){
      const fromutcDate = new Date(fromDate + "T00:00:00Z").toISOString();
      const toutcDate = new Date(toDate + "T00:00:00Z").toISOString();
      fetchPlatformPerformanceData(activeRange,fromutcDate,toutcDate);
    }else if(!fromDate && !toDate){
      fetchPlatformPerformanceData(activeRange,"","");
    }
    
  }, [activeRange,fromDate,toDate]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <ReusableLoader />
      ) : (
        <div>
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Media House Performance
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
                options={timeFilters}
                Icon={Filter}
              />
             </div>
            </div>
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
