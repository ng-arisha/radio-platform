import StationNavigation from "@/components/stations/station-navigation"
import WinnersList from "@/components/users/winners-list"

function WinnersPage() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>

           <WinnersList />
        </div>
    )
}

export default WinnersPage
