"use client";

import RevenueGraph from "./revenue-graph";
import ShowInfo from "./show-info";
import ShowStats from "./show-stats";


function ShowDashboard() {
    
    return (
        <div>
            <ShowInfo />
            <ShowStats />
            <RevenueGraph />
        </div>
    )
}

export default ShowDashboard
