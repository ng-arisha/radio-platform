import MasterDashboard from "@/components/master/master-dashboard"
import MasterHeader from "@/components/master/master-header"
import MontlyRevenueDistribution from "@/components/master/montly-revenue-distribution"

function MasterDahboardPage() {
    return (
        <div>
           <MasterHeader />
           <MasterDashboard />
           <MontlyRevenueDistribution />
        </div>
    )
}

export default MasterDahboardPage
