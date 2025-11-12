import StationList from "@/components/stations/station-list";

function StationsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-gray-300 text-xl mb-4">Radio Stations</h1>
      </div>
      <StationList />
    </div>
  );
}

export default StationsPage;
