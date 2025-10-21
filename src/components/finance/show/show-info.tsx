"use client";

import { getShowDetails } from "@/lib/shows/shows";
import { AppDispatch, RootState } from "@/lib/store";
import { getRemainingShowTime } from "@/utils/utils";
import { Clock, Radio, SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShowInfo() {
  const params = useParams<{ showId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.shows.loading);
  const show = useSelector((state: RootState) => state.shows.show);

  useEffect(() => {
    dispatch(getShowDetails({ id: params.showId }));
  }, [params.showId]);
  return (
    <div className="mb-4">
      {loading === "pending" || show === null ? (
        <div className="h-24 flex flex-col justify-center items-center text-gray-200">
          <SunIcon className="animate-spin" size={32} />
          <p className="mt-2">Loading show information...</p>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{show.name}</h1>
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  LIVE
                </span>
              </div>
              <p className="text-white text-opacity-90 flex items-center gap-2">
                <Radio size={16} />
                {show.station.name} {show.station.frequency} • {show.startTime}{" "}
                - {show.endTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white text-opacity-80 text-sm">
                Time Remaining
              </p>
              <p className="text-2xl font-bold text-white flex items-center gap-2">
                <Clock size={24} />
                {getRemainingShowTime(show.startTime, show.endTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowInfo;
