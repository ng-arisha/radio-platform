import AllocationVsUtilization from "@/components/finance/master/allocation-vs-utilization"
import MediaHouseAllocations from "@/components/finance/master/media-house-allocations"
import MasterDashboard from "@/components/master/master-dashboard"

function FinanceMasterPage() {
    return (
        <div>
       
        <MasterDashboard />
        <AllocationVsUtilization />
        <MediaHouseAllocations />
        {/* <RevenueChart /> */}
      </div>
    )
}

export default FinanceMasterPage
