"use client";

import { getMediaStationFinanceData } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { Edit, Eye, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaHouseFinanceDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.media.loadingFinanceData
  );
  const dashboardData = useSelector(
    (state: RootState) => state.media.mediaStationFinancedata
  );

  const params = useParams<{ mediaIdd: string }>();
  useEffect(() => {
    dispatch(getMediaStationFinanceData({ id: params.mediaIdd }));
  }, [dispatch, params.mediaIdd]);

  const getUtilizationPercentage = (utilized:number, allocated:number) => {
    return ((utilized / allocated) * 100).toFixed(1);
  };
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : dashboardData.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <p>No finance data available for stations.</p>
        </div>
      ) : (
        <div>
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Budget Allocation by Station</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-950">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Station</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Allocated</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Utilized</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Remaining</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Revenue</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Last Updated</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.map((row) => {
                  const utilization = getUtilizationPercentage(row.utilized, row.allocated);
                  return (
                    <tr key={row.id} className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                            {row.station.charAt(0)}
                          </div>
                          <span className="font-medium">{row.station}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{formatCurrency(row.allocated)}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="text-gray-300">{formatCurrency(row.utilized)}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${parseFloat(utilization) > 90 ? 'bg-red-500' : 'bg-green-500'}`}
                                style={{ width: `${utilization}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{utilization}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{formatCurrency(row.remaining)}</td>
                      <td className="p-4">
                        <span className="text-green-400 font-semibold">{formatCurrency(row.revenue)}</span>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">{row.lastUpdated}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-700 rounded transition-colors" title="View Details">
                            <Eye size={16} className="text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded transition-colors" title="Edit Allocation">
                            <Edit size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default MediaHouseFinanceDataTable;
