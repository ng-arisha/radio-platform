"use client";

import { getMediaStations } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaStationsList from "./media-stations-list";

function StationSummaryInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.media.loading);
  const stationsData = useSelector(
    (state: RootState) => state.stations.mediaStations
  );
  const params = useParams<{ mediaId: string }>();

  useEffect(() => {
    dispatch(getMediaStations({ id: params.mediaId }));
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
           <div className="mt-4">
          <MediaStationsList stationData={stationsData} />
        </div>
        </div>
      )}
    </div>
  );
}

export default StationSummaryInfo;
