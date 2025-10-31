import ShowFinancialAllocations from "@/components/financials/show-financials-allocation"
import StationFinancialsPiedata from "@/components/financials/station-financials-pie-data"
import RevenueByShow from "@/components/stations/station-dashboard/revenue-by-show"
import StationOverview from "@/components/stations/station-dashboard/station-overview"
import StationNavigation from "@/components/stations/station-navigation"

function FinanceStationPage() {
    return (
        <div>
            <div className="mb-2">
            <StationNavigation />
            </div>
           <StationOverview /> 
           <RevenueByShow />
           <StationFinancialsPiedata />
           <ShowFinancialAllocations />
        </div>
    )
}

export default FinanceStationPage
