"use client";
import { useParams } from "next/navigation";
import MediaHouseDahboard from "../media-house/media-house-dashboard";
import MediaHouseRevenueByStation from "../media-house/media-house-revenue-by-station";
import MediaPieChart from "../media-house/media-pie-chart";
import MediaRevenueByShow from "../media-house/media-revenue-by-show";

function MediaDetailsOverview() {
 const params = useParams<{ mediaId: string }>(); 
    return (
        <div>
           <MediaHouseDahboard param={params.mediaId} />
           <MediaPieChart param={params.mediaId} />
           <MediaHouseRevenueByStation param={params.mediaId} />
           <MediaRevenueByShow param={params.mediaId} />
        </div>
    )
}

export default MediaDetailsOverview
