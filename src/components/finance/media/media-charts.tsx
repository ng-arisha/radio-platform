"use client";

import { getMediaStationsAllocation } from "@/lib/stats/stats";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllocationVsUtilizationStations from "./allocation-vs-utilization-stations";
import MediaPieChart from "./media-pie-chart";

function MediaCharts() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ mediaId: string }>();
  const allocations = useSelector(
    (state: RootState) => state.stats.mediaStationsAllocation
  );
  const loading = useSelector(
    (state: RootState) => state.stats.loadingAllocations
  );
  useEffect(() => {
    dispatch(getMediaStationsAllocation({ id: params.mediaId }));
  }, []);

  if (loading === "pending") {
    return (
      <div className="h-24 flex flex-col justify-center items-center text-gray-400">
        <SunIcon className="animate-spin " size={24} />
      </div>
    );
  }

  if (allocations.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-24 text-gray-400">
        <p>No summary data available.</p>
      </div>
    );
  }
  const allocationDistribution = allocations.map((a) => ({
    name: a.station?.name || "Unassigned",
    value: a.allocated,
    percentage: (
      (a.allocated /
        allocations.reduce((sum, item) => sum + item.allocated, 0)) *
      100
    ).toFixed(2),
  }));

  const utilizationData = allocations.map((a) => ({
    name: a.station?.name || "Unassigned",
    allocated: a.allocated,
    utilized: a.utilized,
    percentage: ((a.utilized / a.allocated) * 100).toFixed(2),
  }));
  return (
    <div className="mt-6">
      <MediaPieChart allocationDistribution={allocationDistribution} />
      <div className="my-3">
        <AllocationVsUtilizationStations utilizationData={utilizationData} />
      </div>
    </div>
  );
}

export default MediaCharts;
