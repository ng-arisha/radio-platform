"use client";

import { getMediaRevenueByStation } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, timeFilters } from "@/utils/utils";
import { Filter, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Input from "../shared/input";
import Select from "../shared/reusable-select-input";

function MediaHouseRevenueByStation({param}:{param:string}) {
  const [activeRange, setActiveRange] = useState(timeFilters[3].value);
  const [startDate, setStartDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.media.loadingRevenueByStation
  );
  const stationRevenueData = useSelector(
    (state: RootState) => state.media.mediaRevenueByStation
  );
  const fetchMediaRevenueByStation = async (range: string,startDate:string,endDate:string) => {
    await dispatch(
      getMediaRevenueByStation({ range: range, id: param, startDate, endDate })
    );
  }

  useEffect(()=>{
    if(startDate && toDate){
      fetchMediaRevenueByStation(activeRange, startDate, toDate);
    }else if(!startDate && !toDate){
      fetchMediaRevenueByStation(activeRange, "", "");
    }
    // fetchMediaRevenueByStation(activeRange);
  },[activeRange, startDate, toDate]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-700">
          <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold  text-white">Revenue by Station</h3>
         <div className="flex items-center gap-3">
         <Input 
        value={startDate}
        onChange={setStartDate}
        type="date"
        />
        <div>
          <p>To</p>
        </div>
        <Input 
        value={toDate}
        onChange={setToDate}
        type="date"
        />
          <Select 
          onChange={setActiveRange}
          value={activeRange}
          options={timeFilters}
          Icon={Filter}
          />
         </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }}
              />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default MediaHouseRevenueByStation;
