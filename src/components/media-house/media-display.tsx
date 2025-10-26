"use client";

import { useParams } from "next/navigation";
import MediaHouseDahboard from "./media-house-dashboard";
import MediaHouseRevenueByStation from "./media-house-revenue-by-station";
import MediaPieChart from "./media-pie-chart";
import MediaRevenueByShow from "./media-revenue-by-show";

function MediaDisplay() {
    const params = useParams<{ mediaIdd: string }>(); 
    return (
        <div>
            <MediaHouseDahboard param={params.mediaIdd} />
            <MediaPieChart param={params.mediaIdd} />
            <MediaHouseRevenueByStation param={params.mediaIdd} />
            <MediaRevenueByShow param={params.mediaIdd} />
        </div>
    )
}

export default MediaDisplay
