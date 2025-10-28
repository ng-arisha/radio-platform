import ShowBasicInfo from "@/components/finance/show/show-basic-info";
import ShowList from "@/components/finance/show/shows-list";
import ShowFinancialAllocations from "@/components/financials/show-financials-allocation";
import StationFinancialsPiedata from "@/components/financials/station-financials-pie-data";
import RevenueByShow from "@/components/stations/station-dashboard/revenue-by-show";
import StationActions from "@/components/stations/station-dashboard/station-actions";
import StationCharts from "@/components/stations/station-dashboard/station-chats";
import StationInfo from "@/components/stations/station-dashboard/station-info";
import StationOverview from "@/components/stations/station-dashboard/station-overview";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import StationAbout from "./station-about";
import StationTabs from "./station-tabs";

function StationParentDispla() {
  const selectedTab = useSelector(
    (state: RootState) => state.util.selectedStationtab
  );
  return (
    <div>
      <StationTabs />
      {selectedTab === "About" && <StationAbout />}
      {selectedTab === "Overview" && (
        <div>
          <StationInfo />
          <StationActions />
          <StationOverview />
          <StationCharts />
          <RevenueByShow />
        </div>
      )}

      {selectedTab === "Shows" && (
        <div className="mt-3">
          <ShowBasicInfo />
          <ShowList />
        </div>
      )}

      {selectedTab === "Finance" && (
        <div>
          <StationOverview />
          <RevenueByShow />
          <StationFinancialsPiedata />
          <ShowFinancialAllocations />
        </div>
      )}
    </div>
  );
}

export default StationParentDispla;
