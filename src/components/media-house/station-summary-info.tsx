"use client";

import { getStationSummary } from "@/lib/media/media";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils/utils";
import { Activity, Radio, SunIcon, TrendingUp, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaStationsList from "./media-stations-list";

function StationSummaryInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.media.loading);
  const stationsData = useSelector(
    (state: RootState) => state.media.stationSummary
  );
  const params = useParams<{ mediaIdd: string }>();

  useEffect(() => {
    dispatch(getStationSummary({ id: params.mediaIdd }));
  }, []);
  return (
    <div>
      {loading === "pending" ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <SunIcon className="animate-spin mb-2" size={24} />
          <p>Loading stations...</p>
        </div>
      ) : stationsData.length === 0 ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-300">
          <p className="text-red-500">There are no stations to display</p>
        </div>
      ) : (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {stationsData.slice(0,2).map((station) => (
            <div
              key={station.id}
              className="bg-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-650 transition-colors border border-gray-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{station.name}</h3>
                  <p className="text-blue-400 text-sm">{station.frequency}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    station.status === "active"
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {station.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp size={16} />
                    <span className="text-sm">Revenue</span>
                  </div>
                  <span className="font-semibold text-green-400">
                    {formatCurrency(station.revenue)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Radio size={16} />
                    <span className="text-sm">Active Shows</span>
                  </div>
                  <span className="font-semibold">{station.activeShows}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} />
                    <span className="text-sm">Admin</span>
                  </div>
                  <span className="font-semibold">{station.admin}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Activity size={16} />
                    <span className="text-sm">Utilization</span>
                  </div>
                  <span className="font-semibold">{station.utilization}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${station.utilization}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <MediaStationsList stationData={stationsData} />
        </div>
        </div>
      )}
    </div>
  );
}

export default StationSummaryInfo;
