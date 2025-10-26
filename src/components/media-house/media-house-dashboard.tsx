"use client";

import { getMediaHouseDahsboardData } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { DollarSign, Radio, SunIcon, TrendingUp, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MediaHouseDahboard({param}:{param:string}) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.media.loadingDashboardData
  );
  const dashboardData = useSelector(
    (state: RootState) => state.media.mediaHouseDashboarddata
  );

  
  useEffect(() => {
    dispatch(getMediaHouseDahsboardData({ id: param }));
  }, [dispatch, param]);
  return (
    <div className="mt-4">
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.map((dataItem, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{dataItem.label}</p>
                  <p
                    className={`text-2xl font-bold text-${dataItem.color}-400`}
                  >
                    {dataItem.icon === "DollarSign" ||
                    dataItem.icon === "TrendUp"
                      ? formatCurrency(Number(dataItem.value))
                      : dataItem.value}
                  </p>
                </div>
                <div
                  className={`bg-${dataItem.color}-900 bg-opacity-30 p-3 rounded-lg`}
                >
                  {dataItem.icon === "DollarSign" ? (
                    <DollarSign
                      className={`w-6 h-6 text-${dataItem.color}-400`}
                    />
                  ) : dataItem.icon === "TrendUp" ? (
                    <TrendingUp
                      className={`w-6 h-6 text-${dataItem.color}-400`}
                    />
                  ) : dataItem.icon === "Users" ? (
                    <Users className={`w-6 h-6 text-${dataItem.color}-400`} />
                  ) : dataItem.icon === "Radio" ? (
                    <Radio className={`w-6 h-6 text-${dataItem.color}-400`} />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaHouseDahboard;
