import AllocationVsUtilization from "@/components/finance/master/allocation-vs-utilization"
import MediaHouseAllocations from "@/components/finance/master/media-house-allocations"
import MasterDashboard from "@/components/master/master-dashboard"

function FinanceMasterPage() {
    return (
        <div>
        <div className="pb-6">
          <h1 className="text-xl font-medium text-gray-100">
            Master Finance Dashboard
          </h1>
          <p className="py-2 text-gray-400">
            Overview of financial performance accross all media houses
          </p>
        </div>
        <MasterDashboard />
        <AllocationVsUtilization />
        <MediaHouseAllocations />
        {/* <RevenueChart /> */}
      </div>
    )
}

export default FinanceMasterPage
