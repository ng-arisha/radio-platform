import NewShow from "@/components/finance/show/new-show"
import NewPromotionModal from "@/components/promotions/new-promotion-modal"
import { UserRole } from "@/utils/utils"


function StationActions() {
    return (
        <div className="flex justify-between items-center mb-8 mt-4">
          <div>
            <h2 className="text-3xl font-medium text-white mb-2">Station Overview</h2>
            <p className="text-gray-400">Complete snapshot of your station&rsquo;s performance and activity</p>
          </div>
          <div className="flex gap-3">
            <NewShow role={UserRole.STATION_ADMIN} />
            <NewPromotionModal />
           {/* <AllocateFundsModal /> */}
           
          </div>
        </div>
    )
}

export default StationActions
