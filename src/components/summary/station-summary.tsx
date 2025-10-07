"use client";

import { useQuery } from "convex/react";
import { Power, Radio, Tv } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import Stats from "../shared/stats";

function StationSummary() {
  const stations = useQuery(api.stations.get);
  const shows = useQuery(api.shows.get);
  const totalStations = stations ? stations.length : 0;
  const totalShows = shows ? shows.length : 0;
  const activeStations = stations
    ? stations.filter((station) => station.enabled).length
    : 0;
  const showsWithJackpot = shows
    ? shows.filter((show) => show.jackpotEnabled).length
    : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-4">
      <Stats title="Total Stations" value={totalStations} Icon={Radio} />
      <Stats title="Active Stations" value={activeStations} Icon={Power} />
      <Stats title="Total Shows" value={totalShows} Icon={Tv} />
      <Stats title="Jackpot Shows" value={showsWithJackpot} Icon={Tv} />
    </div>
  );
}

export default StationSummary;
