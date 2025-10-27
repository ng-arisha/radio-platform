import MasterPromotionPieData from "@/components/promotions/master/master-promotion-pie-data"
import MasterPromotionsList from "@/components/promotions/master/master-promotions-list"
import MasterPromotionsSummary from "@/components/promotions/master/master-promotions-summary"

function PromotionsPage() {
    return (
        <div>
            <div>
              <h1 className="text-3xl font-medium text-white flex items-center gap-2">
                🎁 Promotions Center
              </h1>
              {/* <p className="text-gray-400 mt-1">Create and manage all show-based promotions</p> */}
            </div>
            <MasterPromotionsSummary />
            <MasterPromotionPieData />
            <MasterPromotionsList />
        </div>
    )
}

export default PromotionsPage
