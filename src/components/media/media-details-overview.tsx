import { mockKPIData } from "@/utils/utils"
import MediaKpiCard from "./media-kpi-card"

function MediaDetailsOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <MediaKpiCard
              title="Total Revenue"
              value={mockKPIData.totalRevenue.value}
              prefix="TZs "
              change={mockKPIData.totalRevenue.change}
              trend={mockKPIData.totalRevenue.trend as 'up' | 'down' | 'stable'}
              sparklineData={mockKPIData.totalRevenue.sparkline}
            />
             <MediaKpiCard
              title="Net Revenue"
              value={mockKPIData.netRevenue.value}
              prefix="TZSs "
              change={mockKPIData.netRevenue.change}
              trend={mockKPIData.netRevenue.trend as 'up' | 'down' | 'stable'}
              sparklineData={mockKPIData.netRevenue.sparkline}
            />
             <MediaKpiCard
              title="Total Payouts (MTD)"
              value={mockKPIData.totalPayouts.value}
              prefix="TZs "
              change={mockKPIData.totalPayouts.change}
              trend={mockKPIData.totalPayouts.trend as 'up' | 'down' | 'stable'}
              sparklineData={mockKPIData.totalPayouts.sparkline}
            />
             <MediaKpiCard
              title="Pending Payouts"
              value={mockKPIData.pendingPayouts.value}
              suffix=" items"
              change={mockKPIData.pendingPayouts.change}
              trend={mockKPIData.pendingPayouts.trend as 'up' | 'down' | 'stable'}
              
            />
        </div>
    )
}

export default MediaDetailsOverview
