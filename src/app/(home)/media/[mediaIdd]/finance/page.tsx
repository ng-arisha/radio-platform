import AllocateFundsModal from "@/components/finance/allocate-funds"
import MediaHouseFinanceSummary from "@/components/media-house/media-house-finance-summary"
import MediaHouseRevenueByStation from "@/components/media-house/media-house-revenue-by-station"
import MediaPieChart from "@/components/media-house/media-pie-chart"
import MediaHouseFinanceDataTable from "@/components/media-house/media-station-finance-data-table"

function MediaFinancePage() {
    return (
        <div>
           <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium text-white mb-2">💰 Finance & Budget Management</h1>
            <p className="text-gray-400">Manage budget allocations and track financial performance across stations</p>
          </div>
          <AllocateFundsModal/>
        </div>

        <MediaHouseFinanceSummary />
        <MediaHouseFinanceDataTable />
        <MediaHouseRevenueByStation />
        <MediaPieChart />
        </div>
    )
}

export default MediaFinancePage
