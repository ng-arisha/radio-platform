import MasterPromotionPieData from "@/components/promotions/master/master-promotion-pie-data"
import PromoList from "@/components/revenue/master/promo-list"

function PrmoPage() {
    return (
        <div>
            <h1 className="text-2xl font-medium">Promotional Reports</h1>
            <p className="py-2">Monitor performance of all Promotions on the platform</p>
            <PromoList />
            <MasterPromotionPieData />
        </div>
    )
}

export default PrmoPage
