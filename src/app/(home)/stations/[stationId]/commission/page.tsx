import StationCommission from "@/components/commission/station/station-commission"
import StationNavigation from "@/components/stations/station-navigation"

function CommissionPage() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>
           <StationCommission />
        </div>
    )
}

export default CommissionPage
