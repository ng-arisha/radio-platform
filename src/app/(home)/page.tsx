import DailyRevenueTrend from "@/components/dashboard/daily-revenue-trend"
import DashboardSummary from "@/components/dashboard/dashboard-stat"

function HomePage() {
  return (
    <div>
     <DashboardSummary />
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
    <DailyRevenueTrend />
     </div>
    </div>
  )
}

export default HomePage
