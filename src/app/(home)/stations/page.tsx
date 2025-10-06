import NewStationModal from "@/components/stations/new-station-modal"
import StationList from "@/components/stations/station-list"

function StationsPage() {
    return (
        <div>
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
