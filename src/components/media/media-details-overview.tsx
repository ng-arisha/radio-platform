import { mockKPIData } from "@/utils/utils"
import MediaKpiCard from "./media-kpi-card"
import RevenueChart from "./revenue-chart"

function MediaDetailsOverview() {
    return (
        <div>
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
             {/* <MediaKpiCard
              title="Pending Payouts"
              value={mockKPIData.pendingPayouts.value}
              suffix=" items"
              change={mockKPIData.pendingPayouts.change}
              trend={mockKPIData.pendingPayouts.trend as 'up' | 'down' | 'stable'}
              
            /> */}
            <div className="bg-gray-800/70 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-100">Monthly Target Achievement</h3>
                <p className="text-sm text-gray-100">
                  TZs {mockKPIData.targetAchievement.achieved?.toLocaleString()} of Tzs {mockKPIData.targetAchievement.target?.toLocaleString()}
                </p>
              </div>
              <span className="text-3xl font-bold text-blue-600">{mockKPIData.targetAchievement.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all" 
                style={{ width: `${mockKPIData.targetAchievement.value}%` }}
              ></div>
            </div>
          </div>
        </div>

        <RevenueChart />
        </div>
    )
}

export default MediaDetailsOverview
