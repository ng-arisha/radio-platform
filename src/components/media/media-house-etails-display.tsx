"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import MediaDetailsOverview from "./media-details-overview";
import MediaDetailsTabs from "./media-details-tabs";
import MediaHouseDetails from "./media-house-details";
import StationsList from "./stations/stations-list";

function MediaHouseParentDisplay() {
    const selectedTab = useSelector((state: RootState) => state.util.selectedTab); 
    return (
        <div>
        <MediaDetailsTabs />
        {
            selectedTab === 'About' && (
                <MediaHouseDetails />
            )
        }
        {
            selectedTab === 'Overview' && (
                <MediaDetailsOverview />
            )
        }
        {
            selectedTab === "Stations" && (
                <StationsList />
            )
        }
        
    </div>
    )
}

export default MediaHouseParentDisplay
