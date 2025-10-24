import MediaHouseDahboard from "@/components/media-house/media-house-dashboard";
import MediaHouseInfo from "@/components/media-house/media-house-info";
import MediaHouseRevenueByStation from "@/components/media-house/media-house-revenue-by-station";
import MediaPieChart from "@/components/media-house/media-pie-chart";

function MediaDashboardPage() {
  return (
    <div>
      <MediaHouseInfo />

      <MediaHouseDahboard />

      <MediaPieChart />

      <MediaHouseRevenueByStation />
    </div>
  );
}

export default MediaDashboardPage;
