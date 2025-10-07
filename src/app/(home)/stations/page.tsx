import NewStationModal from "@/components/stations/new-station-modal"
import StationList from "@/components/stations/station-list"
import StationSummary from "@/components/summary/station-summary"

function StationsPage() {

    return (
        <div>
            <h1 className="text-lg font-medium text-gray-100 py-3">Station & Show Management</h1>
           <StationSummary />
           <div className="flex justify-between items-center">
            <h1>Radio Stations</h1>
            <NewStationModal page="stations" />
           </div>

         <div className="mt-4">
         <StationList />
         </div>
        </div>
    )
}

export default StationsPage
