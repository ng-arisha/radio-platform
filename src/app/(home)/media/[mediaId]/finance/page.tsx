"use client"

import MediaHouseFinanceSummary from "@/components/media-house/media-house-finance-summary"
import MediaHouseRevenueByStation from "@/components/media-house/media-house-revenue-by-station"
import MediaPieChart from "@/components/media-house/media-pie-chart"
import MediaHouseFinanceDataTable from "@/components/media-house/media-station-finance-data-table"
import { useParams } from "next/navigation"

function MediaFinancePage() {
  const param = useParams<{mediaId:string}>()
    return (
        <div>
           <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium text-white mb-2">💰 Finance & Budget Management</h1>
            <p className="text-gray-400">Manage budget allocations and track financial performance across stations</p>
          </div>
          {/* <AllocateFundsModal role={UserRole.MEDIA_HOUSE} /> */}
        </div>

        <MediaHouseFinanceSummary />
        <MediaHouseFinanceDataTable />
        <MediaHouseRevenueByStation param={param.mediaId} />
        <MediaPieChart param={param.mediaId}/>
        </div>
    )
}

export default MediaFinancePage
