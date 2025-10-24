import MediaHouseDahboard from "@/components/media-house/media-house-dashboard";
import MediaHouseInfo from "@/components/media-house/media-house-info";
import MediaHouseRevenueByStation from "@/components/media-house/media-house-revenue-by-station";
import MediaPieChart from "@/components/media-house/media-pie-chart";
import MediaRevenueByShow from "@/components/media-house/media-revenue-by-show";

function MediaDashboardPage() {
  return (
    <div>
      <MediaHouseInfo />

      <MediaHouseDahboard />

      <MediaPieChart />

      <MediaHouseRevenueByStation />

      <MediaRevenueByShow />
    </div>
  );
}

export default MediaDashboardPage;
