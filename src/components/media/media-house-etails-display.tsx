"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import MediaDetailsTabs from "./media-details-tabs";
import MediaHouseDetails from "./media-house-details";

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
        
    </div>
    )
}

export default MediaHouseParentDisplay
