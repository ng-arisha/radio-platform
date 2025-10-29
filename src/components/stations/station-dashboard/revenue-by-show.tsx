"use client";

import Select from "@/components/shared/reusable-select-input";
import { getStationBardata } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { timeFilters } from "@/utils/utils";
import { Filter, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function RevenueByShow() {
  const [activeRange, setActiveRange] = useState(timeFilters[2].value);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.stations.loadingBarData
  );
  const barData = useSelector(
    (state: RootState) => state.stations.stationBarData
  );
  const params = useParams<{ stationId: string }>();

  const fetchBarShowData = async (range: string) => {
    await dispatch(getStationBardata({ id: params.stationId, range }));
  }

  useEffect(() => {
    fetchBarShowData(activeRange);
  }, [activeRange]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div className="xl:col-span-2 bg-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg">
           <div className="mb-4 flex justify-between items-center">
           <h3 className="text-xl font-bold text-white ">Revenue by Show</h3>
           
           <Select 
           options={timeFilters}
            value={activeRange}
            onChange={setActiveRange}
            Icon={Filter}
              />
           </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="showName" 
                  stroke="#9ca3af" 
                  angle={-20} 
                  textAnchor="end" 
                  height={80}
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      )}
    </div>
  );
}

export default RevenueByShow;
