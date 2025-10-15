"use client";

import { getMediaHousePerformance } from "@/lib/stats/stats";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function AllocationVsUtilization() {
    const mediaHousePerformance = useSelector((state:RootState) => state.stats.mediaHousePerformance);
    const loading = useSelector((state:RootState)=>state.stats.loadingMediaHousePerformance);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMediaHousePerformance())
    }, [dispatch])
    return (
        <div className="mt-6">
        {
            loading === 'pending' ? (
                <div className="h-24 flex flex-col justify-center items-center">
                    <SunIcon className="animate-spin text-gray-500" size={24} />
                    <p className="text-gray-500">Loading data...</p>
                </div>
            ): mediaHousePerformance.length === 0 ? (
                <div className="h-24 flex flex-col justify-center items-center">
                  <p className="text-gray-500">No data available</p>
                </div>
              ):(
                <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Allocation vs Utilization</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mediaHousePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mediaHouse" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="allocated" fill="#3b82f6" name="Allocated (K)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="utilized" fill="#10b981" name="Utilized (K)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="revenue" fill="#10c981" name="Utilized (K)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              )
        }
       
        </div>
    )
}

export default AllocationVsUtilization
