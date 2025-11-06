import MasterDetailedTransactions from "@/components/revenue/master/master-detailed-transactions"
import MasterMediaHouseBarGhraphRevenue from "@/components/revenue/master/master-media-house-bar-revenue"
import MasterrevenueLineGraphReport from "@/components/revenue/master/master-revenue-line-graph-report"
import MasterRevenueStats from "@/components/revenue/master/master-revenue-stats"
import RevenueDistributionByShowCode from "@/components/revenue/master/revenue-distribution-by-show-code"
import RevenueInfo from "@/components/revenue/master/revenue-info"

function RevenuePage() {
    return (
        <div>
            <RevenueInfo />
            <MasterRevenueStats />
            <MasterrevenueLineGraphReport />
            <RevenueDistributionByShowCode />
            <MasterMediaHouseBarGhraphRevenue />
            <MasterDetailedTransactions />
        </div>
    )
}

export default RevenuePage
