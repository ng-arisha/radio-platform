import DailyRevenueTrend from "@/components/dashboard/daily-revenue-trend"
import DashboardSummary from "@/components/dashboard/dashboard-stat"
import MonthlyRevenueTrend from "@/components/dashboard/monthly-revenue-trend"
import RecentWinners from "@/components/dashboard/recent-winners"
import StationSummary from "@/components/summary/station-summary"

function HomePage() {
  return (
    <div>
     <DashboardSummary />
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-4">
    <DailyRevenueTrend />
    <MonthlyRevenueTrend />
     </div>
     <StationSummary/>
     <RecentWinners />
    </div>
  )
}

export default HomePage
