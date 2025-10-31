import StationDashboard from "@/components/stations/station-dashboard/station-dashboard"
import StationNavigation from "@/components/stations/station-navigation"

function StationDashboardPage() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>
           <StationDashboard />
        </div>
    )
}

export default StationDashboardPage
