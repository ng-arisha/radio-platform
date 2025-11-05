"use client";

import Input from "@/components/shared/input";
import Select from "@/components/shared/reusable-select-input";
import { getStationDashBoard } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { timeFilters } from "@/utils/utils";
import { DollarSign, Filter, Radio, Sun, TrendingUp, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function StationOverview() {
  const [activeRange, setActiveRange] = useState(timeFilters[2].value);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const dashboarddata = useSelector(
    (state: RootState) => state.stations.stationDashboard
  );
  const loading = useSelector((state: RootState) => state.stations.loading);
  const params = useParams<{ stationId: string }>();

  const fetchStationDashboardData = async (range: string,startDate:string,endDate:string) => {
    await dispatch(getStationDashBoard({ range: range, id: params.stationId, startDate: startDate, endDate: endDate }));
  }

  useEffect(() => {
    if(startDate && endDate){
      fetchStationDashboardData(activeRange, startDate, endDate);
    }else if(!startDate && !endDate){
      setStartDate("");
      setEndDate("");
      fetchStationDashboardData(activeRange,"","");
    }
    
  }, [activeRange, startDate, endDate]);
  return (
    <div className="mt-4">
      {/* overview */}
      <div className="flex justify-between items-center mb-8 mt-4">
          <div>
            <h2 className="text-3xl font-medium text-white mb-2">Station Overview</h2>
            <p className="text-gray-400">Complete snapshot of your station&rsquo;s performance and activity</p>
          </div>
          <div className="flex gap-3 items-center">
          <Input 
        value={startDate}
        onChange={setStartDate}
        type="date"
        />
        <div>
          <p>To</p>
        </div>
        <Input 
        value={endDate}
        onChange={setEndDate}
        type="date"
        />
          <Select 
          options={timeFilters}
          value={activeRange}
          onChange={setActiveRange}
          Icon={Filter}
          />
            {/* <NewShow role={UserRole.STATION_ADMIN} /> */}
            {/* <NewPromotionModal /> */}
           {/* <AllocateFundsModal /> */}
           
          </div>
        </div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <Sun className="animate-spin mb-2" size={24} />
          <p>Loading station dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {dashboarddata.map((data,index) => (
            <div
            key={index}
              className={`bg-gradient-to-br ${data.color} rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {data.icon === "DollarSign" ? (
                      <DollarSign className={`${data.color}-400`} size={20} />
                    ) : data.icon === "Users" ? (
                      <Users className={`${data.color}-400`} size={20} />
                    ) : data.icon === "TrendUp" ? (
                      <TrendingUp className={`${data.color}-400`} size={20} />
                    ) : data.icon === "Radio" ? (
                      <Radio className={`${data.color}-400`} size={20} />
                    ) : null}

                    <p className="text-gray-300 text-sm font-medium">
                      {data.label}
                    </p>
                  </div>
                  <h3 className={`text-3xl font-bold ${data.color}-500 mb-1`}>
                    {data.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StationOverview;
