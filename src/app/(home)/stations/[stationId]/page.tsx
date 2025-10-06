"use client";

import TextColumn from "@/components/shared/text-column";
import ShowTable from "@/components/shows/show-table";
import NewStationModal from "@/components/stations/new-station-modal";
import { useQuery } from "convex/react";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

function StationDetails() {
  const param = useParams<{ stationId: string }>();

  const station = useQuery(api.stations.getById, {
    id: param.stationId as Id<"stations">,
  });

  const shows = useQuery(api.shows.getByStationId, {
    stationId: param.stationId as Id<"stations">,
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{station ? station.name : "Station"} Details</h1>
        <NewStationModal page="shows" />
      </div>

      {station === undefined ? (
        <div className="h-[100vh-6rem] flex flex-col justify-center items-center text-gray-200">
          <SunIcon className="animate-spin" size={24} />
          <p>Loading station details...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pb-4">
          <TextColumn label="Station Name" value={station.name} />
          <TextColumn label="Station Address" value={station.address} />
          <TextColumn label="Station frequency" value={station.frequency} />
          <TextColumn label="Is Active" value={station.enabled ? 'Yes':'No'} />
          <TextColumn label="Created On" value={new Date(station._creationTime).toLocaleDateString()} />
        </div>
      )}

      <div className="h-[0.5px] w-full bg-gray-400" />

      <h2 className="py-3 text-gray-400 font-medium">Shows under {station ? station.name: 'this'} station</h2>

      {
        shows === undefined ? (
            <div className="h-24 w-full flex flex-col justify-center items-center">
            <SunIcon className="animate-spin text-gray-100" size={24} />
            <p>Loaing shows...</p>
                
            </div>
        ): shows.length === 0 ? (
            <div className="h-24 w-full flex flex-col justify-center items-center">
            <p className="text-red-500">There is no active show for this station</p>
            </div>
        ): (
            <ShowTable shows={shows!} />
        )
      }
    </div>
  );
}

export default StationDetails;
