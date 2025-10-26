"use client";

import TextColumn from "@/components/shared/text-column";
import NewStationModal from "@/components/stations/new-station-modal";
import { stationDetails } from "@/lib/stations/stations";
import { AppDispatch, RootState } from "@/lib/store";
import { UserRole } from "@/utils/utils";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StationAbout() {
    const param = useParams<{ stationId: string }>();

    const station = useSelector((state:RootState)=>state.stations.station);
    const loading = useSelector((state:RootState)=>state.stations.loading);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(stationDetails({id: param.stationId}));
      }, [param.stationId]);
    return (
        <div>
        <div className="flex justify-between items-center">
          <h1>{station ? station.name : "Station"} Details</h1>
          <NewStationModal page="shows" role={UserRole.ADMIN} />
        </div>
  
        {station === null || loading === 'pending' ? (
          <div className="h-[100vh-6rem] flex flex-col justify-center items-center text-gray-200">
            <SunIcon className="animate-spin" size={24} />
            <p>Loading station details...</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mt-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pb-4">
            <TextColumn label="Station Name" value={station.name} />
            <TextColumn label="Station Address" value={station.address} />
            <TextColumn label="Station frequency" value={station.frequency} />
            <TextColumn label="Status" value={station.status.toUpperCase()} />
            <TextColumn label="Created On" value={new Date(station.createdAt).toLocaleDateString()} />
          </div>
        )}
  
        <div className="h-[0.5px] w-full bg-gray-400" />
  
        <h2 className="py-3 text-gray-400 font-medium">Shows under {station ? station.name: 'this'} station</h2>
  
       
      </div>
    )
}

export default StationAbout
