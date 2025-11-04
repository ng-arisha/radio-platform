"use client";

import { getPlatformDashboardData } from "@/lib/master/master";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, timeFilters } from "@/utils/utils";
import {
  Building2,
  DollarSign,
  Filter,
  Radio,
  SunIcon,
  Tv,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../shared/input";
import Select from "../shared/reusable-select-input";

function MasterDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.master.loading);
  const data = useSelector(
    (state: RootState) => state.master.masterDashboardData
  );
  const [activeRange, setActiveRange] = useState(timeFilters[2].value);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const fetchPlatformDashboardData = async (range: string,fromDate:string, toDate:string) => {
    await dispatch(getPlatformDashboardData({ range, fromDate, toDate }));
  };

  useEffect(() => {
    if(fromDate  && toDate ){
      const fromutcDate = new Date(fromDate + "T00:00:00Z").toISOString();
      const toutcDate = new Date(toDate + "T00:00:00Z").toISOString();
      
      fetchPlatformDashboardData(activeRange, fromutcDate, toutcDate);
      
    }else if (!fromDate && !toDate){
      setFromDate("");
      setToDate("");
      fetchPlatformDashboardData(activeRange,"","");
      
    }
   
    
  }, [activeRange, fromDate, toDate]);
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="pb-6">
          <h1 className="text-xl font-medium text-gray-100">
            Master Finance Dashboard
          </h1>
          <p className="py-2 text-gray-400">
            Overview of financial performance accross all media houses
          </p>
        </div>
        <Input 
        value={fromDate}
        onChange={setFromDate}
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
              value={activeRange}
              onChange={(value) => setActiveRange(value)}
              options={timeFilters}
              Icon={Filter}
            />
      </div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-gray-700 rounded-lg p-6 border border-gray-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {kpi.icon === "DollarSign"
                        ? formatCurrency(Number(kpi.value))
                        : kpi.value}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-600`}>
                    {kpi.icon === "DollarSign" ? (
                      <DollarSign className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "Building2" ? (
                      <Building2 className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "Radio" ? (
                      <Radio className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "TV" ? (
                      <Tv className={`w-6 h-6 ${kpi.color}`} />
                    ) : kpi.icon === "Users" ? (
                      <Users className={`w-6 h-6 ${kpi.color}`} />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterDashboard;
