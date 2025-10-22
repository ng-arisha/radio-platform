import PromotionSummary from "@/components/promotions/promotion-summary"
import PromotionsActions from "@/components/promotions/promotions-actions"
import StationPieChart from "@/components/promotions/station-pie-charts"
import StationPromotions from "@/components/promotions/station-promotions"

function PromotionsPage() {
    return (
        <div>
            <PromotionsActions />
            <PromotionSummary />
            <StationPieChart />
            <StationPromotions />
            
        </div>
    )
}

export default PromotionsPage
