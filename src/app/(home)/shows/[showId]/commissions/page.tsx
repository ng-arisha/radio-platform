import ShowCommissionDashboard from "@/components/finance/show/commission/show-commission-dashboard"
import ShowNavigation from "@/components/shows/show-navigation"

function CommissionPage() {
    return (
        <div>
            <ShowNavigation />
            <h2 className="text-2xl font-medium text-white mb-3">Commission & Earnings</h2>
            <ShowCommissionDashboard />
        </div>
    )
}

export default CommissionPage
