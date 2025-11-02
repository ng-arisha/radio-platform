import MasterrevenueLineGraphReport from "@/components/revenue/master/master-revenue-line-graph-report"
import MasterRevenueStats from "@/components/revenue/master/master-revenue-stats"
import RevenueInfo from "@/components/revenue/master/revenue-info"

function RevenuePage() {
    return (
        <div>
            <RevenueInfo />
            <MasterRevenueStats />
            <MasterrevenueLineGraphReport />
        </div>
    )
}

export default RevenuePage
