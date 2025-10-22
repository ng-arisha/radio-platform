"use client";

import StationActions from "./station-actions";
import StationInfo from "./station-info";
import StationOverview from "./station-overview";

function StationDashboard() {
    return (
        <div>
            <StationInfo />
            <StationActions />
            <StationOverview />
            
        </div>
    )
}

export default StationDashboard
