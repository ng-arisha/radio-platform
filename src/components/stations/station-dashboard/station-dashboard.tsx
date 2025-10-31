"use client";

import RevenueByShow from "./revenue-by-show";
import StationCharts from "./station-chats";
import StationInfo from "./station-info";
import StationOverview from "./station-overview";

function StationDashboard() {
    return (
        <div>
            
            <StationInfo />
           
            {/* <StationActions /> */}
            <StationOverview />
            <StationCharts />
            <RevenueByShow />
            
        </div>
    )
}

export default StationDashboard
