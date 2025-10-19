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
    </div>
  );
}

export default StationParentDispla;
