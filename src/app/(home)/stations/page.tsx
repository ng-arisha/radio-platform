import NewStationModal from "@/components/stations/new-station-modal"

function StationsPage() {
    return (
        <div>
           <div className="flex justify-between items-center">
            <h1>Radio Stations</h1>
            <NewStationModal />
           </div>
        </div>
    )
}

export default StationsPage
