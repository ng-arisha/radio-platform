
import NewStationModal from "@/components/stations/new-station-modal";
import { UserRole } from "@/utils/utils";

function ShowsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Radio Shows</h1>
        <NewStationModal page="shows" role={UserRole.ADMIN} />
      </div>
      <div className="mt-4">
      {/* <ShowList /> */}
      </div>
    </div>
  );
}

export default ShowsPage;
