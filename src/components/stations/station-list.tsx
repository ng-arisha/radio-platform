"use client";

import { useQuery } from "convex/react";
import { SunIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";

function StationList() {
  const stations = useQuery(api.stations.get);
  return (
    <div>
      {stations === undefined ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <SunIcon className="animate-spin text-gray-100" size={24} />
          <p>Loaing stations...</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <p className="text-red-500">No stations found.</p>
        </div>
      ) : (
        // <StationTable stations={stations!} />
        <div></div>
      )}
    </div>
  );
}

export default StationList;
