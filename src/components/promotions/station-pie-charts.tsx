"use client";

import { getStationPromotionsPiedata } from "@/lib/promotions/promotion";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function StationPieChart() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{stationId:string}>();
    const loading = useSelector((state: RootState) => state.promotions.loadingPromotionPieData);
    const pieData = useSelector((state: RootState) => state.promotions.stationPromotionPieData);

    useEffect(() => {
        dispatch(getStationPromotionsPiedata({id:params.stationId}));
    }, [dispatch, params.stationId]);
    return (
        <div>
            {
               loading === 'pending' ? (
                <div className="h-24 flex items-center justify-center text-gray-300">
                    <SunIcon className="animate-spin mr-2" size={24} />
                    <p>Loading data...</p>
                </div>
            ):(
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                {/* Promotion Types Donut Chart */}
                <div className="bg-gray-900 rounded-lg shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Promotion Types Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    {pieData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-300">{item.name} ({item.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
      
              
              </div>
            )
            }
        </div>
    )
}

export default StationPieChart
