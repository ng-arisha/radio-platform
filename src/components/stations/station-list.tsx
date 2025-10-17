"use client";

import { getAllStations } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StationTable from "./station-table";

function StationList() {
  const stations = useSelector((state:RootState)=> state.stations.allStations);
  const loading = useSelector((state:RootState)=> state.stations.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllStations())
  }, []);
  return (
    <div>
      {loading === 'pending' ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <SunIcon className="animate-spin text-gray-100" size={24} />
          <p>Loaing stations...</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <p className="text-red-500">No stations found.</p>
        </div>
      ) : (
        <StationTable stations={stations!} />
       
      )}
    </div>
  );
}

export default StationList;
