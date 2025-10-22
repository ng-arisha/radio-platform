"use client";

import StationActions from "./station-actions";
import StationCharts from "./station-chats";
import StationInfo from "./station-info";
import StationOverview from "./station-overview";

function StationDashboard() {
    return (
        <div>
            <StationInfo />
            <StationActions />
            <StationOverview />
            <StationCharts />
            
        </div>
    )
}

export default StationDashboard
