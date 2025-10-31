import ShowBasicInfo from "@/components/finance/show/show-basic-info"
import ShowList from "@/components/finance/show/shows-list"
import StationNavigation from "@/components/stations/station-navigation"

function StationShows() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>
            <ShowBasicInfo />
            
            <ShowList />
        </div>
    )
}

export default StationShows
