import MasterDashboard from "@/components/master/master-dashboard"
import MasterHeader from "@/components/master/master-header"
import MediaHousePerformance from "@/components/master/media-house-performance"
import MontlyRevenueDistribution from "@/components/master/montly-revenue-distribution"

function MasterDahboardPage() {
    return (
        <div>
           <MasterHeader />
           <MasterDashboard />
           <MontlyRevenueDistribution />
           <MediaHousePerformance />
        </div>
    )
}

export default MasterDahboardPage
