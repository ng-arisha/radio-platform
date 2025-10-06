"use client"

import { useQuery } from "convex/react";
import { SunIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import ShowTable from "./show-table";

function ShowList() {
    const shows = useQuery(api.shows.get);
    console.log(`Shows ${JSON.stringify(shows)}`)
    return (
        <div>
        {shows === undefined ? (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <SunIcon className="animate-spin text-gray-100" size={24} />
            <p>Loaing shows...</p>
          </div>
        ) : shows.length === 0 ? (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <p className="text-red-500">There is no active show</p>
          </div>
        ) : (
          <ShowTable shows={shows!} />
        )}
      </div>
    )
}

export default ShowList
